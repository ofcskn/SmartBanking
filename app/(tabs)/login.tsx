import { StyleSheet, Button, Modal, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { router } from 'expo-router';
import { setStorageItemAsync } from '../../hooks/useStorageState';
import * as SecureStore from 'expo-secure-store';
import { ThemedView } from '@/components/ThemedView';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    axios
      .post(`${config.apiUrl}/users/login`, {
        email: email,
        password: password,
      })
      .then(async (response) => {
        if (response.status == 200) {
          const token = response.data.token;
          await setStorageItemAsync('token', token);

          // Clear data
          setEmail('');
          setPassword('');
          // Redirect to the home
          router.push('/(tabs)/');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 20 }}>
        <ThemedTextInput
          onChangeText={(data) => setEmail(data)}
          value={email}
          placeholder="Email"
        />

        <ThemedTextInput
          onChangeText={(data) => setPassword(data)}
          value={password}
          placeholder="Password"
          autoComplete="off"
          secureTextEntry={true}
          passwordRules="required: upper; required: lower; required: digit; minlength: 8;" // Example rules
        />
        <ThemedView style={{ marginBottom: 10 }}>
          <Button title="Login" onPress={(e: any) => handleSubmit()} />
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
