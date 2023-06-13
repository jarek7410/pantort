import React, {useState} from "react";
import {Modal, Text, Pressable, StyleSheet, View, ScrollView, Button} from "react-native";
import {constractComposer, outcomeComposer} from "../helpers/composerhelper";

export const ImpPopup = ({history,setHistry}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [localhistory,setLocalHistory]=useState(history)
    const deleteElementOfHistry = (id) => {

        console.log("history 1",history.length)
        history.splice(id,1)
        console.log("history 2",history.length)
        setHistry(history)
        setLocalHistory(history)
        setModalVisible(false)

    }
    return (
        <>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
        <View style={styles.popup}>
            <ScrollView>
            {history.map((item,id)=>{
                return(
                    <View style={[styles.popupItem,styles.row]} key={id}>
                        <Text style={styles.popupText}>{id} </Text>
                        <Text style={styles.popupText}>{item.number}. </Text>
                        <Text style={styles.popupText}>imp: {item.imp}</Text>
                        <Text style={styles.popupText}>kontract: {constractComposer(item.contract)} {outcomeComposer(item.outcome)}</Text>
                        {/*<Text style={styles.popupText}>wynik: {outcomeComposer(item.outcome)}</Text>*/}
                        <Button title={"usuń"} color={"crimson"} onPress={()=>{

                            deleteElementOfHistry(id)
                        }}/>
                    </View>
                )
            })}
            </ScrollView>
            <View style={{
                backgroundColor:"brown",
                height:40,
                justifyContent:"center",
                alignItems:"center",
            }}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{fontSize:21}}>zamknij</Text>
                </Pressable>
            </View>
        </View>
        </Modal>
            <View style={{backgroundColor:"darkgreen"}}>
                <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text>historia</Text>
                </Pressable>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    popup:{
        height:"100%",
        backgroundColor:"green",
        padding:10,
    },
     popupItem:{
        margin:5,
        backgroundColor:"darkgreen",
     },
     popupText:{
        color:"black",
         marginRight:10,
     },
    row:{
        flexDirection:"row",
        paddingHorizontal:10,
        alignItems:"center",
        justifyContent:"space-between",
        width:"100%"
    },
})
