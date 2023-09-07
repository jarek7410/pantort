import {Pressable, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import styles from "./checkbox.styles";
import {color} from "../../styles/colors";
export const CheckBox = ({
            textStyle={},
            text="",
            isChecked,
            onPress=undefined,
            disableBuiltInState,
            borderRadius=5,
            fillColor,
            unfillColor,
            children,
            visible=true,
            height=30,
            width=30,
                         })=>{
    return(

        <MyCheckbox
            textStyle={textStyle}
            text={text}
            onPress={onPress}
            isChecked={isChecked}
            borderRadius={borderRadius}
            fillColor={fillColor}
            unfillColor={unfillColor}
            fill={children}
            unfill= {children}
            width={width}
            height={height}
            visible={visible}
        />
        )
}
export const MyCheckbox = ({
        textStyle={},
        text="",
        isChecked,
        onPress=undefined,
        borderRadius=5,
        fillColor,
        unfillColor,
        fill= <MaterialCommunityIcons name="check" style={{color:"grey"}}/>,
        unfill =<></>,
        width=30,
        height=30,
        visible=true
})=>{
    return(
        <>
            {visible &&
            <Pressable onPress={onPress} >
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={[{margin:2,width:width,height:height,borderColor:fillColor,borderWidth:2,borderRadius:borderRadius}]}>
                        {isChecked&&
                            <View style={{borderRadius:borderRadius-2,backgroundColor:fillColor,height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                                {fill}
                            </View>
                        }
                        {isChecked||
                            <View style={{borderRadius:borderRadius-2,backgroundColor:unfillColor,height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
                                {unfill}
                            </View>
                        }
                    </View>
                    <Text style={[styles.buttonText,textStyle]}>{text&&" "+text}</Text>
                </View>
            </Pressable>
            ||
            <View style={{height:height,width:width,margin:2}}/>
            }
        </>
    )
}
export const RadioButton = ({
       textStyle,
       text,
       isChecked,
       onPress=undefined,
       borderRadius=5,
       fillColor,
       unfillColor
})=>{
    return(
        <Pressable onPress={onPress}>
            <View style={{margin:2,flexDirection:"row",alignItems:"center"}}>
                <View style={[{borderColor:fillColor,borderWidth:2,borderRadius:borderRadius,width:30,height:30}]}>
                    {isChecked&&
                        <View style={{borderRadius:borderRadius-2,backgroundColor:fillColor,height:"100%",width:"100%",justifyContent:"flex-end",alignItems:"flex-end"}}>
                            <MaterialCommunityIcons name="checkbox-blank-circle" style={{color:unfillColor}}/>
                        </View>
                    }
                    {isChecked||
                        <View style={{borderRadius:borderRadius-2,backgroundColor:unfillColor,height:"100%",width:"100%"}}>
                            <MaterialCommunityIcons name="checkbox-blank-circle" style={{color:fillColor}}/>
                        </View>
                    }
                </View>
                <Text style={[styles.buttonText,textStyle]}>{text&&" "+text}</Text>
            </View>
        </Pressable>
    )
}
export const HeightButton = ({
                                 chosenHeight,
                                 contractHeight,
                                 setContractHeight,
                                 size,
                                 visible=true
})=>{
    return(
        <MyCheckbox
            visible={visible}
            // textStyle={[styles.text, styles.textNoDecoration]}
            // text={contractHeight.toString()}
            height={size}
            width={size}
            isChecked={contractHeight===chosenHeight}
            onPress={()=>{
                setContractHeight(chosenHeight)
            }}
            fillColor={color.orange}
            unfillColor={color.yellow}
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