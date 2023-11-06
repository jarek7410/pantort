import React, {useContext, useEffect} from "react";
import {Pressable, Text, View} from "react-native"
import {styles} from "../../styles/styles";
import {isWindVul, Vulnerability, wind as windE} from "../../../../helpers/enumhelper";
import {position} from "../../interfaces";
import {constractComposer} from "../../../../helpers/composerhelper";

export const Compass = ({
                            names,
                            volnable,
                            player,
                            setPlayer,
                            dealer,
                            boardNumber,
                            contract,
                            changeToContract,
                        }) => {
    const squareSides = 100
    return (
        <>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.E}
                />
                <NameTag name={position(windE.S,boardNumber,names).name} wind={windE.S} squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>

                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.W}
                />
            </View>
            <View style={[styles.row]}>
                <NameTag name={position(windE.E,boardNumber,names).name} wind={windE.E}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>

                <Pressable onPress={changeToContract}>
                    <Center squareSides={squareSides} contract={contract}/>
                </Pressable>


                <NameTag name={position(windE.W,boardNumber,names).name} wind={windE.W}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>
            </View>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.N} wind2={windE.E}
                />
                <NameTag name={position(windE.N,boardNumber,names).name} wind={windE.N}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                                wind1={windE.N} wind2={windE.W}
                />
            </View>
        </>
    )
}
const NameTag = ({name,wind,squareSides,volnable,setPlayer,dealer}) => {
    return (
        <Pressable onPress={()=>{setPlayer(wind)}}>
            <View style={[styles.squere,
                {width: squareSides, transform: [{
                    rotate: wind==="N"?"0deg":wind==="E"?"90deg":wind==="S"?"180deg":"270deg"
                }],
                    marginLeft: wind==="E"||wind==="W"?-squareSides/4:0,
                    marginRight: wind==="E"||wind==="W"?-squareSides/4:0,
                    marginTop: wind==="E"||wind==="W"?squareSides/4:0,
                    marginBottom: wind==="E"||wind==="W"?squareSides/4:0,
                    backgroundColor: dealer===wind?"lightskyblue":isWindVul(wind,volnable)?"firebrick":"yellowgreen",
                }
            ]}>
                <Text>{wind}</Text>
                <Text>{name}</Text>
            </View>
        </Pressable>
    )
}
const PlayerSquer = ({wind1,wind2,player,deler,volnable}) => {
    return(
        <>
            {player===wind1 &&
                <Squer wind={wind1} dealer={deler} volnable={volnable}/>
            }
            {player===wind2 &&
                <Squer wind={wind2} dealer={deler} volnable={volnable}/>
            }
            {player===wind1 || player===wind2 ||
                <View style={[styles.squere,{opacity:0}]}/>
            }
        </>
    )
}
const Squer=({wind,dealer,volnable})=>{
    return(
        <View style={[styles.squere,
            {
                backgroundColor: dealer===wind?"lightskyblue":isWindVul(wind,volnable)?"firebrick":"yellowgreen",
            }]}></View>
    )
}
const Center = ({squareSides,contract}) => {
    const [constract,setContract]=React.useState<string>()
    useEffect(() => {
        const contractString=constractComposer(contract)
        console.log("contractString\"",contractString,"\"",typeof contractString,contractString.length)
        if(contractString === ""||contractString === " "){
            setContract("naciśnij by wybrania kontraktu")
        }else{
            setContract(contractString)
        }
        console.log("contract",contractString,typeof contractString)
    }, []);
    return (
        <View style={[{
            width: squareSides,
            height: squareSides,
            backgroundColor: "pink",
            justifyContent: "center",
            alignItems: "center",
        }]}>
            <Text>{constract}</Text>
        </View>
    )
}