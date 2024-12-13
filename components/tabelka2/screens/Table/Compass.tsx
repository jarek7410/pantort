import React, {useEffect, useState} from "react";
import {Pressable,  View} from "react-native"
import {Text} from "../../components/Text";
import {colors, styles} from "../../styles/styles";
import {isWindVul, wind, wind as windE} from "../../../../helpers/enumhelper";
import {position} from "../../interfaces";
import {constractComposer} from "../../../../helpers/composerhelper";
import {SiutText} from "../../components/SiutText";

export const Compass = ({
                            style,
                            names,
                            volnable,
                            player,
                            setPlayer,
                            dealer,
                            boardNumber,
                            contract,
                            changeToContract,
                            // nameS,nameE,nameN,nameW,
                        }) => {
    const squareSides = 100
    // useEffect(() => {
    //     console.log("compass S",position(windE.S,boardNumber,names).name)
    //     console.log("compass N",position(windE.N,boardNumber,names).name)
    //     console.log("compass E",position(windE.E,boardNumber,names).name)
    //     console.log("compass W",position(windE.W,boardNumber,names).name)
    // }, [boardNumber]);
    return (
        <View style={style}>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.E}
                />
                <NameTag name={position(windE.S,boardNumber,names).name} wind={windE.S} squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer} player={player}/>

                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.W}
                />
            </View>
            <View style={[styles.row]}>
                <NameTag name={position(windE.E,boardNumber,names).name} wind={windE.E}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer} player={player}/>

                <Pressable onPress={changeToContract}>
                    <Center squareSides={squareSides} contract={contract}/>
                </Pressable>


                <NameTag name={position(windE.W,boardNumber,names).name} wind={windE.W}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer} player={player}/>
            </View>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.N} wind2={windE.E}
                />
                <NameTag name={position(windE.N,boardNumber,names).name} wind={windE.N}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer} player={player}/>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                                wind1={windE.N} wind2={windE.W}
                />
            </View>
        </View>
    )
}
const NameTag = ({name,wind,squareSides,volnable,setPlayer,dealer,player}) => {
    return (
        <Pressable onPress={()=>{setPlayer(wind)}}>
            <View style={[styles.squere,
                {
                    width: squareSides,
                    padding:5,
                    transform: [{
                        rotate: wind==="N"?"0deg":wind==="E"?"90deg":wind==="S"?"180deg":"270deg"
                    }],
                    marginLeft: wind==="E"||wind==="W"?-squareSides/4:0,
                    marginRight: wind==="E"||wind==="W"?-squareSides/4:0,
                    marginTop: wind==="E"||wind==="W"?squareSides/4:0,
                    marginBottom: wind==="E"||wind==="W"?squareSides/4:0,
                    backgroundColor: dealer===wind?colors.player:isWindVul(wind,volnable)?colors.vauleable:colors.nonVauleable,
                    alignItems:"center",
                    justifyContent:"center",
                    borderBottomLeftRadius:
                        (wind===player)||
                        (wind===windE.N&&player===windE.E)||
                        (wind===windE.E&&player===windE.S)||
                        (wind===windE.S&&player===windE.W)||
                        (wind===windE.W&&player===windE.N)
                            ?0:10,
                    borderBottomRightRadius:
                        (wind===player)||
                        (player===windE.N&&wind===windE.E)||
                        (player===windE.E&&wind===windE.S)||
                        (player===windE.S&&wind===windE.W)||
                        (player===windE.W&&wind===windE.N)
                            ?0:10,
                },
            ]}>
                <Text style={{fontSize:24}}>{wind}</Text>
                <Text>{name}</Text>
            </View>
        </Pressable>
    )
}
const PlayerSquer = ({wind1,wind2,player,deler,volnable}) => {
    const style={
        borderBottomLeftRadius:
            (wind2===wind.N&&wind1===wind.E)||(wind1===wind.N&&wind2===wind.E)
                ?20:0,
        borderBottomRightRadius:
            (wind2===wind.N&&wind1===wind.W)||(wind1===wind.N&&wind2===wind.W)
                ?20:0,
        borderTopRightRadius:
            (wind2===wind.S&&wind1===wind.W)||(wind1===wind.S&&wind2===wind.W)
                ?20:0,
        borderTopLeftRadius:
            (wind2===wind.E&&wind1===wind.S)||(wind1===wind.E&&wind2===wind.S)
                ?20:0,
        /**
         *      S
         *  E   +   W
         *      N
         */
    }
    return(
        <>
            {(player===wind1||player===wind2) &&
                <Squer style={style} wind={wind1===player?wind1:wind2} dealer={deler} volnable={volnable}/>
            }
            {/*{player===wind2 &&*/}
            {/*    <Squer wind={wind2} dealer={deler} volnable={volnable}/>*/}
            {/*}*/}
            {player===wind1 || player===wind2 ||
                <View style={[styles.squere,{opacity:0}]}/>
            }
        </>
    )
}
const Squer=({wind,dealer,volnable,style})=>{
    return(
        <View style={[styles.squere,style,
            {
                // borderBottomLeftRadius:20,
                backgroundColor: dealer===wind?colors.player:isWindVul(wind,volnable)?colors.vauleable:colors.nonVauleable,
            }]}></View>
    )
}
const Center = ({squareSides,contract}) => {
    // const [constract,setContract]=React.useState<string>()
    // const [siut,setSiut]= useState<suit>();
    const [startText,setStartText]= useState("");
    useEffect(() => {
        const contractString=constractComposer(contract)
        console.log("contractString\"",contractString,"\"",typeof contractString,contractString.length)
        if(contractString === ""||contractString === " "){
            // setContract("###")
            setStartText("##")
        }else{
            // setContract(contractString)
            setStartText("")
        }
        console.log("contract",contractString,typeof contractString)
    }, []);
    return (
        <View style={[{
            width: squareSides,
            height: squareSides,
            backgroundColor: colors.button,
            justifyContent: "center",
            alignItems: "center",
            padding: 0,
        }]}>
            <SiutText startText={startText} endText={startText} contract={contract}/>
        </View>
    )
}
