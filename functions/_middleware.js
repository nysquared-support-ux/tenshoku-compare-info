/**
 * Cloudflare Pages Functions Middleware
 * EU IP 遮断（GDPR 回避策）
 *
 * ★277/★285 ルール適用: PUBLIC_A8_ID/PUBLIC_GA_ID 等の機密は .env + Cloudflare 環境変数で管理
 * 作成: 2026-04-22 [新セッション] / ABCクリニック LP
 *
 * 動作:
 *   EU加盟国・EEA加盟国・UK からのアクセスを HTTP 451 で拒否
 *   日本・アジア・北米からのアクセスは通常通り配信
 *
 * 検証方法:
 *   VPNでドイツ等のEU IPに切替 → アクセス → 451 エラー表示 → OK
 *   日本IP → 通常表示 → OK
 */

export async function onRequest({ request, next }) {
  // 検索エンジンボット（Googlebot/Bingbot/etc）は EU 判定から除外
  // 2026-04-22 追加: GSC サイトマップ取得失敗の予防策
  const userAgent = request.headers.get('User-Agent') || '';
  const isBot = /bot|crawl|spider|Googlebot|bingbot|Yandex|Baidu|DuckDuckBot|Slurp|facebookexternalhit|LinkedInBot|Twitterbot|Applebot/i.test(userAgent);

  if (isBot) {
    return next();
  }

  const country = request.cf?.country;

  const EU_EEA_UK_COUNTRIES = [
    // EU加盟27カ国
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
    'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL',
    'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
    // EEA追加3カ国
    'IS', 'LI', 'NO',
    // UK（Brexit後もGDPR同等法規制あり）
    'GB'
  ];

  if (country && EU_EEA_UK_COUNTRIES.includes(country)) {
    return new Response(
      'This site is currently not available in your region (EU/EEA/UK). ' +
      'Please contact ny.squared2.support@gmail.com for more information.',
      {
        status: 451,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Region-Blocked': country,
        },
      }
    );
  }

  return next();
}
