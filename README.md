# Ahmad Hassan Portfolio

Angular portfolio with a premium animated UI, editable content data, reusable assets, GSAP reveals, and Three.js hero art.

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Build

```bash
npm run build
```

The production files are generated in `dist/portfolio`.

## Easy Editing Guide

Most portfolio content is intentionally centralized so you do not need to edit every component.

| What you want to change | Where to edit |
| --- | --- |
| Name, role, email, education, about text, social links, projects, timeline | `src/app/portfolio/shared/data/portfolio.data.ts` |
| Profile photo, project screenshots, video paths, reusable asset paths | `src/app/portfolio/shared/data/portfolio.assets.ts` |
| Profile image file | `public/images/profile/ahmad.png` |
| Project image files | `public/images/projects/` |
| Tech icons | `public/icons/tech/` |
| Social icons | `public/icons/social/` |
| Hero background video | `public/videos/hero-background.mp4` |
| Education visual | `public/images/education/degree-university.svg` |

## Replace Images

To replace the profile photo, put a new image in `public/images/profile/` and update `profilePhoto` in:

```ts
src/app/portfolio/shared/data/portfolio.assets.ts
```

To replace project screenshots, add your images to `public/images/projects/` and update the matching project key in `portfolioAssets.projects`.

## Contact Form

The contact form submits to `https://formsubmit.co/ahmaddhariwal023@gmail.com`.

FormSubmit usually sends a one-time activation email the first time the form is used. Confirm it from Gmail so future portfolio messages arrive properly.

## Repository Visibility

If this portfolio is meant to be shown to recruiters, keep the repository public after removing anything private. Do not commit API keys, private resumes with sensitive info, or secret backend URLs.
