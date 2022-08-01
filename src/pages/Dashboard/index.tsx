import React from "react";
import {Feather} from '@expo/vector-icons'
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGretting,
    UserName,
    Icon
} from './styles'
export function Dashboard(){
    return(
        <Container>
            <Header>
                <UserWrapper>
                <UserInfo>
                    <Photo
                        source={{uri:"https://avatars.githubusercontent.com/u/1480579?v=4"}}></Photo>
                    <User>
                        <UserGretting>Olá,</UserGretting>
                        <UserName>Carlos</UserName>
                    </User>
                </UserInfo>
                    <Icon name="power" />
                </UserWrapper>

            </Header>
        </Container>
    )
}
