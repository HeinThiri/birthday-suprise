# 🎂 Birthday Surprise — A Cinematic Angular Experience

A premium, interactive, emotion-first birthday website built with **Angular 18** standalone components, **TypeScript**, **SCSS**, and a sprinkle of animation magic (Angular animations + AOS + canvas-confetti + GSAP).

> Designed as a personal birthday gift — equal parts elegant, playful, and warm.

---

## ✨ What's inside

| Section                | What it does                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| **Hero**               | Animated parallax orbs, floating balloons, typing-effect tagline, CTA button |
| **Surprise**           | Click-to-blow-out candles, openable gift, confetti burst, balloons rising    |
| **Memory Gallery**     | Masonry-style grid, hover shine, lightbox preview with arrow-key navigation  |
| **Timeline / Journey** | Alternating-side scroll-revealed cards with a glowing center line            |
| **Special Message**    | Handwritten-style letter on glass paper, scroll-revealed paragraph by paragraph |
| **Wishes**             | Interactive floating cards, heart-burst on click, accent gradient per wish   |
| **Countdown**          | Live countdown to the next birthday + a live clock                           |
| **Fun**                | Secret reveal, random compliment dispenser, click-to-create heart playground |
| **Final Celebration**  | CSS + JS fireworks, grand title, thank-you message                            |
| **Floating controls**  | Persistent music toggle (with EQ bars) and dark/light theme toggle            |

