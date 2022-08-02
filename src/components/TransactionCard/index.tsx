import React from "react";
import {Amount, Category, CategoryName, Container, Date, Footer, Icon, Title} from './styles'

export function TransactionCard() {
    return (
        <Container>
            <Title>Desenvolvimento de sites</Title>
            <Amount>R$ 12.000,00</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>13/10/2022</Date>
            </Footer>
        </Container>
    );
}
