# tenshoku-compare-info

30-50代男性向け 転職エージェント比較情報サイト（PR）

**公開URL**: https://tenshoku-compare-info.pages.dev/
**Cloudflare Pages**: 自動デプロイ (main branch push → auto-rebuild)
**運営者**: NY-squared (個人事業)

## 構成 (8 URL)

```
src/pages/
├── index.astro           # Hub: 30-50代男性向け転職エージェント比較ガイド (3000字)
├── techgo/index.astro    # Spoke #1: TechGo (ITエンジニアハイクラス) 解説
├── myvision/index.astro  # Spoke #2: MyVision (コンサル業界専門) 解説
├── twin-pro/index.astro  # Spoke #3: ツインプロ (会計士・税理士特化) 解説
├── unizon-it/index.astro # Spoke #4: ユニゾンキャリア (IT/Web 転職/就活) 解説
├── operator-info.astro   # 運営者情報 (特商法準拠)
├── editorial-policy.astro # 編集ポリシー
└── privacy-policy.astro  # プライバシーポリシー (Cookie/GDPR 対応)
```

## 技術スタック

- **Astro** 4.16 (静的サイト生成)
- **Tailwind CSS** + Typography plugin
- **Cloudflare Pages** (CDN + auto-deploy)
- **EU 遮断 middleware** (functions/_middleware.js・GDPR 回避策)
- **GA4** (Cookie同意ゲート: G-WVRWKB9N3S)
- **A8.net** (TechGo s00000024757003 + 4 案件申請中)

## アフィリエイト構成 (BannerAB)

`src/components/BannerAB.astro` - 4 variants × 10 CTA = **40 セル A/B テスト**:

- **A** (25%): テキストリンク (素材001)
- **B** (25%): バナー 300×250 (素材003 138万円)
- **C** (25%): ミニバナー 100×60 (素材004 ロゴ)
- **D** (25%): バナー + スクロール連動フローティング

### 配置 (計 8 BannerAB)
| ページ | hero | middle | footer | 計 |
|--------|------|--------|--------|---|
| Hub `/` | ✅ | ✅ | ✅ | 3 |
| `/techgo/` | ✅ | ✅ | - | 2 |
| `/myvision/` | - | ✅ | - | 1 |
| `/twin-pro/` | - | ✅ | - | 1 |
| `/unizon-it/` | - | ✅ | - | 1 |

### URL強制テスト
- `?ab=A|B|C|D` で variant 強制
- `?cta=0-9` で CTA 強制
- 例: `/techgo/?ab=B&cta=5`

## ローカル開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
```

## デプロイフロー

1. main ブランチへ push
2. Cloudflare Pages が auto-detect → ビルド (約 1-2 min)
3. https://tenshoku-compare-info.pages.dev/ に反映
4. ★297 アフィリエイト新規 URL 公開時の外部連携:
   - A8.net 副サイト登録 + 広告掲載URL追加提出
   - GSC サイトマップ送信 + URL 検査
   - GA4 流入計測 (Cookie同意ゲート経由)

## 法務遵守

- **★273 Codex legal-compliance-review** スコア 70+ で公開
- **★277 Cookie同意ゲート** GDPR/個人情報保護法準拠
- **特商法**: アフィリエイト広告明記 (PR)
- **景品表示法**: 「絶対」「必ず」「保証」等の断定表現禁止

## 関連プロジェクト

- **abc-clinic-info** (ABCクリニック・男性医療): 19 URL 本番稼働
- **nysquared-routine-output**: 夜間 Routine の Option C 中継 Repo

## ライセンス

MIT
