// The plugin's text fields are a bare input inside a rounded box. Web draws its focus outline around the
// input, a square inside the box, so the input drops it and the box's border shows focus instead.
import type { PluginTheme } from "@getpaseo/plugin";
import { useMemo, useState } from "react";
import { useOwnField } from "./chat-nav";

/** Style for the input itself. */
export const bareInput = { outlineWidth: 0 } as const;

/** Focus handlers for the input, and the border colour for its box. */
export function useField(theme: PluginTheme): { input: { onFocus(): void; onBlur(): void }; borderColor: string } {
  const own = useOwnField();
  const [focused, setFocused] = useState(false);
  const input = useMemo(
    () => ({
      onFocus() {
        own.onFocus();
        setFocused(true);
      },
      onBlur() {
        own.onBlur();
        setFocused(false);
      },
    }),
    [own],
  );
  return { input, borderColor: focused ? theme.colors.accent : theme.colors.border };
}
