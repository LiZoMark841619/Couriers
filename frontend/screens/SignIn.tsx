import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import api from '../api';
import * as SecureStore from 'expo-secure-store';

// useState is a React Hook for managing local state in a function component.
// SecureStore is used for securely storing sensitive data like JWT tokens on the device.
// StackNavigationProp and RootStackParamList are used for type-safe navigation.

export default function SignIn() {
  // Type the navigation prop for type safety
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignIn'>>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');
    try {
      const response = await api.post('/sign_in', { username, password });
      if (response.status === 200) {
        // Store the JWT token securely
        await SecureStore.setItemAsync('access_token', response.data.access_token);
        // Navigate to Home (replace 'Home' with your main screen name if you add one)
        // navigation.navigate('Home');
      } else {
        setError('Sign in failed. Please try again.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        'Invalid credentials or network error.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Submit" onPress={handleSignIn} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 6 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});