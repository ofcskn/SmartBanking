import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../hooks/useStorageState';
import axios from 'axios';
import config from './config/config';
import { router } from 'expo-router';

const AuthContext = createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: (email: string, password: string) => null,
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

  return (
    <AuthContext.Provider
      value={{
        signIn: (email, password) => {
          axios
            .post(`${config.apiUrl}/users/login`, {
              email: email,
              password: password,
            })
            .then(async (response) => {
              if (response.status == 200) {
                const token = response.data.token;
                console.log(token);
                setSession(token);

                // Redirect to the home
                router.push('/(tabs)/');
              }
            })
            .catch((error) => console.error('Error fetching data:', error));
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
