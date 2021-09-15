import { kebabCase } from "lodash";

/**
 * hyperscript function delegating to native dom api
 */
// eslint-disable-next-line id-length
export const h = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  props: Partial<HTMLElementTagNameMap[T]>
) => Object.assign(document.createElement(tag), props);

/** used to stringify css style objects */
export const toCSSText = (styles: CSSStyleDeclaration): string =>
  Object.entries(styles)
    .map(([prop, value]) => kebabCase(prop) + ":" + value)
    .join(";");

/** used to avoid subpixel rendering */
export const px = (num: number, fractionDigits: number = 0) =>
  num.toFixed(fractionDigits) + "px";
