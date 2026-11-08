import clsx from 'clsx';
import { SHOP_LABEL, SHOP_TAG, SHOP_TAG_SR } from '@/lib/constants';

interface ShopLabelProps {
  className?: string;
}

// Same pill shape as the "Popular" tag in the dropdown, but outlined and muted.
// Accent colour would make a dead item look clickable
const tagClasses =
  'border-border text-muted rounded-full border px-1.5 py-0.5 text-[10px] font-medium';

// Status label for the shop, which is not built yet (Phase 8). Deliberately not
// a link or button: no role, no tabindex, no hover or press. Colour is a token,
// never opacity, so the faded-element guard stays honest
export function ShopLabel({ className }: ShopLabelProps) {
  return (
    <span
      className={clsx(
        'text-muted flex cursor-default items-center gap-2',
        className,
      )}
    >
      {SHOP_LABEL}
      {/* Screen readers get the status as text after the label */}
      <span className="sr-only">{SHOP_TAG_SR}</span>
      {/* The visible tag is hidden from them so the status is not read twice */}
      <span aria-hidden="true" className={tagClasses}>
        {SHOP_TAG}
      </span>
    </span>
  );
}
