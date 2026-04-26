'use client';

import { useEffect } from 'react';

export default function DevToolsErrorSuppressor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const handler = (event: ErrorEvent) => {
      if (
        event.error instanceof DOMException &&
        event.error.name === 'InvalidStateError' &&
        event.error.message.includes('showPopover') &&
        event.filename?.includes('react_devtools')
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener('error', handler);
    return () => window.removeEventListener('error', handler);
  }, []);

  return null;
}
