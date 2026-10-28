# Dayhoff / OmicsPath development plan

Updated 23 October 2026. Integration addendum to the existing “App Development Plan” chat (6ac2490d-0438-83eb-9f61-85553de44418), inspected alongside the current source. This file records implementation; it does not edit the historical chat.

## Current foundation

Preserve Dayhoff as parent brand and OmicsPath as the learning product. Retain the campaign, three synthetic workbench examples, eleven foundation checkpoints, server-side grading and progress, rewards, FASTA calculator, resource toolkit and thirteen-stage advanced roadmap. Professional tools remain previews.

## Commander BlackBurn — implemented

Original male scientist illustration: lab coat, protective glasses, holographic scientific command styling. The earlier conversation provides the approved character description but no retrievable commander image attachment; exact matching to that image remains pending its availability.

Campaign and every foundation lesson now expose Briefing, Science, Debug hint and Debrief. The same lesson content and source links power explanations; targeted hints use unanswered or incorrect checks. The commander never grants XP, changes grading, invents execution output, or treats evidence notes as validated conclusions. Mission results are invalidated when inputs change or a run fails. Lesson debriefs use actual server feedback and save/diagnostic messages.

Text is always available. Optional browser speech requires a click, can be stopped, and is cancelled when content changes or the panel unmounts. Native buttons, visible focus, descriptive image text, polite announcements, wrapping controls and mobile layouts support accessibility. No animation is needed to understand the avatar.

This release is a scripted AI character, not an open-ended generative tutor. Content is source-linked and deterministic, not independently scientifically validated. Primary Python and DESeq2 documentation was checked during integration. Expert review remains a launch requirement.

## Retained backlog from the existing plan

1. Restore beginner OS setup paths, IDE/notebook tutorials and downloadable practice files.
2. Add durable lesson notes and a personal dashboard; campaign notes currently last only for the session.
3. Expand toward the proposed thirty lessons with independent content review and learner testing.
4. Build dedicated NCBI exploration and hands-on Nextflow/Snakemake tutorials.
5. Validate offline operation before advertising it.
6. Consider a generative tutor only with grounded retrieval, provenance, refusal of unsupported claims, privacy controls and evaluation. Secure R/Python execution is a separate project.

## Verification and deployment

Run `node --experimental-strip-types --test tests/commander.test.mjs`, then `node node_modules/typescript/bin/tsc --noEmit`. Build with the Sites plugin build helper. Browser checks cover mission state transitions and lesson navigation; signed-in production writes should not be fabricated for testing.

Existing project: appgprj_6ac24d70a3cc8191bcf9e02c44a0bebc. Existing audience: public. Keep `.openai/hosting.json` and its D1 binding unchanged. Obtain a short-lived repository credential through Sites, pass it only through hidden stdin to `site-workflow.mjs`, build/package and push the exact source, then save that archive and deploy its saved version. Only report publication when the deployment returns `succeeded` and the expected URL. Never paste a repository token into a terminal command or document.

## Cinematic design system — 23 October 2026

All screens now use `SiteShell`: one header, navigation, mobile menu and photographic mission banner. Campaign, Research Lab, Toolkit, Skill Tree, Advanced Roadmap, lessons, Content Standards, professional previews and the Dayhoff page share the same navy/cyan tokens, typography, borders, buttons and panels in `app/science-theme.css`. Preserve this uniformity for future features; do not create a homepage-only visual system.

One image was created with the built-in Imagegen tool and reused throughout: `public/commander-realistic.png`. Generation prompt: “Create one cinematic photorealistic website character asset inspired by the user-provided OmicsPath dashboard reference: original fictional male scientific mission commander BlackBurn, early 40s, dark swept-back hair with a little grey, neatly trimmed beard, clear laboratory safety glasses, white realistic lab coat over navy shirt; waist-up, approachable research supervisor, holding a tablet; real skin and fabric, blue/cyan defocused bioinformatics laboratory, no typography or UI, wide 3:2 composition, scientist on right, dark negative space on left.” No animation generation or repeated image variants were used. The image is decorative characterization; all scientific content and state remain real HTML and existing application logic.
