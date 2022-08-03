import React from "react";


import {
    Container,
    Title
} from "./styles";
import {ButtonProps} from "../../../interfaces/ButtonProps";

export function Button({title, ...rest}: ButtonProps){
    return (
        <Container {...rest}>
            <Title>{title}</Title>
        </Container>
    )
}
