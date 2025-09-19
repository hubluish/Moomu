export interface PinterestImage {
  thumbnail_url: string;
  pin_url: string;
  alt?: string;
  photographer?: string;
  photographer_url?: string;
}

export interface CacheEntry {
  photos: PinterestImage[];
  hasNext: boolean;
  fetchedAt: number;
}

type FetchParams = {
  q: string;
  color?: string;
  orientation?: 'landscape' | 'portrait' | 'square' | '';
  per_page?: number;
  page?: number;
};

const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<CacheEntry>>();

const toKey = (p: FetchParams) => [
  p.q?.trim() ?? '',
  p.color ?? '',
  p.orientation ?? '',
  String(p.per_page ?? 9),
  String(p.page ?? 1),
].join('|');

async function fetchFromNetwork(p: FetchParams, signal?: AbortSignal): Promise<CacheEntry> {
  const params = new URLSearchParams({
    q: p.q,
    per_page: String(p.per_page ?? 9),
    page: String(p.page ?? 1),
  });
  if (p.orientation) params.set('orientation', p.orientation);
  if (p.color) params.set('color', p.color);

  const res = await fetch(`/api/pexels?${params.toString()}`, { signal });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(txt || `fetch error ${res.status}`);
  }
  const json = await res.json();
  const photos = (json?.photos ?? []) as PinterestImage[];
  const hasNext = Boolean(json?.next_page);
  return { photos, hasNext, fetchedAt: Date.now() };
}

export async function fetchWithCache(p: FetchParams, signal?: AbortSignal): Promise<CacheEntry> {
  const key = toKey(p);
  const hit = cache.get(key);
  if (hit) return hit;

  const inprog = inflight.get(key);
  if (inprog) return inprog;

  const promise = (async () => {
    try {
      const entry = await fetchFromNetwork(p, signal);
      cache.set(key, entry);
      return entry;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}

export function prefetchWithCache(p: FetchParams) {
  fetchWithCache(p).catch(() => {});
}

export function clearImageCache() {
  cache.clear();
  inflight.clear();
}

