import React, {useRef, useState} from "react";
import {Boardsceen} from "../../helpers/enumhelper";
import {decodeAction} from "../../helpers/bridgekeyboardhelpers";
import {boardUpdate} from "../../helpers/boardhelper";
import {BridgeScreen} from "./BridgeScreen";
import {BridgeKeyBoard} from "./BridgeKeyBoard";
import {boardEmpty} from "../../helpers/defaultData";
import {Modal, Text, View, StyleSheet, Pressable} from "react-native";

export const BoardHendler = ({round, endHandler}
) => {
    const [focus, setFocus] = useState(Boardsceen.board);
    const [board, setBoard] = useState(JSON.parse(JSON.stringify(boardEmpty)));
    const [modalVisible, setModalVisible] = useState(false);
    const modalText=useRef("Wrong Board")
    const keyboardHandler =( id) => {
        let action = decodeAction(id)
        const [workboard, workfocus] = boardUpdate(board, action, focus)
        if(!workboard.number){
            setFocus(Boardsceen.board)
        }else if(!round.boards.includes(workboard.number)&&workboard.number){
            modalText.current="Zły numer rozdania: "+workboard.number+"\n podaj jeden z: "+round.boards.join(", ");
            wrongBoardHandler()
        }else if(workfocus===Boardsceen.DONE){
            setBoard(JSON.parse(JSON.stringify(boardEmpty)))
            console.log("board reset to",boardEmpty)
            setFocus(Boardsceen.board)
            endHandler({...workboard});
        }else{
            setBoard({...workboard});
            setFocus(workfocus);
        }
    }
    const wrongBoardHandler = () => {
        setFocus(Boardsceen.board)
        setBoard(JSON.parse(JSON.stringify(boardEmpty)))
        setModalVisible(true)
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{modalText.current}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>ukryj</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <BridgeScreen logContext={"boardhendler"} focus={focus} round={round} board={board}/>
            <BridgeKeyBoard onChange={keyboardHandler}/>
        </>
    )
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});