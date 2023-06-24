/**
 *
 * @param {string} original
 * @param {string} lastSeparator
 * @returns
 */
export function stringAfter(original, lastSeparator) {
  return original.substring(original.lastIndexOf(lastSeparator) + 1);
}
