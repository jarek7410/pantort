import {View} from "react-native";
import {useState} from "react";
import {styles} from "./styles";
import {JoinScreen} from "./JoinScreen";
import {PlayScreen} from "./PlayScreen";
import {getMeczID, postGuestMecz, postMeczPlay} from "../../helpers/fetchHelper";
import {CreatePlayDto} from "../../helpers/cought_them_all.dto";
import {ResultsScreen} from "./ResultsScreen";
import {CreateScreen} from "./CreateScreen";
enum scmech {
    join ,
    create,
    list,
    chouse,
    game,
    histry

}

export const MeczControler = () => {
    const [screen, setScreen] = useState(scmech.join);
    const [code, setCode] = useState('')
    const [mechID, setMechID] = useState(-1)
    const [title, setTitle] = useState('')
    const  joinMecz = async (code) => {
        const {mechID,title}={...await getMeczID(code)}

        setMechID(mechID)
        setCode(code)
        setTitle(title)
        setScreen(scmech.game)
    }
    const createMecz = async (name) => {
        const {code,meczId,title} = await postGuestMecz(name)
        setMechID(meczId)
        setCode(code)
        setTitle(title)
        setScreen(scmech.game)
        console.log("create mecz",code,meczId)
    }
    const showCreate = () => {
        setScreen(scmech.create)
    }
    const showJoin = () => {
        setScreen(scmech.join)
    }
    const showPlay = () => {
        setScreen(scmech.game)
    }
    const showHistry = () => {
        setScreen(scmech.histry)
    }
    const setPlay = (playDto:CreatePlayDto) => {
        postMeczPlay(mechID,playDto)
    }

    return(
        <View style={styles.menu}>
            {screen===scmech.join &&
                <JoinScreen action={joinMecz} create={showCreate}/>
            }
            {screen===scmech.game &&
                    <PlayScreen title={title} code={code} showHistry={showHistry} setPlay={setPlay}/>
            }
            {screen===scmech.histry &&
                    <ResultsScreen showResults={showHistry} setPlay={showPlay} meczId={mechID}/>
            }
            {screen===scmech.create &&
                    <CreateScreen  create={createMecz} join={showJoin}/>
            }

        </View>
    )
}
