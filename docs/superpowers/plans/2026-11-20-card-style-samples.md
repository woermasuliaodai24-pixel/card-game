# Card Style Samples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate four directly comparable preview images that each show a standard card and a Boss display card in a distinct original visual style.

**Architecture:** Use one built-in ImageGen call per visual direction so each prompt can strongly control its own materials and rendering language. Keep subject matter, layout, information hierarchy, and comparison criteria fixed across all calls; inspect each output before presenting all four together.

**Tech Stack:** Built-in `image_gen` tool, Codex image inspection, Markdown inline image rendering.

## Global Constraints

- This card game is independent from the temple game; do not reuse its theme, worldbuilding, or assets.
- Produce four preview-only landscape images.
- Every image shows the same young sword-bearing starfire guardian on a standard vertical card at left and the same horned abyss beast on a larger Boss display card at right.
- Reserve visual zones for cost, name, attack, defense, abilities, Boss phase, health, and two Boss skill icons without rendering readable text.
- No existing IP, brand, logo, signature, watermark, random lettering, dense small text, cropped card edges, or busy background.
- Preview outputs may remain in the built-in generated-images location; do not copy them into the project until the user chooses a direction.

---

### Task 1: Generate Classic Fantasy Sample

**Files:**
- Read: `docs/superpowers/specs/2026-11-20-card-style-samples-design.md`
- Output: built-in ImageGen preview, rendered inline as `A — 经典奇幻`

**Interfaces:**
- Consumes: fixed subject and layout from Global Constraints.
- Produces: one landscape preview with a bronze-and-gem classic fantasy card family.

- [ ] **Step 1: Generate the image with the exact prompt**

```text
Use case: stylized-concept
Asset type: card-game visual direction comparison sheet, preview only
Primary request: Create one polished landscape concept image showing two complete collectible-game UI objects side by side: at left a standard vertical character card for an original young guardian holding a short sword with subtle starfire energy; at right a larger, wider Boss display card for an original gigantic horned abyss beast with a glowing core. Both must clearly belong to the same classic fantasy card family.
Scene/backdrop: simple dark blue studio-like backdrop with faint atmospheric light, no scenery competing with the cards
Style/medium: premium hand-painted fantasy illustration, engraved bronze frame, deep blue enamel, amber gemstones, subtle wear, symmetrical heraldic ornament
Composition/framing: 3:2 landscape; standard card fully visible on the left; Boss display fully visible on the right and about 30 percent larger, with thicker crown-like upper frame
Lighting/mood: warm amber rim light, heroic on the guardian, ominous on the Boss
Information layout: clear empty visual zones for cost, nameplate, attack, defense and ability panel; Boss has a large segmented health area, phase badge and two skill icon sockets
Constraints: use symbols and blank plates only; no readable words or letters; no existing IP; no logo; no watermark; all card edges visible
Avoid: cropped cards, illegible microtext, random glyph strings, cluttered background, photorealistic hands holding cards
```

- [ ] **Step 2: Inspect against the shared comparison criteria**

Expected: both complete card objects are visible; the guardian and Boss match the fixed subjects; bronze, deep blue, and amber materials dominate; standard and Boss layouts are distinguishable but related.

- [ ] **Step 3: If one criterion fails, make one targeted regeneration**

Repeat the prompt with exactly one corrective sentence appended, such as: `Correction: pull the camera back so every outer card edge is visible with generous margin.`

### Task 2: Generate Gothic Dark Sample

**Files:**
- Read: `docs/superpowers/specs/2026-11-20-card-style-samples-design.md`
- Output: built-in ImageGen preview, rendered inline as `B — 哥特暗黑`

**Interfaces:**
- Consumes: fixed subject and layout from Global Constraints.
- Produces: one landscape preview with a black-iron, bone-white, and crimson gothic card family.

- [ ] **Step 1: Generate the image with the exact prompt**

```text
Use case: stylized-concept
Asset type: card-game visual direction comparison sheet, preview only
Primary request: Create one polished landscape concept image showing two complete collectible-game UI objects side by side: at left a standard vertical character card for an original young guardian holding a short sword with subtle starfire energy; at right a larger, wider Boss display card for an original gigantic horned abyss beast with a glowing core. Both must clearly belong to the same gothic dark card family.
Scene/backdrop: restrained charcoal backdrop with soft fog and a faint crimson halo, no detailed environment
Style/medium: dramatic dark fantasy illustration, black iron and bone-white frame materials, dark crimson accents, pointed arches, thorn motifs, wax-seal shapes and abstract occult geometry that does not copy real religious symbols
Composition/framing: 3:2 landscape; standard card fully visible on the left; Boss display fully visible on the right and about 30 percent larger, with asymmetric spikes and a dangerous silhouette
Lighting/mood: strong chiaroscuro, candle-like highlights, threatening but readable
Information layout: clear empty visual zones for cost, nameplate, attack, defense and ability panel; Boss has a large crimson segmented health area, phase seal and two skill icon sockets
Constraints: use symbols and blank plates only; no readable words or letters; no existing IP; no logo; no watermark; all card edges visible
Avoid: gore, real religious emblems, cropped cards, illegible microtext, random glyph strings, cluttered background
```

- [ ] **Step 2: Inspect against the shared comparison criteria**

