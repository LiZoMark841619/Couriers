import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

export default function Navbar() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navbar}>
      <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('SignIn')} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e7e7e7',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});