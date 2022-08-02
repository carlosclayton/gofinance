import React from "react";
import {Amount, Category, CategoryName, Container, Date, Footer, Icon, Title} from './styles'
import {DataProps} from "../../interfaces/DataProps";


export function TransactionCard({data} : DataProps) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount>{data.amount}</Amount>

            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
