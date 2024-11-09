import './crypto-polyfill';
import '@walletconnect/react-native-compat';

import React from 'react';
import RootLayout from './_layout';

import { createAppKit, defaultConfig } from '@reown/appkit-ethers-react-native';

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECTION_ID || '';

const metadata = {
  name: 'SecureBanking',
  description: 'Secure Banking is a banking application.',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
  },
};

const config = defaultConfig({ metadata });

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com',
};

const chains = [mainnet, polygon];

createAppKit({
  projectId,
  chains,
  config,
});

export default function App() {
  return (
    <>
      <RootLayout />
    </>
  );
}
