import { View, Text, StyleSheet } from 'react-native';

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aaloo Feed</Text>
      <Text style={styles.subtitle}>Welcome to the feed!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});
