import type { WhyChooseUsItem } from './WhyChooseUsSection';

interface WhyChooseUsCardProps {
  item: WhyChooseUsItem;
}

// The card is not a link, so it has lift (rises on hover, hover devices only,
// motion.css) but no press and no colour change, which would suggest a click.
// lift only sets the target, so the card eases the rise itself, like the
// ServiceCard icon. relative + isolate make the card the anchor for the two
// absolute decorations and keep the -z-10 wedge behind the text instead of
// behind the card. overflow-clip (not hidden) cuts the wedge at the card edge
// and leaves the stripe's scroll timeline on the page
const CARD_STYLES =
  'lift border-border bg-background relative isolate flex flex-col overflow-clip rounded-lg border p-6 motion-safe:transition-transform motion-safe:duration-(--motion-base) motion-safe:ease-(--ease-settle)';

// Skewed accent panel behind the icon. Its colour is a tint (bg-accent/10), never
// opacity-*: a permanently faded element would trip the "nothing left faded" guard
const WEDGE_STYLES =
  'pointer-events-none absolute inset-y-0 left-0 -z-10 w-24 origin-top-left -skew-x-12 bg-accent/10';

// Short racing stripe on the top edge, over the icon. A real element because
// stripe-draw animates the element itself, and it draws out from its left end
const STRIPE_STYLES =
  'stripe-draw absolute top-0 left-6 h-1 w-10 origin-left -skew-x-12 bg-accent';

// One reason to choose us: icon, title and description, always visible.
// The section wraps it in the list item that does the scroll reveal
export function WhyChooseUsCard({ item }: WhyChooseUsCardProps) {
  const { icon: Icon, title, description } = item;

  return (
    <div className={CARD_STYLES}>
      <span aria-hidden="true" className={WEDGE_STYLES} />
      <span aria-hidden="true" className={STRIPE_STYLES} />
      <Icon aria-hidden="true" className="text-accent size-10" />
      <h3 className="text-foreground mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-muted mt-2 text-sm">{description}</p>
    </div>
  );
}
