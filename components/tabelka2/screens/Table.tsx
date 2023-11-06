import React from "react";
import {Text, View} from "react-native"
import {Compass} from "./Table/Compass";
import {styles} from "../styles/styles";
import {Button} from "../../basicComponents/Button";
import {wind} from "../../../helpers/enumhelper";
import {ButtonNinus, ButtonPlus} from "../../tabelka/Buttons";
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
    const setPlayer=(wind:wind)=>{
        // console.log("setPlayer",contract.wind,"->",wind)
        const newContract=contract
        newContract.wind=wind
        setContract(newContract)
        setPlayerState(wind)
    }
    const decreaseBoard = (number) => {
        setBoardNumber(boardNumber-number)
    }
    const increaseBoard = (number) => {
        setBoardNumber(boardNumber+number)
    }
    return(

        <View>
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
            <Text>boardNumber:{boardNumber}</Text>
            <View style={styles.row}>
                <View>
                    <ButtonNinus text={"-5"} onPress={()=>{decreaseBoard(5)}}/>
                    <ButtonNinus text={"-"} onPress={()=>{decreaseBoard(1)}}/>
                </View>
                <View>
                    <ButtonPlus text={"+5"} onPress={()=>increaseBoard(5)}/>
                    <ButtonPlus text={"+"} onPress={()=>increaseBoard(1)}/>
                </View>
            </View>
            <Compass
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