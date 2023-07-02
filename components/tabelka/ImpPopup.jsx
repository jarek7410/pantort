import React, {useEffect, useState} from "react";
import {Modal, Text, Pressable, StyleSheet, View, ScrollView, Button} from "react-native";
import {constractComposer, outcomeComposer, windConposer} from "../../helpers/composerhelper";

export const ImpPopup = ({history,setHistry}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [localhistory,setLocalHistory]=useState(history)
    useEffect(()=>{
        setLocalHistory(history)
    },[history])
    const deleteElementOfHistry = (id) => {
        history.splice(id,1)
        localhistory.splice(id,1)
        setHistry(history)
        setLocalHistory(localhistory)
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
            {localhistory.map((item,id)=>{
                return(
                    <View style={[styles.popupItem,styles.row]} key={id}>
                        <Text style={styles.popupText}>{id+1} </Text>
                        <Text style={styles.popupText}>{item.contract.number}. </Text>
                        <Text style={styles.popupText}>imp: {item.imp}</Text>
                        <Text style={styles.popupText}>kontract: {windConposer(item.contract)}{constractComposer(item.contract)}  {outcomeComposer(item.outcome)}</Text>
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
                <Pressable onPress={() => {
                    // console.log("histyr",history[0])
                    setModalVisible(!modalVisible)
                }}>
                    <Text style={{fontSize:21}}>zamknij</Text>
                </Pressable>
            </View>
        </View>
        </Modal>
        <View style={{borderRadius:5,height:30,width:70,backgroundColor:"darkgreen",justifyContent:"center",alignItems:"center"}}>
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
