// Paseo draws the keyboard over the app without resizing anything: iOS never resizes, and Android runs
// edge-to-edge with react-native-keyboard-controller, so the window keeps its size there too.
// Text fields near the bottom end up under it. Web has no on-screen keyboard events.
import { useEffect, useState } from "react";
import { Dimensions, Keyboard, Platform } from "react-native";

/** The keyboard's top edge in window coordinates while it is open on a phone; otherwise null. */
export function useKeyboardTop(): number | null {
  const [top, setTop] = useState<number | null>(null);
  useEffect(() => {
    if (Platform.OS !== "ios" && Platform.OS !== "android") return;
    // Android only sends the Did events; it sends Show again when the keyboard's height changes.
    const ios = Platform.OS === "ios";
    const change = Keyboard.addListener(ios ? "keyboardWillChangeFrame" : "keyboardDidShow", (event) => {
      const y = event.endCoordinates.screenY;
      setTop(y < Dimensions.get("window").height ? y : null);
    });
    const hide = Keyboard.addListener(ios ? "keyboardWillHide" : "keyboardDidHide", () => setTop(null));
    return () => {
      change.remove();
      hide.remove();
    };
  }, []);
  return top;
}
