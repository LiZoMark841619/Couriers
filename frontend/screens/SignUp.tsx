import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import api from '../api';

// useState is a React Hook for managing local state in a function component.
// StackNavigationProp and RootStackParamList are used for type-safe navigation.

export default function SignUp() {
  // Type the navigation prop for type safety
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'SignUp'>>();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    try {
      const response = await api.post('/sign_up', { username, email, password });
      if (response.status === 201) {
        alert('Sign up successful! You can now sign in.');
        navigation.navigate('SignIn');
      } else {
        setError('Sign up failed. Please try again.');
      }
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
        'Sign up failed. Please check your details and try again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
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
      <Button title="Submit" onPress={handleSignUp} />
      <Button
        title="Already have an account? Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
      {/* Example: Navigate to Home (if you want to test Home navigation) */}
      {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 6 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});