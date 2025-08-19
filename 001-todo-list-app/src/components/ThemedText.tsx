import { Text, TextProps } from "react-native";
import { Typography, FontFamily } from "@/src/constants/Typography";

interface ThemedTextProps extends TextProps {
  variant?: keyof typeof Typography;
  weight?: keyof typeof FontFamily;
  children: React.ReactNode;
}

export default function ThemedText({
  variant = "bodyMedium",
  weight,
  style,
  children,
  ...props
}: ThemedTextProps) {
  const baseStyle = Typography[variant];

  const textStyle = weight
    ? { ...baseStyle, fontFamily: FontFamily[weight] }
    : baseStyle;

  return (
    <Text style={[textStyle, style]} {...props}>
      {children}
    </Text>
  );
}
