"use client";

import { useEffect, useState } from "react";
import { content } from "@/lib/site";

export function V2HoursPill() {
  // Resolved client-side so the prerendered HTML never disagrees with the visitor's clock.
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday((new Date().getDay() + 6) % 7); // content.hours is Monday-first
  }, []);

  const todayHours = today === null ? null : content.hours[today];

  return (
    <aside className="v2-hours" tabIndex={0} aria-label="Öffnungszeiten">
      <div className="v2-hours-status">
        <span className="status-dot" aria-hidden="true" />
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
