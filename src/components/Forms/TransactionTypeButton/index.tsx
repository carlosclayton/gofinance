import React from "react";
import {Container, Icon, Title} from "./styles";
import {RectButtonProps} from "react-native-gesture-handler";

interface Props extends RectButtonProps {
    type: 'up' | 'down';
    title: string;
    isActive: boolean;
}

const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle'
}

export function TransactionTypeButton({title, type, isActive, ...rest}: Props) {
    return (
        <Container {...rest} isActive={isActive} type={type}>
            <Icon type={type} name={icons[type]}/>
            <Title>{title}</Title>
        </Container>
    )
}
