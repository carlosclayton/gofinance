import React from "react";

import {
    Container,
    Header,
    HighLightCards,
    Icon,
    Photo,
    Title,
    TransactionList,
    Transactions,
    User,
    UserGretting,
    UserInfo,
    UserName,
    UserWrapper
} from './styles'
import {HighLightCard} from "../../components/HighLightCard";
import {TransactionCard} from "../../components/TransactionCard";
import {DataListProps} from "../../interfaces/DataListProps";

export function Dashboard() {
    const data: DataListProps[] = [
        {
            id: '1',
            type: {type: 'positive'},
            title: "Desenvolvimento de sistes",
            amount: "R$ 12.000,00",
            category: {name: 'Vendas', icon: 'dollar-sign'},
            date: "13/10/2022"
        },
        {
            id: '2',
            type: {type: 'negative'},
            title: "Desenvolvimento de app",
            amount: "R$ 2.000,00",
            category: {name: 'Vendas', icon: 'dollar-sign'},
            date: "13/10/2022"
        },
        {
            id: '3',
            type: {type: 'negative'},
            title: "Aluguel do apartamento",
            amount: "R$ 500,00",
            category: {name: 'Aluguel', icon: 'dollar-sign'},
            date: "13/10/2022"
        }, {
            id: '4',
            type: {type: 'positive'},
            title: "Venda de computador",
            amount: "R$ 1.500,00",
            category: {name: 'Vendas', icon: 'dollar-sign'},
            date: "13/10/2022"
        },
        {
            id: '5',
            type: {type: 'positive'},
            title: "Supermercado do mês",
            amount: "R$ 500,00",
            category: {name: 'Alimentação', icon: 'coffee'},
            date: "13/10/2022"
        }];
    return (
        <Container>

            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{uri: "https://avatars.githubusercontent.com/u/1480579?v=4"}}></Photo>
                        <User>
                            <UserGretting>Olá,</UserGretting>
                            <UserName>Carlos</UserName>
                        </User>
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper>

            </Header>
            <HighLightCards
            >
                <HighLightCard type="up" title="Entrada" amount="R$ 17.400,00"
                               lastTransaction="Última entrada dia 13 de outubro"/>
                <HighLightCard type="down" title="Saída" amount="R$ 1.259,00"
                               lastTransaction="Última saída dia 10 de setembro"/>
                <HighLightCard type="total" title="Total" amount="R$ 19.140,00"
                               lastTransaction="1 de setembro à 30 de outubro"/>
            </HighLightCards>

            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <TransactionCard data={item}/>}
                />
            </Transactions>
        </Container>
    )
}
