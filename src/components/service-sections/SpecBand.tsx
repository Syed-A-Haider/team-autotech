import type { ServiceSection } from '@/types/service';

interface SpecBandProps {
  section: Extract<ServiceSection, { type: 'specband' }>;
}

// Key facts as label/value pairs
export function SpecBand({ section }: SpecBandProps) {
  return (
    <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {section.specs.map((spec) => (
        <div
          key={spec.label}
          className="border-border bg-surface rounded-lg border p-6"
        >
          <dt className="text-muted text-sm">{spec.label}</dt>
          <dd className="text-foreground mt-1 text-xl font-semibold">
            {spec.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
