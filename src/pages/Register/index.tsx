import React, {useState} from "react";
import {Container, Fields, Form, Header, Title, TransactionTypes} from './styles'

import {Input} from "../../components/Forms/Input";
import {Button} from "../../components/Forms/Button";
import {TransactionTypeButton} from "../../components/Forms/TransactionTypeButton";
import {TypeProps} from "../../interfaces/TypeProps";

export function Register() {
    const [transactionType, setTransactionType] = useState('');
    function handleTransactionsTypeSelect(type: 'up' | 'down'){
        setTransactionType(type)
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
                </Fields>


                <Button title="Send"></Button>
            </Form>
        </Container>
    )
}
