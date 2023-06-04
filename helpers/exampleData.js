import {appScreen, bid, result, suit, vals, wind} from "./enumhelper";


export const movementExample={
    round:0,
    ns:0,
    ew:0,
}
export const boardExample={
    number:4, //1 to 32
    contract:{
        suit:suit.nt,
        number:1,
        double:bid.xx,
        wind:wind.N,
    },
    lead:{
        suit:suit.diamonds,
        vals:vals.A,
    },
    outcome:{
        tricks:1,
        result:result.fair,
    }
}
export const gameCource2=[//michell movement
    {
        type:appScreen.board,
        round:1,
        boards:[1,2],
        table:1,
        ns:1,
        ew:2,
    },
    {
        type: appScreen.movement,
        round: 2,
        ns: {
            table: 1,
            wind: wind.NS,
        },
        ew: {
            table: 2,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:2,
        boards:[5,6],
        table:2,
        ns:3,
        ew:2,
    },
    {
        type: appScreen.movement,
        round: 3,
        ns: {
            table: 2,
            wind: wind.NS,
        },
        ew: {
            table: 3,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:3,
        boards:[3,4],
        table:3,
        ns:5,
        ew:2,
    }
]
export const gameCource1=[//mitcheel movement
    {
        type:appScreen.board,
        round:1,
        boards:[1,2],
        table:1,
        ns:1,
        ew:2,
    },
    {
        type: appScreen.movement,
        round: 2,
        ns: {
            table: 1,
            wind: wind.NS,
        },
        ew: {
            table: 2,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:2,
        boards:[3,4],
        table:1,
        ns:1,
        ew:4,
    },
    {
        type: appScreen.movement,
        round: 2,
        ns: {
            table: 1,
            wind: wind.NS,
        },
        ew: {
            table: 2,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:3,
        boards:[5,6],
        table:1,
        ns:1,
        ew:6,
    }
]