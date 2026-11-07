// Adds testing functions like .toHaveClass, .toBeInTheDocument
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// jsdom has no layout and lacks these two browser APIs, so every test gets a
// fresh stub. A test can change one (for example reduced motion) without the
// change leaking into the next
beforeEach(() => {
  Element.prototype.scrollTo = vi.fn();
  window.matchMedia = vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

// Only auto-cleans up if 'afterEach' is global.
// Using explicit imports so need to manually clean up
afterEach(() => {
  cleanup();
});
