import type { Platform } from "../app/lib/platform";

/**
 * What /go shows inside TikTok, Instagram and the like.
 *
 * Those apps' browsers refuse to hand off to the App Store or Play Store — tested:
 * a store redirect in TikTok ends in "action can't be taken", whatever the link.
 * So instead of redirecting into that dead end, /go serves this page, which gets
 * the visitor into their real browser in the fewest taps: ⋯ → Open in browser.
 * The page's address is /go, so the real browser then goes straight to the store.
 *
 * Deliberately tiny — inline CSS, system fonts, no bundle — because it loads in
 * the in-app browser, the slowest place anyone views the site.
 */

// Bottom-point heart and dashed C — the same geometry as app/components/ChatMark.tsx.
const HEART =
  "M6.5 11.5 C6.5 11.5 0.4 7.6 0.4 3.9 C0.4 1.6 2.4 0.4 4.2 1.3 C5.3 1.85 6.1 2.8 6.5 3.6 C6.9 2.8 7.7 1.85 8.8 1.3 C10.6 0.4 12.6 1.6 12.6 3.9 C12.6 7.6 6.5 11.5 6.5 11.5 Z";
const MARK = `<svg class="mark" viewBox="8 8 76 76" role="img" aria-label="Ch@t"><g fill="none" stroke="currentColor"><path d="M45.91 70.28 A24.5 24.5 0 1 1 45.91 22.52" stroke-width="3.4" stroke-dasharray="4.2 3.42"/><path transform="translate(46.9 19.05)" d="${HEART}" stroke-width="2.6" stroke-linejoin="round"/><path transform="translate(46.9 61.65)" d="${HEART}" stroke-width="2.6" stroke-linejoin="round"/><text x="47.5" y="55.2" textLength="30.5" lengthAdjust="spacingAndGlyphs" fill="currentColor" stroke="none" font-family="system-ui,-apple-system,sans-serif" font-size="19.5" font-weight="600">hat</text></g></svg>`;

export function inAppPage(platform: Platform, ref: string | null): string {
  const isIos = platform.os === "ios";
  const store = isIos ? "App Store" : "Play Store";
  const browser = isIos ? "Safari" : "your browser";
  const app = platform.inApp ?? "This app";
  // Only the promo code is carried to the site link — never the raw query
  // string, which would be written into the page unescaped.
  const siteHref = ref ? `/?ref=${encodeURIComponent(ref)}` : "/";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Get Ch@t</title>
<style>
:root{--mint:#00e6a0;--ink:#111;--muted:#555;--bg:#fff;--card:#f3f5f4}
@media (prefers-color-scheme:dark){:root{--ink:#f2f2f2;--muted:#a3a3a3;--bg:#050505;--card:#161616}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;background:var(--bg);color:var(--ink);font:16px/1.45 system-ui,-apple-system,"Segoe UI",sans-serif;display:flex;align-items:center;justify-content:center;padding:72px 24px calc(32px + env(safe-area-inset-bottom))}
main{width:100%;max-width:380px;text-align:center}
.mark{width:72px;height:72px;color:var(--mint)}
h1{font-size:26px;line-height:1.15;margin:18px 0 8px}
p{color:var(--muted);margin:0 0 22px}
ol{list-style:none;margin:0 0 24px;padding:0;text-align:left;display:grid;gap:10px}
li{display:flex;gap:12px;align-items:center;background:var(--card);border-radius:16px;padding:14px 16px}
li b.n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--mint);color:#111;display:grid;place-items:center;font-size:14px}
button{width:100%;border:0;border-radius:999px;background:var(--mint);color:#111;font:700 16px/1 system-ui,-apple-system,sans-serif;padding:16px}
button:active{transform:scale(.98)}
.url{display:none;margin-top:12px;padding:12px;border-radius:12px;background:var(--card);font-size:13px;word-break:break-all;user-select:all;-webkit-user-select:all}
.site{display:inline-block;margin-top:18px;color:var(--muted);font-size:14px}
.arrow{position:fixed;top:10px;right:18px;color:var(--mint);font-size:34px;line-height:1;animation:nudge 1.2s ease-in-out infinite}
@keyframes nudge{50%{transform:translate(4px,-6px)}}
@media (prefers-reduced-motion:reduce){.arrow{animation:none}}
</style>
</head>
<body>
<div class="arrow" aria-hidden="true">↗</div>
<main>
${MARK}
<h1>One more tap to get Ch@t</h1>
<p>${app}’s browser can’t open the ${store}. Open this page in ${browser} and it goes straight there.</p>
<ol>
<li><b class="n">1</b><span>Tap <b>⋯</b> in the top-right corner</span></li>
<li><b class="n">2</b><span>Choose <b>“Open in browser”</b></span></li>
</ol>
<button id="copy" type="button">Copy link instead</button>
<div class="url" id="url"></div>
<a class="site" href="${siteHref}">See the website first</a>
</main>
<script>
(function(){
  // Mark this visit as counted: when the visitor reopens the page in their real
  // browser, /go sends them to the store without counting them a second time.
  try{var u=new URL(location.href);if(!u.searchParams.has('seen')){u.searchParams.set('seen','1');history.replaceState(null,'',u.toString());}}catch(e){}
  var b=document.getElementById('copy'),box=document.getElementById('url');
  function copied(ok){if(ok){b.textContent='Copied — paste it into ${isIos ? "Safari" : "Chrome"}';}else{box.textContent=location.href;box.style.display='block';b.textContent='Copy the link below';}}
  b.onclick=function(){
    var t=location.href;
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){copied(true);},function(){copied(fallback(t));});}
    else copied(fallback(t));
  };
  function fallback(t){try{var a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();var ok=document.execCommand('copy');a.remove();return ok;}catch(e){return false;}}
})();
</script>
</body>
</html>`;
}
