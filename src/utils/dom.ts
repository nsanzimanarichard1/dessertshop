export function qs<T extends HTMLElement>(
  selector: string
): T {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Element not found: ${selector}`);
  return el as T;
}
