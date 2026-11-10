// Copy guard (T6.6). Reads the wording of every service page and fails on the
// risky claims the content standard bans (docs/content/_standard.md).
// Nothing here is exported: only this file uses it.
import { describe, it, expect } from 'vitest';
import { Zap } from 'lucide-react';
import type { Service } from '@/types/service';
import { getAllServices } from './services';

type StringRuleId =
  | 'price'
  | 'figure'
  | 'accreditation'
  | 'guarantee'
  | 'turnaround'
  | 'emissions-removal'
  | 'legal'
  | 'voice'
  | 'superlative'
  | 'us-spelling';

// Two rules look at more than one string, so they are not in COPY_RULES
type RuleId = StringRuleId | 'place' | 'short-description-length';

interface CopyString {
  path: string; // e.g. sections[2].items[0].answer
  text: string;
}

interface CopyRule {
  id: StringRuleId;
  why: string;
  find: (text: string) => string[]; // every offending piece of the text
}

interface CopyIssue {
  slug: string;
  path: string;
  rule: RuleId;
  match: string;
}

// A phrase one page is allowed to keep for one rule. Every entry is approved and
// the note says on what basis. Haider must OK a new entry.
interface AllowedCopy {
  slug: string;
  rule: RuleId;
  phrase: string;
  status: 'approved';
  note: string;
}

// Keys that hold structure or media, not words a visitor reads
const NON_COPY_KEYS = new Set([
  'type',
  'layout',
  'videoId',
  'posterImage',
  'icon',
]);

const SHORT_DESCRIPTION_MIN = 70;
const SHORT_DESCRIPTION_MAX = 150;
// How close a removal word must sit to DPF, EGR or AdBlue to count
const EMISSIONS_WINDOW_WORDS = 6;
const MAX_PLACE_MENTIONS = 1;

// Patterns never carry the g flag: a g regex remembers lastIndex between calls.
// byPattern makes its own global copy to list every match.
function byPattern(pattern: RegExp): (text: string) => string[] {
  const global = new RegExp(pattern.source, `${pattern.flags}g`);
  return (text) => Array.from(text.matchAll(global), (match) => match[0]);
}

// DPF, EGR or AdBlue near a removal word (either side), or "off" straight after it
const EMISSIONS_TERMS = new Set(['dpf', 'egr', 'adblue']);
const EMISSIONS_REMOVAL_WORD = /^(?:remov|delet|disabl|bypass|blank)/;

function emissionsMatches(text: string): string[] {
  // "Ad Blue" and "Ad-Blue" count as AdBlue. Words only, so DPF/EGR splits in two
  const words =
    text
      .toLowerCase()
      .replace(/\bad[\s-]?blue\b/g, 'adblue')
      .match(/[a-z0-9]+/g) ?? [];

  return words.flatMap((word, index) => {
    if (!EMISSIONS_TERMS.has(word)) return [];
    const nearby = words.slice(
      Math.max(0, index - EMISSIONS_WINDOW_WORDS),
      index + EMISSIONS_WINDOW_WORDS + 1,
    );
    const removal = nearby.find((other) => EMISSIONS_REMOVAL_WORD.test(other));
    if (removal) return [`${word} + ${removal}`];
    return words[index + 1] === 'off' ? [`${word} + off`] : [];
  });
}

