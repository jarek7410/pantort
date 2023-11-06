import { StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {color} from "../../styles/colors";
import * as React from "react";
import {bid, isWindVul, result, suit, Vulnerability, wind} from "../../helpers/enumhelper";
import {duplicateBoardsComposer, outcomeComposer, scoreComposer} from "../../helpers/composerhelper";
import {expectablePointsTableka, impTable} from "../../helpers/brydzHalpers";
import {ImpPopup} from "./ImpPopup";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect} from "react";
import {ButtonNinus, ButtonPlus} from "./Buttons";
import {CheckBox, HeightButton, MyCheckbox, RadioButton} from "../basicComponents/CheckBox";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export const TabelkaScreen = () => {
  const [boardNumber,setBoardNumber] = React.useState("1");
  const [isKontra,setIsKontra] = React.useState(bid.none);
  const [contractHeight,setContractHeight] = React.useState(3);
  const [playedSuit,setPlayedSuit] = React.useState(suit.NT);
  const [outcome,setOutcome] = React.useState(result.fair)
  const [takes,setTakes] = React.useState(0);
  const [volnable,setVolnable] = React.useState(Vulnerability.NONE);
  const [player,setPlayer] = React.useState(wind.N)
  const [dealer,setDealer] = React.useState(wind.N)
  const [points,setPoints] = React.useState(20);
  const [DuplicateBoards,setDuplicateBoards] = React.useState(1)

  const [score,setScore] = React.useState(0);
  const [histry,setHistry] = React.useState([])

    const size = 50

  useEffect(()=>{
    const duplicate = duplicateBoardsComposer(parseInt(boardNumber))
    setDuplicateBoards(duplicate.board)
    setVolnable(duplicate.vulnerability)
    setDealer(duplicate.dealer)
  },[boardNumber])

  useEffect(()=>{
    if(parseInt(points)>40||parseInt(points)<0){
      setPoints("20")
    }
  },[points])

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
    const vol=isWindVul(player,volnable)
    let scoreLocal = scoreComposer(contract,outcom,vol)
    let estimate = expectablePointsTableka( points,vol)
    const who=player===wind.N||player===wind.S||player===wind.NS?1:-1
    const imp = impTable(scoreLocal-estimate)*who

    console.log("score: ",scoreLocal)
    console.log("estimate: ",estimate)
    console.log("imp: ",imp)
    console.log("boardNumber: ",(parseInt(boardNumber)+1))
    setScore(imp+score)
    setHistry([...histry,{
      imp:imp,
      contract:contract,
      outcome:outcom,
      level:boardNumber}])
    setBoardNumber((parseInt(boardNumber)+1).toString())
  }

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
useEffect(()=>{
    let number=0
    histry.forEach((item)=>{
        number+=item.imp
    })
    setScore(number)

},[histry])

    return(
      <View style={[styles.menu,{marginTop:0,paddingTop:0}]}>
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
        <View>
        <View style={[styles.row]}>
          <Text style={styles.text}>rozdanie nr:</Text>
          <TextInput style={styles.textInput}
                     onChangeText={setBoardNumber}
                     value={boardNumber}
                     autoFocus={false}
                     placeholder="##"
                     keyboardType="numeric"
          />
          <View style={{marginLeft:10}}>
            <Text style={styles.text}>Deler: {dealer}</Text>
            <ImpPopup history={histry} setHistry={setHistry}/>
          </View>
        </View>
        </View>
        <View style={[styles.row]}>
            <View>
                <Text style={styles.text}>punkty na lini:</Text>
            <View style={[styles.rowOnly,styles.center]}>
                <View>
                    <ButtonNinus text={"-5"} onPress={()=>{decreasePoints(5)}}/>
                    <ButtonNinus text={"-"} onPress={()=>{decreasePoints(1)}}/>
                </View>
                <Text style={[styles.text,{width:35,height:30}]}>
                    [{points}]
                </Text>
                <View>
                    <ButtonPlus text={"+5"} onPress={()=>increasePoints(5)}/>
                    <ButtonPlus text={"+"} onPress={()=>increasePoints(1)}/>
                </View>
            </View>
            </View>

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
          <HorizontalLine/>


        <View style={[styles.row,{marginTop:5}]}>
        </View>
        <TouchableOpacity onPress={onsubmit}>
          <View style={[styles.item,{borderRadius:5}]}>
            <Text style={[styles.text,{color:"dark"}]}>zatwierdz</Text>
          </View>
        </TouchableOpacity>
        <Text style={[styles.text,{fontSize:29}]}>wynik: {score}</Text>
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
    color:"black",
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