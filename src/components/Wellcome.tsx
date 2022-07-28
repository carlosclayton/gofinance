import React from "react";
import {Text, View} from "react-native";
import {WellcomeProps} from "../interfaces/WellcomeProps";

export function Wellcome({title} : WellcomeProps){
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}