const COPY_RULES: CopyRule[] = [
  {
    id: 'price',
    why: 'Prices need Syd. Quotes come by Call or WhatsApp',
    find: byPattern(/£|\bGBP\b/i),
  },
  {
    id: 'figure',
    why: 'No power, torque, MPG or percentage figures unless Syd gives them',
    find: byPattern(
      /\d+(?:[.,]\d+)?\s*(?:%|(?:per\s?cent|hp|bhp|ps|kw|nm|lb-?ft|mpg|mph)\b)/i,
    ),
  },
  {
    id: 'accreditation',
    why: 'No accreditations or approvals beyond titles Syd gave',
    find: byPattern(
      /\b(?:approv|accredit|certifi(?:ed|cation)|official|authori[sz]|thatcham)\w*/i,
    ),
  },
  {
    id: 'guarantee',
    why: 'No guarantees or warranties unless Syd confirms them',
    find: byPattern(/\b(?:guarant|warrant)\w*/i),
  },
  {
    id: 'turnaround',
    why: 'No turnaround or fitting times unless Syd gives them',
    find: byPattern(
      /\bsame[- ]day\b|\bwhile you wait\b|\ban hour\b|\b\d+\s*(?:hours?|hrs?|minutes?|mins?|days?|weeks?)\b/i,
    ),
  },
  {
    id: 'emissions-removal',
    why: 'Nothing about removing or switching off emissions equipment',
    find: emissionsMatches,
  },
  {
    id: 'legal',
    why: 'No legal or compliance claims',
    find: byPattern(
      /\bMOT[- ]pass|\broad[- ]legal\b|\bemissions[- ]compliant\b/i,
    ),
  },
  {
    id: 'voice',
    why: 'Banned words and the em dash (see the voice rules)',
    // — is the em dash
    find: byPattern(
      /—|\b(?:cheapest|unleash|elevat|seamless|look no further|best in the UK)\w*/i,
    ),
  },
  {
    id: 'superlative',
    why: 'No "best", "leading" or "most advanced" claims we cannot prove',
    find: byPattern(
      /\b(?:market[- ]leading|industry[- ]leading|most advanced|UK['’]s leading|number one|unrivalled|unbeatable|world[- ]class)\b/i,
    ),
  },
  {
    id: 'us-spelling',
    why: 'British English only',
    find: byPattern(
      /\b(?:colors?|centers?|fiber|defense|gray|tires?|aluminum|catalog|favorite)\b|\b(?:optimiz|customiz|personaliz|immobiliz|authoriz|specializ|recogniz|organiz|utiliz|maximiz|minimiz|analyz)\w*/i,
    ),
  },
];

const PLACE_NAME = byPattern(/\bNelson,?\s+Lancashire\b/i);

// Phrases a page may keep. A confirmed claim never goes on a new page.
// Every entry needs a row in docs/content/_review.md.
const ALLOWED_COPY: AllowedCopy[] = [
  // Confirmed true by Haider or Syd's own title
  {
    slug: 'scorpion-trackers',
    rule: 'accreditation',
    phrase: 'Insurance-approved GPS tracking systems',
    status: 'approved',
    note: 'Confirmed true by Haider, 2026-11-07',
  },
  {
    slug: 'ct-carbon-official-installer',
    rule: 'accreditation',
    phrase: 'CT Carbon official installer',
    status: 'approved',
    note: "Syd's own title for the service",
  },
  // Live pages, approved by default (2026-11-10): Syd reviews later. If he raises
  // an issue Haider opens a ticket, and the entry goes when the wording changes
  {
    slug: 'stage-1-tuning',
    rule: 'figure',
    phrase: '10-20%',
    status: 'approved',
    note: 'Old-site power gain, used in a feature card and the FAQ',
  },
  {
    slug: 'stage-1-tuning',
    rule: 'figure',
    phrase: '99%',
    status: 'approved',
    note: 'Old-site claim: "tune 99% of modern vehicles"',
  },
  {
    slug: 'stage-1-tuning',
    rule: 'turnaround',
    phrase: 'an hour or two',
    status: 'approved',
    note: 'Old-site fitting time, in a feature card and the FAQ',
  },
  {
    slug: 'stage-1-tuning',
    rule: 'short-description-length',
    phrase: 'Performance remapping for increased power and torque.',
    status: 'approved',
    note: '53 characters, not old-site copy',
  },
  {
    slug: 'ghost-immobiliser-ii',
    rule: 'superlative',
    phrase: 'most advanced',
    status: 'approved',
    note: 'Old-site tagline',
  },
  {
    slug: 'scorpion-x-series-immobiliser',
    rule: 'superlative',
    phrase: 'Market-leading',
    status: 'approved',
    note: 'Old-site claim',
  },
];

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Walks every string a visitor can read, with its path. Skips keys that are not
// copy by name, so a new copy field is checked by itself.
function* walkCopy(value: unknown, path: string): Generator<CopyString> {
  if (typeof value === 'string') {
    yield { path, text: value };
  } else if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      yield* walkCopy(item, `${path}[${index}]`);
    }
  } else if (typeof value === 'object' && value !== null) {
    for (const [key, child] of Object.entries(value)) {
      if (!NON_COPY_KEYS.has(key)) yield* walkCopy(child, `${path}.${key}`);
    }
  }
}

