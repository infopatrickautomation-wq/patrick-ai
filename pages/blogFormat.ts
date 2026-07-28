/** Data in italiano, uguale a quella che scrive `scripts/prerender.mjs` nell'HTML statico. */
export const formatDate = (iso: string): string =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
