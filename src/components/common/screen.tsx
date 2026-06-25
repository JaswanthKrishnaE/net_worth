import { ReactNode } from 'react';
import { ScrollView, StyleSheet ,View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

interface ScreenProps {
  children: ReactNode;
  scrollable?: boolean;
  noPadding?: boolean; // Add this prop
}

export default function Screen({
  children,
  scrollable = true,
  noPadding = false, // Default to false so you don't break existing screens
}: ScreenProps) {
  const colors = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[
            styles.content,
            noPadding && { paddingHorizontal: 0 } // Override padding if noPadding is true
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, !noPadding && styles.content]}>
            {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    paddingHorizontal: Spacing.three,
    paddingBottom: 24,
  },
});