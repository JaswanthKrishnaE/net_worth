import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
    AppButton,
  AppCard,
  AppText,
} from '@/components/common';


type TabType = 'assets' | 'entity' | 'broker';

type AllocationCardProps = {
  selected: TabType;
  onChange: (value: TabType) => void;
  allocationData: {
    assets: { name: string; percent: number }[];
    entity: { name: string; percent: number }[];
    broker: { name: string; percent: number }[];
  };
};

export default function AllocationCard({
  selected,
  onChange,
  allocationData,
}: AllocationCardProps) {
  return (
    <AppCard>
      <View style={styles.tabs}>
        <AppButton
          title="Assets"
          onPress={() => onChange('assets')}
        />

        <AppButton
          title="Entity"
          onPress={() => onChange('entity')}
        />

        <AppButton
          title="Broker"
          onPress={() => onChange('broker')}
        />
      </View>

      <View style={styles.content}>
        {allocationData[selected].map((item) => (
          <View key={item.name} style={styles.row}>
            <AppText>{item.name}</AppText>
            <AppText>{item.percent}%</AppText>
          </View>
        ))}
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    gap: 8,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },

  activeTab: {
    borderBottomWidth: 2,
  },

  content: {
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});