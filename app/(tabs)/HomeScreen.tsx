import { Image, Button, Modal, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import { User } from '../models/User';
import { styles } from './users';



export default function HomeScreen() {
    const [data, setData] = useState<User[]>();
    const [createUserModalVisible, setCreateUserModalVisible] = useState(false);

    useEffect(() => {
        axios.get(`${config.apiUrl}/users`)
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={<Image
                source={require('@/assets/images/partial-react-logo.png')}
                style={styles.reactLogo} />}>
            <Button
                title="Create a User"
                onPress={() => setCreateUserModalVisible(true)}
                color="#333"
                accessibilityLabel="Create a user that has access the banking system" />
            <ThemedView style={styles.stepContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <ThemedText> {item.name} - {item.email}</ThemedText>}
                    keyExtractor={item => item._id} />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={createUserModalVisible}
                    onRequestClose={() => {
                        setCreateUserModalVisible(!createUserModalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text>Welcome to ReactNativeTips.com</Text>
                        <Button title="Close Modal" onPress={() => setModalVisible(!modalVisible)} />
                    </View>
                </Modal>
            </ThemedView>
        </ParallaxScrollView>

    );
}
