import { getPastEvents, type Event } from './events';

export type Photo = {
  /** Filename, e.g. "01.jpg" — what `coverPhoto` matches against. */
  name: string;
  image: ImageMetadata;
};

/**
 * Photos are read from disk rather than declared in frontmatter, so adding some
 * to an event means dropping files into its folder and nothing else.
 */
const photoModules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/photos/**/*.{jpg,JPG,jpeg,JPEG,png,PNG,webp,WEBP,avif,AVIF}',
  { eager: true },
);

/** Sorted by filename, so `01.jpg`, `02.jpg`… controls the order. */
export const getPhotos = (folder: string | undefined): Photo[] => {
  if (!folder) return [];
  const prefix = `/src/assets/photos/${folder}/`;

  return Object.entries(photoModules)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, module]) => ({ name: path.slice(prefix.length), image: module.default }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
};

export const getEventPhotos = (event: Event): Photo[] => getPhotos(event.data.photos);

export const getCoverPhoto = (event: Event): Photo | undefined => {
  const photos = getEventPhotos(event);
  if (!event.data.coverPhoto) return photos[0];
  return photos.find((photo) => photo.name === event.data.coverPhoto) ?? photos[0];
};

export const countPhotos = async (): Promise<number> =>
  (await getPastEvents()).reduce(
    (total, event) => total + getEventPhotos(event).length,
    0,
  );
