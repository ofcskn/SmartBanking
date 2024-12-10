import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import {
  AppKitButton,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import { useAppKitAccount } from '@reown/appkit-ethers-react-native';
import axios, { AxiosHeaders } from 'axios';

export default function AccountScreen() {
  const { address, chainId, isConnected } = useAppKitAccount();
  const { user, session } = useSession();
  const { walletProvider } = useAppKitProvider();

  if (isConnected && user) {
    async () => {
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/users/saveWallet`, {
          headers: new AxiosHeaders('authorization: ' + session),
          address: address,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          throw Error('The wallet cannot be saved.');
        });
    };
  }
  return (
    <ThemedView style={{ height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ margin: 20 }}>
          <ThemedText type="title">ACCOUNT</ThemedText>
          <ThemedText>Name: {user?.name}</ThemedText>
          <ThemedText>Email: {user?.email}</ThemedText>
          <ThemedText>Wallet Address: {user?.walletAddress}</ThemedText>
          <ThemedText>Chain Id: {chainId}</ThemedText>
          <AppKitButton
            label="Connect Your Wallet"
            balance="show"
          ></AppKitButton>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
