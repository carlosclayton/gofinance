import styled from 'styled-components/native';
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import {Feather} from "@expo/vector-icons";
import {getBottomSpace, getStatusBarHeight} from "react-native-iphone-x-helper";
import {DataListProps} from "../../interfaces/DataListProps";
import {FlatList} from "react-native";
import {BorderlessButton, GestureHandlerRootView} from "react-native-gesture-handler";

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  flex-direction: row;
  
`;

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + RFValue(48)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
  
`;

export const UserGretting = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 25}
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(25)}px;
`;

export const Transactions = styled.View`
  padding: 0 24px;
  margin-top: ${RFPercentage(50)}px;
  position: absolute;
  width: 100%;
`;

export const Title = styled.Text`
  margin-bottom: 10px;
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

export const TransactionList = styled(
    FlatList as new () => FlatList<DataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle:{
        paddingBottom: getBottomSpace()
    }
})`
`;

export const LogoutButton = styled(BorderlessButton)`

`;


