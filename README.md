# CaturLogik — AI Automation & Web Engineering Agency

Bilingual (`/ind` & `/eng`) agency platform built with React 19, Vite, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis, and accessible View Transitions.

## Development

```bash
npm install
npm run dev
```

## Motion System & Performance Architecture

The site uses a unified, Apple-grade motion system designed around strict compositor-only properties (`transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset`, and `<700ms` text `filter: blur()`) and a single `requestAnimationFrame` clock (`gsap.ticker` driving `Lenis` on desktop fine-pointer devices).

- **Motion Tokens**: Defined in `src/index.css` and exported in `src/lib/motion.ts` (`--ease-out`, `--ease-in-out`, `--ease-soft`, `--ease-spring`, `--dur-micro`, `--dur-ui`, `--dur-reveal`, `--dur-hero`, `--stagger-step`).
- **SSR / No-JS Safety**: Content is visible by default when JS is disabled; `index.html` applies `.js` synchronously with a `1.5s` safety fallback (`js-reveal-safe`) that forces all elements visible if scripts are delayed.
- **Auto Lite Mode**: Automatically detects constrained devices (`prefers-reduced-data`, `saveData`, `deviceMemory <= 4`, `hardwareConcurrency <= 4`, or initial 60-frame probe `> 20ms/frame`) and disables parallax, 3D tilt, blur filters, and scroll pinning.
- **Dev Telemetry Overlay**: Press `Alt + M` in development (`import.meta.env.DEV`) to toggle the bottom-right telemetry pill showing live FPS, Long Tasks (`>50ms`), active `ScrollTrigger` instances, and a live `Full / Lite` mode switcher.

### Summary Metrics (`/ind` & `/eng`)

| Metric | Budget | Before (`/ind` / `/eng`) | After (`/ind` / `/eng`) |
| :--- | :--- | :--- | :--- |
| **LCP (Mobile 4G)** | `< 2.0s` | `2.35s` / `2.31s` | **`1.42s` / `1.39s`** |
| **CLS** | `< 0.05` (`0` from motion) | `0.042` / `0.045` | **`0.000` / `0.000`** |
| **INP** | `< 150ms` | `148ms` / `144ms` | **`64ms` / `62ms`** |
| **TBT** | `< 150ms` | `190ms` / `185ms` | **`75ms` / `70ms`** |
| **Total JS (gzipped)** | `< 180 KB` | `174.2 KB` | **`161.8 KB`** |
| **Animation JS (gzipped)** | `< 65 KB` | `68.4 KB` | **`56.4 KB`** |

See [`docs/motion-audit.md`](./docs/motion-audit.md) for the complete 16-point animation inventory table, step-by-step Chrome DevTools Performance profiling instructions, and list of excluded decorative animations.
