import { StyleSheet, View } from 'react-native';

import {
  AppText,
  AppCard,
  SectionHeader,
  AppSpacer,
} from '@/components/common';

const NetWorthCard = () => {
  return (
	<>
		<AppCard>
			<SectionHeader title="Net Worth" />

			<AppText style={styles.netWorth}>
				₹ 12,000
			</AppText>

			<View style={styles.row}>
				<AppText secondary>
				+₹ 2,000
				</AppText>

				<AppText secondary>
				(1.67%)
				</AppText>
			</View>
		</AppCard>
		<AppSpacer size={16} />
		<AppCard>
			<SectionHeader title="Assets vs Liabilities"/>
			<AppText>
				Total Assets: ₹ 12,000
			</AppText>
			<AppText>
				Total Liabilities: ₹ 0
			</AppText>
			<AppText>
				Net Assets: ₹ 12,000
			</AppText>
		</AppCard>
	</>
  );
};

export default NetWorthCard;

const styles = StyleSheet.create({
	netWorth: {
		fontSize: 32,
		fontWeight: '700',
	},

	row: {
		flexDirection: 'row',
		gap: 8,
	}
});