import {colors, styles} from "../../styles/styles";

import {Text} from "../../components/Text";
import {MyCheckbox} from "../../../basicComponents/CheckBox";
import React from "react";

export const HeightRadio = ({size,contractHeight,setContractHeight,chosenHeight})=>{
    return(
        <MyCheckbox
            width={size}
            height={size}
            fillColor={colors.background}
            unfillColor={colors.button}
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