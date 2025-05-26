import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../api';

export default function SignIn() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await api.post('/sign_in', { username, password });
      // Handle successful login (e.g., save token, navigate)
    } catch (err) {
      setError('Invalid credentials');
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
      <Button title="Don't have an account? Sign Up" onPress={() => navigation.canGoBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 6 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});
