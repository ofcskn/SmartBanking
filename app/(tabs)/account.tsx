import { StyleSheet, Button, Modal, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../ctx';
import { Redirect } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 20 }}>
        <ThemedView style={{ marginBottom: 10 }}>
          <ThemedText>ACCOUNT</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
