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
                         })=>{
    return(
        <>
        {visible &&
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
        />
        ||
        <View style={{height:30,width:30,margin:2}}/>
        }
        </>
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
})=>{
    return(
        <Pressable onPress={onPress} style={{margin:2}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={[{width:30,height:30,borderColor:fillColor,borderWidth:2,borderRadius:borderRadius}]}>
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
        <Pressable onPress={onPress} style={{margin:2}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
                <View style={[{width:30,height:30,borderColor:fillColor,borderWidth:2,borderRadius:borderRadius}]}>
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
export const HeightButton = ({height,contractHeight,setContractHeight})=>{
    return(
        <MyCheckbox
            // textStyle={[styles.text, styles.textNoDecoration]}
            // text={contractHeight.toString()}
            isChecked={contractHeight===height}
            onPress={()=>{
                setContractHeight(height)
            }}
            fillColor={color.orange}
            unfillColor={color.yellow}
            fill={
                <Text style={styles.text}>
                    {height}
                </Text>
            }
            unfill={
                <Text style={styles.text}>
                    {height}
                </Text>
            }
        />
    )
}