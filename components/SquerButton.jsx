


import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Button, StyleSheet, TouchableOpacity} from "react-native";

export const SquerButton=({icon="cards-variant",color="black",alt="text",text="default"})=>{
    return(
        <TouchableOpacity style={styles.button}>
            <MaterialCommunityIcons name={icon} size={24} color={color} />
        </TouchableOpacity >
    )

}
const styles =StyleSheet.create({
    button:{
        backgroundColor:"gray",
        height:40,
        width:40,
        margin:5,
        padding:5,
    }
});