import { useLocation } from "react-router-dom";
import Seo from "./Seo";
import { metaForPath } from "./routeMeta";

/**
 * Mounted once in App. Applies the route's entry from ROUTE_META, so the
 * stable public pages get a real title and description without each page
 * component having to opt in.
 *
 * A route with no entry renders nothing, leaving index.html's static
 * fallback in place. That is the correct outcome for dynamic detail pages
 * (a blog post, a course): they should render their own <Seo> with the
 * fetched record's title, and a generic entry here would actively get in
 * the way by claiming every post shares one title.
 *
 * Canonical is derived from the pathname and deliberately drops the query
 * string — /courses?board=cbse is a filtered view of /courses, not a
 * separate page, and letting each filter combination self-canonicalise is
 * how a catalogue turns into thousands of near-duplicate URLs.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();
  const meta = metaForPath(pathname);
  if (!meta) return null;

  return (
    <Seo
      title={meta.title}
      description={meta.description}
      canonical={meta.noindex ? undefined : pathname}
      noindex={meta.noindex}
    />
  );
}
