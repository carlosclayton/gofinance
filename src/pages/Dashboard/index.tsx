import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator} from 'react-native'
import {
    Container,
    Header,
    HighLightCards,
    Icon,
    LoadContainer,
    LogoutButton,
    Photo,
    Title,
    TransactionList,
    Transactions,
    User,
    UserGretting,
    UserInfo,
    UserName,
    UserWrapper,
} from './styles'
import {HighLightCard} from "../../components/HighLightCard";
import {TransactionCard} from "../../components/TransactionCard";
import {DataListProps} from "../../interfaces/DataListProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useFocusEffect} from "@react-navigation/native";
import {useTheme} from "styled-components"

export interface HighlightProps {
    total: string;
    lastTransaction: string;
}

export interface HighlightData {
    incomes: HighlightProps;
    outcomes: HighlightProps;
    resumes: HighlightProps;
}


export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([])
    const [highLightData, setHighLightData] = useState<HighlightData>({} as HighlightData)
    const [isLoading, setIsLoading] = useState(true);
    const theme = useTheme();

    function gestLastTransactionDate(collection:DataListProps[], type:'positive' | 'negative'){
        const lastTransactions = new Date( Math.max.apply(Math, collection
            .filter((transaction: DataListProps) => transaction.type === 'positive')
            .map((transaction: DataListProps) => new Date(transaction.date).getTime())
        ));

       return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`;

    }


    let entriesSum = 0;
    let expensive = 0;
    let resume = 0;

    async function loadTransactions() {
        const transactions = '@gofinaces:transactions';
        const response = await AsyncStorage.getItem(transactions);

        const allTransactions = response ? JSON.parse(response) : [];
        const transactionsFormat: DataListProps[] = allTransactions.map((item: DataListProps) => {

            if (item.type === 'positive') {
                entriesSum += Number(item.amount)
            } else {
                expensive += Number(item.amount)
            }

            resume = entriesSum - expensive;

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))

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

        const lastTransactionIncomes = gestLastTransactionDate(allTransactions, 'positive')
        const lastTransactionOutcomes = gestLastTransactionDate(allTransactions, 'negative')
        const totalInterval = `01 a ${ lastTransactionOutcomes }`



        setHighLightData({
            incomes: {
                total: entriesSum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última saída dia ${lastTransactionIncomes}`
            },
            outcomes: {
                total: expensive.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última saída dia ${lastTransactionOutcomes}`
            },
            resumes: {
                total: resume.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: totalInterval
            },
        })

        setIsLoading(false);
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
            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer> :
                    <>
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
                                <LogoutButton onPress={() => {
                                }}>
                                    <Icon name="power"/>
                                </LogoutButton>
                            </UserWrapper>

                        </Header>
                        <HighLightCards
                        >
                            <HighLightCard type="up" title="Entrada" amount={highLightData.incomes.total}
                                           lastTransaction={highLightData.incomes.lastTransaction} />
                            <HighLightCard type="down" title="Saída" amount={highLightData.outcomes.total}
                                           lastTransaction={highLightData.outcomes.lastTransaction} />
                            <HighLightCard type="total" title="Total" amount={highLightData.resumes.total}
                                           lastTransaction={highLightData.resumes.lastTransaction}/>
                        </HighLightCards>

                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => <TransactionCard data={item}/>}
                            />
                        </Transactions>
                    </>
            }
        </Container>
    )
}
