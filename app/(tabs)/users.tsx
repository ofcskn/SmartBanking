import {
  StyleSheet,
  Platform,
  SectionList,
  Button,
  Modal,
  View,
  Text,
  TextInput,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/User';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '@react-navigation/native'; // If you're using React Navigation
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
export default function HomeScreen() {
  const { colors } = useTheme(); // Get theme colors if using a theme
  const [data, setData] = useState<User[]>();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

  // Creating a user
  const [name, setName] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: any) => {
    const response = axios
      .post(`${config.apiUrl}/users/create`, {
        name: name,
        email: email,
        walletAddress: walletAddress,
        password: password,
      })
      .then((response) => {
        data?.push(response.data);
        setCreateUserModalVisible(false);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/users`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 20 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ThemedView style={styles.card}>
              <View style={styles.infoContainer}>
                <ThemedText type="subtitle">{item.name}</ThemedText>
                <ThemedText>{item.email}</ThemedText>
                <ThemedText style={{ fontSize: 14 }} type="link">
                  {item.walletAddress}
                </ThemedText>
              </View>
            </ThemedView>
          )}
          keyExtractor={(item) => item._id}
        />
        <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
          <Button
            title="Create a User"
            onPress={() => setCreateUserModalVisible(true)}
            accessibilityLabel="Create a user that has access the banking system"
          />
        </View>
        <Modal
          animationType="slide"
          presentationStyle="pageSheet"
          transparent={false}
          visible={createUserModalVisible}
          onRequestClose={() => {
            setCreateUserModalVisible(!createUserModalVisible);
          }}
        >
          <ThemedView style={{ height: '100%' }}>
            <SafeAreaProvider>
              <SafeAreaView style={{ margin: 20 }}>
                <ThemedText type="title" style={{ marginBottom: 20 }}>
                  Create User
                </ThemedText>
                <ThemedTextInput
                  onChangeText={(data) => setName(data)}
                  value={name}
                  placeholder="Name"
                ></ThemedTextInput>
                <ThemedTextInput
                  onChangeText={(data) => setEmail(data)}
                  value={email}
                  placeholder="Email"
                />
                <ThemedTextInput
                  onChangeText={(data) => setWalletAddress(data)}
                  value={walletAddress}
                  placeholder="Wallet Adress (0x..)"
                />
                <ThemedTextInput
                  onChangeText={(data) => setPassword(data)}
                  value={password}
                  placeholder="Password"
                  autoComplete="off"
                  secureTextEntry={true}
                  passwordRules="required: upper; required: lower; required: digit; minlength: 8;" // Example rules
                />
                <View style={{ marginBottom: 10 }}>
                  <Button
                    title="Submit"
                    onPress={(data: any) => handleSubmit(data)}
                  />
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Button
                    title="Close Modal"
                    onPress={() =>
                      setCreateUserModalVisible(!createUserModalVisible)
                    }
                  />
                </View>
              </SafeAreaView>
            </SafeAreaProvider>
          </ThemedView>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 2,
  },
  infoContainer: {
    justifyContent: 'center',
  },
});
