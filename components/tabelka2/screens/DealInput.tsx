import React, {useEffect} from "react";
import {BackHandler, StyleSheet, Text, View} from "react-native"
import {ButtonNinus, ButtonPlus} from "../../tabelka/Buttons";
import {result} from "../../../helpers/enumhelper";
import {CheckBox} from "../../basicComponents/CheckBox";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {color} from "../../../styles/colors";
import {outcomeComposer} from "../../../helpers/composerhelper";
import {Button} from "@rneui/themed";
import {colors} from "../styles/styles";
export const DealInput=({setDeal,changeToTable})=>{
    const [outcome,setOutcome] = React.useState<result>()
    const [takes,setTakes] = React.useState(0);
    const [points,setPoints] = React.useState(20);

    const size = 50

    useEffect(() => {
        const backAction = () => {
            changeToTable()
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);
    const increasePoints = (number) => {
        if(points+number>40){
            setPoints(40)
        }else{
            setPoints(points+number)
        }
    };
    const decreasePoints = (number) => {
        if(points-number<0){
            setPoints(0)
        }else{
            setPoints(points-number)
        }
    };
    const submit = () => {
        setDeal({tricks:takes,result:outcome},points)
    }

    return(
        <>
            <Button onPress={changeToTable}>
                <Text>Porwóć</Text>
            </Button>
        <View>
            <Text style={styles.text}>punkty na lini:</Text>
            <View style={[styles.rowOnly]}>
                <View>
                    <ButtonNinus text={"-5"} onPress={()=>{decreasePoints(5)}}/>
                    <ButtonNinus text={"-"} onPress={()=>{decreasePoints(1)}}/>
                </View>
                <View>
                    <Text style={[styles.text,{width:35,height:30}]}>
                        [{points}]
                    </Text>
                </View>
                <View>
                    <ButtonPlus text={"+5"} onPress={()=>increasePoints(5)}/>
                    <ButtonPlus text={"+"} onPress={()=>increasePoints(1)}/>
                </View>
            </View>
        </View>
            <View style={[styles.rowOnly]}>
        <View>
            <CheckBox
                height={size}
                width={size}
                isChecked={outcome===result.over}
                onPress={()=>{
                    setOutcome(result.over)
                    takes>=0?setTakes(takes+1):setTakes(1);
                }}
                disableBuiltInState
                fillColor={"dimgray"}
                unfillColor={"grey"}
            >
                <MaterialCommunityIcons name="plus-thick" size={24} color="black" />
            </CheckBox>
            <CheckBox
                height={size}
                width={size}
                visible={outcome!=result.fair}
                isChecked={false}
                onPress={()=>{
                    setOutcome(result.fair)
                    setTakes(0);
                }}
                disableBuiltInState
                fillColor={"yellowgreen"}
                unfillColor={color.yellow}
            >
                <MaterialCommunityIcons name="equal" size={24} color="black" />
            </CheckBox>
            <CheckBox
                height={size}
                width={size}
                isChecked={outcome===result.under}
                onPress={()=>{
                    setOutcome(result.under)
                    takes<=0?setTakes(takes-1):setTakes(-1);
                }}
                disableBuiltInState
                fillColor={"firebrick"}
                unfillColor={color.red}
            >
                <MaterialCommunityIcons name="minus-thick" size={24} color="black" />
            </CheckBox>
        </View>
        <View>
            <CheckBox
                height={size}
                width={size}
                visible={outcome===result.over}
                isChecked={false}
                onPress={()=>{
                    setOutcome(result.over)
                    takes>=0?setTakes(takes+1):setTakes(1);
                }}
                disableBuiltInState
                fillColor={"dimgray"}
                unfillColor={"grey"}
            >
                <MaterialCommunityIcons name="plus-thick" size={24} color="black" />
            </CheckBox>
            <View style={{borderRadius:5,margin:2, width:size,height:size,borderWidth:1, justifyContent:"center",alignItems:"center"}}
            >
                <Text style={[styles.text,{fontSize:28}]}>
                    {outcomeComposer({tricks: takes,result:outcome})}
                </Text>
            </View>
            <CheckBox
                height={size}
                width={size}
                visible={outcome===result.under}
                isChecked={false}
                onPress={()=>{
                    setOutcome(result.under)
                    takes<=0?setTakes(takes-1):setTakes(-1);
                }}
                disableBuiltInState
                fillColor={"firebrick"}
                unfillColor={color.red}
            >
                <MaterialCommunityIcons name="minus-thick" size={24} color="black" />
            </CheckBox>
        </View>
        {/*<Text style={[styles.text,{width:50}]}>{outcomeComposer({tricks: takes,result:outcome})}</Text>*/}
        </View>
            {outcome!==undefined&&
                <Button onPress={submit}
                style={{marginTop:20}}>
                    <Text>zatwierdz</Text>
                </Button>
            }
        </>
    )
}

const styles = StyleSheet.create({
    menu:{
        borderRadius:3,
        backgroundColor:"green",
        margin:20,
        padding:10,
        alignItems:"center",
        width:"70%"
    },
    item:{
        backgroundColor:"darkgreen",
        margin:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:colors.light,
    },
    textNoDecoration: { textDecorationLine: "none" },
    textInput:{
        fontSize:25,
        height: 60,
        width: 60,
        borderWidth: 1,
        padding: 10,
        borderColor:"black",
        color:"black",
        marginBottom:5,
        borderRadius:3,
    },
    rowOnly:{
        flexDirection:"row",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    button:{
        width:30,
        height:30,
        backgroundColor:"grey",
        alignItems:"center",
        justifyContent:"center",
    },
    buttonPlus:{
        backgroundColor:"darkgreen",
    },
    buttonMinus:{
        backgroundColor:"darkred",
    },
    buttonText: {
        fontSize: 20,
    }

})