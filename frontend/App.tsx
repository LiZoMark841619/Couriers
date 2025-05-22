import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.welcome}>Welcome to Couriers App!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    top: -200,
    fontFamily: 'Arial', // You can adjust this value
    fontSize: 28, // You can adjust this value
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333', // You can adjust this value
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});