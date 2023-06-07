import {Button, ScrollView, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import React, {useEffect, useRef, useState} from "react";
import {ScreenSetter} from "./components/ScreenSetter";
import {gameCource1} from "./helpers/exampleData";
// import Realm from "realm";
import {BridgeScreen} from "./components/BridgeScreen";
import {Boardsceen} from "./helpers/enumhelper";
import {roundDefault} from "./helpers/defaultData";

const boardSchema={
    name:"board",
    properties:{
        _id: "int",
        number: "int",
        contract:{
            suit:"int",
            number:"int",
            double:"int",
            wind:"int",
        },
        lead:{
            suit:"int",
            vals:"int",
        },
        outcome:{
            tricks:"int",
            result:"int",
        }
    },
    primatyKey:"_id"
}


export default function App() {
    // const [realm,setRealm]=useState(null)
    // const [playedBoards,setPlayedBoards]=useState([])

    const pairNumber=useRef(0);
    const [boards,setBoards]=useState([])
    const [loading,setLoading]=useState(true)
    const [course,setCourse]=useState({})
    // Initialize the Realm app //database
    // const app = new Realm.App({id:"piernik"})
    // const [user, setUser] = React.useState(app.currentUser);
    const boardsHandler=(board)=>{
        setBoards([...boards,...board])
        // console.log(boards)
        // addBoard(board)
        // console.log(board)
    }
    // useEffect(()=>{
    //     (async ()=>{
    //         const realm= await Realm.open({
    //             path:"myrealm",
    //             schema:[boardSchema]
    //         }).then((realm)=>{
    //             const boards=realm.objects("board");
    //             setBoards([...boards])
    //         })
    //             try{
    //                 boards.addlistener(()=>{
    //                     setBoards([...boards])
    //                 })
    //             }catch (error){
    //                 console.error("Error updateing boards",error)
    //             }
    //     }
    //     )();
    // },[])

    // const addBoard=(board)=>{
    //     realm.write(()=>{
    //         board1 = realm.create("board",board)
    //     })
    // }

    useEffect(()=>{
        setCourse(gameCource1);
        setLoading(false)
    },[])


    return (
    <View style={[styles.container,styles.row]} key="main main">
        <View>
            <SafeAreaProvider style={styles.safeArea}>
                {loading ||<><ScreenSetter
                    course={course}
                    boardsHandler={boardsHandler}
                    pairNumber={pairNumber}
                /></>}
                {loading && <Button title="loading" onPress={()=>{}}/>}
            </SafeAreaProvider>
        </View>
        <ScrollView>
            {boards && boards.map((item)=>{
                return <BridgeScreen baord={item} focus={Boardsceen.BACK} round={roundDefault}/>
            })}
        </ScrollView>
    </View>
    );
}

// // Create a component that displays the given user's details
// function UserDetail({ user }) {
//     return (
//         <div>
//             <h1>Logged in with anonymous id: {user.id}</h1>
//         </div>
//     );
// }
// // Create a component that lets an anonymous user log in
// function Login({ setUser }) {
//     const loginAnonymous = async () => {
//         const user = await app.logIn(Realm.Credentials.anonymous());
//         setUser(user);
//     };
//     return <button onClick={loginAnonymous}>Log In</button>;
// }

const styles = StyleSheet.create({
    safeArea: {
        justifyContent:"center",
    },
    container: {
        flex: 1,
        backgroundColor: '#454545',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row:{
        flexDirection: 'row',
    }
});
