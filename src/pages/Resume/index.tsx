import React, {useEffect, useState} from "react";
import {Container, Header, Title, Content, ChartContainer} from "./styles";
import {HistoryCard} from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {categories} from "../../utils/categories";
import {VictoryPie} from "victory-native";
import {number} from "yup";
import {RFValue} from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";


interface TransactionData {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    color: string;
    totalFormatted: string;
    percent: string;
}

export function Resume() {
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    async function loadData() {
        const transactions = '@gofinaces:transactions';
        const allTransactions = await AsyncStorage.getItem(transactions);
        const current = allTransactions ? JSON.parse(allTransactions) : [];

        const outcomes = current.filter((outcomes: TransactionData) => outcomes.type === 'negative');

        const outcomesTotal = outcomes.reduce((acumullator: number, outcome: TransactionData) => {
                return acumullator + Number(outcome.amount)
            }, 0
        )

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            outcomes.forEach((outcome: TransactionData) => {
                if (outcome.category === category.key) {
                    categorySum += Number(outcome.amount)
                }
            })

            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${(categorySum / outcomesTotal * 100).toFixed(0)}%`;
                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    color: category.color,
                    totalFormatted: total,
                    percent: percent

                })
            }
        })

        setTotalByCategories(totalByCategory);
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Container>
            <Header>
                <Title>Category resume</Title>
            </Header>
            <Content>
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color) }
                        x="percent"
                        y="total"
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                    />
                </ChartContainer>


                {
                    totalByCategories.map(item => (
                        <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color}/>
                    ))
                }
            </Content>

        </Container>
    )
}
