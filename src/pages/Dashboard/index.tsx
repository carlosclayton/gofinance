import React, {useCallback, useEffect, useState} from "react";

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
    UserWrapper,
    LogoutButton
} from './styles'
import {HighLightCard} from "../../components/HighLightCard";
import {TransactionCard} from "../../components/TransactionCard";
import {DataListProps} from "../../interfaces/DataListProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions(){
        const transactions = '@gofinaces:transactions';
        const response = await AsyncStorage.getItem(transactions);

        const allTransactions = response ? JSON.parse(response) : [];
        const transactionsFormat: DataListProps[] = allTransactions.map((item:DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format( new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date: date
            }

        })
        setData(transactionsFormat)
        console.log(transactionsFormat)


    }
    useEffect(() => {
        loadTransactions();

        // const transactions = '@gofinaces:transactions';
        // AsyncStorage.removeItem(transactions);
    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []))


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
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
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
