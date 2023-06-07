import {Button, StyleSheet, View} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import {useEffect, useRef, useState} from "react";
import {ScreenSetter} from "./components/ScreenSetter";
import {gameCource1} from "./helpers/exampleData";
import Realm from "realm";


export default function App() {
    const pairNumber=useRef(0);
    const [boards,setBoards]=useState([])
    const [loading,setLoading]=useState(true)
    const [course,setCourse]=useState({})
    // Initialize the Realm app //database
    // const app = new Realm.App({id:"piernik"})
    // const [user, setUser] = React.useState(app.currentUser);
    const boardsHandler=(board)=>{
        setBoards([...boards,...board])
        console.log(boards)
        console.log(board)
    }
    useEffect(()=>{
        setCourse(gameCource1);
        setLoading(false)
    },[])

    return (
    <View style={styles.container} key="main main">
        <SafeAreaProvider style={styles.safeArea}>
            {loading ||<><ScreenSetter
                course={course}
                boardsHandler={boardsHandler}
                pairNumber={pairNumber}
            /></>}
            {loading && <Button title="loading" onPress={()=>{}}/>}
        </SafeAreaProvider>
        {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
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
});
