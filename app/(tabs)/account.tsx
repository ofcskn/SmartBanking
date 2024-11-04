import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
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
