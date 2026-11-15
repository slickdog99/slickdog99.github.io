/* Shared behaviour: back always lands on home.
   (The top bar is sticky through CSS alone; no script needed.) */

(function () {
  /* ---- back always lands on home ----
     Normally the back gesture already returns home, because home is the only
     way into a page. The exception is someone arriving straight at a page from
     a search result, a bookmark or a shared link: for them, back would leave
     the site. So when there is no in-site referrer, we seed home underneath the
     current page in history. */
  if (!document.body.classList.contains('is-home')) {
    var cameFromSite = false;
    try {
      cameFromSite = !!document.referrer &&
        new URL(document.referrer).origin === location.origin;
    } catch (e) {}

    if (!cameFromSite) {
      try {
        var here = location.href;
        history.replaceState(null, '', 'index.html');
        history.pushState(null, '', here);

        /* pushState entries are same-document, so going back would only swap
           the URL and leave this page on screen. Force the real load. */
        window.addEventListener('popstate', function () {
          location.replace('index.html');
        });
      } catch (e) {}
    }
  }
})();
