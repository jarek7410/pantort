import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    radioButton:{
      borderRadius:10,
    },
    menu:{
        borderRadius:3,
        backgroundColor:"green",
        margin:20,
        padding:10,
        alignItems:"center",
        width:"70%"
    },
    item:{
        backgroundColor:"darkgreen",
        margin:10,
        padding:10,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    textNoDecoration: { textDecorationLine: "none" },
    textInput:{
        fontSize:25,
        height: 60,
        width: 60,
        borderWidth: 1,
        padding: 10,
        borderColor:"black",
        color:"black",
        marginBottom:5,
        borderRadius:3,
    },
    rowOnly:{
        flexDirection:"row",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
    button:{
        width:30,
        height:30,
        backgroundColor:"grey",
        alignItems:"center",
        justifyContent:"center",
    },
    buttonPlus:{
        backgroundColor:"darkgreen",
    },
    buttonMinus:{
        backgroundColor:"darkred",
    },
    buttonText: {
        fontSize: 20,
    },
    center:{
        alignItems:"center",
        justifyContent:"center",
    }

})

export default styles;