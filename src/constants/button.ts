import { Platform } from "react-native";

export const BUTTON_COLOR = Platform.select({
  ios: "#007aff",
  android: "#1976d2",
  default: "#1976d2",
});

export const buttonShape = Platform.select({
  ios: {
    borderRadius: 24,
  },
  android: {
    borderRadius: 6,
    elevation: 3,
  },
  default: {
    borderRadius: 8,
  },
});