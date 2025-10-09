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
  // Next Saturday (6) -> Sunday (0)
  const today = new Date();
  const dow = today.getDay(); // 0..6
  const daysUntilSat = ((6 - dow) + 7) % 7 || 7; // if today is Saturday, move to next Saturday
  const sat = new Date(today);
  sat.setDate(today.getDate() + daysUntilSat);
  sat.setHours(20, 0, 0, 0); // start: Sat 8:00 PM

  const sun = new Date(sat);
  sun.setDate(sat.getDate() + 1);
  sun.setHours(8, 0, 0, 0); // end: Sun 8:00 AM

  return { start: sat, end: sun };
};

const formatShort = (d: Date) => d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
const formatWithTime = (d: Date) => d.toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });

const TripDatesCard: React.FC<Props> = ({ title = 'Trip Dates', rangeLabel, startLabel, endLabel, weekendLabel, variant = 'hero', autoRefresh = true }) => {
  const isHero = variant === 'hero';

  const [nowTick, setNowTick] = useState<number>(Date.now());

  // auto refresh at local midnight to ensure the "next weekend" rolls over daily
  useEffect(() => {
    if (!autoRefresh) return;
    const msUntilMidnight = (() => {
      const t = new Date();
      const tomorrow = new Date(t);
      tomorrow.setDate(t.getDate() + 1);
      tomorrow.setHours(0, 1, 0, 0);
      return tomorrow.getTime() - t.getTime();
    })();

    const timer = setTimeout(() => {
      setNowTick(Date.now());
      // schedule subsequent refreshes every 24 hours
      const interval = setInterval(() => setNowTick(Date.now()), 24 * 60 * 60 * 1000);
      // clear interval on unmount
      (timer as any).cleanup = () => clearInterval(interval);
    }, msUntilMidnight);

    return () => {
      clearTimeout(timer as any);
      if ((timer as any).cleanup) (timer as any).cleanup();
    };
  }, [autoRefresh]);

  // compute default labels when not supplied
  const computed = (() => {
    // reference nowTick so this recomputes when auto-refresh triggers at midnight
    void nowTick;
    const { start, end } = computeNextWeekend();
    return {
      rangeLabel: `${formatWithTime(start)} → ${formatWithTime(end)}`,
      startLabel: `Starts: ${formatWithTime(start)}`,
      endLabel: `Ends: ${formatWithTime(end)}`,
      weekendLabel: `${formatShort(start)} – ${formatShort(end)}`
    };
  })();

  const finalRange = rangeLabel ?? computed.rangeLabel;
  const finalStart = startLabel ?? computed.startLabel;
  const finalEnd = endLabel ?? computed.endLabel;
  const finalWeekendLabel = weekendLabel ?? computed.weekendLabel;

  const containerClass = isHero
    ? 'w-full max-w-md bg-[rgba(0,0,0,0.45)] text-white rounded-2xl px-6 py-4 shadow-2xl border border-white/10 backdrop-blur-sm'
    : 'w-full bg-white rounded-2xl px-5 py-4 shadow-lg border border-gray-100';

  const titleClass = isHero ? 'text-sm font-semibold text-white/90' : 'text-sm font-semibold text-gray-900';

  return (
    <section className="trip-dates-card" aria-label="Trip dates" tabIndex={-1}>
      <div className={`mx-auto ${containerClass}`}>
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex-none bg-white/10 text-white p-2 rounded-lg shadow-md flex items-center justify-center">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" fill="none" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </div>
            <div>
              <div className={titleClass}>{title}</div>
              <div className="mt-1 text-sm sm:text-base font-medium">{finalRange}</div>
              {(finalStart || finalEnd) && (
                <div className={`mt-1 text-xs ${isHero ? 'text-white/75' : 'text-gray-500'}`}>
                  {finalStart && <span>{finalStart}</span>}
                  {finalStart && finalEnd && <span className="mx-2">·</span>}
                  {finalEnd && <span>{finalEnd}</span>}
                </div>
              )}
            </div>
          </div>

          {finalWeekendLabel && (
            <div className="hidden sm:flex flex-col items-end text-sm">
              <div className={`font-medium ${isHero ? 'text-white' : 'text-gray-900'}`}>{finalWeekendLabel}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TripDatesCard;
