import {
  Image,
  StyleSheet,
  Platform,
  SectionList,
  Button,
  Modal,
  View,
  TextInput,
} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/User';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedTextInput } from '@/components/ThemedTextInput';

export default function HomeScreen() {
  const [data, setData] = useState<User[]>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    axios
      .get(`${config.apiUrl}/users/auth`)
      .then((response) => setData(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ margin: 20 }}>
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
          <Button title="Login" onPress={(e: any) => handleSubmit(e)} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
