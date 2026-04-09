# AI Support Chat — Milestones

**Date:** April 9, 2026
**Participants:** Roman Paraschak, Jakob Holm Hansen, Andreea Bagu

---

## Milestone 1: Deploy to Test Environment

**Goal:** AI chat is functional on the test environment — buttons work, responses come back, ratings can be submitted.

**Scope:**
- Global chat button on every page; clicking it toggles the chat widget
- User can send a message and receive an AI response
- User can leave a star rating (1–5) at any time
- Internal admin tool where team can view all chats and all ratings

**Success criteria:** Someone can open the chat, have a conversation, rate it, and an admin can see all of that in the internal tool. Quality of AI responses is **not** evaluated here — only that everything is functional.

**Owner:** Roman

---

## Milestone 2: Internal Quality Testing

**Goal:** Evaluate the quality of AI responses and overall usability with an internal testing group.

**Owners:** Jakob + Andreea (product side), Roman (coordination/technical side)

**Testers:** Support team, Andreea, Sona, Jakob, Lona, Bo, Roman — anyone who knows the application well.

**Plan:**
- Define a testing period (1–3 weeks, TBD)
- Prepare short onboarding / instructions document describing what to test and what we expect (not random questions)
- Create a communication channel (e.g. Teams/Slack chat) so testers can easily report feedback without confusion
- Reporting split:
  - **Chat quality / conversation feedback** → Jakob & Andreea (they decide how to react)
  - **Software bugs / technical issues** → Bo or Roman (or Andreea via the centralized AI Chat epic)
- Improvements and suggestions tracked in the existing AI Chat epic; bugs can be created there too

**Expected output:** Feedback on answer quality, UX pain points, bug reports, and improvement suggestions.

**Decision point at the end:** Is this good enough? Needs a small iteration? Or back to the drawing board?

---

## Milestone 3: Product & UX Iteration (can overlap with Milestone 2)

**Goal:** Shape the product experience around the chat — the "exterior" of the feature (not the AI answers, but how users interact with the chat on the front end).

**Open product questions to resolve:**

- **Chat reset / new conversation** — Long chats degrade quality and speed. Need a mechanism: "New chat" button, "I'm done" action, or auto-reset after 24h inactivity.
- **Per-message rating** — Andreea's idea: show star rating under each AI response (not just a global chat rating) for more fine-grained feedback. Technically feasible.
- **Multi-chat** — Jakob recommends single chat for MVP — multi-chat adds complexity (tabs, windows) and can confuse users. Can be added later.
- **Page-aware chat** — Andreea's idea: chat remembers context per page (e.g. planning vs. compliance). Front end can send current page info to the AI. Not MVP, but technically possible. Tagged chats with filtering — future phase.
- **Chat history access** — If chats get reset, users lose visible history. Need UI to navigate back to previous conversations (data is always in the DB).
- **Markdown formatting** — AI responds in markdown. Instructions can control style (e.g. no bullet points, use arrows). Easy to adjust.

**Approach:** Jakob & Andreea shape the product vision; Roman's team builds quick prototypes to test ideas. Throw away what doesn't work. This track can start before Milestone 2 ends.

**Owners:** Jakob & Andreea decide when the product is "good enough" to show to customers.

---

## Milestone 4: Customer Beta (optional, after M3)

**Goal:** Deploy to production for selected customers as a beta feature.

**Details:**
- Licensing system is already integrated — can control who gets access
- Pick the right customers with support team's help
- Clear communication: "This is a beta feature, treat answers accordingly"
- Risk: Milestone 3 running too long delays this. Jakob & Andreea must make a go/no-go call.

**Owner:** Jakob & Andreea (go/no-go decision), Support team (customer selection)

---

## Action Items

- **Roman** — Push Milestone 1 to completion; keep eye on test deployment
- **Roman** — Improve prototyping platform for frictionless idea generation
- **Andreea** — Once M1 is on test: inform testers, create communication channel
- **Jakob & Andreea** — Prepare testing instructions document for Milestone 2
- **Jakob & Andreea** — Work on product vision / UX decisions during Milestone 2–3
- **Roman** — Notify team when chat is deployed to test environment
