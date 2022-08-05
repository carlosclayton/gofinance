import styled from "styled-components/native";
import {Feather} from "@expo/vector-icons";
import {RFValue} from "react-native-responsive-fontsize";
import {TypeProps} from "../../../interfaces/TypeProps";
import {css} from "styled-components";
import {RectButton} from "react-native-gesture-handler";

interface ContainerProps{
    isActive : boolean
    type: 'up' | 'down'
}
export const Container = styled(RectButton)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style:  solid;
  border-color: ${({theme}) => theme.colors.text};
  border-radius: 5px;
  padding: 16px;
  justify-content: center;
  
  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({theme}) => theme.colors.attention_light}
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({theme}) => theme.colors.success_light}
  `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({theme, type}) => type === 'up' ? theme.colors.success: theme.colors.attention}

`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
`;

