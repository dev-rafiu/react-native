import { Text, TextProps } from "react-native";

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
      className="font-black tracking-[4px]"
      style={[
        {
          fontSize: size,
          color,
          textShadowColor: glowColor,
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 12,
        },
        style,
      ]}
      {...props}
    >
      TASKLY
    </Text>
  );
}
