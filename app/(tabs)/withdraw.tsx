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
import { useState } from 'react';
import { ThemedButton } from '@/components/ThemedButton';
import { BrowserProvider } from 'ethers';

export default function WithdrawScreen() {
  const { address, isConnected } = useAppKitAccount();
  const { user, session } = useSession();
  const [amount, setAmount] = useState('');
  const { walletProvider } = useAppKitProvider();

  const withdraw = async () => {
    if (walletProvider != undefined && user && session && isConnected) {
      if (parseInt(amount) > 0) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const message = `${address} is withdrawing ${amount} ETH from The Secure Bank!`;
        const signature = await signer.signMessage(message);

        // deposit to the bank your eth
        await axios
          .post(`${process.env.EXPO_PUBLIC_API_URL}/banking/withdraw`, {
            publicAddress: address,
            amountEth: amount,
            signature: signature,
          })
          .then((response) => {
            setAmount('');
            Alert.alert('Successful!', 'You withdrawed successfully!.', [
              { text: 'Ok!' },
            ]);
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      } else {
        Alert.alert('Oops!', 'The amount cannot be 0.', [{ text: 'Ok!' }]);
      }
    } else {
      throw Error('Please connect to the application.');
    }
  };

  return (
    <ThemedView style={{ height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ margin: 20 }}>
          <ThemedText type="default">Choose a Wallet</ThemedText>
          <AppKitButton
            label="Connect Your Wallet to WithDraw"
            balance="show"
          ></AppKitButton>
          <ThemedText type="default">Amount (ETH)</ThemedText>
          <ThemedTextInput
            onChangeText={(data) => setAmount(data)}
            keyboardType="numeric"
            value={amount.toString()}
            placeholder="Amount"
          />
          <ThemedText type="default">Choose a bank to deposit.</ThemedText>
          <ThemedTextInput value="The Bank" readOnly />
          <ThemedText type="default"></ThemedText>
          <ThemedButton
            title="Sign and Withdraw"
            onPress={() => {
              withdraw();
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
