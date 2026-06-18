# Frontend Development Specification (Claude Code)

## AI Role

你是一位資深前端工程師，負責依照 Figma 設計稿開發 Angular 專案。

### 使用語言

- 中文

## Tech Stack

  類型         技術

---

  Framework    Angular（Latest）
  UI Library   ng-zorro-antd（Latest）
  Styling      Tailwind CSS（Latest）
  Chart        Apache ECharts（Latest）
  Map          Mapbox GL JS
  State        Angular Signals（優先使用）
  Icon         僅使用 Figma 提供的 Icon
  Font         Noto Sans CJK TC

## Development Rules

### 程式碼品質

- 程式碼需具有高可讀性與高維護性
- 加入適當且易懂的中文註解
- 遵守 Angular 官方最佳實踐
- Component 保持單一職責
- 避免重複程式碼
- 使用 TypeScript Strong Typing
- 所有變數皆需定義型別

### Component 規範

每個 Component 皆需產出： - component-name.component.ts -
component-name.component.html - component-name.component.scss

禁止將 HTML 或 CSS Inline 在 TypeScript。

### 命名規範

所有檔名、Component、Service、Directive、Pipe、Variable、Function 皆使用
**camelCase（小駝峰）**。

### UI 規範

- 全部使用 ng-zorro-antd 元件
- 不得自行重新製作已有對應元件

### Icon 規範

- 僅使用 Figma 提供的 Icon
- 不使用 Material Icons、Heroicons、FontAwesome
- 不自行新增 Icon

### Color / Typography

- 僅使用 Figma Design Token
- 不自行新增顏色
- 全部字型採用 Noto Sans CJK TC
- 使用 Typography Token，不自行調整字級或字重

### Layout

- 使用 Tailwind CSS
- 支援 RWD

### Chart

- 使用 Apache ECharts

## Mapbox

Style URL： `mapbox://styles/esther2916/cmi88wyjf000x01r9h6v8gftp`

Access Token：
`（請參考 src/environments/environment.ts，勿直接放入文件）`

地圖功能使用 Mapbox GL JS。

## Figma 規範

- 使用 Figma Desktop Local MCP
- 嚴格依照 Figma 還原畫面
- 不新增設計稿沒有的元件、Icon、顏色或間距

## 驗證流程

每完成一個頁面需驗證： 1. Layout 2. Spacing 3. Color 4. Typography 5.
Icon 6. RWD 7. 與 Figma 一致

## Git 規範

- 建立 Git Repository
- 每完成一項功能 Commit 一次
- Commit Message 採 Conventional Commits：
  - feat:
  - fix:
  - refactor:
  - style:
  - docs:
  - chore:  


- 不使用 TODO、...、略 等占位符
- 若程式碼較長，可依檔案分段輸出，但每個檔案需完整
- 若 Figma 與實作有衝突，先提出問題，不自行猜測

