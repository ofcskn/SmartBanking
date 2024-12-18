import { StyleSheet, Button, Modal, View, RefreshControl } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/interfaces/User';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native'; // If you're using React Navigation
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedTextInput';
export default function UsersScreen() {
  const [data, setData] = useState<User[]>();
  const [createUserModalVisible, setCreateUserModalVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Creating a user
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: any) => {
    const response = axios
      .post(`${config.apiUrl}/users/create`, {
        name: name,
        email: email,
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
    <ThemedView style={{ height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ margin: 20 }}>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={data}
            renderItem={({ item }) => (
              <ThemedView style={styles.card}>
                <View style={styles.infoContainer}>
                  <ThemedText type="subtitle">{item.name}</ThemedText>
                  <ThemedText>{item.email}</ThemedText>
                </View>
              </ThemedView>
            )}
            keyExtractor={(item) => item._id}
          />
          <ThemedView style={{ marginTop: 10 }}>
            <Button
              title="Create a User"
              onPress={() => setCreateUserModalVisible(true)}
              accessibilityLabel="Create a user that has access the banking system"
            />
          </ThemedView>

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
                      title="Close"
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
    </ThemedView>
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
