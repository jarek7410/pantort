import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        borderColor: 'black',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 10,
        width:200,
        fontSize: 16,
        borderRadius: 4,
        minHeight: 30, // Minimum height for the input area
    },
    text:{
        fontSize:20,
        color:"black",
    },
    textNoDecoration: { textDecorationLine: "none" },
    button: {
        width: 70,
        marginHorizontal: 30,
        marginVertical: 20,
    },
});

export default styles;