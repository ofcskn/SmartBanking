import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { useStorageState } from '../hooks/useStorageState';
import axios, { AxiosHeaders } from 'axios';
import config from './config/config';
import { router } from 'expo-router';
import { User } from './models/interfaces/User';
import { useDisconnect } from '@reown/appkit-ethers-react-native';

const { disconnect } = useDisconnect();

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  user?: User | null;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');
  const [signedUser, setSignedUser] = useState<User | null>(null);

  useEffect(() => {
    if (session != null && (signedUser == null || signedUser == undefined)) {
      axios
        .get(`${config.apiUrl}/users/verify`, {
          headers: new AxiosHeaders('authorization: ' + session),
        })
        .then((res) => {
          setSignedUser(res.data);
        })
        .catch((err) => {
          setSession(null);
          console.error('Verifying error: ', err);
        });
    }
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        user: signedUser,
        signIn: (email, password) => {
          axios
            .post(`${config.apiUrl}/users/login`, {
              email: email,
              password: password,
            })
            .then(async (response) => {
              if (response.status == 200) {
                const token = response.data.token;
                setSession(token);

                // Redirect to the home
                router.push('/(tabs)/');
              }
            })
            .catch((error) => console.error('Error fetching data:', error));
        },
        signOut: async () => {
          setSignedUser(null);
          setSession(null);
          // Remove Wallet
          await disconnect();
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
