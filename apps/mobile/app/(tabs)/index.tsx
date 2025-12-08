import { View, Text } from 'react-native';

export default function FeedScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Burger Fest Feed</Text>
      <Text className="text-gray-600 mt-2">Welcome to the feed!</Text>
    </View>
  );
}
