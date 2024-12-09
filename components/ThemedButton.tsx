import React from 'react';
import { Button, type ButtonProps, StyleSheet, View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';

export type ThemedButtonProps = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedButton({
  lightColor,
  darkColor,
  ...rest
}: ThemedButtonProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ThemedView style={[{ borderColor: color }, styles.button]}>
      <Button {...rest} color={color} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
});
