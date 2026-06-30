"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/site";

// Parses "16:00 – 00:00 Uhr" into open/close minutes-since-midnight.
function parseRange(timeStr: string) {
  const matches = timeStr.match(/(\d{1,2}):(\d{2})/g);
  if (!matches || matches.length < 2) return null;
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  return { open: toMin(matches[0]), close: toMin(matches[1]) };
}

function isOpenNow(now: Date) {
  const dayIdx = (now.getDay() + 6) % 7; // content.hours is Monday-first
  const nowMin = now.getHours() * 60 + now.getMinutes();

  const today = content.hours[dayIdx] && parseRange(content.hours[dayIdx][1]);
  if (today) {
    let close = today.close;
    if (close <= today.open) close += 24 * 60; // crosses midnight
    if (nowMin >= today.open && nowMin < close) return true;
  }

  // Yesterday's window can spill past midnight into today (e.g. closes 02:00).
  const yest = content.hours[(dayIdx + 6) % 7] && parseRange(content.hours[(dayIdx + 6) % 7][1]);
  if (yest && yest.close <= yest.open && nowMin < yest.close) return true;

  return false;
}

export function V2HoursPill() {
  // Resolved client-side so the prerendered HTML never disagrees with the visitor's clock.
  const [today, setToday] = useState<number | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const now = new Date();
    setToday((now.getDay() + 6) % 7); // content.hours is Monday-first
    setOpen(isOpenNow(now));
  }, []);

  const todayHours = today === null ? null : content.hours[today];

  return (
    <aside className="v2-hours" tabIndex={0} aria-label="Öffnungszeiten">
      <div className="v2-hours-status">
        <span className={`status-dot${open ? "" : " is-closed"}`} aria-hidden="true" />
        <strong>{todayHours ? `Heute ${todayHours[1]}` : "Öffnungszeiten"}</strong>
      </div>
      <div className="v2-hours-week">
        {content.hours.map(([day, time], index) => (
          <div className={index === today ? "is-today" : undefined} key={day}>
            <span>{day}</span>
            <span>{time}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
