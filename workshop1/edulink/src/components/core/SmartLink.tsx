import { forwardRef } from "react";
import type { AnchorHTMLAttributes } from "react";
import { Link, useInRouterContext } from "react-router-dom";

/**
 * One anchor that navigates correctly whatever it is pointing at.
 *
 * WHY THIS EXISTS. Every registry component that renders navigation used to
 * write a raw `<a href={...}>`. Against an in-page anchor (`#pricing`) that is
 * exactly right. Against a ROUTE (`/about`) it is a full browser reload: React
 * unmounts, client state is lost, and the `AnimatePresence` page transition in
 * `Layout.tsx` never runs because the whole document was replaced. The header
 * the user just clicked is rebuilt from scratch, which is the flicker
 * `reference/motion-system.md` describes for a different cause.
 *
 * The registry's own documented usage already assumed routes — `FloatingHeader`
 * ships with `links={[{ label: 'Product', href: '/product' }, ...]}` — so the
 * components were being demonstrated with destinations they could not navigate
 * to properly. This closes that.
 *
 * WHY A RUNTIME DECISION RATHER THAN A PROP. The alternative was asking each
 * caller to say which kind of link it is. Callers get that wrong, and they get
 * it wrong invisibly: a wrong `#anchor` does nothing and a wrong route reloads,
 * and neither throws. The destination string already carries the answer, so
 * reading it is exact where asking is a guess.
 *
 * WHY IT DEGRADES INSTEAD OF REQUIRING A ROUTER. `useInRouterContext()` is
 * false in a project with no `<BrowserRouter>` — a single-page composition, a
 * component rendered in isolation, a test. Rendering `<Link>` there THROWS, so
 * a component that hard-imported `Link` would be unusable outside a routed
 * tree. Falling back to `<a>` means a component is safe everywhere and simply
 * gets better inside a router.
 */

/** A scheme (`https:`, `mailto:`, `tel:`) or a protocol-relative `//host`. */
const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

/**
 * Whether `href` names somewhere inside this app that the router should handle.
 *
 * Three things disqualify it, and each is a destination the router must NOT
 * intercept: an in-page anchor, which is the browser's own job and which
 * `<Link>` would turn into a navigation to a route that does not exist; a
 * scheme, which is another site, an email client or a phone dialler; and an
 * empty string, which is the placeholder a half-written component carries.
 */
export function isRoutePath(href: string | undefined): boolean {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  return !EXTERNAL.test(href);
}

export type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
};

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink({ href = "", children, ...rest }, ref) {
    // Called unconditionally, before the branch — it is a hook, and the two
    // return paths below must not change how many run.
    const routed = useInRouterContext();

    if (routed && isRoutePath(href)) {
      return (
        <Link ref={ref} to={href} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a ref={ref} href={href} {...rest}>
        {children}
      </a>
    );
  },
);

export default SmartLink;