// Every string on a service: the description first, then the sections
function* copyStrings(service: Service): Generator<CopyString> {
  yield { path: 'shortDescription', text: service.shortDescription };
  yield* walkCopy(service.sections, 'sections');
}

// Blanks the allowed phrases for this page and rule before the rule runs
function withoutAllowed(
  text: string,
  slug: string,
  rule: RuleId,
  allowed: AllowedCopy[],
): string {
  return allowed
    .filter((entry) => entry.slug === slug && entry.rule === rule)
    .reduce(
      (clean, entry) =>
        clean.replace(new RegExp(escapeRegExp(entry.phrase), 'gi'), ' '),
      text,
    );
}

// A waiver for the length rule holds only while the description is exactly that
// phrase, so editing the description makes the waiver stale
function isLengthWaived(service: Service, allowed: AllowedCopy[]): boolean {
  return allowed.some(
    (entry) =>
      entry.slug === service.slug &&
      entry.rule === 'short-description-length' &&
      entry.phrase.toLowerCase() === service.shortDescription.toLowerCase(),
  );
}

function findIssues(
  service: Service,
  allowed: AllowedCopy[] = ALLOWED_COPY,
): CopyIssue[] {
  const strings = Array.from(copyStrings(service));
  const { slug } = service;

  // One string at a time: run each rule on the text left after the allowed phrases
  const stringIssues = strings.flatMap(({ path, text }) =>
    COPY_RULES.flatMap((rule) =>
      rule.find(withoutAllowed(text, slug, rule.id, allowed)).map((match) => ({
        slug,
        path,
        rule: rule.id,
        match,
      })),
    ),
  );

  // Live pages only: coming-soon one-liners restate the title until their batch
  const length = service.shortDescription.length;
  const badLength =
    service.status === 'live' &&
    (length < SHORT_DESCRIPTION_MIN || length > SHORT_DESCRIPTION_MAX) &&
    !isLengthWaived(service, allowed);
  const lengthIssues: CopyIssue[] = badLength
    ? [
        {
          slug,
          path: 'shortDescription',
          rule: 'short-description-length',
          match: `${length} characters`,
        },
      ]
    : [];

  // The place name is counted across the whole page
  const places = strings.flatMap(({ text }) => PLACE_NAME(text));
  const placeIssues: CopyIssue[] =
    places.length > MAX_PLACE_MENTIONS
      ? [
          {
            slug,
            path: 'all copy',
            rule: 'place',
            match: `${places.length} mentions`,
          },
        ]
      : [];

  return [...stringIssues, ...lengthIssues, ...placeIssues];
}

// ---- Fixtures ----

function makeService(overrides: Partial<Service> = {}): Service {
  return {
    slug: 'fixture',
    title: 'Fixture',
    category: 'Programming',
    shortDescription: 'x'.repeat(SHORT_DESCRIPTION_MIN),
    icon: Zap,
    ...overrides,
  };
}

// One of every block type, so the walker meets every shape
const ALL_BLOCKS = makeService({
  shortDescription: 'Short text',
  sections: [
    { type: 'prose', title: 'Prose title', body: ['Prose body'] },
    {
      type: 'feature',
      title: 'Feature title',
      layout: 'grid',
      features: [
        { icon: Zap, title: 'Feature name', description: 'Feature text' },
      ],
    },
    {
      type: 'steps',
      title: 'Steps title',
      steps: [{ title: 'Step name', description: 'Step text' }],
    },
    {
      type: 'specband',
      title: 'Spec title',
      specs: [{ label: 'Spec label', value: 'Spec value' }],
    },
    {
      type: 'faq',
      title: 'Faq title',
      items: [{ question: 'Faq question', answer: 'Faq answer' }],
    },
    {
      type: 'video',
      title: 'Video title',
      videoId: 'VIDEOID',
      posterImage: '/poster.jpg',
      caption: 'Video caption',
    },
  ],
});

