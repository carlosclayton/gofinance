import React, {useCallback, useEffect, useState} from "react";
import {Container, Header, Title, Content, ChartContainer, MonthSelect, MonthSelectButton, MonthSelectIcon, Month} from "./styles";
import {HistoryCard} from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {categories} from "../../utils/categories";
import {VictoryPie} from "victory-native";
import { addMonths, subMonths, format} from 'date-fns'
import {RFValue} from "react-native-responsive-fontsize";
import theme from "../../global/styles/theme";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {ptBR} from "date-fns/locale";
import {LoadContainer} from "../Dashboard/styles";
import {ActivityIndicator} from "react-native";
import {useFocusEffect} from "@react-navigation/native";


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
    const [selectDate, setSelectDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    function handleDateChange(action: 'next' | 'prev'){
        if(action === 'next'){
            setSelectDate(addMonths(selectDate, 1));
        }else{
            setSelectDate(subMonths(selectDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const transactions = '@gofinaces:transactions';
        const allTransactions = await AsyncStorage.getItem(transactions);
        const current = allTransactions ? JSON.parse(allTransactions) : [];

        const outcomes = current.filter((outcomes: TransactionData) => outcomes.type === 'negative' &&
            new Date(outcomes.date).getMonth() === selectDate.getMonth() &&
            new Date(outcomes.date).getFullYear() === selectDate.getFullYear()
        );

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
        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectDate]))


    return (
        <Container>
            <Header>
                <Title>Category resume</Title>
            </Header>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer> :

                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            padding: 24,
                            paddingBottom: useBottomTabBarHeight()
                        }}

                    >

                        <MonthSelect>
                            <MonthSelectButton onPress={() => handleDateChange('next')}>
                                <MonthSelectIcon name="chevron-left"/>
                            </MonthSelectButton>
                            <Month>
                                {format(selectDate, "MMMM, yyyy", {locale: ptBR})}
                            </Month>

                            <MonthSelectButton onPress={() => handleDateChange('prev')}>
                                <MonthSelectIcon name="chevron-right"/>
                            </MonthSelectButton>

                        </MonthSelect>
                        <ChartContainer>
                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
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
                                <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted}
                                             color={item.color}/>
                            ))
                        }
                    </Content>
            }

        </Container>
    )
}
