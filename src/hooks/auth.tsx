import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({} as IAuthContextData);


interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: User;
    singInWithGoogle(): Promise<void>,
    singInWithApple(): Promise<void>,
    singOut(): Promise<void>,
    userStorageLoading: boolean
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

function AuthProvider({children}: AuthProviderProps) {
    const {CLIENT_ID} = process.env;
    const {REDIRECT_URI} = process.env;
    const [user, setUser] = useState<User>({} as User);
    const [userStorageLoading, setUserStorageLoading] = useState(true);
    const userStorageKey = '@gofinances:user';

    async function singInWithGoogle() {

        try {

            const RESPONSE_TYPE = 'token';
            const SCOPE = encodeURI('profile email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const {type, params} = await AuthSession.startAsync({authUrl}) as AuthorizationResponse;

            if(type === 'success'){
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo =   await response.json();

                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                })

                await AsyncStorage.setItem(userStorageKey, JSON.stringify(user))

            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async function singInWithApple() {
        try{
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                ]
            })

            if(credential) {
                setUser({
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                    photo: `https://ui-avatars.com/api/?name=${credential.fullName!.givenName!}&length=1`
                })

                await AsyncStorage.setItem(userStorageKey, JSON.stringify(user))
            }
        }catch (error){
            throw new Error(error)
        }
    }

    async function singOut(){
        setUser({} as User);
        await AsyncStorage.removeItem(userStorageKey);
    }

    useEffect(() => {
        async function loadUserStorageData(){
            const userStoraged = await AsyncStorage.getItem(userStorageKey);

            if(userStoraged){
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
                setUserStorageLoading(false)
            }
        }
    })
    return (
        <AuthContext.Provider value={{
            user,
            singInWithGoogle,
            singInWithApple,
            singOut,
            userStorageLoading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    return useContext(AuthContext);
}

export {AuthProvider, useAuth}
