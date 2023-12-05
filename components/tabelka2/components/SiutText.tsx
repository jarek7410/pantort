import {bid, suit} from "../../../helpers/enumhelper";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {colors} from "../styles/styles";
import React, {useEffect} from "react";
import {Text} from "./Text";
import {StyleSheet} from "react-native";

export const SiutText=({
    startText="",
    endText="",
    size=30,
    contract

                       })=>{
    const siut=contract.suit;
    const styles = StyleSheet.create({
        text: {
            fontSize: size,
            color: colors.text,//TODO: why!
        },
    })
    useEffect(() => {
        console.log(contract.double,contract.suit)
    }, []);
    return(
        <view style={{flexDirection:"row"}}>
            <Text style={[styles.text,]}>{startText}</Text>
            {/*{(contract.number>7||contract.number<0)&&*/}
                <Text style={[styles.text,]}>{contract.number}</Text>
            {/*}*/}
            {siut===suit.NT&&
                <Text style={[{color: "blue", fontWeight: "bold"},styles.text,{color: "blue", fontWeight: "bold"},]}>
                    NT
                </Text>
            }
            {siut===suit.SPADES&&
                <MaterialCommunityIcons name="cards-spade" size={size} color={colors.background}/>

            }
            {siut===suit.DIAMONDS&&
                <MaterialCommunityIcons name="cards-diamond" size={size} color={colors.warning}/>
            }
            {siut===suit.HEARTS&&
                <MaterialCommunityIcons name="cards-heart" size={size} color={colors.warning}/>
            }
            {siut===suit.CLUBS&&
                <MaterialCommunityIcons name="cards-club" size={size} color={colors.background}/>
            }
            {contract.double===bid.x&&
                <Text style={[styles.text,]}>X</Text>
            }
            {contract.double===bid.xx&&
                <Text style={[styles.text,]}>XX</Text>
            }
            <Text style={[styles.text,]}>{endText}</Text>
        </view>
    )
}
