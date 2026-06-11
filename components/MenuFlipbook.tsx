"use client";

import { useEffect, useMemo, useState } from "react";

interface MenuFlipbookProps {
  pdfUrl: string;
  pageCount: number;
}

export function MenuFlipbook({ pdfUrl, pageCount }: MenuFlipbookProps) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index + 1), [pageCount]);
  const nextPage = page === pageCount ? 1 : page + 1;

  const goTo = (targetPage: number, nextDirection: "next" | "prev") => {
    setDirection(nextDirection);
    setPage(Math.min(Math.max(targetPage, 1), pageCount));
  };

  const goNext = () => goTo(page === pageCount ? 1 : page + 1, "next");
  const goPrev = () => goTo(page === 1 ? pageCount : page - 1, "prev");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      if (event.key === "ArrowLeft") goPrev();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [page]);

  return (
    <div className="flipbook panel-card" data-direction={direction}>
      <div className="flipbook-topline">
        <span>Digitale Karte</span>
        <strong>
          Seite {page} / {pageCount}
        </strong>
      </div>

      <div className="flipbook-stage" aria-live="polite">
        <button className="flipbook-hit flipbook-hit--prev" type="button" onClick={goPrev} aria-label="Vorherige Seite" />
        <div className="flipbook-spine" aria-hidden="true" />
        <div className="flipbook-page flipbook-page--active" key={`active-${page}`}>
          <iframe
            src={`${pdfUrl}#page=${page}&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`}
            title={`Glockenspiel Karte Seite ${page}`}
            loading="lazy"
          />
        </div>
        <div className="flipbook-page flipbook-page--next" key={`next-${nextPage}`} aria-hidden="true">
          <iframe
            src={`${pdfUrl}#page=${nextPage}&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`}
            title=""
            tabIndex={-1}
            loading="lazy"
          />
        </div>
        <button className="flipbook-hit flipbook-hit--next" type="button" onClick={goNext} aria-label="Nächste Seite" />
      </div>

      <div className="flipbook-controls">
        <button type="button" onClick={goPrev}>
          Zurück
        </button>
        <div className="flipbook-dots" aria-label="Seiten">
          {pages.map((item) => (
            <button
              type="button"
              key={item}
              className={item === page ? "is-active" : ""}
              onClick={() => goTo(item, item > page ? "next" : "prev")}
              aria-label={`Seite ${item} öffnen`}
              aria-current={item === page ? "page" : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={goNext}>
          Weiter
        </button>
      </div>

      <a className="flipbook-download" href={pdfUrl} download>
        Karte als PDF herunterladen
      </a>
    </div>
  );
}