Plus: floating particle canvas, scroll progress bar, custom scrollbar, fluid responsive layout, page transitions, AOS scroll reveals, glassmorphism, and a fully editable content layer.

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (opens at http://localhost:4200)
npm start

# 3. Production build
npm run build
```

Required: **Node 18.13+ / 20+**, **npm 9+** (Angular 18 requirement).

---

## 🎨 Personalize it for your friend

All the content you'll want to change lives in two files. No component code needs touching.

### 1. `src/app/core/services/config.service.ts`

```ts
readonly config: BirthdayConfig = {
  friendName: 'Aria',                  // <- your friend's name
  fromName:   'Your Best Friend',      // <- signature on the letter
  birthdayISO: this.nextBirthday('--06-12'),  // <- MM-DD of their birthday
  musicSrc: 'assets/music/birthday.mp3',
  socials: [
    { label: 'Instagram', href: '#', icon: '📷' },
    { label: 'Twitter',   href: '#', icon: '🕊️' },
    { label: 'Email',     href: 'mailto:hello@example.com', icon: '✉️' },
  ],
};
```

### 2. `src/app/core/services/content.service.ts`

Edit the three arrays — `memories`, `timeline`, `wishes` — and the `compliments` list. Each model is documented in `src/app/core/models/`.

### 3. The letter

`src/app/components/message/message.component.ts` exposes a `paragraphs: string[]` array. Each paragraph fades in independently. Write yours there.

### 4. Music (optional)

Drop an MP3 at `src/assets/music/birthday.mp3` — or update the `musicSrc` path. The toggle gracefully no-ops if the file is missing.

### 5. Real photos (optional)

Add JPEG/PNG files to `src/assets/images/` and set `image: 'assets/images/your-photo.jpg'` on each `Memory` in `content.service.ts`. The current build uses emoji-driven gradient placeholders so the site looks beautiful out of the box.

---

## 📁 Folder structure

```
src/
├── index.html                  ← preloads fonts, AOS CSS, initial loader
├── main.ts                     ← bootstraps with appConfig
├── styles.scss                 ← design tokens (CSS vars), reset, utilities
├── styles/
│   ├── _variables.scss         ← Sass tokens (breakpoints, easing, z-index)
│   └── _mixins.scss            ← responsive helpers, glassmorphism, shimmer
└── app/
    ├── app.component.{ts,html,scss}    ← shell: nav + outlet + footer + controls
    ├── app.config.ts                   ← provideRouter / provideAnimations
    ├── app.routes.ts                   ← lazy-loaded routes
    ├── animations/
    │   └── fade.animations.ts          ← route fade, stagger, reusable triggers
    ├── core/
    │   ├── models/                     ← TypeScript interfaces
    │   │   ├── config.model.ts
    │   │   ├── memory.model.ts
    │   │   ├── timeline.model.ts
    │   │   └── wish.model.ts
    │   └── services/
    │       ├── config.service.ts       ← single source of truth for personal data
    │       ├── content.service.ts      ← memories, timeline, wishes, compliments
    │       ├── confetti.service.ts     ← burst / sparkle / fireworks
    │       ├── music.service.ts        ← audio playback + signals
    │       └── theme.service.ts        ← dark/light persistence via signals
    ├── shared/components/
    │   ├── navbar/                     ← sticky nav, mobile burger, smooth-scroll
    │   ├── footer/                     ← brand block, socials, year
    │   ├── particles/                  ← canvas particle field
    │   ├── music-toggle/               ← floating audio control with EQ bars
    │   ├── theme-toggle/               ← sun/moon switch
    │   └── scroll-progress/            ← top-of-viewport gradient progress bar
    ├── components/                     ← section-level feature components
    │   ├── hero/
    │   ├── surprise/
    │   ├── gallery/
    │   ├── timeline/
    │   ├── message/
    │   ├── wishes/
    │   ├── countdown/
    │   ├── fun/
    │   └── celebration/
    └── pages/
        ├── home/                       ← composes all the sections
        └── letter/                     ← /letter route — just the letter
```

---

## 🛠 Tech & packages

| Package           | Purpose                                              |
| ----------------- | ---------------------------------------------------- |
| `@angular/*`      | Framework, router, animations (Angular 18 standalone) |
| `aos`             | Animate-on-scroll reveal effects                     |
| `canvas-confetti` | Confetti bursts and fireworks                         |
| `gsap`            | Available for advanced motion (lazily importable)    |

All packages are listed in `package.json`.

---

## 🎬 Animation cheatsheet

- **Page transitions** — `routeFadeAnimation` in `animations/fade.animations.ts`, applied on the `<main>` wrapper around `<router-outlet>`.
- **Scroll reveals** — AOS attributes (`data-aos="fade-up"`, `data-aos-delay="120"`) sprinkled into templates. Initialized in `app.component.ts`.
- **Confetti / fireworks** — `ConfettiService` exposes `burst()`, `sparkle(x, y)`, and `fireworks(durationMs)`.
- **CSS keyframes** — defined globally in `src/styles.scss` (`@keyframes float-up`, `pulse-glow`, `sparkle`, `gentle-bob`, `drift`, `shimmer`, `fade-in-up`).
- **Hero typing effect** — `setTimeout`-driven character-by-character cycle through phrases, with a blinking gold cursor.
- **Parallax** — hero uses `(mousemove)` to set CSS vars `--mx / --my`, which the orbs translate by.

---

## 🌗 Theme & accessibility

- **Dark/light themes** toggle a `theme-dark` / `theme-light` class on `<body>`. All colors are CSS custom properties so the switch is instant and smooth.
- Choice is persisted to `localStorage` and falls back to the user's `prefers-color-scheme`.
- All visual motion respects `prefers-reduced-motion: reduce` — particles disable themselves, transitions shrink to 0.01ms.
- Buttons have proper ARIA labels; lightbox is keyboard-navigable (←, →, Escape); focus rings use a high-contrast gold.

---

## 📱 Responsive behavior

Mobile-first. Two breakpoints carry most of the load:

| Width        | Behavior                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| ≥1024px      | Full alternating timeline, 4-column gallery, side-by-side cake + gift      |
| 768–1023px   | 3-column gallery, 2-column wishes, navbar collapses below                 |
| 576–767px    | 2-column gallery & wishes, vertical timeline (left rail)                  |
| <576px       | Single column, mobile burger menu, tightened countdown grid               |

Fluid `clamp()` typography keeps headlines proportional across the whole range.

---

## 🧰 Useful npm scripts

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `npm start`      | `ng serve --open` — dev server with HMR at `:4200`    |
| `npm run build`  | Production build to `dist/birthday-surprise`          |
| `npm run watch`  | Development build that rebuilds on file changes        |

---

## 🪄 How the surprise flow works (UX)

1. Visitor lands on the hero — fonts and AOS preload while the initial loader cake bobs in.
2. The CTA button (`Open Your Surprise`) fires a confetti burst and smooth-scrolls to the surprise section.
3. Clicking the cake blows out the candles (smoke + extinguish animation) and triggers another confetti round.
4. Scrolling continues through memories → journey → letter → wishes → countdown → fun → finale.
5. As the finale section enters viewport (~40% threshold), an `IntersectionObserver` fires the fireworks. The user can re-trigger any time.

---

## 💡 Tips

- **Want a different gradient?** All theme colors are CSS variables in `src/styles.scss`. Tweak `--color-pink`, `--color-purple`, `--gradient-hero`, etc.
- **Add a new section?** Create the component under `src/app/components/<name>/`, then import it into `pages/home/home.component.ts`.
- **Share just the letter?** Send your friend `/letter` — that route renders the letter on its own page.
- **No background music yet?** The site still works — the toggle simply won't play anything until you drop a file at the configured path.

---

Made with quiet hours and a loud heart. 💌
