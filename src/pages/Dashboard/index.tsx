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
    Icon,
    HighLightCards
} from './styles'
import {HighLightCard} from "../../components/HighLightCard";

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
            <HighLightCards
            >
                <HighLightCard type="up" title="Entrada" amount="R$ 17.400,00" lastTransaction="Última entrada dia 13 de outubro" />
                <HighLightCard type="down" title="Saída" amount="R$ 1.259,00" lastTransaction="Última saída dia 10 de setembro" />
                <HighLightCard type="total" title="Total" amount="R$ 19.140,00" lastTransaction="1 de setembro à 30 de outubro"/>
            </HighLightCards>
        </Container>
    )
}
