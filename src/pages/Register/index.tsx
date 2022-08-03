import React from "react";
import
{
    Container,
    Form,
    Header,
    Title,
    Fields
} from './styles'

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";

export function Register() {
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
                </Fields>

                <Button title="Send"></Button>
            </Form>
        </Container>
    )
}
