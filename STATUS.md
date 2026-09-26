# STATUS — loop checkpoint / 接力棒

> Append-only. Newest entry at the TOP. A fresh session resumes from here (憲法 IV.1).
> Entry format:
>
> ## [YYYY-MM-DD HH:MM] <short title>
> - Done: what actually changed (files, behavior)
> - Verified: which checks pass / fail right now
> - Next: the single next step
> - (optional) BLOCKER: exact error + what was tried

## [2026-09-27 05:30] Polish: real AI bridge verified, parser hardening, sit arms
- Done: real `claude -p` via bridge works (cwd = temp dir to avoid project hooks); UI AI flow verified (~80s answer); size-chart 平量 note no longer doubles full girths; prompt wording for bottoms; sitting hands rest on thighs
- Verified: verify.mjs all pass (44 unit, e2e 9/9)
- Next: (optional) more garment types, better sleeve UV mapping from flat-lay photos

## [2026-09-27 04:50] Wardrobe, advanced sliders, GTAO, perf
- Done: IndexedDB wardrobe (save / re-wear incl. person-photo warp + size chart), advanced shape sliders (face ethnicity mix, muscle, belly, ...), GTAO ambient occlusion with adaptive fallback, kNN hash + y-bucket slicing (dress build ~240ms warm), e2e random port
- Verified: verify.mjs all pass (41 unit, e2e 9/9)
- Next: polish only

## [2026-09-27 04:05] Person photos, layering, cloth drape
- Done: person-photo garments (MediaPipe multiclass seg + pose -> top/skirt/pants/dress, sleeve, hem; landmark-warped texture), top-over-bottom layering, PBD drape for sitting skirts, README, photo-measure calibration (+-4.5cm front only, +-2.3cm with side on synthetic renders)
- Verified: verify.mjs all pass (41 unit tests, e2e 8/8)
- Next: wardrobe (IndexedDB), perf (cone skinning kNN), polish

## [2026-09-27 03:10] M3-M6 app complete, verify passes
- Done: garment geometry (ease-based grid + skirt cone, Taubin tension, collision), photo cutout + bleed atlas, underwear, full UI (身形/試穿/尺寸/穿搭), AI bridge (claude -p), MediaPipe photo measuring, e2e
- Verified: node verify/verify.mjs -> all checks passed (build, 36 unit tests, bridge, browser e2e 7/7)
- Next (quality): skirt drape when sitting (cloth sim), photo-measure self-check, perf of cone skinning, README

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
