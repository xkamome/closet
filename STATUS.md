# STATUS — loop checkpoint / 接力棒

> Append-only. Newest entry at the TOP. A fresh session resumes from here (憲法 IV.1).
> Entry format:
>
> ## [YYYY-MM-DD HH:MM] <short title>
> - Done: what actually changed (files, behavior)
> - Verified: which checks pass / fail right now
> - Next: the single next step
> - (optional) BLOCKER: exact error + what was tried

## [2026-09-27 02:20] M2 runtime + logic modules
- Done: src/avatar (data, body w/ CPU skinning, poses incl. procedural chair-sit, measure, solver); src/viewer (scene, avatarView); src/fit (sizeChart, fabric, fit); src/style (bodyShape, advice); src/garment/spec
- Verified: vitest 35/35 pass; tsc clean; screenshots in _artifacts show avatar + poses OK (BVH axis-guess bug fixed)
- Next: garment geometry (body-offset + cone), photo texture atlas, UI, AI bridge, e2e

## [2026-09-27 02:00] M0+M1 harness, scaffold, avatar bake
- Done: loop-harness (unattended), ACCEPTANCE.md, verify/verify.mjs; npm deps; tools/fetch_assets.py (CC0 MakeHuman assets -> _vendor/mh); tools/build_avatar.py -> public/avatar/avatar.json+bin (64 morphs, 163 bones, 5 hair, 3 skins, poses from BVH)
- Verified: build_avatar runs; verify still fails (no app yet)
- Next: src/avatar runtime (morph, skeleton, skin, proxies), viewer

## [loop not started]
- Done: harness applied, acceptance criteria pending
- Next: fill ACCEPTANCE.md, set verify commands in loop.config.json
