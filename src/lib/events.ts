import { getCollection, type CollectionEntry } from 'astro:content';

export type Event = CollectionEntry<'events'>;

export type Stats = {
  events: number;
  talks: number;
  speakers: number;
};

export type ArchivedTalk = {
  talk: Event['data']['talks'][number];
  event: Event;
};

/** Drafts stay visible in `pnpm dev` so an event can be previewed unannounced. */
const isVisible = (event: Event): boolean => import.meta.env.DEV || !event.data.draft;

/** Upcoming for the whole day, so a 19:00 meetup does not vanish mid-event. */
const isUpcoming = (event: Event, now: Date): boolean => {
  const endOfEventDay = new Date(event.data.date);
  endOfEventDay.setHours(23, 59, 59, 999);
  return endOfEventDay >= now;
};

const byDateDesc = (a: Event, b: Event): number =>
  b.data.date.getTime() - a.data.date.getTime();

const byDateAsc = (a: Event, b: Event): number =>
  a.data.date.getTime() - b.data.date.getTime();

export const getAllEvents = async (): Promise<Event[]> =>
  (await getCollection('events', isVisible)).sort(byDateDesc);

export const getUpcomingEvents = async (now: Date = new Date()): Promise<Event[]> =>
  (await getAllEvents()).filter((event) => isUpcoming(event, now)).sort(byDateAsc);

export const getPastEvents = async (now: Date = new Date()): Promise<Event[]> =>
  (await getAllEvents()).filter((event) => !isUpcoming(event, now));

/** A featured event wins, then the next upcoming, then the most recent past one. */
export const getHeroEvent = async (
  now: Date = new Date(),
): Promise<Event | undefined> => {
  const upcoming = await getUpcomingEvents(now);
  const featured = upcoming.find((event) => event.data.featured);
  if (featured) return featured;
  if (upcoming.length > 0) return upcoming[0];
  return (await getPastEvents(now))[0];
};

export const getAllTalks = async (): Promise<ArchivedTalk[]> =>
  (await getPastEvents()).flatMap((event) =>
    event.data.talks.map((talk) => ({ talk, event })),
  );

export const countStats = async (): Promise<Stats> => {
  const past = await getPastEvents();
  const talks = past.reduce((total, event) => total + event.data.talks.length, 0);
  const speakers = new Set(
    past.flatMap((event) => event.data.talks.map((talk) => talk.speaker)),
  );
  return { events: past.length, talks, speakers: speakers.size };
};
