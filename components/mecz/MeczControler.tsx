import {View} from "react-native";
import {useState} from "react";
import {styles} from "./styles";
import {JoinScreen} from "./screens/JoinScreen";
import {PlayScreen} from "./screens/PlayScreen";
import {getMeczID, postGuestMecz, postMeczPlay} from "../../helpers/fetchHelper";
import {CreatePlayDto} from "../../helpers/cought_them_all.dto";
import {ResultsScreen} from "./screens/ResultsScreen";
import {CreateScreen} from "./screens/CreateScreen";
import {SideScreen} from "./screens/SideScreen";
import {PasswordScreen} from "./screens/PasswordScreen";
enum scmech {
    join ,
    create,
    list,
    chouse,
    play,
    results,
    side,
    password,

}

export const MeczControler = () => {
    const [screen, setScreen] = useState(scmech.join);
    const [code, setCode] = useState('')
    const [mechID, setMechID] = useState(-1)
    const [title, setTitle] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [password, setPassword] = useState('')
    const  joinMecz = async (code) => {
        const {mechID,title,pass}={...await getMeczID(code)}
        setMechID(mechID)
        setCode(code)
        setTitle(title)
        console.log("pass",pass)
        if(pass==="") {
            setScreen(scmech.side)
        }else {
            setPassword(pass)
            setScreen(scmech.password)
        }
    }
    const createMecz = async (name,passward="") => {
        const {code,meczId,title} = await postGuestMecz(name,passward)
        setMechID(meczId)
        setCode(code)
        setTitle(title)
        setScreen(scmech.side)
        console.log("create mecz",code,meczId)
    }
    const showCreate = () => {
        setScreen(scmech.create)
    }
    const showJoin = () => {
        setScreen(scmech.join)
    }
    const showPlay = () => {
        setScreen(scmech.play)
    }
    const showHistry = () => {
        setScreen(scmech.results)
    }
    const showSide = () => {
        setScreen(scmech.side)
    }
    const postPlay = (playDto:CreatePlayDto) => {
        postMeczPlay(mechID,playDto)
    }

    const setSide = (isOpen:boolean) => {
        setIsOpen(isOpen)
        setScreen(scmech.play)
    };
    const joinProtect = (word:string) => {
        if(word===password) {
            setScreen(scmech.side)
            return true
        }
        return false
    };
    return(
        <View style={styles.menu}>
            {screen===scmech.join &&
                    <JoinScreen action={joinMecz} create={showCreate}/>
            }
            {screen===scmech.play &&
                    <PlayScreen
                        title={title}
                        code={code}
                        showHistry={showHistry}
                        setPlay={postPlay}
                        Open={isOpen}
                        password={password}
                    />
            }
            {screen===scmech.results &&
                    <ResultsScreen setPlay={showPlay} meczId={mechID} isOpen={isOpen}/>
            }
            {screen===scmech.create &&
                    <CreateScreen  create={createMecz} join={showJoin} />
            }
            {screen===scmech.side &&
                    <SideScreen setIsOpne={setSide}/>
            }
            {screen===scmech.password &&
                    <PasswordScreen action={joinProtect} showJoin={showJoin}/>
            }

        </View>
    )
}
