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

import {AppRoutes} from "./src/routes/app.routes"
import {ActivityIndicator, StatusBar} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {LoadContainer} from "./src/pages/Dashboard/styles";

export default function App() {
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_700Bold
    });

    if(!fontsLoaded) {
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
          <NavigationContainer>
              <StatusBar barStyle={"light-content"} />
              <AppRoutes />
          </NavigationContainer>
      </ThemeProvider>
  );
}


