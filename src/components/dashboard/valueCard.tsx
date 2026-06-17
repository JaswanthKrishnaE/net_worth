import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  AppCard,
  AppText,
} from '@/components/common';

type ValueCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

const ValueCard = ({
  icon,
  label,
  value,
}: ValueCardProps) => {
  return (
    <AppCard style={styles.card}>
      <Ionicons
        name={icon}
        size={20}
        color="green"
      />

      <AppText secondary>
        {label}
      </AppText>

      <AppText style={styles.value}>
        {value}
      </AppText>
    </AppCard>
  );
};

export default ValueCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },

  value: {
    fontWeight: '700',
  },
});