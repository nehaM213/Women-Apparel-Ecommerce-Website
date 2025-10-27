'use client';
import { useEffect } from 'react';

export default function ClientChunkReload() {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      if (event?.message?.includes('Loading chunk') || event?.message?.includes('ChunkLoadError')) {
        console.warn('Chunk load failed, reloading...');
        window.location.reload();
      }
    };

    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  return null;
}
