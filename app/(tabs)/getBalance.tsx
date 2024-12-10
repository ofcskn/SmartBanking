import { StyleSheet, Button, Modal, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import {
  AppKitButton,
  useAppKitAccount,
  useAppKitProvider,
} from '@reown/appkit-ethers-react-native';
import axios, { AxiosHeaders } from 'axios';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { BrowserProvider } from 'ethers';

export default function GetBalanceScreen() {
  const { address, isConnected } = useAppKitAccount();
  const { user, session } = useSession();
  const { walletProvider } = useAppKitProvider();

  const getBalance = async () => {
    if (walletProvider != undefined && user && session && isConnected) {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const message = `Get your balance that is in The Secure Bank!`;
      const signature = await signer.signMessage(message);

      // deposit to the bank your eth
      await axios
        .post(`${process.env.EXPO_PUBLIC_API_URL}/banking/balance`, {
          publicAddress: address,
          signature: signature,
        })
        .then((response) => {
          console.log(response.data);
          Alert.alert(
            'Successful!',
            `You balance is ${response.data.balance}.`,
            [{ text: 'Ok!' }]
          );
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    } else {
      throw Error('Please connect to the application.');
    }
  };

  return (
    <ThemedView style={{ height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ margin: 20 }}>
          <ThemedText type="default">Choose a bank to deposit.</ThemedText>
          <ThemedTextInput value="The Bank" readOnly />
          <ThemedButton
            title="Get Balance"
            onPress={() => {
              getBalance();
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