// Strings each rule must flag, and strings it must leave alone
const RULE_CASES: {
  rule: StringRuleId;
  fails: string[];
  passes: string[];
}[] = [
  {
    rule: 'price',
    fails: ['From £499', '449 GBP'],
    passes: ['A free, no-obligation quote'],
  },
  {
    rule: 'figure',
    fails: [
      'a 10-20% gain',
      '150bhp',
      '150 bhp',
      '400Nm',
      '55 mpg',
      '30 hp',
      '12 per cent',
    ],
    passes: ['Stage 1 tuning', 'up to 20 button presses', 'better MPG'],
  },
  {
    rule: 'accreditation',
    fails: [
      'approved',
      'Insurance-approved GPS',
      'approval',
      'accredited',
      'certified',
      'certification',
      'official',
      'Officially',
      'authorised',
      'Authorized',
      'Thatcham',
      'APPROVED',
    ],
    passes: [
      'unapproved',
      'disapproved',
      'unauthorised use',
      'MOT certificate',
    ],
  },
  {
    rule: 'guarantee',
    fails: ['guarantee', 'guaranteed', 'warranty', 'warranty-safe'],
    passes: ['Every job is checked before you leave'],
  },
  {
    rule: 'turnaround',
    fails: [
      'same day',
      'same-day',
      '2 hours',
      'an hour or two',
      'while you wait',
      '3 days',
      '10 minutes',
    ],
    passes: ['Call us to book', 'Stage 1 tuning'],
  },
  {
    rule: 'emissions-removal',
    fails: [
      'DPF removal',
      'remove the EGR valve',
      'AdBlue delete',
      'delete your AdBlue system',
      'disable the DPF',
      'EGR off',
      'Ad Blue bypass',
      'DPF/EGR delete',
      'remove one two three four five DPF', // 6 words apart
    ],
    passes: [
      'DPF cleaning and regeneration',
      'Component protection removal',
      'remove one two three four five six DPF', // 7 words apart
    ],
  },
  {
    rule: 'legal',
    fails: [
      'MOT pass',
      'MOT passes first time',
      'road legal',
      'road-legal',
      'emissions compliant',
    ],
    passes: ['MOT preparation'],
  },
  {
    rule: 'voice',
    fails: [
      'the cheapest',
      'unleash your car',
      'elevate your drive',
      'seamless fit',
      'look no further',
      'best in the UK',
      'one — two', // em dash
    ],
    passes: ['cheap clones', 'one - two'],
  },
  {
    rule: 'superlative',
    fails: [
      'market-leading',
      'Industry leading',
      'the most advanced',
      "the UK's leading",
      'the UK’s leading',
      'number one',
      'unrivalled',
      'unbeatable',
      'world-class',
    ],
    passes: ['advanced diagnostics', 'a leading brand'],
  },
  {
    rule: 'us-spelling',
    fails: [
      'color',
      'center',
      'fiber',
      'defense',
      'tires',
      'optimize',
      'customized',
      'immobilizer',
    ],
    passes: [
      'colour',
      'centre',
      'fibre',
      'defence',
      'tyres',
      'optimise',
      'customised',
      'immobiliser',
      'entire',
    ],
  },
];

function hits(rule: StringRuleId, text: string): string[] {
  const found = COPY_RULES.find((candidate) => candidate.id === rule);
  return found ? found.find(text) : [];
}

// Used by the allow-list tests
const TRACKER_PHRASE = 'Insurance-approved GPS tracking systems';
const TRACKER_ENTRY: AllowedCopy = {
  slug: 'fixture',
  rule: 'accreditation',
  phrase: TRACKER_PHRASE,
  status: 'approved',
  note: 'test entry',
};

// ---- Tests ----

describe('Copy walker', () => {
  it('Yields every copy string with its path, shortDescription first', () => {
    const paths = Array.from(copyStrings(ALL_BLOCKS), ({ path }) => path);

    expect(paths).toEqual([
      'shortDescription',
      'sections[0].title',
      'sections[0].body[0]',
      'sections[1].title',
      'sections[1].features[0].title',
      'sections[1].features[0].description',
      'sections[2].title',
      'sections[2].steps[0].title',
      'sections[2].steps[0].description',
      'sections[3].title',
      'sections[3].specs[0].label',
      'sections[3].specs[0].value',
      'sections[4].title',
      'sections[4].items[0].question',
      'sections[4].items[0].answer',
      'sections[5].title',
      'sections[5].caption',
    ]);
  });

  it('Skips type, layout, video id, poster and icon', () => {
    const texts = Array.from(copyStrings(ALL_BLOCKS), ({ text }) => text);

    ['prose', 'grid', 'VIDEOID', '/poster.jpg'].forEach((skipped) => {
      expect(texts).not.toContain(skipped);
    });
  });
});

