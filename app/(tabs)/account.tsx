import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { AppKitButton } from '@reown/appkit-ethers-react-native';

export default function LoginScreen() {
  const { user } = useSession();
  return (
    <ThemedView style={{ height: '100%' }}>
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
          <AppKitButton size={'sm'}></AppKitButton>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
