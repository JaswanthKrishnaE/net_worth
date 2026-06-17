import { useState } from 'react';

import {
  Screen,
  AppCard,
  AppText,
  AppSpacer,
  AppButton,
} from '@/components/common';

export default function ProfilesScreen() {
  const [selectedId, setSelectedId] =
    useState(1);

  const profiles = [
    {
      id: 1,
      name: 'Personal',
    },
    {
      id: 2,
      name: 'Family',
    },
    {
      id: 3,
      name: 'Retirement',
    },
  ];

  return (
    <Screen>
      {profiles.map(profile => (
        <AppCard
          key={profile.id}
          style={{
            marginBottom: 8,
          }}
        >
          <AppText>
            {selectedId === profile.id
              ? '✓ '
              : ''}
            {profile.name}
          </AppText>
        </AppCard>
      ))}

      <AppSpacer size={16} />

      <AppButton
        title="Add Profile"
        onPress={() => {}}
      />
    </Screen>
  );
}