describe.each(RULE_CASES)('Copy rule: $rule', ({ rule, fails, passes }) => {
  it.each(fails)('Flags "%s"', (text) => {
    expect(hits(rule, text)).not.toEqual([]);
  });

  it.each(passes)('Leaves "%s" alone', (text) => {
    expect(hits(rule, text)).toEqual([]);
  });
});

describe('Copy rule: place', () => {
  const mention = 'Based in Nelson, Lancashire.';

  it('Flags a second mention anywhere on the page', () => {
    const service = makeService({
      sections: [{ type: 'prose', body: [mention, mention] }],
    });

    expect(findIssues(service).map((issue) => issue.rule)).toEqual(['place']);
  });

  it('Allows one mention', () => {
    const service = makeService({
      sections: [{ type: 'prose', body: [mention] }],
    });

    expect(findIssues(service)).toEqual([]);
  });
});

describe('Copy rule: short-description-length', () => {
  const lengthIssues = (length: number, status?: Service['status']) =>
    findIssues(makeService({ shortDescription: 'x'.repeat(length), status }));

  it.each([69, 151])('Flags a live description of %i characters', (length) => {
    expect(lengthIssues(length, 'live').map((issue) => issue.rule)).toEqual([
      'short-description-length',
    ]);
  });

  it.each([70, 150])(
    'Accepts a live description of %i characters',
    (length) => {
      expect(lengthIssues(length, 'live')).toEqual([]);
    },
  );

  it('Ignores a coming-soon page', () => {
    expect(lengthIssues(30, 'coming-soon')).toEqual([]);
    expect(lengthIssues(30)).toEqual([]);
  });
});

describe('Allow-list', () => {
  const tracker = makeService({
    shortDescription: `${TRACKER_PHRASE} for every vehicle.`,
  });

  it('Does not flag an allowed phrase on its own page', () => {
    expect(findIssues(tracker, [TRACKER_ENTRY])).toEqual([]);
  });

  it('Still flags the same phrase on another page', () => {
    const other = makeService({ ...tracker, slug: 'other' });

    expect(findIssues(other, [TRACKER_ENTRY]).map((i) => i.rule)).toEqual([
      'accreditation',
    ]);
  });

  it('Waives only its own rule', () => {
    const priced = makeService({
      shortDescription: `${TRACKER_PHRASE}, from £99.`,
    });

    expect(findIssues(priced, [TRACKER_ENTRY]).map((i) => i.rule)).toEqual([
      'price',
    ]);
  });

  it('Waives a length failure only while the description is unchanged', () => {
    const phrase = 'Short live line.';
    const entry: AllowedCopy = {
      ...TRACKER_ENTRY,
      rule: 'short-description-length',
      phrase,
    };

    expect(
      findIssues(makeService({ shortDescription: phrase, status: 'live' }), [
        entry,
      ]),
    ).toEqual([]);
    expect(
      findIssues(
        makeService({ shortDescription: `${phrase} Edited.`, status: 'live' }),
        [entry],
      ).map((i) => i.rule),
    ).toEqual(['short-description-length']);
  });

  // Stale entries pile up if nothing checks them
  it.each(ALLOWED_COPY)(
    'Entry for $slug ($rule) still matches its page',
    ({ slug, phrase }) => {
      const service = getAllServices().find((s) => s.slug === slug);
      const texts = service
        ? Array.from(copyStrings(service), ({ text }) => text.toLowerCase())
        : [];

      expect(service).toBeDefined();
      expect(texts.some((text) => text.includes(phrase.toLowerCase()))).toBe(
        true,
      );
    },
  );
});

// Real data. Every page, one case each. A hit names the slug, field and rule.
describe('Service copy', () => {
  it.each(getAllServices())('$slug has no risky copy', (service) => {
    expect(findIssues(service)).toEqual([]);
  });
});
