/* Sitewide holiday announcement bar.
   - Auto-hides after ORDERS_CLOSE (end of Oct 23, Pacific).
   - To change the promo: edit the text/link below.
   - To turn it off early: empty this file (or delete the <script src="holiday-banner.js"> tags). */
(function () {
  var ORDERS_OPEN = new Date('2026-09-30T15:00:00Z');
  var ORDERS_CLOSE = new Date('2026-10-24T07:00:00Z');
  if (new Date() >= ORDERS_CLOSE) return;
  if (/double_joy_presale/.test(location.pathname)) return;   // already on the shop page
  var nav = document.querySelector('.nav-bar');
  if (!nav) return;

  var css = document.createElement('style');
  css.textContent =
    '.holiday-bar{background:#331E2B;color:#FBF6EE;text-align:center;font-family:Quicksand,Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:.3px;padding:8px 44px 8px 16px;line-height:1.35;position:relative}' +
    '.holiday-bar a{color:#FF99D8;text-decoration:none;font-weight:700;border-bottom:1px solid #FF99D8;white-space:nowrap}' +
    '.holiday-bar a:hover{color:#fff;border-color:#fff}' +
    '.holiday-bar .hb-x{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;color:#FBF6EE;opacity:.7;font-size:18px;line-height:1;cursor:pointer;padding:4px 8px}' +
    '.holiday-bar .hb-x:hover{opacity:1}';
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.className = 'holiday-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Halloween announcement');
  var soon = new Date() < ORDERS_OPEN;
  bar.innerHTML = (soon ? '🎃 Halloween cookies open Sept 30! <a href="double_joy_presale.html">Get notified</a>' : '🎃 Halloween cookies are open! $7 each, order by Oct 23. <a href="double_joy_presale.html">Shop now</a>') +
    '<button type="button" class="hb-x" aria-label="Dismiss">×</button>';
  nav.insertBefore(bar, nav.firstChild);

  function pad() { document.body.style.paddingTop = bar.parentNode ? bar.offsetHeight + 'px' : ''; }
  pad();
  window.addEventListener('resize', pad);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pad);
  bar.querySelector('.hb-x').addEventListener('click', function () {
    bar.remove(); pad();
  });
})();
