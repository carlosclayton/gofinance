import React, {useState} from "react";
import {Container, Fields, Form, Header, Title, TransactionTypes} from './styles'

import {Input} from "../../components/Forms/Input";
import {Button} from "../../components/Forms/Button";
import {TransactionTypeButton} from "../../components/Forms/TransactionTypeButton";
import {CategorySelectButton} from "../../components/Forms/CategorySelectButton";
import {Modal} from "react-native";
import {CategorySelect} from "../CategorySelect";

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

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

    function handleRegister(){

    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Name"
                        onChangeText={setName}
                    ></Input>

                    <Input
                        placeholder="Price"
                        onChangeText={setAmount}
                    ></Input>
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
                    onPress={handleRegister}
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
    )
}
