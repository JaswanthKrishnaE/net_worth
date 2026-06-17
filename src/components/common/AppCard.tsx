import { View, ViewProps, StyleSheet } from 'react-native';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export default function AppCard({
  style,
  children,
  ...props
}: ViewProps) {
  const colors = useTheme();

  return (
    <View
      {...props}
      style={[
        styles.card,
        {
          backgroundColor:
            colors.backgroundElement,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
});