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

interface FormData {
    name: string;
    amount: string;
}

const schema = yup.object({
    name: yup.string().required('Name is required'),
    amount: yup.number().positive('Only positive number').integer('Only integer').required('Amount is required'),

})
export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Category'
    })

    function handleTransactionsTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }

    function handleOpeSelectCategoryModal() {
        setCategoryModalOpen(true)
    }

    function handleRegister(form: FormData) {
        if(!transactionType )
            return Alert.alert('Select a type')

        if(category.key === 'category')
            return Alert.alert('Select a category')
        console.log(form);
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
                                title="Income"
                                onPress={() => handleTransactionsTypeSelect('up')}
                                isActive={transactionType === 'up'}
                            />
                            <TransactionTypeButton
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionsTypeSelect('down')}
                                isActive={transactionType === 'down'}
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
