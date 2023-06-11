import React, {useState} from "react";
import {Modal, Text, Pressable, StyleSheet, View, ScrollView} from "react-native";
import {constractComposer, outcomeComposer} from "../helpers/composerhelper";

export const ImpPopup = ({history}) => {
    const [modalVisible, setModalVisible] = useState(false);
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
            {history.map((item)=>{
                return(
                    <View style={styles.popupItem}>
                        <Text style={styles.popupText}>imp: {item.imp}</Text>
                        <Text style={styles.popupText}>kontract: {constractComposer(item.contract)} {outcomeComposer(item.outcome)}</Text>
                        {/*<Text style={styles.popupText}>wynik: {outcomeComposer(item.outcome)}</Text>*/}
                    </View>
                )
            })}
            </ScrollView>
            <View style={{
                backgroundColor:"crimson",
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
        backgroundColor:"gray",
        padding:10,
    },
     popupItem:{
        margin:5,
        backgroundColor:"darkgreen",
     },
     popupText:{
        color:"black",
     },
})
