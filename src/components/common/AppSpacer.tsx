import { View } from 'react-native';

export default function AppSpacer({
  size,
}: {
  size: number;
}) {
  return <View style={{ height: size }} />;
}