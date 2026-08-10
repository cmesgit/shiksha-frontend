import { Link } from "react-router-dom";

/* Homepage CTAs get their hrefs from the CMS block (or the section DEFAULTS),
   so a target can be an in-app route ("/courses"), an on-page anchor
   ("#programs") or an absolute URL. Only the first kind should go through the
   router — the other two must stay plain anchors, otherwise <Link> would push
   them onto the history stack as bogus routes. */
export default function CtaLink({ to, children, ...rest }) {
  const href = to || "#";
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  if (!isInternal) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}
