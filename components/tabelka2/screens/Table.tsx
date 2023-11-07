import React, {useEffect} from "react";
import {Text, View} from "react-native"
import {Compass} from "./Table/Compass";
import {colors, styles} from "../styles/styles";
import {Button} from "../../basicComponents/Button";
import {wind as windE, wind} from "../../../helpers/enumhelper";
import {ButtonNinus, ButtonPlus} from "../../tabelka/Buttons";
import {position} from "../interfaces";
export const Table=({
                        boardNumber,
                        setBoardNumber,
                        names,
                        volnable,
                        // player,
                        // setPlayer,
                        dealer,
                        changeToPlayers,
                        changeToContract,
                        changeToDealInput,
                        changeToHistory,
                        contract,
                        setContract
})=>{
    const [player,setPlayerState]=React.useState<wind>(undefined)

    // useEffect(() => {
    //     console.log("Table S",position(windE.S,boardNumber,names).name)
    //     console.log("Table N",position(windE.N,boardNumber,names).name)
    //     console.log("Table E",position(windE.E,boardNumber,names).name)
    //     console.log("Table W",position(windE.W,boardNumber,names).name)
    // }, []);
    const setPlayer=(wind:wind)=>{
        // console.log("setPlayer",contract.wind,"->",wind)
        const newContract=contract
        newContract.wind=wind
        setContract(newContract)
        setPlayerState(wind)
    }
    const decreaseBoard = (number) => {
        const boNu=boardNumber-number
        setBoardNumber(boNu>=1?boNu:1)
    }
    const increaseBoard = (number) => {
        setBoardNumber(boardNumber+number)
    }
    return(

        <View style={styles.centerContent}>
            {/*split view into 3 parts one for top, bottom and for compas in the midle*/}
            <View style={[styles.row]}>
                <Button onPress={changeToPlayers}
                        style={{width: 100}}>
                    <Text>Gracze</Text>
                </Button>
                <Button onPress={changeToHistory}
                        style={{width: 100}}>
                    <Text>historia</Text>
                </Button>
            </View>
            <View style={[styles.card]}>
                <Text style={{fontSize:20}}>Numer pudełka: {boardNumber}</Text>
                <View style={[styles.row,styles.centerContent]}>
                    <ButtonNinus text={"-4"} onPress={()=>{decreaseBoard(4)}}/>
                    <ButtonNinus text={"-"} onPress={()=>{decreaseBoard(1)}}/>
                    <ButtonPlus text={"+"} onPress={()=>increaseBoard(1)}/>
                    <ButtonPlus text={"+4"} onPress={()=>increaseBoard(4)}/>
                </View>
            </View>

            <Compass
                style={{marginTop:20}}
                names={names} volnable={volnable}
                player={player} setPlayer={setPlayer}
                dealer={dealer} boardNumber={boardNumber}
                changeToContract={changeToContract}
                contract={contract}
            />
            {contract.number!==undefined&&contract.suit!==undefined&&contract.wind!==undefined&&
                <Button onPress={changeToDealInput}
                        style={{width: 100}}>
                    <Text>Podlicz rozdanie</Text>
                </Button>
            }
        </View>
    )
}