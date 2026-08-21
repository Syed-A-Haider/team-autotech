// Adds testing functions like .toHaveClass, .toBeInTheDocument
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Only auto-cleans up if 'afterEach' is global.
// Using explicit imports so need to manually clean up
afterEach(() => {
  cleanup();
});
