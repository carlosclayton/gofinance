import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

import { ThemeProvider} from "styled-components";
import theme from './src/global/styles/theme'
import {
useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
} from '@expo-google-fonts/poppins'

import {ActivityIndicator, StatusBar} from 'react-native'
import {AuthProvider, useAuth} from "./src/hooks/auth";
import {Routes} from "./src/routes";

export default function App() {
    const {userStorageLoading} = useAuth();
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if(!fontsLoaded || userStorageLoading) {
        return <ActivityIndicator style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
        }}
                color={theme.colors.primary}
                size="large"
            />;
    }
  return (
      <ThemeProvider theme={theme}>
              <StatusBar barStyle={"light-content"} />
              <AuthProvider >
                  <Routes />
              </AuthProvider>

      </ThemeProvider>
  );
}


