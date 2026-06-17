import { StyleSheet, Text, View } from 'react-native'
import {
  AppText,
} from '@/components/common';
import { Ionicons } from '@expo/vector-icons'

const GreetingsCard = () => {
  return (
	<>
		<AppText>
			Good Morning , Jaswanth!
			<Ionicons name="sunny" size={24} color="orange" />
		</AppText>
		<AppText secondary style={{fontSize : 14}}>
			Track your wealth across all investments
		</AppText>
	</>
  )
}

export default GreetingsCard

const styles = StyleSheet.create({})