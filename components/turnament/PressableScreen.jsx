import {Pressable, StyleSheet, View} from "react-native";


export const PressableScreen = ({style,children,onPress})=>{
    return(
        <Pressable onPress={onPress}>
            <View style={[styles.screen,style]}>
                {children}
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    screen:{
        width:"100%",
        aspectRatio:2,
        backgroundColor:"darkgreen",
        marginHorizontal : 1,
        justifyContent:"center",
        alignItems:"center",
    },
})