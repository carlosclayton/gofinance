import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {Singin} from '../pages/Singin'
const {Navigator, Screen} = createStackNavigator();


export function AuthRoutes(){
    return (
        <Navigator headerMode="none" >
            <Screen
                name="SingIn"
                component={Singin}
            />
        </Navigator>
    )
}
