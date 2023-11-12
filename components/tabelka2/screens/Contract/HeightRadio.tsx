import {colors, styles} from "../../styles/styles";
import {Text} from "react-native";
import {MyCheckbox} from "../../../basicComponents/CheckBox";
import React from "react";

export const HeightRadio = ({size,contractHeight,setContractHeight,chosenHeight})=>{
    return(
        <MyCheckbox
            width={size}
            height={size}
            fillColor={colors.dark}
            unfillColor={colors.secondary}
            isChecked={contractHeight === chosenHeight}
            onPress={()=>{
                setContractHeight(chosenHeight)
            }}
            fill={
                <Text style={styles.text}>
                    {chosenHeight}
                </Text>
            }
            unfill={
                <Text style={styles.text}>
                    {chosenHeight}
                </Text>
            }
        />
    )
}