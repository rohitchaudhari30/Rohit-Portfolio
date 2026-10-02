# Asset folders

- `profile.jpg` — your headshot, referenced from `src/data/personal.ts`
- `resume.pdf` — your resume, referenced from `src/data/personal.ts`
- `projects/<slug>/` — one folder per project. Drop `cover.jpg`, `architecture.png`,
  and any gallery screenshots here, then reference them by path
  (e.g. `/assets/projects/sdlc-intelligence-platform/cover.jpg`) in `src/data/projects.ts`.

If a project has no screenshots yet, leave `coverImage`/`galleryImages` unset —
the UI already handles that gracefully (placeholder card, hidden gallery).
