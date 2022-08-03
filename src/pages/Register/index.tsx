import React from "react";
import {
    Container,
    Header,
    Title,
    Form
} from './styles'
import {Input} from "../../components/Forms/Input";
export function Register(){
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

           <Form>
               <Input
                   placeholder="Name"
               ></Input>

               <Input
                   placeholder="Price"
               ></Input>
           </Form>
        </Container>
    )
}
