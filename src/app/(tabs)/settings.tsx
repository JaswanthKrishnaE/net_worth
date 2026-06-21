import { AppSpacer, Screen } from "@/components/common";

import { ProfileSection, ThemeSection , AssetSection , BrokerSection , EntitySection, TransactionStatusSection} from "@/components/settings";

export default function Settings() {
  return (
    <Screen>
      <ProfileSection />

      <AppSpacer size={16} />

      <ThemeSection />

      <AppSpacer size={16} />

      <AssetSection />

      <AppSpacer size={16} />

      <BrokerSection />

      <AppSpacer size={16} />

      <EntitySection />
      
      <AppSpacer size={16} />
      <TransactionStatusSection />
    </Screen>
  );
}
