import {StyleSheet} from "react-native";

export const colors = {
    light: "#edd7d8",
    dark: "#17031a",
    primary: "#850505",
    secondary: "#3f58fa",
    info: "#fd2778",
    success: "#569806",
    warning: "#ffbb58",
    danger: "#ec0363",
    Vulnerable: "yellowgreen",
    NotVulnerable: "firebrick",
}
export const styles = StyleSheet.create({
    debug:{
        borderWidth:1,
        borderColor:"black",
        backgroundColor:"pink",
        opacity:0.5,
    },
    row:{
        flexDirection:"row",
    },
    squere:{
        width:50,
        height:50,
    },
    red:{
        backgroundColor:"firebrick",
    },
    green:{
        backgroundColor:"yellowgreen",
    },
    blue:{
        backgroundColor:"deepskyblue ",
    },
    centerContent:{
        justifyContent:"center",
        alignItems:"center",
    },
    card: {
        padding: 5,
        borderRadius:3,
        backgroundColor: "dark",
    }

});