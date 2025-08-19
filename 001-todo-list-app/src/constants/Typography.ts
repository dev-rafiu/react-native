import { TextStyle } from "react-native";

// Font Family Constants
export const FontFamily = {
  thin: "Poppins-Thin",
  extraLight: "Poppins-ExtraLight",
  light: "Poppins-Light",
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
  extraBold: "Poppins-ExtraBold",
  black: "Poppins-Black",
} as const;

// Typography Styles
export const Typography = {
  // Headings
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  } as TextStyle,

  h2: {
    fontFamily: FontFamily.bold,
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.3,
  } as TextStyle,

  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.2,
  } as TextStyle,

  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: -0.1,
  } as TextStyle,

  h5: {
    fontFamily: FontFamily.medium,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  } as TextStyle,

  h6: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0,
  } as TextStyle,

  // Body Text
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: 0.1,
  } as TextStyle,

  bodyMedium: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.1,
  } as TextStyle,

  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  } as TextStyle,

  bodyXSmall: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
  } as TextStyle,

  // Labels
  labelLarge: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.2,
  } as TextStyle,

  labelMedium: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
  } as TextStyle,

  labelSmall: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,

  // Buttons
  buttonLarge: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  } as TextStyle,

  buttonMedium: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
  } as TextStyle,

  buttonSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  } as TextStyle,

  // Caption
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  } as TextStyle,

  // Overline
  overline: {
    fontFamily: FontFamily.medium,
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 1.5,
    textTransform: "uppercase" as const,
  } as TextStyle,
} as const;

// Helper function to create custom text styles
export const createTextStyle = (
  fontFamily: keyof typeof FontFamily,
  fontSize: number,
  lineHeight?: number,
  letterSpacing?: number
): TextStyle => ({
  fontFamily: FontFamily[fontFamily],
  fontSize,
  lineHeight: lineHeight || fontSize * 1.4,
  letterSpacing,
});
