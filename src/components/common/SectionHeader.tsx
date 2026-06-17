import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({
  title,
}: SectionHeaderProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
  },
});