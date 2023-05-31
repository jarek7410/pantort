import React from "react";
import {View,Text,StyleSheet} from "react-native";
import {SquerButton} from "./SquerButton";

const buttonTable= [
    { row: 1,children:[
        { id: 1, name: "pik", icon:"cards-spade" ,color:"black"},
        { id: 2, name: "kier", icon:"cards-heart",color:"red" },
        { id: 3, name: "karo", icon:"cards-diamond",color:"orange" },
        { id: 4, name: "trefl", icon:"cards-club", color:"green"},
        { id: 5, name: "bezatu", icon:"cards",color:"blue"  },
        ]
    },
    { row: 2,children:[
            { id: 1, name: "1", icon:"numeric-1" },
            { id: 2, name: "2",  icon:"numeric-2"  },
            { id: 3, name: "3",  icon:"numeric-3"  },
            { id: 4, name: "J, +", icon:"minus"   },
            { id: 5, name: "Q, -",  icon:"plus"  },
        ]
    },
    { row: 3,children:[
            { id: 1, name: "4", icon:"numeric-4" },
            { id: 2, name: "5",  icon:"numeric-5"  },
            { id: 3, name: "6",  icon:"numeric-6"  },
            { id: 4, name: "K, pass", icon:"minus"   },
            { id: 5, name: "A, =",  icon:"plus"  },
        ]
    },
    { row: 4,children:[
            { id: 1, name: "1", icon:"numeric-1" },
            { id: 2, name: "2",  icon:"numeric-2"  },
            { id: 3, name: "3",  icon:"numeric-3"  },
            { id: 4, name: "J, +", icon:"minus"   },
            { id: 5, name: "Q, -",  icon:"plus"  },
        ]
    },
];
export const BridgeKeyBoard =()=>{
    return(
        <View>
            <Text>work in progress</Text>
            {buttonTable.map((row)=>{
                        return(
                            <Row row={row}/>
                        )
            })}
        </View>
    )
}
const Row=({row})=> {
    return(
        <View key={row.row} style={styles.row}>
            {row.children.map(item=>{
                return(
                        <>
                            <SquerButton color={item.color} icon={item.icon} key={item.id}/>
                        </>
                )
            })}
        </View>
    )
}
const styles =StyleSheet.create({
    row:{
        flexDirection: 'row',
        height:40,
        width:40,
        marginBottom:10,
    }
});