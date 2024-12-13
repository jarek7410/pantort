import {colors} from "../styles/styles";
import {Text as OText} from "react-native";

export const Text = (props) => {
    return (
        <OText {...props} style={[props.style, { fontFamily: "console",fontWeight:"900",color:colors.text }]}/>
    );
}
