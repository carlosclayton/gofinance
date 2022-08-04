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

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input
                        placeholder="Name"
                    ></Input>

                    <Input
                        placeholder="Price"
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
                        title="Select"
                        onPress={handleOpeSelectCategoryModal}
                    ></CategorySelectButton>
                </Fields>


                <Button title="Send"></Button>
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
