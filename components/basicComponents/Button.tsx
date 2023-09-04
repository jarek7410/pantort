import { TouchableOpacity} from "react-native";
import * as React from "react";
import styles from "./button.styles";

export const Button=({style={},onPress,children})=>{
    return(
        <TouchableOpacity onPress={onPress} style={[styles.button,style]}>
            {children}
        </TouchableOpacity>
    )
}
