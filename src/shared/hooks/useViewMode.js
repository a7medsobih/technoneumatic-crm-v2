import { useState } from "react";

import { VIEW_TABLE } from "@/shared/components/toolbar/ViewToggle";

/**
 * Small helper to manage the table/cards view state on a page.
 * Each page passes its own default (falls back to the table view).
 *
 * @param {"table" | "cards"} [defaultView]
 */
export function useViewMode(defaultView = VIEW_TABLE) {
  const [view, setView] = useState(defaultView);

  return {
    view,
    setView,
    isTable: view === "table",
    isCards: view === "cards",
  };
}
