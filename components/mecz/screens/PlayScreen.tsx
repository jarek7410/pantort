import React, {useEffect} from "react";
import {View, Text, TextInput, TouchableOpacity} from "react-native";
import {bid, result, suit, Vulnerability, wind} from "../../../helpers/enumhelper";
import {constractComposer, duplicateBoardsComposer, outcomeComposer, scoreComposer} from "../../../helpers/composerhelper";
import {impTable} from "../../../helpers/brydzHalpers";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {color} from "../../../styles/colors";
import {Button} from "../../basicComponents/Button";
import {codePretty} from "../hendler";
import {transW2w} from "../../../helpers/cought_them_all.dto";
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../styles/play.styles";
import {HeightButton, MyCheckbox, RadioButton,CheckBox} from "../../basicComponents/CheckBox";

export const PlayScreen=({
                             code,
                             showHistry,
                             setPlay,
                             title,
                             Open=true,
                             password,
                             round,setRound,
                             boardNumber,setBoardNumber


})=> {
    const [isKontra,setIsKontra] = React.useState(bid.none);
    const [contractHeight,setContractHeight] = React.useState(3);
    const [playedSuit,setPlayedSuit] = React.useState(suit.NT);
    const [outcome,setOutcome] = React.useState(result.fair)
    const [takes,setTakes] = React.useState(0);
    const [volnable,setVolnable] = React.useState(Vulnerability.NONE);
    const [player,setPlayer] = React.useState(wind.S)
    const [dealer,setDealer] = React.useState(wind.N)
    // const [DuplicateBoards,setDuplicateBoards] = React.useState(1)
    // const [isOpen,setIsOpen] = React.useState(Open)
    const isOpen = Open //TODO: refactor unnecessary complication
    const [score,setScore] = React.useState(0);

    const size=50


    const insets = useSafeAreaInsets();

    useEffect(()=>{
        let number=boardNumber
        if(boardNumber>16){
            setBoardNumber(1)
            number=1
        }
        if(boardNumber<1){
            setBoardNumber(16)
            number=16
        }
        const duplicate = duplicateBoardsComposer(number)
        // setDuplicateBoards(duplicate.board)
        setVolnable(duplicate.vulnerability)
        setDealer(duplicate.dealer)
    },[boardNumber])



    const onsubmit = () => {
        /**
         * kolor done
         * wysokość done
         * kontra
         * praed/po
         */
        let contract = {
            number: contractHeight,
            suit: playedSuit,
            double: isKontra,
            wind: player,
        };
        let outcom = {
            tricks: takes,
            result: outcome,
        }
        let vol=false
        if (volnable===Vulnerability.BOTH){
            vol=true
        }
        if (volnable===Vulnerability.NS
            &&(player===wind.N||player===wind.S)){
            vol=true
        }
        if (volnable===Vulnerability.EW
            &&(player===wind.E||player===wind.W)) {
            vol = true
        }
        let scoreLocal = scoreComposer(contract,outcom,vol)
        const imp = impTable(scoreLocal)
        console.log("score: ",scoreLocal)
        // console.log("estimate: ",estimate)
        console.log("imp: ",imp)
        console.log("boardNumber: ",(parseInt(round)+1))
        setScore(imp+score)
        setPlay({
            Open: isOpen,
            Round: parseInt(round),
            board: boardNumber,
            declarer: 0,
            declarerWind: transW2w(player),
            contract: constractComposer({number: contractHeight,suit: playedSuit,double: isKontra,wind: player}),
            result: outcomeComposer({tricks: takes,result:outcome}),
            lead: "",
            imp: imp
        })
        setRound((parseInt(round)+1).toString())
        setBoardNumber(boardNumber+1)
    }


    return(
        <View style={[styles.menu,{paddingBottom:insets.bottom,marginTop:0,paddingTop:0}]}>
            <View style={[styles.rowOnly,{backgroundColor:"yellowgreen"}]}>
                <View style={{
                    // margin:1,
                    // borderRadius:5,
                    marginTop:0,
                    paddingTop:0,
                    paddingBottom:10,
                    height:100,
                    width:180,
                    backgroundColor:
                        volnable===Vulnerability.NONE||volnable===Vulnerability.EW
                            ?"yellowgreen":"firebrick",
                    justifyContent:"flex-end",
                    alignItems:"center"
                }}>
                    <Text style={[styles.text,{fontSize:29}]}>NS</Text>
                </View>
                <View style={{
                    // margin:1,
                    // borderRadius:5,
                    marginTop:0,
                    paddingTop:0,
                    paddingBottom:10,
                    height:100,
                    width:180,
                    backgroundColor:
                        volnable===Vulnerability.NONE||volnable===Vulnerability.NS
                            ?"yellowgreen":"firebrick",
                    justifyContent:"flex-end",
                    alignItems:"center"
                }}>
                    <Text style={[styles.text,{fontSize:29}]}>EW</Text>
                </View>
            </View>
            <View style={{marginTop:0}}>
                    <Text style={{width:300}}>
                        {title}
                    </Text>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => {
                        Clipboard.setStringAsync(code);
                    }}>
                        <Text style={{
                            fontSize: 24,
                            color: color.black, // You can set your preferred color
                            fontWeight: 'bold',
                        }
                        }>
                            {codePretty(code)}
                        </Text>
                    </TouchableOpacity>

                    <View
                        style={{borderRadius:5,height:30,width:100,borderWidth:1, justifyContent:"center",alignItems:"center"}}
                        // onPress={()=>{setIsOpen(!isOpen)}}>
                        >
                        <Text style={styles.text}>{isOpen?"otwarte":"zamknięte"}</Text>
                    </View>

                    {password&&
                        <TouchableOpacity onPress={() => {
                            Clipboard.setStringAsync(password);
                        }} style={{marginLeft: 20}}>
                            <MaterialCommunityIcons name="key" size={30} color="black"/>
                        </TouchableOpacity>}
                </View>

                <View style={[styles.rowOnly,styles.center]}>
                    <View>
                        <Text style={styles.text}>runda</Text>
                        <TextInput style={styles.textInput}
                                   onChangeText={setRound}
                                   value={round}
                                   autoFocus={false}
                                   placeholder="##"
                                   keyboardType="numeric"
                        />
                    </View>
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                        <Text style={[styles.text]}>rozdanie</Text>
                        <View style={[styles.rowOnly]}>
                            <CheckBox
                                isChecked={false}
                                fillColor={"dimgray"}
                                unfillColor={"grey"}
                                disableBuiltInState
                                height={size}
                                width={size}
                                onPress={()=>{setBoardNumber(boardNumber-1)}}
                            >
                                <MaterialCommunityIcons name="minus-thick" size={24} color="black" />
                            </CheckBox>
                            <View style={{borderRadius:5,margin:2, width:size,height:size,borderWidth:1, justifyContent:"center",alignItems:"center"}}
                            >
                                <Text style={[styles.text,{fontSize:29}]}>{boardNumber}</Text>
                            </View>
                            <CheckBox
                                isChecked={false}
                                fillColor={"dimgray"}
                                unfillColor={"grey"}
                                disableBuiltInState
                                height={size}
                                width={size}
                                onPress={()=>{setBoardNumber(boardNumber+1)}}
                            >
                                <MaterialCommunityIcons name="plus-thick" size={24} color="black" />
                            </CheckBox>
                        </View>
                    </View>

                </View>
            </View>
            <View style={[styles.row]}>
                <View>
                    <View
                        style={{marginLeft:1,borderRadius:5,height:30,width:90,borderWidth:1, justifyContent:"center",alignItems:"center"}}>
                        <Text style={styles.text}>Deler: {dealer}</Text>
                    </View>
                    <Button
                        style={{borderRadius:5,height:30,width:90,backgroundColor:"darkgreen",justifyContent:"center",alignItems:"center"}}
                        onPress={showHistry}
                    >
                        <Text style={styles.text}>historia</Text>
                    </Button>
                </View>
                <View style={{borderRightWidth:1,height:"100%",marginRight:5}}/>
                <View>
                    <Text style={styles.text}>Rozgrywa:</Text>
                    <View style={styles.rowOnly}>
                    <View>
                    <RadioButton
                        textStyle={[
                            styles.text,
                            styles.textNoDecoration,
                        ]}
                        // IconChecked={"checkbox-blank-circle"}
                        borderRadius={14}
                        text={"N"}
                        isChecked={player===wind.NS||player===wind.N}
                        onPress={()=>{setPlayer(wind.N)}}
                        fillColor={"darkgreen"}
                        unfillColor={color.green}
                    />
                    <RadioButton
                        textStyle={[
                            styles.text,
                            styles.textNoDecoration,
                        ]}
                        borderRadius={14}
                        text={"E"}
                        isChecked={player===wind.EW||player===wind.E}
                        onPress={()=>{setPlayer(wind.E)}}
                        fillColor={"darkgreen"}
                        unfillColor={color.green}
                    />
                </View>
                <View>
                    <RadioButton
                        textStyle={[
                            styles.text,
                            styles.textNoDecoration,
                        ]}
                        borderRadius={14}
                        text={"S"}
                        isChecked={player===wind.NS||player===wind.S}
                        onPress={()=>{setPlayer(wind.S)}}
                        fillColor={"darkgreen"}
                        unfillColor={color.green}
                    />
                    <RadioButton
                        textStyle={[
                            styles.text,
                            styles.textNoDecoration,
                        ]}
                        borderRadius={14}
                        text={"W"}
                        isChecked={player===wind.EW||player===wind.W}
                        onPress={()=>{setPlayer(wind.W)}}
                        fillColor={"darkgreen"}
                        unfillColor={color.green}
                    />
                </View>
                </View>
                </View>
            </View>
            <HorizontalLine/>
            <Text style={styles.text}>Kontrakt:</Text>
            <View style={[styles.row]}>
                <View >
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
                <View >
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
                <View >
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
                <View style={{borderRightWidth:1,height:"100%",marginHorizontal:5}}/>
                <View >
                    <MyCheckbox
                        width={size}
                        height={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={isKontra===bid.x}
                        onPress={()=>{
                            if(isKontra===bid.x){
                                setIsKontra(bid.none)
                            }else{setIsKontra(bid.x)}}}
                        fillColor={color.orange}
                        unfillColor={color.yellow}
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
                        isChecked={isKontra===bid.xx}
                        onPress={()=>{
                            if(isKontra===bid.xx){
                                setIsKontra(bid.none)
                            }else{setIsKontra(bid.xx)}}}
                        fillColor={color.orange}
                        unfillColor={color.yellow}
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
            <HorizontalLine/>
            <View style={[styles.row,{marginTop:10}]}>
                <View>
                    <CheckBox
                        height={size}
                        width={size}
                    textStyle={[styles.text, styles.textNoDecoration]}
                    isChecked={playedSuit===suit.SPADES}
                    onPress={()=>{setPlayedSuit(suit.SPADES)}}
                    disableBuiltInState
                    fillColor={"grey"}
                    unfillColor={color.yellow}
                >
                    <MaterialCommunityIcons name="cards-spade" size={24} color="black" />
                </CheckBox>
                    <View style={{margin:2,width:size,height:size}}/>
                    <CheckBox
                        height={size}
                        width={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={playedSuit===suit.DIAMONDS}
                        onPress={()=>{setPlayedSuit(suit.DIAMONDS)}}
                        disableBuiltInState
                        fillColor={color.red}
                        unfillColor={color.yellow}
                    >
                        <MaterialCommunityIcons name="cards-diamond" size={24} color="black" />
                    </CheckBox>
                </View>
                <View>
                    <View style={{margin:2,width:size,height:size}}/>
                    <CheckBox
                        height={size}
                        width={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={playedSuit===suit.NT}
                        onPress={()=>{setPlayedSuit(suit.NT)}}
                        disableBuiltInState
                        fillColor={color.blue}
                        unfillColor={color.green}
                    >
                        <Text style={[styles.text,{color: "blue",fontWeight: "bold"}]}>
                            NT
                        </Text>
                    </CheckBox>
                    <View style={{margin:2,width:size,height:size}}/>
                </View>
                <View>

                    <CheckBox
                        height={size}
                        width={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={playedSuit===suit.HEARTS}
                        onPress={()=>{setPlayedSuit(suit.HEARTS)}}
                        disableBuiltInState
                        fillColor={color.red}
                        unfillColor={color.yellow}
                    >
                        <MaterialCommunityIcons name="cards-heart" size={24} color="black" />
                    </CheckBox>
                    <View style={{margin:2,width:size,height:size}}/>
                    <CheckBox
                        height={size}
                        width={size}
                        textStyle={[styles.text, styles.textNoDecoration]}
                        isChecked={playedSuit===suit.CLUBS}
                        onPress={()=>{setPlayedSuit(suit.CLUBS)}}
                        disableBuiltInState
                        fillColor={"grey"}
                        unfillColor={color.yellow}
                    >
                        <MaterialCommunityIcons name="cards-club" size={24} color="black" />
                    </CheckBox>
                </View>
                <View style={{borderRightWidth:1,height:"100%",marginHorizontal:5}}/>
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
                        <Text style={[styles.text,{fontSize:29}]}>
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
            <HorizontalLine/>


            <View style={[styles.row,{marginTop:5}]}>
            </View>
            <TouchableOpacity onPress={onsubmit}>
                <View style={[styles.item,{borderRadius:5}]}>
                    <Text style={[styles.text,{color:"dark"}]}>zatwierdz</Text>
                </View>
            </TouchableOpacity>
            {//TODO: wynik ma być czy w histori
            // albo jako dodatkowa karta miedzy rozgrywakami
            // trzeba bedzie przemigrować niektóre stany warstwe wyrzej
            }
            <Text style={[styles.text,{width:200}]}>wynik na stole: {score}</Text>
        </View>
    )
}
const HorizontalLine = () => {
    return (
        <View style={{borderBottomWidth:1,width:300}}/>
    )
}
// const colortabelka = {
//     black:"#000000",
//   neongreen:"#00FF19",
// }
