import { useState, useEffect, useRef, useMemo } from "react";
import { View, StyleSheet, Pressable, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetView,
  BottomSheetFlatList,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { AppText, Screen, AppSpacer } from "@/components/common";
import { useTheme } from "@/hooks/use-theme";
import { useBrokersStore, Broker } from "@/store/brokers.store";
import { Spacing, Radius } from "@/constants/theme";
import { readExcelFile } from "@/utils/readExcel";
import { useImportStore } from "@/store/import.store";
import { useRouter } from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import { findHeaderRow } from "@/utils/findHeaderCandidates";


export default function Step1() {
	const colors = useTheme();
	const [selectedBroker, setSelectedBroker] = useState<Broker | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	
	const bottomSheetRef = useRef<BottomSheet>(null);

	const { brokers, loadBrokers } = useBrokersStore();
	const router = useRouter();

	const {
		setBroker,
		setFile,
		setRawRows,
		setHeaderRow, 
	} = useImportStore();

	useEffect(() => {
		loadBrokers();
	}, []);

	// Filter brokers based on search
	const filteredBrokers = useMemo(() => {
		return brokers.filter((b) => 
		b.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [brokers, searchQuery]);

	const handleBrokerSelect = (broker: Broker) => {
		setSelectedBroker(broker);
		bottomSheetRef.current?.close();
	};
	
const handleExcelImport = async () => {
  if (!selectedBroker) {
    return;
  }

  const result = await DocumentPicker.getDocumentAsync({
    type: [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],
    copyToCacheDirectory: true,
    multiple: false,
  });

  if (result.canceled) {
    return;
  }

  const pickedFile = result.assets[0];

  const rows = await readExcelFile(
    pickedFile.uri
  );
	// ADD THESE DEBUG LOGS
	console.log("Total rows read:", rows.length);
	console.log("First 5 rows:", JSON.stringify(rows.slice(0, 5), null, 2));

	const detectedHeader = findHeaderRow(rows);
	console.log("Detected header row index:", detectedHeader);
	if (detectedHeader >= 0) {
	console.log("Header row contents:", rows[detectedHeader]);
	}
  setBroker(selectedBroker);

  setFile({
    name: pickedFile.name,
    uri: pickedFile.uri,
    mimeType: pickedFile.mimeType,
    size: pickedFile.size,
  });

  setRawRows(rows);
setHeaderRow(detectedHeader);
  router.push(
    "/transactions/import/step2"
  );
};
  return (
    <Screen scrollable={false}>
		<AppText style={[styles.header, { color: colors.text }]}>Import Transactions</AppText>
		
		{/* Selected Broker Display */}
		<View style={[styles.selectedCard, { backgroundColor: colors.backgroundElement }]}>
			<AppText style={{ color: colors.textSecondary, fontSize: 12, fontWeight: '700' }}>
			{selectedBroker ? "SELECTED BROKER" : "ACTION REQUIRED"}
			</AppText>
			<AppSpacer size={Spacing.one} />
			<AppText style={{ color: selectedBroker ? colors.text : colors.textSecondary, fontSize: 20, fontWeight: '800' }}>
			{selectedBroker ? selectedBroker.name : "Select a broker to get started"}
			</AppText>
			
			<Pressable 
			onPress={() => bottomSheetRef.current?.expand()} 
			style={styles.changeButton}
			>
			<AppText style={{ color: colors.info, fontSize: 14, fontWeight: '600' }}>
				{selectedBroker ? "Change Broker" : "Browse Brokers"}
			</AppText>
			</Pressable>
		</View>

		<AppSpacer size={Spacing.four} />


		<Pressable 
			onPress={handleExcelImport}
			style={[
			styles.optionCard, 
			{ backgroundColor: selectedBroker ? colors.backgroundSelected : colors.backgroundElement },
			{ opacity: selectedBroker ? 1 : 0.5 }
			]}
			disabled={!selectedBroker}
		>
			<Ionicons name="document-text-outline" size={24} color={colors.text} />
			<AppSpacer size={Spacing.two} />
			<AppText style={{ color: colors.text, fontWeight: '700' }}>Excel Import</AppText>
		</Pressable>

		<AppSpacer size={Spacing.two} />

		<Pressable 
			style={[
			styles.optionCard, 
			{ backgroundColor: selectedBroker ? colors.backgroundSelected : colors.backgroundElement },
			{ opacity: selectedBroker ? 1 : 0.5 }
			]}
			disabled={!selectedBroker}
		>
			<Ionicons name="reader-outline" size={24} color={colors.text} />
			<AppSpacer size={Spacing.two} />
			<AppText style={{ color: colors.text, fontWeight: '700' }}>PDF Import</AppText>
		</Pressable>

		<BottomSheet
			ref={bottomSheetRef}
			index={-1}
			snapPoints={["75%"]}
			enablePanDownToClose
			keyboardBehavior="interactive"
			keyboardBlurBehavior="restore"
			backgroundStyle={{
			backgroundColor: colors.backgroundElement,
			}}
			handleIndicatorStyle={{
			backgroundColor: colors.textSecondary,
			}}
		>
			<BottomSheetView style={styles.sheetContent}>
			<AppText style={[styles.sheetHeader, { color: colors.text }]}>Select Broker</AppText>
			
			{/* Search Input */}
			<View style={[styles.searchContainer, { backgroundColor: colors.backgroundSelected }]}>
				<Ionicons name="search" size={18} color={colors.textSecondary} />
				<BottomSheetTextInput
				style={[styles.searchInput, { color: colors.text }]}
				placeholder="Search brokers..."
				placeholderTextColor={colors.textSecondary}
				value={searchQuery}
				onChangeText={setSearchQuery}
				/>
			</View>

			<BottomSheetFlatList
				data={filteredBrokers}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
				<Pressable
					style={[styles.brokerItem, { borderBottomColor: colors.backgroundSelected }]}
					onPress={() => handleBrokerSelect(item)}
				>
					<AppText style={{ color: colors.text, fontSize: 16 }}>{item.name}</AppText>
					<Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
				</Pressable>
				)}
			/>
			</BottomSheetView>
		</BottomSheet>
    </Screen>
  );
  
}

const styles = StyleSheet.create({
  header: { fontSize: 28, fontWeight: '800', marginBottom: Spacing.four },
  selectedCard: { padding: Spacing.three, borderRadius: Radius.md },
  changeButton: { marginTop: Spacing.two },
  optionCard: { padding: Spacing.four, borderRadius: Radius.lg, flexDirection: 'row', alignItems: 'center' },
  sheetContent: { paddingHorizontal: Spacing.four, flex: 1 },
  sheetHeader: { fontSize: 20, fontWeight: '700', marginBottom: Spacing.three },
  searchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: Spacing.two, 
    borderRadius: Radius.md, 
    marginBottom: Spacing.three 
  },
  searchInput: { flex: 1, padding: Spacing.two, marginLeft: Spacing.one },
  brokerItem: { paddingVertical: Spacing.three, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1 }
});