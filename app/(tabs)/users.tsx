import { Image, StyleSheet, Platform, SectionList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/User';


export default function HomeScreen() {
    const [data, setData] = useState<User[]>();

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
     <ThemedView style={styles.stepContainer}>
        <FlatList
            data={data}
            renderItem={({item}) => <ThemedText> {item.name} - {item.email}</ThemedText>}
            keyExtractor={item => item._id}
        />
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
});
