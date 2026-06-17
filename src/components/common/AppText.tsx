import { Text, TextProps, StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface AppTextProps extends TextProps {
  secondary?: boolean;
}

export default function AppText({
  secondary = false,
  style,
  ...props
}: AppTextProps) {
  const colors = useTheme();

  return (
    <Text
      {...props}
      style={[
        styles.text,
        {
          color: secondary
            ? colors.textSecondary
            : colors.text,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: Fonts.sans,
  },
});