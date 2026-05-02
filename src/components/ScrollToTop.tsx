import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On every route change:
 * - if the URL has a #hash → scroll that element into view
 * - otherwise → jump to the top of the page
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // wait a tick for the new page to mount
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 50);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
