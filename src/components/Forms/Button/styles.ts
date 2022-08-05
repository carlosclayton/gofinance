import styled from "styled-components/native";
import {TextInput, TouchableOpacity} from "react-native";
import {RFValue} from "react-native-responsive-fontsize";
import {RectButton} from "react-native-gesture-handler";

export const Container = styled(RectButton)`
  width: 100%;
  background-color: ${({theme}) => theme.colors.secondary};
  border-radius: 5px;
  align-items: center;
  padding: 18px;
`;

export const Title = styled.Text`
  font-size: ${RFValue  (14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.shape};
  
`;

