import { View, StyleSheet } from 'react-native';

import AppText from './AppText';

interface StatItemProps {
  label: string;
  value: string;
}

export default function StatItem({
  label,
  value,
}: StatItemProps) {
  return (
    <View style={styles.container}>
      <AppText secondary>
        {label}
      </AppText>

      <AppText style={styles.value}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
  },
});