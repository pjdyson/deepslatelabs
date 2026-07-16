---
name: deepslate-weekly
description: Draft the weekly DeepSlate "Top 5" cyber-exposure newsletter for deepslatelabs.com. Use when the user asks to build, draft, or publish the weekly cyber-risk / cyber-insurance roundup. Runs a collect → dedupe → score → draft → PR pipeline over broker/reinsurer newsrooms, trade press, arXiv and named thought leaders, prioritising major loss/accumulation incidents and cyber-risk quantification methodology (NOT market/M&A or regulation). Output is a Markdown post committed to a new branch with a PR opened for review.
---

# DeepSlate Weekly — cyber-exposure newsletter

Produces one weekly blog post for **deepslatelabs.com**: my own take on the **Top 5**
cyber-exposure stories of the last 7 days, written for a cyber-insurance / cyber-risk
audience.

## Editorial lens (the whole point)

Rank stories by, in priority order:
1. **Major incidents with a loss or accumulation angle** — breaches, outages, and
   attacks where the interesting part is the financial loss, the systemic/aggregation
   exposure, or a single-point-of-failure that could hit many insureds at once.
2. **Models & methodology for quantifying cyber risk** — new frameworks, academic
   papers, catastrophe/accumulation models, datasets, actuarial approaches, tooling.

Deliberately **out of scope** (drop or heavily down-rank):
- Market / M&A / capital moves (rate changes, funding rounds, carrier launches, ILS raises).
- Regulation & policy (new rules, compliance deadlines, government mandates).
- Vendor marketing with no data or method behind it.

`sources.yaml` (next to this file) holds the source registry, the lens keywords, and
the seed thought-leader list. Read it at the start of every run.

## Site facts you must respect (verified against the repo)

- Static site on **GitHub Pages, no Jekyll**. Posts render **client-side** with
  `marked.js` (`assets/js/post-loader.js`).
- Posts are **plain Markdown in `posts/<slug>.md` with NO YAML front-matter.** All
  metadata lives in **`posts/index.json`**.
