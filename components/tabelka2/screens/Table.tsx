import React from "react";
import {Text, View} from "react-native"
import {Compass} from "./Table/Compass";
import {styles} from "../styles/styles";
import {Button} from "../../basicComponents/Button";
import {wind} from "../../../helpers/enumhelper";
export const Table=({
                        boardNumber,
                        names,
                        volnable,
                        // player,
                        // setPlayer,
                        dealer,
                        changeToPlayers,
                        changeToContract,
                        contract,
                        setContract
})=>{
    const [player,setPlayerState]=React.useState<wind>(wind.N)
    const setPlayer=(wind:wind)=>{
        // console.log("setPlayer",contract.wind,"->",wind)
        const newContract=contract
        newContract.wind=wind
        setContract(newContract)
        setPlayerState(wind)
    }
    return(

        <View>
            {/*split view into 3 parts one for top, bottom and for compas in the midle*/}
            <View style={[]}>
                <Button onPress={changeToPlayers}
                    style={{width: 100}}>
                    <Text>Gracze</Text>
                </Button>
            </View>
            <Compass
                names={names} volnable={volnable}
                player={player} setPlayer={setPlayer}
                dealer={dealer} boardNumber={boardNumber}
                changeToContract={changeToContract}
                contract={contract}
            />
            <View style={[styles.debug]}></View>
        </View>
    )
}