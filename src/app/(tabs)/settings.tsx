import { AppSpacer, Screen } from "@/components/common";

import { ProfileSection, ThemeSection , AssetSection } from "@/components/settings";

export default function Settings() {
  return (
    <Screen>
      <ProfileSection />

      <AppSpacer size={16} />

      <ThemeSection />

      <AppSpacer size={16} />

      <AssetSection />
    </Screen>
  );
}
