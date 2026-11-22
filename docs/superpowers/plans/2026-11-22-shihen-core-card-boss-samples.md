# Shihen Core Card and Boss Samples Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate and save three coherent core card samples and one MVP Boss display sample for 《时痕》.

**Architecture:** Use four separate built-in ImageGen calls so each asset receives enough visual detail while sharing one local style reference and one material language. Inspect every result, make at most one targeted correction per failed asset, then copy the accepted PNG files into the project and perform a final family-consistency review.

**Tech Stack:** Built-in `image_gen`, local image inspection, Git.

## Global Constraints

- Reference image: `C:\Users\Lenovo\AppData\Local\Temp\codex-clipboard-89d6d3bf-eb03-4fca-ad6f-50abfd71977c.png`.
- The reference controls only frame family, materials, polish and information hierarchy; do not copy its characters or monster.
- Use deep blue enamel, engraved aged bronze-gold, amber gems and premium hand-painted dark fantasy art.
- Replace generic star motifs with original time-and-causality motifs: concentric time rings, broken clock divisions, reverse trails and causal nodes.
- Show every outer frame edge with generous margin.
- Use blank nameplates, symbols and geometric placeholders; no readable words, random letters, brand, signature or watermark.
- Final directory: `assets/concepts/shihen-core-set/`.
- Final filenames: `time-reversal.png`, `perfect-parry.png`, `delayed-burst.png`, `boss-destroyer.png`.

---

### Task 1: Generate Time Reversal

**Files:**
- Read: `docs/superpowers/specs/2026-11-22-shihen-core-card-boss-samples-design.md`
- Create: `assets/concepts/shihen-core-set/time-reversal.png`

**Interfaces:**
- Consumes: the shared style reference and Global Constraints.
- Produces: the visual anchor for the three-card family.

- [ ] **Step 1: Generate the portrait card**

Use the built-in ImageGen tool with the reference image and this prompt:

```text
Use case: stylized-concept
Asset type: standalone portrait card-game concept asset
Input image role: visual style, frame material and UI hierarchy reference only; create an entirely original character, action and time-themed ornament
Primary request: Create one complete vertical legendary card named conceptually “Time Reversal” for the original game Shihen. An original time wielder has just been wounded and reverses causality: crimson damage trails run backward around a fractured clock ring and converge into luminous blue-gold counterattack energy. The art must communicate recorded harm becoming healing and retaliation.
Style/medium: premium hand-painted dark fantasy illustration; deep blue enamel; engraved aged bronze-gold; amber gemstone; subtle material wear
Composition/framing: one isolated complete portrait card centered on a restrained midnight-blue studio backdrop; every outer edge visible with generous margin; character centered inside concentric broken time rings; strong red-past versus blue-gold-present contrast
Information layout: amber cost socket; blank nameplate; four geometric action timing segments for startup, active, recovery and cancel; large blank rules panel; two bottom stat sockets
Constraints: replace generic stars with time divisions and causal-node ornaments; blank plates and symbols only; no readable text; no random letters; no logo; no watermark; do not copy the reference character
Avoid: extra cards, hands holding the card, cropped frame, crowded background, excessive visual noise
```

- [ ] **Step 2: Inspect the result**

Pass when one full vertical card is visible, time reversal reads clearly, and all UI zones remain legible. If it fails, regenerate once with one correction sentence addressing only the failure.

- [ ] **Step 3: Save the accepted PNG**

Copy the generated output to `assets/concepts/shihen-core-set/time-reversal.png` without overwriting an unrelated file.

### Task 2: Generate Perfect Parry

**Files:**
- Read: `assets/concepts/shihen-core-set/time-reversal.png`
- Create: `assets/concepts/shihen-core-set/perfect-parry.png`

**Interfaces:**
- Consumes: the same reference and the accepted family language from Task 1.
- Produces: a precise defensive-action card in the same family.

- [ ] **Step 1: Generate the portrait card**

```text
Use case: stylized-concept
Asset type: standalone portrait card-game concept asset
Input image role: visual style, frame material and UI hierarchy reference only; create an entirely original swordsman and action
Primary request: Create one complete vertical action card named conceptually “Perfect Parry” for the original game Shihen. An original calm swordsman catches a gigantic incoming weapon at the exact instant two clock hands align. The blade contact emits a narrow frozen ring of sparks and a razor-thin luminous timing window, communicating precision, interruption and immediate counterattack.
Style/medium: premium hand-painted dark fantasy illustration; same deep blue enamel and engraved aged bronze-gold family; cool blue gem accents
Composition/framing: one isolated complete portrait card centered on a restrained midnight-blue studio backdrop; every outer edge visible; weapon contact point near the upper golden-ratio area; clear silhouette and controlled effects
Information layout: blue cost socket; blank nameplate; short startup segment, extremely narrow bright active/parry segment and short cancel segment; blank rules panel; defense and counterattack sockets
Constraints: original character; clock divisions and causal-node ornaments; blank plates and symbols only; no readable text; no random letters; no logo; no watermark
Avoid: extra cards, copied reference character, cropped frame, muddy weapon silhouettes, broad shield blocking the action
```

