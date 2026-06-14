"use client";

import { useEffect, useRef, useState } from "react";
import { content, reservation, siteConfig, withBase } from "@/lib/site";

const OCCASIONS = reservation.occasions;

type SendState = "idle" | "sending" | "success" | "error";

export function ReservationModal() {
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [occasion, setOccasion] = useState<string>(OCCASIONS[0]);
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const modal = group.querySelector<HTMLElement>("[data-modal-name]");

    const openModal = (trigger: HTMLElement) => {
      const targetName = trigger.getAttribute("data-modal-target");
      if (!targetName || !modal || modal.getAttribute("data-modal-name") !== targetName) return;
      trigger.setAttribute("data-modal-status", "active");
      modal.setAttribute("data-modal-status", "active");
      group.setAttribute("data-modal-group-status", "active");
      window.dispatchEvent(new CustomEvent("modal:open"));
      document.documentElement.classList.add("modal-open");
    };

    const closeAllModals = () => {
      document
        .querySelectorAll("[data-modal-target]")
        .forEach((target) => target.setAttribute("data-modal-status", "not-active"));
      group.setAttribute("data-modal-group-status", "not-active");
      window.dispatchEvent(new CustomEvent("modal:close"));
      document.documentElement.classList.remove("modal-open");
    };

    // Delegated: triggers are server-rendered across routes, so we listen at the document.
    const onClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      const trigger = element.closest<HTMLElement>("[data-modal-target]");
      if (trigger && !group.contains(trigger)) {
        event.preventDefault();
        setOccasion(trigger.getAttribute("data-occasion") || OCCASIONS[0]);
        setSendState("idle");
        openModal(trigger);
        return;
      }
      if (element.closest("[data-modal-close]") && group.contains(element)) {
        closeAllModals();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllModals();
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.classList.remove("modal-open");
    };
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSendState("sending");
    setErrorMessage("");
    try {
      const response = await fetch(withBase("/api/reserve"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload.error || "Senden fehlgeschlagen.");
      }
      setSendState("success");
      form.reset();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Senden fehlgeschlagen.");
      setSendState("error");
    }
  };

  return (
    <div ref={groupRef} data-modal-group-status="not-active" className="modal">
      <div data-modal-close="" className="modal__dark" />
      <div data-modal-name="reserve" data-modal-status="not-active" className="modal__card">
        <div className="modal__scroll" data-lenis-prevent="">
          <div className="modal__content">
            <p className="v2-eyebrow">{reservation.eyebrow}</p>
            <h2 className="modal__h2">{reservation.heading}</h2>

            {sendState === "success" ? (
              <div className="modal__success">
                <p className="modal__p modal__p--serif">{reservation.success}</p>
                <button className="v2-button" type="button" data-modal-close="">
                  {reservation.successButton}
                </button>
              </div>
            ) : (
              <form className="modal__form" onSubmit={onSubmit}>
                <label>
                  {reservation.fields.name}
                  <input name="name" required placeholder={reservation.placeholders.name} autoComplete="name" />
                </label>
                <label>
                  {reservation.fields.contact}
                  <input name="contact" required placeholder={reservation.placeholders.contact} autoComplete="email" />
                </label>
                <label>
                  {reservation.fields.date}
                  <input name="date" type="date" />
                </label>
                <label>
                  {reservation.fields.time}
                  <input name="time" type="time" />
                </label>
                <label>
                  {reservation.fields.guests}
                  <input name="guests" type="number" min={1} max={120} placeholder={reservation.placeholders.guests} />
                </label>
                <label>
                  {reservation.fields.occasion}
                  <select name="occasion" value={occasion} onChange={(event) => setOccasion(event.target.value)}>
                    {OCCASIONS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="modal__field--full">
                  {reservation.fields.message}
                  <textarea name="message" placeholder={reservation.placeholders.message} />
                </label>
                {sendState === "error" ? (
                  <p className="modal__error modal__field--full" role="alert">
                    {errorMessage} {reservation.errorPrefix}{" "}
                    <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
                  </p>
                ) : null}
                <button className="v2-button v2-button--amber modal__field--full" type="submit" disabled={sendState === "sending"}>
                  {sendState === "sending" ? reservation.sending : reservation.submit}
                </button>
              </form>
            )}

            <div className="modal__meta">
              <div>
                <strong>{reservation.meta.direct}</strong>
                <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}>{siteConfig.phone}</a>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </div>
              <div>
                <strong>{reservation.meta.address}</strong>
                <span>
                  {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </div>
              <div>
                <strong>{reservation.meta.hours}</strong>
                <span>
                  Mo &amp; So {content.hours[0][1]} · Di–Sa ab {content.hours[1][1].split(" - ")[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div data-modal-close="" className="modal__btn-close">
          <div className="modal__btn-close-bar" />
          <div className="modal__btn-close-bar is--second" />
        </div>
      </div>
    </div>
  );
}
