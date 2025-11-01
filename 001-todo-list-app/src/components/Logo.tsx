import { Text, StyleSheet, TextProps } from "react-native";

interface LogoProps extends TextProps {
  size?: number;
  color?: string;
  glowColor?: string;
}

export function Logo({
  size = 22,
  color = "#0EA5E9",
  glowColor = "#63D9F3",
  style,
  ...props
}: LogoProps) {
  return (
    <Text
      style={[
        styles.logo,
        {
          fontSize: size,
          color,
          textShadowColor: glowColor,
        },
        style,
      ]}
      {...props}
    >
      TASKLY
    </Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "900",
    letterSpacing: 4,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
});
