import React, {createContext, ReactNode, useContext, useState} from "react";
import * as AuthSession from 'expo-auth-session';

const AuthContext = createContext({} as IAuthContextData);


interface AuthProviderProps {
    children: ReactNode;
}

interface IAuthContextData {
    user: User;

    singInWithGoogle(): Promise<void>
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

    const user = {
        id: '123456',
        name: 'Carlos Clayton',
        email: 'carlos.clayton@gmail.com'
    }

    async function singInWithGoogle() {
        const [user, setUser] = useState<User>({} as User)
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


            }
        } catch (error) {
            throw new Error(error)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            singInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    return useContext(AuthContext);
}

export {AuthProvider, useAuth}
