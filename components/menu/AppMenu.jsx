import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {ChousePairPremade} from "./ChousePairPremade";
import {
    gameCource1,
    gameCource2,
    gameCource3,
    gameCource4,
    gameCource5,
    gameCource6
} from "../../helpers/ExampleCoursefor3";
import {MenuOption} from "./MenuOption";
import {sendData} from "../../helpers/dataHandling";
import {boardExample} from "../../helpers/exampleData";



export const AppMenu = ({setCourse}) => {
    const [isHomescreen,setIsHomescreen] = React.useState(true);
    const [isPairscreen,setIsPairscreen] = React.useState(false);
    const [isPremadeCourse,setIsPremadeCourse] = React.useState(false);
    const premadeActionHandler = (pairNumber) => {
        if (!(pairNumber > 0 && pairNumber <= 6)) {
            return;
        }
        console.info("pairNumber",pairNumber)
        switch (pairNumber){
            case 1:
                setCourse(gameCource1)
                break;
            case 2:
                setCourse(gameCource2)
                break;
            case 3:
                setCourse(gameCource3)
                break;
            case 4:
                setCourse(gameCource4)
                break;
            case 5:
                setCourse(gameCource5)
                break;
            case 6:
                setCourse(gameCource6)
                break;

        }
    }

    const setHomeScreen = () => {
        setIsHomescreen(true);
        setIsPairscreen(false);
        setIsPremadeCourse(false);
    }
    const setPremadeCourse = () => {
        setIsHomescreen(false);
        setIsPairscreen(false);
        setIsPremadeCourse(true);
    }


    const setChooseTabelka= () => {
        setCourse(0);
    }
    const setChooseMecz = () => {
        setCourse(1);
    }
    return(
      <View
            style={{
                width:300,
                }}>
                {isPairscreen && <ProfileScreen/>}
                {isPremadeCourse &&
                    <ChousePairPremade setPair={premadeActionHandler}/>}
                {isHomescreen &&
                  <HomeScreen premade3={setPremadeCourse} tabelka={setChooseTabelka} mecz={setChooseMecz} />}
      </View>
  )
}
const HomeScreen = ({premade3,tabelka,mecz}) => {
    return (
        <>
            <View style={[styles.menu]}>
                <MenuOption text="mecz" handler={mecz}/>
                <MenuOption text="na tabelke" handler={tabelka}/>
                {/*<MenuOption style={{backgroundColor: "grey"}} text="Dołacz do Turnieju" handler={()=> {}}/>*/}
                {/*<MenuOption style={{backgroundColor: "grey"}} text="domyślny na 3" handler={premade3}/>*/}
            </View>
        </>
    );
};

const ProfileScreen = ({route}) => {
    return <Text>This is {route.params.name}'s profile</Text>;
};

const styles = StyleSheet.create({
    menu:{
        // backgroundColor:color.primary,
        padding:10,
    },
    item:{
        backgroundColor:"darkgreen",
        flex:1,
        aspectRatio:5,
        margin:10,
        padding:10,
        width:200,
        justifyContent:"center",
        alignItems:"center",
    },
    text:{
        fontSize:20,
        color:"black",
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%"
    },
})