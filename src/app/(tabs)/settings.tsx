import { StyleSheet } from "react-native";
import { AppSpacer, AppText, Screen } from "@/components/common";
import { SelectedProfileCard } from "@/components/settings/SelectedProfileCard";
import { ProfileSection, ThemeSection , AssetSection , BrokerSection , EntitySection, TransactionStatusSection,SubClassSection} from "@/components/settings";

export default function Settings() {
  return (
    <Screen>
      <AppText style={styles.header}>Settings</AppText>
      <SelectedProfileCard />
      <AppSpacer size={16} />
      <AppText style={styles.sectionHeader} secondary>
        Profile
      </AppText>
      <ProfileSection />

      <AppSpacer size={16} />
      <AppText style={styles.sectionHeader} secondary>
        Apperance
      </AppText>
      <ThemeSection />

      <AppSpacer size={16} />
      <AppText style={styles.sectionHeader} secondary>
        Advanced Settings
      </AppText>
      <AssetSection />

      <AppSpacer size={16} />

      <BrokerSection />

      <AppSpacer size={16} />

      <EntitySection />
      
      <AppSpacer size={16} />
      <TransactionStatusSection />
      
      <AppSpacer size={16} />
      <SubClassSection />
    </Screen>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 32,         // Large, impactful size
    fontWeight: "800",    // Extra bold for authority
    marginBottom: 24,     // Generous space before the Profile Card
    marginTop: 8,         // Slight spacing from the screen edge
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 16,
    textTransform: 'uppercase', // Makes it feel more like a structural label
  },
});