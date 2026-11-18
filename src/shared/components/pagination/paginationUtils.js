/**
 * Normalizes Laravel pagination meta into a consistent shape.
 *
 * @param {object} [meta]
 * @returns {{ currentPage: number, totalPages: number, totalItems: number, pageSize: number }}
 */
export function getPaginationFromMeta(meta = {}) {
  return {
    currentPage: Number(meta.current_page) || 1,
    totalPages: Number(meta.last_page) || 1,
    totalItems: Number(meta.total) || 0,
    pageSize: Number(meta.per_page) || 15,
  };
}

/**
 * @param {number} currentPage
 * @param {number} pageSize
 * @param {number} totalItems
 * @returns {{ from: number, to: number }}
 */
export function getPageRange(currentPage, pageSize, totalItems) {
  if (!totalItems) {
    return { from: 0, to: 0 };
  }

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return { from, to };
}
