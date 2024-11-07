import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';

export default function LoginScreen() {
  const { user } = useSession();
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 20 }}>
        <ThemedText type="title">ACCOUNT</ThemedText>
        <ThemedText>Name: {user?.name}</ThemedText>
        <ThemedText>Email: {user?.email}</ThemedText>
        <ThemedText>
          Wallet Address:{' '}
          {user?.walletAddress ? (
            user?.walletAddress
          ) : (
            <>
              <ThemedText type="link">Create a wallet</ThemedText>
            </>
          )}
        </ThemedText>
        <ThemedText>
          Balance: {user?.balance == null ? '0' : user?.balance} ETH
        </ThemedText>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
