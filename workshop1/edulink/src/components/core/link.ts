/**
 * One shape for a link, and the two readers that resolve it.
 *
 * WHY THIS EXISTS. The registry exported 39 link-shaped interfaces in 17
 * distinct property shapes for a single concept: somewhere to go, and something
 * to call it. The destination was spelt `href` 37 times and `url` twice. The
 * visible text was spelt `label` 19 times, `title` 11, `name` 4 and `text` 3.
 * Nothing told a caller which one a given component wanted, so a caller had to
 * guess, and a caller that guesses a 37-against-2 convention will eventually
 * land on one of the 2.
 *
 * One did. A build wrote `{ text: "Divorce & Separation", href: "/services" }`
 * for `CorporateFooter`, whose `FooterLink` was `{ text, url }` — and five lines
 * above, in the same file, wrote `href` for `FloatingHeader` CORRECTLY, because
 * that one is `{ label, href }`. TypeScript's excess-property check rejected the
 * object literal with `TS2353`, ten times, and the whole site was lost: 23 good
 * files and a correct router, thrown away over the spelling of one field.
 *
 * That is not a caller's mistake. A contract that requires a coin flip to
 * satisfy is a defect in the contract.
 *
 * WHY ALIASES RATHER THAN ONE ENFORCED SPELLING. Renaming `url` to `href`
 * everywhere would fix the next build and break every site already shipped
 * against `{ text, url }`. Accepting both costs nothing at runtime and keeps
 * those trees compiling, so the fix is additive: every spelling the registry has
 * ever used stays legal, and the majority spelling is legal everywhere.
 *
 * WHY A RUNTIME DECISION RATHER THAN A TYPE-LEVEL ONE. The type-level way to
 * say "one of `href` or `url`, and one of `label`/`title`/`name`/`text`" is a
 * union of the eight combinations. It expresses the rule exactly and it reports
 * a violation as "no overload matches this call", which is a worse error than
 * the one being fixed — and a component that fails to compile is precisely the
 * outcome this module exists to prevent. Optional fields plus a resolver read
 * at render time trade a little static precision for the thing that was
 * actually being lost. `SmartLink` in this directory made the same call for the
 * same reason.
 *
 * WHAT IS STILL CAUGHT. Widening to optional does not disarm the excess-property
 * check: a genuine typo (`hrf`, `lable`) is still a compile error, because it
 * matches no member of the shape. What is no longer an error is a caller
 * choosing a spelling the registry itself uses somewhere else.
 */

/**
 * Somewhere to go and something to call it, in every spelling the registry uses.
 *
 * `href` and `label` are the preferred spellings and the ones new code should
 * write. The rest are accepted so existing callers keep working; they are not
 * deprecated so much as tolerated.
 */
export interface RegistryLink {
  /** Preferred spelling for the destination. */
  href?: string;
  /** Accepted alias for {@link RegistryLink.href}. */
  url?: string;

  /** Preferred spelling for the visible text. */
  label?: string;
  /** Accepted alias for {@link RegistryLink.label}. */
  title?: string;
  /** Accepted alias for {@link RegistryLink.label}. */
  name?: string;
  /** Accepted alias for {@link RegistryLink.label}. */
  text?: string;
}

/**
 * The destination, whichever spelling the caller used.
 *
 * Returns `"#"` rather than `undefined` when a link carries no destination at
 * all, because that is what an anchor with nowhere to go should be: inert and
 * visible, not a crash and not a navigation to the string "undefined".
 */
export function linkHref(link: RegistryLink | undefined): string {
  if (!link) return "#";
  return link.href ?? link.url ?? "#";
}

/**
 * The visible text, whichever spelling the caller used.
 *
 * Order matters where a caller supplied more than one: `label` is the registry's
 * majority spelling and wins, then the aliases in descending frequency. Returns
 * `""` for a link with no text, which renders as an empty anchor — wrong-looking
 * in a way a reader will notice, which is better than a component that throws.
 */
export function linkLabel(link: RegistryLink | undefined): string {
  if (!link) return "";
  return link.label ?? link.title ?? link.name ?? link.text ?? "";
}

/**
 * The heading on a group of links, in every spelling the registry uses.
 *
 * WHY THIS IS SEPARATE FROM {@link RegistryLink}. A footer column is not a link
 * — it has no destination — so it cannot share the shape. But it had the same
 * defect: the heading was spelt `title` on 12 of the 14 link-group containers
 * and `label` on the other 2, with no way for a caller to know which. That is
 * the identical coin flip that cost a build, one notch less likely to come up.
 * Fixing the link and leaving this would have been fixing half a defect.
 */
export interface RegistryGroupHeading {
  /** Preferred spelling for the group heading. */
  title?: string;
  /** Accepted alias for {@link RegistryGroupHeading.title}. */
  label?: string;
  /** Accepted alias for {@link RegistryGroupHeading.title}. */
  heading?: string;
  /** Accepted alias for {@link RegistryGroupHeading.title}. */
  name?: string;
}

/**
 * The group heading, whichever spelling the caller used.
 *
 * `title` wins here where `label` wins in {@link linkLabel}, because these are
 * two different populations and each resolver follows its own majority.
 */
export function groupLabel(group: RegistryGroupHeading | undefined): string {
  if (!group) return "";
  return group.title ?? group.label ?? group.heading ?? group.name ?? "";
}
