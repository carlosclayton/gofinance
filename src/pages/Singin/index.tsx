import React, {useContext} from "react";
import {Container, Footer, Header, SignTitle, Title, TitleWrapper, FooterWrapper} from "./styles";
import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import {RFValue} from "react-native-responsive-fontsize";
import {SinginSocialButton} from "../../components/SinginSocialButton";
import {useAuth} from "../../hooks/auth";
import {Alert} from "react-native";

export function Singin() {
    const {singInWithGoogle} = useAuth();

    async function handleSingInWithGoogle(){
        try{
            await singInWithGoogle();
        }catch (error){
            Alert.alert("Can't connect Google account");
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(200)}
                        height={RFValue(200)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SinginSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        onPress={handleSingInWithGoogle}
                    />
                    <SinginSocialButton title="Entrar com Apple" svg={AppleSvg} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}
