import { StyleSheet, Button, Modal, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSession } from '../ctx';
import { AppKitButton } from '@reown/appkit-ethers-react-native';
import axios, { AxiosHeaders } from 'axios';
import { useState } from 'react';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import * as path from 'path';
import { ThemedButton } from '@/components/ThemedButton';

export default function AccountScreen() {
  const { user, session } = useSession();
  const [imageUrl, setImageUrl] = useState(user?.imageUrl);
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  // const digest = Crypto.digestStringAsync(
  //   Crypto.CryptoDigestAlgorithm.SHA256,
  //   user?.email + Date.now().toString()
  // );
  // setImageName(digest);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && user != undefined) {
      const formData = new FormData();
      // Create the file object
      const file = {
        uri: result.assets[0].uri,
        name:
          Date.now().toString() + path.extname(result.assets[0].uri || '.jpg'),
        type: 'image/jpg',
      };

      // Append the file to the FormData object
      formData.append('file', file);
      formData.append('userId', user._id);
      axios
        .post(
          `${process.env.EXPO_PUBLIC_API_URL}/users/uploadImage`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        .then((response) => {
          setImageUrl(response.data.imageUrl);
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  };

  return (
    <ThemedView style={{ height: '100%' }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ margin: 20 }}>
          {imageUrl && (
            <ThemedView style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={`${process.env.EXPO_PUBLIC_API_URL}/uploads/${imageUrl}`}
                placeholder={{ blurhash }}
                contentFit="cover"
                transition={1000}
              />
            </ThemedView>
          )}
          <ThemedButton
            onPress={() => pickImage()}
            title="Upload an image"
          ></ThemedButton>
          <ThemedText>Name: {user?.name}</ThemedText>
          <ThemedText>Email: {user?.email}</ThemedText>
          <AppKitButton
            label="Connect Your Wallet"
            balance="show"
          ></AppKitButton>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100, // Half of width or height to make it circular
  },
  imageContainer: {
    width: 160, // Container width (slightly bigger than the image)
    height: 160, // Container height (same as width)
    borderRadius: 80, // Half of the container size for a circular container
    borderWidth: 4, // Border width around the image container
    borderColor: '', // Blue border color
    overflow: 'hidden', // Ensures image is clipped inside the circle container
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 5, // For Android shadow
  },
});
