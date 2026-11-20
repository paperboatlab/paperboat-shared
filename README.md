# @paperboat/shared

The shared React and CSS UI kit for [Paperboat](https://github.com/paperboatlab/paperboat), Squero
Studio OM and Squero Studio MX. It provides design tokens, block and connector plates, the top bar
and rail shell, 2D and 3D plotting primitives, the CodeMirror 6 code editor and the package manager
panel; it carries no simulation runtime or domain logic.

**Docs:** [`DESIGN.md`](../paperboat/apps/web/DESIGN.md) and [`src/components.ts`](src/components.ts)

| Area | Files |
| --- | --- |
| Tokens, Geist fonts, light/dark | `src/tokens.css`, `src/base.css`, `src/plates.css` |
| Shell and menus | `src/Shell.tsx` (`AppBar`, `BarEnd`, `Rail`, `Panel`, `StatusPill`, `Switch`, `ThemeToggle`), `src/Menus.tsx`, `src/commands.ts`, `src/Modal.tsx`, `src/Logo.tsx` |
| Blocks, ports and wires | `src/Compact.tsx`, `src/Icon.tsx`, `src/portLayout.tsx`, `src/ports.ts`, `src/wireSnap.tsx`, `src/wireRouting.ts`, `src/wireBends.tsx` |
| Board and plots | `src/Board.tsx`, `src/plot/` (`Plot2D`, `HeatFigure`, `Colorbar`, `TexText`, `Scope`, `Sparkline`) |
| Code editor and files | `src/editor/` (`CodeEditor`, `themes.ts`, `useSqueroConfig`), `src/files/` (`FileTree`, `FileRail`) |
| Package panel and Squero shell | `src/packages/` (`PackagePanel`, `PackageWindow`), `src/squero/` (`SqueroLogo`, `AboutSquero`) |
| Protocol types | `src/protocol.ts` (generated from `paperboat/protocol/schema/paperboat-0.schema.json`) |

## Use

Apps depend on a sibling checkout in `package.json`:

```json
"@paperboat/shared": "file:../paperboat-shared"
```

Deduplicate `react`, `react-dom` and `@xyflow/react` in the consuming app's Vite configuration, then
import the tokens, plates and components:

```ts
import { AppBar, BarEnd, Compact, Shell } from "@paperboat/shared/components";
import "@paperboat/shared/tokens.css";
import "@paperboat/shared/plates.css";
```

## Develop

Requires Node.js 22:

```sh
npm install
npm run build
```

## Check

```sh
npm run build
npm test
```

## CI

[![ci](https://github.com/paperboatlab/paperboat-shared/actions/workflows/ci.yml/badge.svg?branch=dev)](https://github.com/paperboatlab/paperboat-shared/actions/workflows/ci.yml?query=branch%3Adev) runs typecheck and unit tests here, then builds and tests `paperboat`, `squero-studio-om` and `squero-studio-mx` against this checkout.

Versioned in `package.json` and tagged `vX.Y.Z[-alpha.N]` on the same `MAJOR.MINOR` line as
`paperboat`; see [`GUIDELINES.md`](../GUIDELINES.md) §9.

## Licence

GNU General Public License version 3 (see [LICENSE](LICENSE)).
