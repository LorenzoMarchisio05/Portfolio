# Website projects

One folder per project. The folder name is the id: readable, used for the
gallery card's anchor and the `ref` on the contact link. Never rename a
published one.

The page's URL comes from `slug:` instead, an opaque GUID
(`/websites/gallery/c3cf5fb4-b1b0-4e12-a5a4-079a42a6b609`), so a client's name
is never in a link. Generate one per project and never change it after the page
is published:

```bash
uuidgen | tr 'A-Z' 'a-z'
```

```
cafe-nord/
├── project.yaml
├── desktop.webp   1440 × 900, above the fold
├── mobile.webp    390 × 844 at 2×, above the fold
└── menu.webp      one screenshot per story section, any width
```

Screenshots ship as-is (no image pipeline on the Cloudflare build), so save
them as WebP. The schema lives in `src/content.config.ts`; the build fails on
anything it rejects.

The gallery lists the cards; each card links to the project's own page, which
carries the facts and the story.

## Who the story is for

A business owner deciding whether to hire me. Not an engineer, not a recruiter.
They are asking one question: *would a site like this bring me more customers?*

So the story sells the **site**, not the build. Write what a visitor of that
site gets and what the owner no longer has to do. The stack is already on the
page as one grey line generated from `stack:` — that is the whole technical
disclosure the page needs.

Rule of thumb: if a sentence would not make sense read aloud to the client,
rewrite it. Tool names (Astro, WebP, Resend, Cloudflare), file formats, build
steps, "static", "structured data", "endpoint", "cache" — all out of the prose.
Say what they do instead:

| Not this | This |
| --- | --- |
| Photos converted to WebP with thumbnails at build time | The gallery appears in about a second, even on phone data |
| Prerendered static HTML on Cloudflare's edge | Every page is finished before anyone asks for it, so it opens quickly |
| Form posts to a server route and sends through Resend | The form reaches the owner's inbox in seconds |
| Menu content comes from one YAML file | The owner changes the menu in one place, in a minute, from a phone |
| Structured data and canonical URLs generated per page | Google shows the right name, address and hours |

Keep numbers, they are the most convincing thing on the page — a second, 132
photographs, 7 days, two languages — but only ones that are true and checkable.

## Writing each field

**`text.summary`** (≤200 chars, shown on the gallery card and as the page's
lead). What the site is and who it is for, in one breath. No build words.

**`text.before`** (one or two sentences, the "Before" column). Where the
business was when they came: what they had, and the specific thing it cost
them. A reader should recognise their own situation here. State the facts, do
not mock the old site.

**`text.built`** (3–5 bullets, the "What was built" column). One short line
per thing the business now has. Outcomes, not deliverables: "A menu the owner
updates in a minute" beats "Weekly menu section". Each bullet under ~14 words,
no full stop.

**`text.sections`** (2–5, the numbered chapters under "Inside the site"). The
show-off. One chapter per part of the site actually worth looking at — the
thing that makes this site better than the neighbour's. Do not cover
everything; a chapter with no screenshot and nothing to brag about should not
exist.

Each chapter:

- `title` — the benefit, not the feature. Plain language, ≤8 words, no colon
  ("Prices in the open, before anyone has to ask", not "Pricing architecture").
- `body` — one or two paragraphs, 2–4 sentences each. First paragraph: what a
  visitor gets, from the visitor's side of the screen. Second (optional): what
  the owner gets, or why it keeps working without anyone minding it.
- `image` + `alt` — one screenshot of exactly the part being described, wide
  enough to read. `alt` describes the picture for someone who cannot see it
  (what is on screen, not why it matters); the schema rejects an image without
  it. A chapter may have no image, but then the writing carries it alone — keep
  that one last.

**`text.alt.desktop` / `.mobile`** — the two hero screenshots, same rule. For
a concept, start the sentence with "Concept:".

**`text.seo.title`** (≤60 chars) / **`.description`** (≤155). What someone
sees in Google. Title: business name · what the site is. Description: the one
sentence that earns the click, in the same plain language as the story. Both
fall back to the page's own title and the summary when left out.

**`results`** — only measured numbers, each with `measuredAt` and the `source`
that can be checked ("Google Business Profile", "the owner's till"). Never an
estimate. Concepts cannot have them.

**`testimonial`** — word for word, with written permission, never invented.

## Fields that are not prose

```yaml
slug: 6b1f0b8e-6d8f-4a9e-9a1b-2c4d5e6f7a80   # uuidgen, never changed
status: concept            # live | concept | archived
clientName: Café Nord
category: Café
location: { city: Leuven, country: Belgium }
package: launch
languages: [en, nl]
integrations: [Google Business Profile]
stack: [Astro, Cloudflare Pages]    # rendered as one "Built with:" line
conceptUrl: https://cafe-nord.concepts.lorenzomarchisio.me
deliveryDays: 7
featured: true
order: 1
screenshots:
  desktop: ./desktop.webp
  mobile: ./mobile.webp
```

`status`, `package`, `languages`, `deliveryDays` and `launchedAt` become the
facts table beside the title, so they are the claims that must match reality.

A GUID URL tells search engines nothing about the project, which is the trade
for keeping the client's name out of the link. The page's title, description
and heading still carry the name, and those are what ranks.

Only publish what you have permission for. A concept for a real business needs
its written yes (name, logo, photos); otherwise use a made-up business. Set
`consent` to match what was agreed.

The studio page shows the first `FEATURED_COUNT` (3) projects with
`featured: true`. Until three are featured, "Selected work" shows the ones that
are, and it is hidden while there are none.
