import React, {useState} from "react";
import {Container, Fields, Form, Header, Title, TransactionTypes} from './styles'
import {Button} from "../../components/Forms/Button";
import {TransactionTypeButton} from "../../components/Forms/TransactionTypeButton";
import {CategorySelectButton} from "../../components/Forms/CategorySelectButton";
import {Alert, Keyboard, Modal, TouchableWithoutFeedback} from "react-native";
import {CategorySelect} from "../CategorySelect";
import {useForm} from "react-hook-form";
import {InputForm} from "../../components/Forms/InputForm";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import {useNavigation} from "@react-navigation/native";

interface FormData {
    name: string;
    amount: string;
}

const schema = yup.object({
    name: yup.string().required('Name is required'),
    amount: yup.number().positive('Only positive number').integer('Only integer').required('Amount is required'),

})
export function Register() {
    const navigation  = useNavigation();
    const transactions = '@gofinaces:transactions';
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const {
        control,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    })

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }

    function handleOpeSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    async function handleRegister(form: FormData) {
        if(!transactionType )
            return Alert.alert('Select a type')

        if(category.key === 'category')
            return Alert.alert('Select a category')

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try{

            const allTransactions = await AsyncStorage.getItem(transactions);
            const current = allTransactions ? JSON.parse(allTransactions) : [];
            const transactionFormat = [
                ...current,
                newTransaction
            ]

            await AsyncStorage.setItem(transactions, JSON.stringify(transactionFormat));
            reset();
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Category'
            })

            navigation.navigate("Listagem");

        }catch (Error){
            console.log(Error)
            Alert.alert('Sorry, an error ocurred')
        }

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm
                            placeholder="Name"
                            name="name"
                            control={control}
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}

                        ></InputForm>

                        <InputForm
                            placeholder="Price"
                            name="amount"
                            control={control}
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        ></InputForm>
                        <TransactionTypes>
                            <TransactionTypeButton
                                type="up"
                                name="Income"
                                onPress={() => handleTransactionsTypeSelect('positive')}
                                isActive={transactionType === 'positive'}
                            />
                            <TransactionTypeButton
                                type="down"
                                name="Outcome"
                                onPress={() => handleTransactionsTypeSelect('negative')}
                                isActive={transactionType === 'negative'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpeSelectCategoryModal}
                        ></CategorySelectButton>
                    </Fields>


                    <Button
                        title="Send"
                        onPress={handleSubmit(handleRegister)}
                    ></Button>
                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
}