- [ ] **Step 2: Inspect and save**

Pass when the exact parry instant and narrow timing window are obvious and the frame matches Task 1. Make at most one targeted correction, then save as `assets/concepts/shihen-core-set/perfect-parry.png`.

### Task 3: Generate Delayed Burst

**Files:**
- Read: `assets/concepts/shihen-core-set/time-reversal.png`
- Create: `assets/concepts/shihen-core-set/delayed-burst.png`

**Interfaces:**
- Consumes: the same reference and accepted family language.
- Produces: a delayed-action card differentiated by amber-violet energy.

- [ ] **Step 1: Generate the portrait card**

```text
Use case: stylized-concept
Asset type: standalone portrait card-game concept asset
Input image role: visual style, frame material and UI hierarchy reference only; create an original magical event
Primary request: Create one complete vertical action card named conceptually “Delayed Burst” for the original game Shihen. A volatile amber explosion core is suspended inside several concentric time nodes while transparent future echoes show the blast expanding at later moments. Violet-blue temporal restraints hold the present scene unnaturally still, communicating planned delayed damage.
Style/medium: premium hand-painted dark fantasy illustration; same deep blue enamel and engraved aged bronze-gold family; amber core with restrained violet-blue time energy
Composition/framing: one isolated complete portrait card centered on a restrained midnight-blue studio backdrop; every outer edge visible; suspended core centered with three clearly ordered future echoes and a clean silhouette
Information layout: violet-blue cost socket; blank nameplate; three delay-countdown nodes followed by one bright future activation segment; blank rules panel; damage socket
Constraints: no character required; clock divisions and causal-node ornaments; blank plates and symbols only; no readable text; no random letters; no logo; no watermark
Avoid: extra cards, ordinary fireball composition, cropped frame, chaotic explosion filling the UI, crowded background
```

- [ ] **Step 2: Inspect and save**

Pass when the delayed future sequence reads without text and the frame matches Tasks 1–2. Make at most one targeted correction, then save as `assets/concepts/shihen-core-set/delayed-burst.png`.

### Task 4: Generate Boss Destroyer

**Files:**
- Read: `assets/concepts/shihen-core-set/time-reversal.png`
- Create: `assets/concepts/shihen-core-set/boss-destroyer.png`

**Interfaces:**
- Consumes: the family materials and motifs from the three card assets.
- Produces: a wider, heavier Boss UI panel for the MVP encounter.

- [ ] **Step 1: Generate the landscape Boss panel**

```text
Use case: stylized-concept
Asset type: standalone landscape Boss display panel for a card action game
Input image role: visual style, frame material and UI hierarchy reference only; create an entirely original Boss
Primary request: Create one complete wide Boss display for the original Shihen Boss conceptually called “The Destroyer”. A colossal black-iron armored monster with a crown-like horned helmet and a cracked molten-gold time core in its chest raises an impossibly heavy execution weapon. Multiple slow ghosted weapon positions and broken clock divisions telegraph a long startup heavy attack; crimson fracture trails suggest the bleed status. The creature must feel slow, learnable and overwhelmingly powerful rather than random.
Style/medium: premium hand-painted dark fantasy illustration; deep blue enamel Boss frame; thicker engraved aged bronze-gold crown structure; amber and molten-gold core; restrained crimson danger accents
Composition/framing: one isolated complete landscape Boss panel centered on a dark midnight-blue studio backdrop; all frame edges visible; Boss fills the upper artwork area; lower UI remains unobstructed
Information layout: blank wide nameplate; large segmented crimson health bar; one phase emblem; two large skill sockets showing heavy strike and fracture symbols; two status sockets; large blank mechanic panel
Constraints: replace generic stars with broken clock and causal-node ornaments; blank plates and symbols only; no readable text; no random letters; no logo; no watermark; original monster not copied from the reference
Avoid: extra cards, demon cliché with exposed gore, cropped frame, tiny Boss, UI hidden by effects, busy scenery
```

- [ ] **Step 2: Inspect and save**

Pass when the complete wide panel, heavy attack telegraph, cracked time core, health bar and two skill sockets are clear. Make at most one targeted correction, then save as `assets/concepts/shihen-core-set/boss-destroyer.png`.

### Task 5: Final Visual QA and Commit

**Files:**
- Inspect: `assets/concepts/shihen-core-set/*.png`

**Interfaces:**
- Consumes: all four generated assets.
- Produces: one coherent, reviewable concept set.

- [ ] **Step 1: Inspect all four images together**

Verify complete frames, consistent materials, distinct mechanics, no readable gibberish, no watermarks and a clearly larger Boss hierarchy.

- [ ] **Step 2: Verify files**

Run:

```powershell
Get-ChildItem assets\concepts\shihen-core-set\*.png | Select-Object Name,Length
```

Expected: exactly four non-empty PNG files with the specified stable names.

- [ ] **Step 3: Commit the accepted set**

```powershell
git add assets/concepts/shihen-core-set docs/superpowers/plans/2026-11-22-shihen-core-card-boss-samples.md
git commit -m "art: add Shihen core card and boss concepts"
```
