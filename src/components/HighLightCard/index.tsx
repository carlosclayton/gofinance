import React from "react";

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransaction
} from "./styles";
import {HighLight} from "../../interfaces/HighLight";

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighLightCard({title, amount, lastTransaction,type} : HighLight){
    return (
        <Container>
          <Header>
              <Title>{title}</Title>
              <Icon name={icon[type]} type={type}></Icon>
          </Header>

            <Footer>
            <Amount>{amount}</Amount>
                <LastTransaction>{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    )
}
