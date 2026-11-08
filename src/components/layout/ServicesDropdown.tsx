import { ServicesDropdownLink } from './ServicesDropdownLink';
import type { ServiceCategories } from '@/types/service';
import clsx from 'clsx';
import { serviceHref } from '@/lib/routes';

interface ServicesDropdownProps {
  categories: ServiceCategories;
}

// Named group: the nav already has an unnamed one that holds the dropdown open
const rowClasses =
  'group/row text-foreground hover:bg-background hover:text-accent flex items-start gap-2 rounded-md px-2 py-2 text-sm motion-safe:transition-colors motion-safe:duration-150';

// underline-draw (motion.css) under the title only. The row sets --underline,
// so the line also draws when the pointer is on the icon or the Popular tag
const rowTitleClasses =
  'underline-draw leading-snug group-hover/row:[--underline:1] group-focus-visible/row:[--underline:1]';

// Mega-menu panel for Navbar's Services
// Visibility is CSS-only - group-hover/group-focus-within on parent in Navbar.tsx
// Positioned against the nav's content row (see 'relative' on Navbar.tsx), so it spans
// the full logo-to-CTA width instead of centering under the Services button
export function ServicesDropdown({ categories }: ServicesDropdownProps) {
  const dropdownPanelClasses = clsx(
    'invisible absolute inset-x-4 top-full translate-y-2 opacity-0',
    'group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100',
    'group-hover:visible group-hover:translate-y-0 group-hover:opacity-100',
    'motion-safe:transition motion-safe:duration-150',
  );

  return (
    <div className={dropdownPanelClasses}>
      {/* Five columns. Rows are shared (subgrid) so the lists start level even
          when one heading wraps to two lines. Tighter at lg, roomier from xl */}
      <div className="border-border bg-surface grid grid-cols-5 grid-rows-[auto_1fr] gap-x-5 gap-y-3 rounded-xl border p-6 shadow-xl xl:gap-x-8 xl:p-8">
        {/* Map each category to a title and list of services */}
        {Object.entries(categories).map(([category, services]) => (
          <div key={category} className="row-span-2 grid grid-rows-subgrid">
            <h3 className="text-muted self-end text-xs font-semibold tracking-wide uppercase">
              {category}
            </h3>

            <ul className="space-y-1">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.slug}>
                    {/* Each service will point to specific url (determined by their slug) */}
                    <ServicesDropdownLink
                      href={serviceHref(service.slug)}
                      className={rowClasses}
                    >
                      {/* Structure of each line = Icon followed by name, followed by conditional popular tag */}
                      <Icon
                        aria-hidden="true"
                        size={16}
                        className="text-muted mt-0.5 shrink-0"
                      />
                      <span className={rowTitleClasses}>{service.title}</span>

                      {/* If featured - render a popular tag */}
                      {service.popular && (
                        <span className="bg-accent/15 text-accent ml-auto shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium">
                          Popular
                        </span>
                      )}
                    </ServicesDropdownLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
