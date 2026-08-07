import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// `z` re-exported from `astro:content` is deprecated and goes away in Astro 7.
import { z } from 'astro/zod';

/**
 * A link that is either fully external (https://…) or a path inside this site
 * (/slides/…), so slides can live in the repo instead of on a third-party
 * service someone has to keep alive.
 */
const linkSchema = z
  .string()
  .refine((value) => value.startsWith('/') || /^https?:\/\//.test(value), {
    message:
      'Debe ser una URL completa (https://…) o una ruta del sitio que empiece con /',
  });

/**
 * A single talk given at an event. `slidesUrl` is what makes the site useful
 * months later, so it is worth chasing speakers for it.
 */
const talkSchema = z.object({
  title: z.string(),
  speaker: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  abstract: z.string().optional(),
  /**
   * AWS session-level convention: 100 introductorio, 200 intermedio,
   * 300 avanzado, 400 experto. Helps people pick what to attend.
   */
  level: z
    .union([z.literal(100), z.literal(200), z.literal(300), z.literal(400)])
    .optional(),
  slidesUrl: linkSchema.optional(),
  videoUrl: linkSchema.optional(),
});

/** Companies that hosted, fed or otherwise made an event possible. */
const sponsorSchema = z.object({
  name: z.string(),
  url: z.url().optional(),
});

/**
 * Events, past and future. Whether an event is "upcoming" is derived from
 * `date` at build time — there is no status field to forget to flip.
 */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Local date+time, e.g. 2026-08-27T19:00. Drives ordering and upcoming/past. */
      date: z.coerce.date(),
      /** Optional end time; used only to render a time range. */
      endDate: z.coerce.date().optional(),
      summary: z.string(),
      mode: z.enum(['presencial', 'online', 'híbrido']).default('presencial'),
      /** Short venue name shown on cards, e.g. "Oficinas de Buk". */
      venue: z.string().optional(),
      /** Street address, shown only on the event page. */
      address: z.string().optional(),
      city: z.string().default('Santiago'),
      /** Meetup event URL — the canonical place to RSVP. */
      meetupUrl: z.url().optional(),
      recordingUrl: z.url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Filename to lead the photo grid with, e.g. "11.jpg". Defaults to the first. */
      coverPhoto: z.string().optional(),
      talks: z.array(talkSchema).default([]),
      sponsors: z.array(sponsorSchema).default([]),
      /**
       * Directory name under `src/assets/photos/` holding this event's photos.
       * The photos themselves are not listed here — they are read straight from
       * the folder, so adding photos means dropping files in.
       */
      photos: z.string().optional(),
      /** Optional link out to a fuller album (Google Photos, Flickr, etc.). */
      photosUrl: z.url().optional(),
      /** Pins an event to the homepage hero regardless of date. */
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

/**
 * The people behind the group. `order` controls display order so the list does
 * not silently rearrange when someone's name changes.
 */
const organizers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/organizers' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      photo: image().optional(),
      links: z
        .object({
          linkedin: z.url().optional(),
          github: z.url().optional(),
          website: z.url().optional(),
          bluesky: z.url().optional(),
        })
        .default({}),
      order: z.number().default(99),
      /** Set to false for past organizers you still want to credit. */
      active: z.boolean().default(true),
    }),
});

export const collections = { events, organizers };
