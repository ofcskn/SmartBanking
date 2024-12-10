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

export default function DepositScreen() {
  const { address, isConnected } = useAppKitAccount();
  const { user, session } = useSession();
  const [amount, setAmount] = useState('');
  const { walletProvider } = useAppKitProvider();

  const deposit = async () => {
    if (walletProvider != undefined && user && isConnected) {
      if (parseInt(amount) > 0) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const signer = await ethersProvider.getSigner();
        const message = `${address} is depositing ${amount} ETH to The Secure Bank!`;
        const signature = await signer.signMessage(message);

        // deposit to the bank your eth
        await axios
          .post(`${process.env.EXPO_PUBLIC_API_URL}/banking/deposit`, {
            publicAddress: address,
            amountEth: amount,
            signature: signature,
          })
          .then((response) => {
            setAmount('');
            Alert.alert('Successful!', 'You deposited successfully!.', [
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
  // middleware
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
          <ThemedText type="default">Choose a Wallet</ThemedText>
          <AppKitButton
            label="Connect Your Wallet to Deposit"
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
            title="Sign and Deposit"
            onPress={() => {
              deposit();
            }}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({});
