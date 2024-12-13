import React, {useEffect} from "react";
import {BackHandler, StyleSheet,  View} from "react-native"
import {ButtonNinus, ButtonPlus,styles as buttonStyles} from "../components/Buttons";
import {result} from "../../../helpers/enumhelper";
import {CheckBox} from "../../basicComponents/CheckBox";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {color} from "../../../styles/colors";
import {outcomeComposer} from "../../../helpers/composerhelper";
import {Button} from "../../basicComponents/Button";
import {colors} from "../styles/styles";
import {Text} from "../components/Text";

export const DealInput=({setDeal,changeToTable})=>{
    const [outcome,setOutcome] = React.useState<result>()
    const [takes,setTakes] = React.useState(0);
    const [points,setPoints] = React.useState(20);

    const size = 50
    useEffect(() => {
        if(takes>13){
            setTakes(1)
        }
    }, [takes]);
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
        <View style={{backgroundColor:colors.background,height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Button onPress={changeToTable}>
                <Text>Porwóć</Text>
            </Button>
        <View style={{justifyContent:"center",alignItems:"center",width:"auto"}}>
            <Text style={[styles.text,{width:"auto"}]}>punkty na lini:</Text>
            <View style={[styles.rowOnly]}>
                <View>
                    <ButtonNinus text={"-5"} onPress={()=>{decreasePoints(5)}} style={{backgroundColor:colors.vauleable}}/>
                    <ButtonNinus text={"-"} onPress={()=>{decreasePoints(1)}} style={{backgroundColor:colors.vauleable}}/>
                </View>
                <View style={[{backgroundColor:colors.background,justifyContent:"center",alignItems:"center"},buttonStyles.squer]}>
                    <Text style={[styles.text]}>
                        [{points}]
                    </Text>
                </View>
                <View>
                    <ButtonPlus text={"+5"} onPress={()=>increasePoints(5)} style={{backgroundColor:colors.nonVauleable}}/>
                    <ButtonPlus text={"+"} onPress={()=>increasePoints(1)} style={{backgroundColor:colors.nonVauleable}}/>
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
                fillColor={colors.nonVauleable}
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
                fillColor={colors.player}
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
                fillColor={colors.vauleable}
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
                fillColor={colors.nonVauleable}
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
                fillColor={colors.vauleable}
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
        </View>
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
        color:colors.text,
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
