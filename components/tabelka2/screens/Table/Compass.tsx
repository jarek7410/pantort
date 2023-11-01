import React, {useContext} from "react";
import {Pressable, Text, View} from "react-native"
import {styles} from "../../styles/styles";
import {isWindVul, Vulnerability, wind as windE} from "../../../../helpers/enumhelper";

export const Compass = ({names,volnable,player,setPlayer,dealer}) => {
    const squareSides = 100
    const nsStyle = [{

    }]
    return (
        <>
            <Text>Compass</Text>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.W}
                />
                <NameTag name={names[0]} wind={windE.S} squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>

                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.S} wind2={windE.E}
                />
            </View>
            <View style={[styles.row]}>
                <NameTag name={names[2]} wind={windE.W}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>
                <Center squareSides={squareSides}/>
                <NameTag name={names[3]} wind={windE.E}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>
            </View>
            <View style={[styles.row]}>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                             wind1={windE.N} wind2={windE.W}
                />
                <NameTag name={names[1]} wind={windE.N}  squareSides={squareSides}
                         volnable={volnable} setPlayer={setPlayer} dealer={dealer}/>
                <PlayerSquer player={player} deler={dealer} volnable={volnable}
                                wind1={windE.N} wind2={windE.E}
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
                    rotate: wind==="N"?"0deg":wind==="E"?"270deg":wind==="S"?"180deg":"90deg"
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
const Center = ({squareSides}) => {
    return (
        <View style={[{
            width: squareSides,
            height: squareSides,
            backgroundColor: "pink",
        }]}></View>
    )
}
