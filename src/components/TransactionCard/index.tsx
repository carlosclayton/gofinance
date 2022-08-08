import React from "react";
import {Amount, Category, CategoryName, Container, Date, Footer, Icon, Title} from './styles'
import {DataProps} from "../../interfaces/DataProps";
import {categories} from "../../utils/categories";


export function TransactionCard({data} : DataProps) {
    const category = categories.filter(
        item => item.key === data.category
    )[0]
    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>

            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    );
}
