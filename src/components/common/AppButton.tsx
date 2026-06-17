import { Pressable, StyleSheet, Text } from "react-native";

import { Radius, Spacing } from "@/constants/theme";

import { useTheme } from "@/hooks/use-theme";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
  textStyle?: any;
}

export default function AppButton({
  title,
  onPress,
  style,
  textStyle,
}: AppButtonProps) {
  const colors = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: colors.backgroundSelected,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            color: colors.text,
            fontWeight: "600",
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.three,
    borderRadius: Radius.md,
    alignItems: "center",
  },
});
