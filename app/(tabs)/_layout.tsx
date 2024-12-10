import { Tabs } from 'expo-router';
import React from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useSession } from '../ctx';
import { ThemedText } from '@/components/ThemedText';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, isLoading } = useSession();

  if (isLoading == true) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderColor: Colors[colorScheme ?? 'light'].background
        },
        headerTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Users',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              size={24}
              name={focused ? 'users' : 'users'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          href: !user ? '/(tabs)/login' : null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              size={24}
              name={focused ? 'user' : 'user-alt'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="deposit"
        options={{
          title: 'Deposit',
          href: !user ? '/(tabs)/deposit' : null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              size={24}
              name={focused ? 'money' : 'money-alt'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          href: user ? '/(tabs)/account' : null,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              size={24}
              name={focused ? 'user' : 'user-alt'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
