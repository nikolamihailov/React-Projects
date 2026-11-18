import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Every route change starts at the top of the new page. Without this the
// browser keeps the previous scroll position, so after a redirect on a long
// page you could land at the footer. Links to an in-page anchor (#id) are
// left to the browser.
const RouteScrollReset = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
};

export default RouteScrollReset;
