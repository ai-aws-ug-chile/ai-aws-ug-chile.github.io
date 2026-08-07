import { SITE } from '../config';

const dateFmt = new Intl.DateTimeFormat(SITE.locale, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const shortDateFmt = new Intl.DateTimeFormat(SITE.locale, {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const monthYearFmt = new Intl.DateTimeFormat(SITE.locale, {
  month: 'long',
  year: 'numeric',
});

const weekdayFmt = new Intl.DateTimeFormat(SITE.locale, { weekday: 'short' });

const timeFmt = new Intl.DateTimeFormat(SITE.locale, {
  hour: '2-digit',
  minute: '2-digit',
  // es-CL defaults to "06:30 p. m.", which nobody writes for an evening meetup.
  hour12: false,
});

/** "miércoles, 27 de agosto de 2026" */
export const formatDate = (date: Date): string => dateFmt.format(date);

/** "27 ago 2026" */
export const formatShortDate = (date: Date): string => shortDateFmt.format(date);

/** "agosto de 2026" */
export const formatMonthYear = (date: Date): string => monthYearFmt.format(date);

/** "19:00", or "19:00 – 21:30" with an end time. */
export const formatTimeRange = (start: Date, end?: Date): string => {
  const from = timeFmt.format(start);
  return end ? `${from} – ${timeFmt.format(end)}` : from;
};

/** "MIÉ 01.07.2026" — for dates shown as metadata rather than prose. */
export const formatStamp = (date: Date): string => {
  const weekday = weekdayFmt.format(date).replace(/\.$/, '').toUpperCase();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${weekday} ${day}.${month}.${date.getFullYear()}`;
};

export const toISODate = (date: Date): string => date.toISOString();

/** Intl returns lowercase months in es-CL. */
export const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1);
