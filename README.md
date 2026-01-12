# Whisper

[Devpost](https://devpost.com/software/whispr-5msob7)

Collaborators: [@chakornk](https://github.com/chakornk), [@galileokim](https://github.com/galileokim), [@maneetdhaliwal](https://github.com/maneetdhaliwal), [@tommyxie0stu](https://github.com/tommyxie0stu)

---

## Inspiration

We wanted to recreate the addictive culture of anonymous confession pages, but make it feel more real, immediate, and personal. Instead of random anonymous posts from anywhere, we wanted a feed that feels like it’s coming from people _around you_, without exposing identities.

## What it does

Whisper is a dark, anonymous confession app where users post thoughts they’d never say out loud. Confessions are gated by proximity radius (ex. “same residence”, “nearby”, “in your city”), making posts feel personal without turning into stalking.

Posts disappear after a set amount of time, but the more popular they are (determined by number of likes), the longer they stay, so only the most relatable or insane secrets survive.

## How we built it

We built Whisper with a dark-themed, mobile-first UI and a backend that supports:

- Anonymous posting (no profiles, no followers)
- Location-based gating using proximity buckets
- Timed expiration for posts
- Engagement-based lifespan extension (popular posts live longer)

## Challenges we ran into

The hardest part was balancing anonymity with safety and relevance:

- Keeping the experience local without exposing exact location
- Designing proximity buckets that feel useful, not creepy
- Tuning post expiration so the feed stays active and fresh
- Preventing it from becoming normal “attention economy” social media

## Accomplishments that we're proud of

- Built a clean dark UI that matches the “shadow society” vibe
- Implemented proximity-gated communities and feeds
- Created a self-curating system where posts naturally disappear unless people keep them alive
- Turned confession-page culture into an interactive product

## What we learned

- Collaborating with other team members efficiently without encountering bottlenecks by delegating tasks such that each could be done in parallel without needing the other to be finished.
- Using Next.js API routes
- Creating responsive design with Tailwind CSS that provided good UX on both computer and mobile screens
- Using deck.gl to display map pins and integrating it with Google Maps

## What's next for Whisper

- Community creation and verified radius-based groups (campus/residence/neighborhood)
- “Keep” tokens to preserve posts intentionally
- Stronger moderation/reporting + safety filters
- Smarter feed ranking (recency + vibe matching, not just popularity)
- Expanding to more campuses and cities
