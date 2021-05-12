import { format } from "date-fns";
import DOMPurify from "dompurify";
import marked from "marked";
import { Configuration, init } from "ityped";

// Sets target="_blank" rel="noopener noreferrer" on external links
export const handleExternalLinks = () => {
  const allLinks = Array.from(document.querySelectorAll("a"));
  if (allLinks.length > 0) {
    allLinks.forEach((link) => {
      if (isClient() && link.host !== window.location.host) {
        link.setAttribute("rel", "noopener noreferrer");
        link.setAttribute("target", "_blank");
      }
    });
  }
};

export const inlineLinks = (className: string) => {
  const elements = Array.from(document.getElementsByClassName(className));
  const allLinks = Array<HTMLElement[]>();
  elements.forEach((el) =>
    allLinks.push(Array.from(el.getElementsByTagName("a")))
  );
  if (allLinks.length > 0) {
    allLinks.forEach((links) => {
      links.forEach((link) => link.classList.add("inline-link"));
    });
  }
};

export const urlize = (term: string): string => {
  return term.trim().toLowerCase().replace(/\s+/g, "-");
};
// @ts-ignore
export const isClient = (): boolean => process.isClient;
// @ts-ignore
export const isServer = (): boolean => process.isServer;

export const addEventToClassName = (
  className: string,
  func: Function,
  event = "click"
): void => {
  if (isClient()) {
    const elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((element) =>
      element.addEventListener(event, () => func())
    );
  }
};
// this function get string with text [-YEAR-{2017}] and return the years of experience
export const yearsOfExperience = (text: string): string => {
  const mask: RegExpMatchArray | null = text?.match("{[0-9]+}");
  const year: number = mask
    ? Number.parseInt(mask[0].replace("{", "").replace("}", ""))
    : 1993;
  const currentYear: number = new Date()?.getFullYear();
  return text?.replace(`[-YEAR-{${year}}]`, `${currentYear - year}`);
};

export const formatDate = (date: string, dateFormat = "MMMM, yyyy"): string => {
  const dateT = date ? Date.parse(date) : new Date();
  return format(dateT, dateFormat);
};
/**
 * Capitalize first char of string
 * @param {string} s String to capitalize
 * @returns {string}
 */
export const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
/**
 * markdownfy the string
 * @param {string} str String to markdownfy
 * @returns {string}
 */
export const markdownfy = (str: string): string =>
  isClient() ? DOMPurify.sanitize(marked(str)) : "";

export const typed = (
  element: string | Element,
  config: Configuration = { showCursor: false, strings: ["Yuniel", "Acosta"] }
) => {
  const elementNODE =
    typeof element === "string" ? document.querySelector(element) : element;
  if (elementNODE) {
    elementNODE.innerHTML = "";
  }
  if (elementNODE) {
    init(elementNODE, config);
  }
};
