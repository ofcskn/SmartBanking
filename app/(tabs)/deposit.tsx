import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { useAppKitAccount } from '@reown/appkit-ethers-react-native';
import axios, { AxiosHeaders } from 'axios';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useState } from 'react';
import { ThemedButton } from '@/components/ThemedButton';

export default function DepositScreen() {
  const { address, isConnected } = useAppKitAccount();
  const { user, session } = useSession();
  const [amount, setAmount] = useState(0);
  const [walletAddress, setWalletAddress] = useState(address);

  const deposit = async () => {
    // console 
    await console.log(amount);

    console.log("xyz");
    
    if (user){
      // deposit to the bank your eth
      await axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/banking/deposit`, {
        amountEth: amount,
        userId: user?._id
      })
      .then((response) => {
        console.log("resp", response);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
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
    
            <ThemedText type='default'>Amount (ETH)</ThemedText>
            <ThemedTextInput
            onChangeText={(data) => setAmount(parseInt(data))}
            value={amount.toString()}
            placeholder="Amount"
          />
           <ThemedText type='default'>Personal Wallet Address</ThemedText>
            <ThemedTextInput
            value={walletAddress}
            readOnly
            placeholder="Email"
          />
          <ThemedText type='default'>Choose a bank to deposit.</ThemedText>
            <ThemedTextInput
            value="The Bank"
            readOnly
          />
            <ThemedButton
            title="Deposit"
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
