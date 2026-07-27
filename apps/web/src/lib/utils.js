import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export const isDirectVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|mov)(?:[\?#].*)?$/i.test(url);
};

export const isExternalVideo = (url) => {
  if (!url) return false;
  return url.includes('youtube.com/') || url.includes('youtu.be/') || url.includes('vimeo.com/');
};

export const getYoutubeId = (url) => {
  if (url.includes('youtube.com/shorts/')) return url.split('shorts/')[1].split('?')[0];
  if (url.includes('watch?v=')) return url.split('watch?v=')[1].split('&')[0];
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1].split('?')[0];
  return '';
};

export const getYoutubeThumbnail = (url) => {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
};