import React, { useEffect, useState } from 'react';

interface Props {
  title?: string;
  rangeLabel?: string; // optional, if not provided component will compute next Saturday->Sunday
  startLabel?: string;
  endLabel?: string;
  weekendLabel?: string;
  variant?: 'hero' | 'overview' | 'booking';
  // If true, the component will refresh its computed dates at local midnight so the card auto-updates
  autoRefresh?: boolean;
}

const computeNextWeekend = () => {
  // Compute next Friday 9:00 PM -> Sunday 9:00 PM
  const now = new Date();
  const dow = now.getDay(); // 0..6, 5 === Friday
  // days until upcoming Friday (0 if today is Friday)
  let daysUntilFri = (5 - dow + 7) % 7;
  // if today is Friday but it's already past 9pm, move to next Friday
  if (daysUntilFri === 0) {
    if (now.getHours() >= 21) daysUntilFri = 7;
  }

  const fri = new Date(now);
  fri.setDate(now.getDate() + daysUntilFri);
  fri.setHours(21, 0, 0, 0); // Friday 9:00 PM

  const sun = new Date(fri);
  sun.setDate(fri.getDate() + 2); // Sunday
  sun.setHours(21, 0, 0, 0); // Sunday 9:00 PM

  return { start: fri, end: sun };
};

// compact format: 'Fri, Oct 10 9pm'
const formatShort = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
const formatWithTime = (d: Date) => {
  // build compact time like 'Fri, Oct 10 9pm'
  const datePart = d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  let hour = d.getHours();
  const minute = d.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12 || 12;
  return `${datePart} ${hour}${minute === 0 ? '' : (':' + String(minute).padStart(2, '0'))}${ampm}`;
};

const TripDatesCard: React.FC<Props> = ({ title = 'Trip Dates', rangeLabel, startLabel, endLabel, weekendLabel, variant = 'hero', autoRefresh = true }) => {
  const isHero = variant === 'hero';

  const [nowTick, setNowTick] = useState<number>(Date.now());

  // auto refresh at local midnight to ensure the "next weekend" rolls over daily
  useEffect(() => {
    if (!autoRefresh) return;

    let timeoutId: number | undefined;

    const msUntilMidnight = (from: Date) => {
      const t = from;
      const tomorrow = new Date(t);
      tomorrow.setDate(t.getDate() + 1);
      tomorrow.setHours(0, 1, 0, 0);
      return tomorrow.getTime() - t.getTime();
    };

    const msUntilNextFriday9pm = (from: Date) => {
      const now = from;
      const dow = now.getDay();
      let daysUntilFri = (5 - dow + 7) % 7;
      // if today is Friday and past 9pm, move to next Friday
      if (daysUntilFri === 0 && now.getHours() >= 21) daysUntilFri = 7;
      const nextFri = new Date(now);
      nextFri.setDate(now.getDate() + daysUntilFri);
      nextFri.setHours(21, 0, 0, 0);
      return nextFri.getTime() - now.getTime();
    };

    const scheduleNext = () => {
      const now = new Date();
      const msMid = msUntilMidnight(now);
      const msFri9 = msUntilNextFriday9pm(now);
      // pick the nearest event (midnight or Fri 9pm) to refresh
      const nextMs = Math.max(0, Math.min(msMid, msFri9));
      timeoutId = window.setTimeout(() => {
        setNowTick(Date.now());
        // schedule the next one
        scheduleNext();
      }, nextMs);
    };

    scheduleNext();

    return () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [autoRefresh]);

  // compute default labels when not supplied
  const computed = (() => {
    // reference nowTick so this recomputes when auto-refresh triggers at midnight
    void nowTick;
    const { start, end } = computeNextWeekend();
    return {
      rangeLabel: `${formatWithTime(start)} → ${formatWithTime(end)}`,
      startLabel: `${formatWithTime(start)}`,
      endLabel: `${formatWithTime(end)}`,
      weekendLabel: `${formatShort(start)} – ${formatShort(end)}`
    };
  })();

  const finalRange = rangeLabel ?? computed.rangeLabel;
  const finalStart = startLabel ?? computed.startLabel;
  const finalEnd = endLabel ?? computed.endLabel;
  const finalWeekendLabel = weekendLabel ?? computed.weekendLabel;

  const containerClass = isHero
    ? 'w-full max-w-md bg-[rgba(0,0,0,0.45)] text-white rounded-2xl px-6 py-4 shadow-2xl border border-white/10 backdrop-blur-sm'
    : (variant === 'booking'
        ? 'w-full bg-white rounded-2xl px-6 py-5 shadow-lg border border-gray-100'
        : 'w-full bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100'
      );

  const titleClass = isHero ? 'text-sm font-semibold text-white/90' : 'text-sm font-semibold text-gray-900';

  return (
    <section className="trip-dates-card" aria-label="Trip dates" tabIndex={-1}>
      <div className={`mx-auto ${containerClass}`}>
        <div className={`flex ${isHero ? 'flex-col sm:flex-row items-center sm:items-start text-center sm:text-left' : 'items-center'} justify-between gap-3`}>
          <div className={`${isHero ? 'flex flex-col sm:flex-row items-center sm:items-start gap-3' : 'flex items-start gap-3'}`}>
            <div className={`${isHero ? 'bg-white/10 text-white' : 'bg-gray-50 text-gray-700'} flex-none w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md flex items-center justify-center`}> 
              <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div className={`${isHero ? 'px-0' : ''}`}>
              <div className={titleClass}>{title}</div>
              <div className="mt-2 text-sm sm:text-base font-semibold">{finalRange}</div>
              {/* Show verbose start/end only in overview variant to avoid duplication in hero/booking */}
              {variant === 'overview' && (finalStart || finalEnd) && (
                <div className={`mt-1 text-xs text-gray-500`}>
                  {finalStart && <span>{finalStart}</span>}
                  {finalStart && finalEnd && <span className="mx-2">·</span>}
                  {finalEnd && <span>{finalEnd}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Only show weekend label/details in overview variant; hero and booking display only the concise range above */}
          {variant === 'overview' && finalWeekendLabel && (
            <div className={`mt-3 sm:mt-0 flex flex-col text-sm items-end`}>
              <div className={`font-medium text-gray-900`}>{finalWeekendLabel}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TripDatesCard;