Expected: both cards are complete and readable; black iron, bone white, and crimson dominate; gothic pointed and thorn forms are distinct from sample A; the Boss feels more dangerous without obscuring its UI zones.

- [ ] **Step 3: If one criterion fails, make one targeted regeneration**

Append only the corrective sentence needed for the failed criterion.

### Task 3: Generate Bright Anime Sample

**Files:**
- Read: `docs/superpowers/specs/2026-11-20-card-style-samples-design.md`
- Output: built-in ImageGen preview, rendered inline as `C — 明亮动漫`

**Interfaces:**
- Consumes: fixed subject and layout from Global Constraints.
- Produces: one landscape preview with crisp cel rendering and a silver-white modular card family.

- [ ] **Step 1: Generate the image with the exact prompt**

```text
Use case: stylized-concept
Asset type: card-game visual direction comparison sheet, preview only
Primary request: Create one polished landscape concept image showing two complete collectible-game UI objects side by side: at left a standard vertical character card for an original young guardian holding a short sword with subtle starfire energy; at right a larger, wider Boss display card for an original gigantic horned abyss beast with a glowing core. Both must clearly belong to the same bright anime card family.
Scene/backdrop: clean pale blue-to-navy gradient with sparse energy streaks and generous negative space
Style/medium: premium cel-shaded anime character art, crisp linework, silver-white frames, sky-blue and golden accents, saturated but controlled energy effects, clean rounded information modules
Composition/framing: 3:2 landscape; standard card fully visible on the left; Boss display fully visible on the right and about 30 percent larger, with a dramatic character crop inside the frame while the outer frame remains complete
Lighting/mood: bright, energetic, optimistic guardian contrasted with an imposing but colorful Boss
Information layout: clear empty visual zones for cost, nameplate, attack, defense and ability panel; Boss has a wide segmented health area, bold phase emblem and two large skill icon sockets
Constraints: use symbols and blank plates only; no readable words or letters; no existing IP; no logo; no watermark; all outer card edges visible
Avoid: chibi proportions, fan-service, cropped outer frames, illegible microtext, random glyph strings, cluttered background
```

- [ ] **Step 2: Inspect against the shared comparison criteria**

Expected: crisp cel shading, silver-white modules, blue and gold energy; the same fixed subjects remain recognizable; the Boss panel is larger and more dramatic without becoming a different UI system.

- [ ] **Step 3: If one criterion fails, make one targeted regeneration**

Append only the corrective sentence needed for the failed criterion.

### Task 4: Generate Holographic Tech Sample

**Files:**
- Read: `docs/superpowers/specs/2026-11-20-card-style-samples-design.md`
- Output: built-in ImageGen preview, rendered inline as `D — 科技全息`

**Interfaces:**
- Consumes: fixed subject and layout from Global Constraints.
- Produces: one landscape preview with dark carbon, cyan, and magenta holographic card UI.

- [ ] **Step 1: Generate the image with the exact prompt**

```text
Use case: stylized-concept
Asset type: card-game visual direction comparison sheet, preview only
Primary request: Create one polished landscape concept image showing two complete collectible-game UI objects side by side: at left a standard vertical character card for an original young guardian holding a short sword with subtle starfire energy; at right a larger, wider Boss display card for an original gigantic horned abyss beast with a glowing core. Both must clearly belong to the same holographic science-fiction card family.
Scene/backdrop: minimal near-black tactical display backdrop with faint grid depth and soft scan light
Style/medium: premium sci-fi collectible card UI, matte carbon-black structure, cyan and magenta neon, translucent glass layers, luminous circuitry, hexagonal modules, restrained scan-line detail
Composition/framing: 3:2 landscape; standard card fully visible on the left; Boss display fully visible on the right and about 30 percent larger, designed as a wide tactical hologram panel
Lighting/mood: cool neon glow, precise and high-tech, red-magenta warning energy around the Boss core
Information layout: clear empty visual zones for cost, nameplate, attack, defense and ability panel; Boss has a large multi-segment health bar, warning phase marker and two hexagonal skill sockets
Constraints: use symbols and blank plates only; no readable words or letters; no existing IP; no logo; no watermark; all card edges visible
Avoid: excessive bloom, unreadable data noise, cropped cards, illegible microtext, random glyph strings, cluttered background
```

- [ ] **Step 2: Inspect against the shared comparison criteria**

Expected: carbon black, cyan, and magenta dominate; glass, circuitry, and hexagons distinguish the style; the fixed guardian and Boss subjects and shared information hierarchy remain comparable to A–C.

- [ ] **Step 3: If one criterion fails, make one targeted regeneration**

Append only the corrective sentence needed for the failed criterion.

### Task 5: Final Visual QA and Presentation

**Files:**
- Read: the four generated previews from Tasks 1–4.
- Output: one response containing all four images with labels A–D.

**Interfaces:**
- Consumes: four inspected preview images.
- Produces: a user-facing comparison set and a concise selection prompt.

- [ ] **Step 1: Compare all four images together**

Verify that the guardian, Boss, left/right layout, relative size, and information zones are consistent enough for fair comparison; confirm each style is unmistakably different.

- [ ] **Step 2: Render all four previews inline**

Present in order A, B, C, D with one-line labels and no recommendation that biases the initial selection.

- [ ] **Step 3: Ask for a selection**

Ask the user to choose one letter or request a hybrid such as `A 的边框 + C 的角色插画 + D 的 Boss 血条`.
