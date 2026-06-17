import { StyleSheet, View } from 'react-native';

import {
AppCard,
AppText,
SectionHeader,
} from '@/components/common';

const allocations = [
{
name: 'Equity',
value: '₹6,00,000',
percentage: '50%',
},
{
name: 'Mutual Funds',
value: '₹3,00,000',
percentage: '25%',
},
{
name: 'EPF',
value: '₹2,00,000',
percentage: '17%',
},
{
name: 'Cash',
value: '₹1,00,000',
percentage: '8%',
},
];

export default function AssetAllocationCard() {
return ( 
<AppCard> 
    <SectionHeader title="Asset Allocation" />

  {allocations.map((item) => (
    <View
      key={item.name}
      style={styles.row}
    >
      <View>
        <AppText>
          {item.name}
        </AppText>

        <AppText secondary>
          {item.value}
        </AppText>
      </View>

      <AppText style={styles.percent}>
        {item.percentage}
      </AppText>
    </View>
  ))}
</AppCard>


);
}

const styles = StyleSheet.create({
row: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
paddingVertical: 10,
},

percent: {
fontWeight: '700',
fontSize: 16,
},
});