- `marked` passes inline HTML through, and `post.html` now loads **FontAwesome 6**, so
  `<i class="fa-solid fa-..."></i>` icons render inline. (If a future edit removes the
  FontAwesome `<link>` from `post.html`, icons silently won't render — re-add it.)
- The homepage blog list and the post page both read `posts/index.json`; a post that is
  not in that file is invisible even if the `.md` exists.

---

## Pipeline

Run these stages in order. Stages 1–3 are best done with the built-in `WebSearch` /
`WebFetch` tools (plus the arXiv API); no external scraping libraries are needed.

### 0. Setup
- Read `sources.yaml`. Establish the window: `[today − lookback_days, today]`.
- Confirm today's date with the user if not obvious; the post is dated to the run day.

### 1. Collect
For each source in `sources.yaml`:
- If it has an `rss` feed, `WebFetch` the feed and take items in the window.
- Otherwise `WebFetch` the landing/insights page and extract recent items in the window.
- For `academic`, query the **arXiv API** with the hint in `sources.yaml`, e.g.
  `http://export.arxiv.org/api/query?search_query=<...>&sortBy=submittedDate&sortOrder=descending&max_results=40`.
- For `thought_leaders`, check each person's `find_at` page / recent public output for
  in-lens items in the window.
- Also run 3–5 broad `WebSearch` queries to catch anything the fixed list missed, e.g.
  `cyber insurance loss estimate <this week>`, `cyber catastrophe accumulation`,
  `cyber risk quantification model paper`.

Capture per candidate: `title`, `url`, `source`, `published_date`, `raw_summary`.
Collect generously (aim for 25–50 candidates) — filtering happens later.

### 2. Dedupe
- Merge candidates covering the **same underlying event** (same breach, same paper).
  Match on entity + event, not exact headline. Keep the most authoritative / most
  detailed source as primary; keep the rest as secondary links.
- Drop anything published outside the window or already covered in a previous week's
  post (scan the most recent `posts/weekly-*.md` before drafting).

### 3. Score & select
Score each deduped candidate 0–100:
- **Lens fit (0–50):** +50 top-priority (loss/accumulation incident) or a
  quantification model/paper; +25 adjacent; ≤10 out-of-lens. Zero out pure
  market/M&A/regulation/marketing unless there's a genuine loss/method hook.
- **Materiality (0–25):** scale of loss, number of insureds/entities exposed, systemic
  reach, novelty of the method.
- **Source authority (0–15):** multiply by the source `weight` in `sources.yaml`.
- **Keyword signal (0–10):** `+` for `keywords_boost`, `−` for `keywords_penalise`.

Pick the **top 5**. Enforce **variety**: don't let all five be the same sub-theme
(e.g. five ransomware breaches). Aim for a mix across the two priority buckets — a
healthy week is roughly 3 incident/loss stories + 2 model/methodology stories, but let
the news dictate. Note the runners-up in the PR body.

### 4. Draft
Write `posts/weekly-YYYY-MM-DD.md` using the **exact format** in
`templates/post.template.md`. Per story:
- **My own punchy title** — a `##` heading, NOT the source headline. Lead the heading
  with an inline FontAwesome icon (see icon map below).
- **3–4 sentence summary** in my own words (analytic, not a press-release rehash).
- **`> **Why it matters:**`** — one line, blockquoted, the cyber-exposure takeaway.
- **Source** line, placed **below** the story: `**Source:** [Source Name](URL)`. Use the
  **publication / source name as the link label** (e.g. `[Microsoft Security Blog]`,
  `[Insurance Journal]`, `[arXiv]`) — never a generic "read more" / "read the source".
  Add secondary sources the same way, separated by ` · `.
- **Credible-source rule:** only include a story that has a credible, named source you
  actually fetched. No rumours, no unattributed aggregator claims, no story without a
  working source link. If you can't stand up a story with a named source, drop it and
  ship fewer.

Voice: sharp, opinionated, numerate, British spelling; think out loud about the
exposure/quantification angle. No hashtags, no emoji-spam, no LinkedIn artefacts.
Keep the whole post ~600–900 words.

Icon map (extend as needed — all FontAwesome 6 free solid):
| Theme | Icon markup |
|---|---|
| Major breach / incident | `<i class="fa-solid fa-triangle-exclamation"></i>` |
| Ransomware / extortion | `<i class="fa-solid fa-lock"></i>` |
| Systemic / accumulation | `<i class="fa-solid fa-diagram-project"></i>` |
| Outage / availability | `<i class="fa-solid fa-plug-circle-xmark"></i>` |
| Model / methodology | `<i class="fa-solid fa-chart-line"></i>` |
| Academic paper | `<i class="fa-solid fa-flask"></i>` |
| Data / claims | `<i class="fa-solid fa-database"></i>` |
| Supply chain | `<i class="fa-solid fa-link"></i>` |
| AI risk | `<i class="fa-solid fa-robot"></i>` |

### 5. Register the post
Add the post to `posts/index.json` (prepend, newest-first). Use the helper:
```bash
python3 .claude/skills/deepslate-weekly/scripts/update_index.py \
  --title   "DeepSlate Weekly — Cyber-Exposure Radar (Week of <Mon DD, YYYY>)" \
  --slug    "weekly-YYYY-MM-DD" \
  --file    "weekly-YYYY-MM-DD.md" \
  --date    "YYYY-MM-DD" \
  --category "Weekly Radar" \
  --excerpt "One-line teaser naming the biggest story or two."
```
The script is idempotent (replaces an entry with the same slug) and validates the JSON.

### 6. Commit & open PR
Never commit to `main`. Create a branch, commit the post + index, push, open a PR:
```bash
cd /home/pjdyson/Documents/github/deepslatelabs
git switch -c weekly/YYYY-MM-DD
git add posts/weekly-YYYY-MM-DD.md posts/index.json
git commit -m "Weekly cyber-exposure radar — week of <Mon DD, YYYY>"
git push -u origin weekly/YYYY-MM-DD
gh pr create --fill --title "Weekly cyber-exposure radar — <Mon DD, YYYY>" \
  --body "<PR body: the 5 picks with one-line rationale each, plus runners-up and any sources that were down-ranked as out-of-lens>"
```
Report the PR URL back to the user. **Do not merge** — the user reviews and merges.

---

## Refresh thought leaders (periodic research pass)
When asked to refresh sources, run a focused research pass: find people publishing
substantive cyber-risk *quantification* or *accumulation* work (broker/reinsurer chief
cyber officers, CyberCube/RMS/Kovrr model leads, WEIS/academic PIs, notable independent
analysts). Add them under `thought_leaders` in `sources.yaml` with `name`, `affiliation`,
`focus`, `find_at`, and a `weight`. Prefer people with a stable public output channel.

## Guardrails
- Facts (loss figures, entity names, dates) must trace to a fetched source — never
  invent numbers. If a figure is an estimate, say whose estimate.
- Every story must carry at least one credible, named source link, labelled with the
  source name and placed below the story. Drop any candidate you can't source.
- If fewer than 5 in-lens stories exist in the window, ship fewer and say so in the intro
  rather than padding with out-of-lens filler.
- Keep the FontAwesome `<link>` in `post.html`; the icons depend on it.
