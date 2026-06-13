"use client";

import { useEffect, useMemo, useState } from "react";

type V2FlipbookProps = {
  pdfUrl: string;
  pageCount: number;
};

export function V2Flipbook({ pdfUrl, pageCount }: V2FlipbookProps) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const pages = useMemo(() => Array.from({ length: pageCount }, (_, index) => index + 1), [pageCount]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="v2-flipbook" data-direction={direction}>
      <div className="v2-flip-topline">
        <span>Digitale Karte</span>
        <strong>
          Seite {page} / {pageCount}
        </strong>
      </div>

      <div className="v2-flip-stage" aria-live="polite" data-cursor="Blättern">
        <button className="v2-flip-hit v2-flip-hit--prev" type="button" onClick={goPrev} aria-label="Vorherige Seite" />
        <div className="v2-flip-page" key={page}>
          <iframe
            src={`${pdfUrl}#page=${page}&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0`}
            title={`Glockenspiel Karte Seite ${page}`}
            loading="lazy"
          />
        </div>
        <button className="v2-flip-hit v2-flip-hit--next" type="button" onClick={goNext} aria-label="Nächste Seite" />
      </div>

      <div className="v2-flip-controls">
        <button className="v2-button" type="button" onClick={goPrev}>
          Zurück
        </button>
        <div className="v2-flip-dots" aria-label="Seiten">
          {pages.map((item) => (
            <button
              type="button"
              key={item}
              className={item === page ? "is-active" : undefined}
              onClick={() => goTo(item, item > page ? "next" : "prev")}
              aria-label={`Seite ${item} öffnen`}
              aria-current={item === page ? "page" : undefined}
            />
          ))}
        </div>
        <button className="v2-button" type="button" onClick={goNext}>
          Weiter
        </button>
      </div>
    </div>
  );
}
