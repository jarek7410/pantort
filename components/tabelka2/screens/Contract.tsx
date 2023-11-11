import React, {useEffect} from "react";
import {BackHandler, StyleSheet, Text, View} from "react-native";
import {CheckBox, HeightButton, MyCheckbox} from "../../basicComponents/CheckBox";
import {bid, result, suit} from "../../../helpers/enumhelper";
import {color} from "../../../styles/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {outcomeComposer} from "../../../helpers/composerhelper";
import {Button} from "@rneui/themed";
import {colors} from "../styles/styles";

export const ContractScreen = ({contract,setContract,changeToTable}) => {
    const [isKontra, setIsKontra] = React.useState<bid>(bid.none);
    const [contractHeight, setContractHeight] = React.useState(3);
    const [playedSuit, setPlayedSuit] = React.useState<suit>(suit.NT);
    const size = 50
    useEffect(() => {
        if (contract) {
            setIsKontra(contract.double)
            setContractHeight(contract.number)
            setPlayedSuit(contract.suit)
        }
    }, []);
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
    const save=()=>{
        setContract(
            {...contract,
                number:contractHeight,
                suit:playedSuit,
                double:isKontra}
        )
        changeToTable()
    };
    return (
        <>
            <View style={[styles.row]}>
                <View>
                    <HeightButton
                        size={size}
                        chosenHeight={1}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                    <HeightButton
                        size={size}
                        chosenHeight={4}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                </View>
                <View>
                    <HeightButton
                        size={size}
                        chosenHeight={2}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                    <HeightButton
                        size={size}
                        chosenHeight={5}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                </View>
                <View>
                    <HeightButton
                        size={size}
                        chosenHeight={3}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                    <HeightButton
                        size={size}
                        chosenHeight={6}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                </View>
                <View>
                    <HeightButton
                        size={size}
                        chosenHeight={7}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                    <HeightButton
                        visible={false}
                        size={size}
                        chosenHeight={7}
                        contractHeight={contractHeight}
                        setContractHeight={setContractHeight}
                    />
                    {/*<View style={{height:size,width:size,margin:2}}/>*/}
                </View>
                <View style={{borderRightWidth: 1, height: "100%", marginHorizontal: 5}}/>
                <View>
                    <MyCheckbox
                        width={size}
                        height={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={isKontra === bid.x}
                        onPress={() => {
                            if (isKontra === bid.x) {
                                setIsKontra(bid.none)
                            } else {
                                setIsKontra(bid.x)
                            }
                        }}
                        fillColor={colors.dark}
                        unfillColor={colors.secondary}
                        fill={
                            <Text style={styles.text}>
                                X
                            </Text>
                        }
                        unfill={
                            <Text style={styles.text}>
                                X
                            </Text>
                        }
                    />
                    <MyCheckbox
                        width={size}
                        height={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={isKontra === bid.xx}
                        onPress={() => {
                            if (isKontra === bid.xx) {
                                setIsKontra(bid.none)
                            } else {
                                setIsKontra(bid.xx)
                            }
                        }}
                        fillColor={colors.dark}
                        unfillColor={colors.secondary}
                        fill={
                            <Text style={styles.text}>
                                XX
                            </Text>
                        }
                        unfill={
                            <Text style={styles.text}>
                                XX
                            </Text>
                        }
                    />
                </View>
            </View>

            <View style={[styles.row, {marginTop: 10}]}>

                <CheckBox
                    height={size}
                    width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit === suit.SPADES}
                    onPress={() => {
                        setPlayedSuit(suit.SPADES)
                    }}
                    disableBuiltInState
                    fillColor={"grey"}
                    unfillColor={color.yellow}
                >
                    <MaterialCommunityIcons name="cards-spade" size={24} color="black"/>
                </CheckBox>
                <CheckBox
                    height={size}
                    width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit === suit.DIAMONDS}
                    onPress={() => {
                        setPlayedSuit(suit.DIAMONDS)
                    }}
                    disableBuiltInState
                    fillColor={color.red}
                    unfillColor={color.yellow}
                >
                    <MaterialCommunityIcons name="cards-diamond" size={24} color="black"/>
                </CheckBox>

                <CheckBox
                    height={size}
                    width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit === suit.NT}
                    onPress={() => {
                        setPlayedSuit(suit.NT)
                    }}
                    disableBuiltInState
                    fillColor={color.blue}
                    unfillColor={color.yellow}
                >
                    <Text style={[styles.text, {color: "blue", fontWeight: "bold"}]}>
                        NT
                    </Text>
                </CheckBox>


                <CheckBox
                    height={size}
                    width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit === suit.HEARTS}
                    onPress={() => {
                        setPlayedSuit(suit.HEARTS)
                    }}
                    disableBuiltInState
                    fillColor={color.red}
                    unfillColor={color.yellow}
                >
                    <MaterialCommunityIcons name="cards-heart" size={24} color="black"/>
                </CheckBox>
                <CheckBox
                    height={size}
                    width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit === suit.CLUBS}
                    onPress={() => {
                        setPlayedSuit(suit.CLUBS)
                    }}
                    disableBuiltInState
                    fillColor={"grey"}
                    unfillColor={color.yellow}
                >
                    <MaterialCommunityIcons name="cards-club" size={24} color="black"/>
                </CheckBox>

                {/*<View style={{borderRightWidth: 1, height: "100%", marginHorizontal: 5}}/>*/}

                {/*<Text style={[styles.text,{width:50}]}>{outcomeComposer({tricks: takes,result:outcome})}</Text>*/}
            </View>
            {contractHeight!==undefined&&playedSuit!==undefined&&
                <Button onPress={save}>
                    <Text>Zapisz</Text>
                </Button>
            }
            {playedSuit===undefined&&
                <Text style={{color:colors.warning}}>wybierz kolor kontraktu</Text>
            }
            {contractHeight===undefined&&
                <Text style={{color:colors.warning}}>wybierz  wysokość kontraktu</Text>
            }
        </>
    )
}

const styles = StyleSheet.create({
    menu: {
        borderRadius: 3,
        backgroundColor: "green",
        margin: 20,
        padding: 10,
        alignItems: "center",
        width: "70%"
    },
    item: {
        backgroundColor: "darkgreen",
        margin: 10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        color: colors.light,//TODO: why!
    },
    textNoDecoration: {textDecorationLine: "none", color: colors.light},
    textInput: {
        fontSize: 25,
        height: 60,
        width: 60,
        borderWidth: 1,
        padding: 10,
        borderColor: "black",
        color: "black",
        marginBottom: 5,
        borderRadius: 3,
    },
    rowOnly: {
        flexDirection: "row",
    },
    row: {
        flexDirection: "row",
        // justifyContent: "space-between",
        alignItems: "center",
        // width: "100%"
    },
    button: {
        width: 30,
        height: 30,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPlus: {
        backgroundColor: "darkgreen",
    },
    buttonMinus: {
        backgroundColor: "darkred",
    },
    buttonText: {
        fontSize: 20,
    }

})