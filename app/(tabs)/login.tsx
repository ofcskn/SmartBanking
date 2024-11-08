import { StyleSheet, Button, Modal, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../ctx';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { signIn, session } = useSession();

  // if (session) {
  //   return <Redirect href="/(tabs)/" />;
  // }

  return (
    <ThemedView style={{ height: '100%' }}>
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
            <Button
              title="Login"
              onPress={() => {
                //sign in
                signIn(email, password);

                // Clear data
                setEmail('');
                setPassword('');
              }}
            />
          </ThemedView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
