import { Image, StyleSheet, Platform, SectionList, Button, Modal, View, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/User';

export default function HomeScreen() {
    const [data, setData] = useState<User[]>();
    const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

    // Creating a user
    const [name, setName] = useState<string>('');
    const [walletAddress, setWalletAddress] = useState<string>('');
    const [email, setEmail] = useState<string>('');
  
  const handleSubmit = (e:any) =>  {
        const response = axios.post(`${config.apiUrl}/users/create`, {"name": name, "email": email, "walletAddress": walletAddress})
        .then((response) => {
          data?.push(response.data);
          setCreateUserModalVisible(false);
        }).catch((error)=> {
          console.log("Error:", error);
        });
        
    }

    useEffect(() => {
        axios.get(`${config.apiUrl}/users`)
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <Button
  title="Create a User"
  onPress={() => setCreateUserModalVisible(true)}
  color="#333"
  accessibilityLabel="Create a user that has access the banking system"
/>
     <ThemedView style={styles.stepContainer}>
        <FlatList
            data={data}
            renderItem={({item}) => <View>
              <ThemedText> {item.name} - {item.email}</ThemedText>
              {item.walletAddress == null ? "": <ThemedText> {item.walletAddress} - {item.balance == null ? 0 : item.balance} ETH</ThemedText>} 
              </View>}
            keyExtractor={item => item._id}
        />
        <Modal
  animationType="slide"
  transparent={false}
  visible={createUserModalVisible}
  onRequestClose={() => {
    setCreateUserModalVisible(!createUserModalVisible);
  }}
>
  <ScrollView>
    <View>
      <ThemedText style={{"color": "#000"}} type='title' darkColor=''>Create a User</ThemedText>
    </View>
      <TextInput
          style={styles.input}
          onChangeText={(data) => setName(data)}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={(data) => setEmail(data)}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={(data) => setWalletAddress(data)}
          value={walletAddress}
          placeholder="Wallet Adress (0x..)"
        />
        <View style={{"marginBottom": 10}}>
          <Button  title="Submit" onPress={(data:any) => handleSubmit(data)} />
        </View>
        <View style={{"marginBottom": 10}}>
          <Button title="Close Modal" onPress={() => setCreateUserModalVisible(!createUserModalVisible)} />
        </View>

  </ScrollView>

</Modal>
      </ThemedView>
    </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});
