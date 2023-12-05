import {ColorValue, StyleSheet} from "react-native";

// export const colorsTest:Colors = {
//     light: "#edd7d8",
//     dark: "#17031a",
//     primary: "#850505",
//     secondary: "#3f58fa",
//     info: "#fd2778",
//     success: "#569806",
//     warning: "#ffbb58",
//     danger: "#ec0363",
//     Vulnerable: "firebrick",
//     NotVulnerable: "yellowgreen",
// }
// export const hackerColors:Colors = {
//     light: "#00FF19",
//     secondary: "#000000",
//     dark: "#343a40",
//     // primary: "#17031a",
//     primary:"#1b1c1c",
//     info: "#fff",
//     success: "",
//     warning: "#850505",
//     danger: "",
//     Vulnerable: "firebrick",
//     NotVulnerable: "yellowgreen"
// }
export const hackerColors:Colors = {
    vauleable: "#yellowgreen",
    nonVauleable: "firebrick",
    background: "#000000",
    text: "#00FF19",
    button: "#343a40",
    card: "#1b1c1c",
    warning: "#850505",
}
export const    colors:Colors = hackerColors;
// export interface Colors{
//     light: ColorValue,
//     dark: ColorValue,
//     primary: ColorValue,
//     secondary: ColorValue,
//     info: ColorValue,
//     success: ColorValue,
//     warning: ColorValue,
//     danger: ColorValue,
//     Vulnerable: ColorValue,
//     NotVulnerable: ColorValue,
// }
export interface Colors{
    vauleable: ColorValue,
    nonVauleable: ColorValue,
    background: ColorValue,
    text: ColorValue,
    button: ColorValue,
    card: ColorValue,
    warning: ColorValue,
}

/**
 * colors:
 * vaulable
 * non  vaulable
 * background
 * text
 * button
 * card
 */
export const styles = StyleSheet.create({

    text: {
        fontSize: 30,
        color: colors.text,//TODO: why!
    },
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
        borderRadius:10,
        backgroundColor: colors.card,
    },
    button: {
        backgroundColor: colors.button,
    }


});