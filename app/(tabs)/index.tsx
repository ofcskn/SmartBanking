import { Image, StyleSheet, Button } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../ctx';
import { ThemedButton } from '@/components/ThemedButton';
import { router } from 'expo-router';

export default function HomeScreen() {
  const { user, session, signOut } = useSession();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">The Secure Bank</ThemedText>
      </ThemedView>
      <ThemedView style={styles.titleContainer}>
        {session ? (
          <>
            <ThemedText type="title">
              Hello, {user != null ? user.name : '[Name]'}!
            </ThemedText>
            <HelloWave />
          </>
        ) : (
          <>
            <ThemedText type="title">Hello!</ThemedText>
            <HelloWave />
          </>
        )}
      </ThemedView>
      {user && session ? (
        <>
          <ThemedButton
            title="Transfer Money"
            onPress={() => {
              router.push('/(tabs)/transfer');
            }}
          />
          <ThemedButton
            title="Deposit"
            onPress={() => {
              router.push('/(tabs)/deposit');
            }}
          />
          <ThemedButton
            title="Withdraw"
            onPress={() => {
              router.push('/(tabs)/withdraw');
            }}
          />
          <ThemedButton
            title="Get Balance"
            onPress={() => {
              router.push('/(tabs)/getBalance');
            }}
          />
          <ThemedButton
            title="Sign out"
            onPress={() => {
              signOut();
            }}
          />
        </>
      ) : (
        <></>
      )}
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
