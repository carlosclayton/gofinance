import React, {useState} from "react";
import {Container, Footer, FooterWrapper, Header, SignTitle, Title, TitleWrapper} from "./styles";
import AppleSvg from '../../assets/apple-icon.svg';
import GoogleSvg from '../../assets/google-icon.svg';
import LogoSvg from '../../assets/logo.svg';
import {RFValue} from "react-native-responsive-fontsize";
import {SinginSocialButton} from "../../components/SinginSocialButton";
import {useAuth} from "../../hooks/auth";
import {ActivityIndicator, Alert} from "react-native";
import theme from "../../global/styles/theme";

export function Singin() {
    const [isLoading, setIsLoading] = useState(false);
    const {singInWithGoogle, singInWithApple} = useAuth();

    async function handleSingInWithGoogle() {
        setIsLoading(true);
        try {
            return await singInWithGoogle();
        } catch (error) {
            Alert.alert("Can't connect Google account");
        }

        setIsLoading(false);
    }

    async function handleSingInWithApple() {
        setIsLoading(true);
        try {
            return await singInWithApple();
        } catch (error) {
            Alert.alert("Can't connect Apple account");
        }

        setIsLoading(false);
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
                    <SinginSocialButton
                        title="Entrar com Apple"
                        svg={AppleSvg}
                        onPress={handleSingInWithApple}
                    />
                </FooterWrapper>
                {
                    isLoading &&
                    <ActivityIndicator
                    color={theme.colors.shape}
                    style={{marginTop:18}}
                    />
                }
            </Footer>
        </Container>
    )
}
