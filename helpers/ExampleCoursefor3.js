import {appScreen, wind} from "./enumhelper";

export const gameCource1=[//mitcheel movement
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
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
        table: 1,
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
        table: 1,
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
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        boards:[5,6],
        table:1,
        ns:1,
        ew:6,
    },
    {
        type: appScreen.tournamentEnd,
    }
]
export const gameCource2=[//michell movement
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
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
        table: 1,
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
        table: 2,
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
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        boards:[3,4],
        table:3,
        ns:5,
        ew:2,
    },
    {
        type: appScreen.tournamentEnd,
    }
]
export const gameCource3=[
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
    {
        type:appScreen.board,
        round:1,
        table:2,
        boards:[3,4],
        ns:3,
        ew:4,
    },
    {
        type: appScreen.movement,
        round: 2,
        table: 2,
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
        round:2,
        table:2,
        boards:[5,6],
        ns:3,
        ew:2,
    },
    {
        type: appScreen.movement,
        round: 3,
        table: 2,
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
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        table:2,
        boards:[1,2],
        ns:3,
        ew:6,
    },
    {
        type: appScreen.tournamentEnd,
    }
]
export const gameCource4=[
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
    {
        type:appScreen.board,
        round:1,
        table:2,
        boards:[3,4],
        ns:3,
        ew:4,
    },
    {
        type: appScreen.movement,
        round: 2,
        table: 2,
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
        round:2,
        table:3,
        boards:[1,2],
        ns:5,
        ew:4,
    },
    {
        type: appScreen.movement,
        round: 3,
        table: 3,
        ns: {
            table: 3,
            wind: wind.NS,
        },
        ew: {
            table: 1,
            wind: wind.EW,
        }
    },
    {
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        table:1,
        boards:[5,6],
        ns:1,
        ew:4,
    },
    {
        type: appScreen.tournamentEnd,
    }
]
export const gameCource5=[
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
    {
        type:appScreen.board,
        round:1,
        table:3,
        boards:[5,6],
        ns:5,
        ew:6,
    },
    {
        type: appScreen.movement,
        round: 2,
        table: 3,
        ns: {
            table: 3,
            wind: wind.NS,
        },
        ew: {
            table: 1,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:2,
        table:3,
        boards:[1,2],
        ns:5,
        ew:4,
    },
    {
        type: appScreen.movement,
        round: 3,
        table: 3,
        ns: {
            table: 3,
            wind: wind.NS,
        },
        ew: {
            table: 1,
            wind: wind.EW,
        }
    },
    {
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        table:3,
        boards: [3,4],
        ns:5,
        ew:2,
    },
    {
        type: appScreen.tournamentEnd,
    }
]
export const gameCource6=[
    {
        type: appScreen.message,
        message: "Witaj w turnieju"
    },
    {
        type:appScreen.board,
        round:1,
        table:3,
        boards:[5,6],
        ns:5,
        ew:6,
    },
    {
        type: appScreen.movement,
        round: 2,
        table: 3,
        ns: {
            table: 3,
            wind: wind.NS,
        },
        ew: {
            table: 1,
            wind: wind.EW,
        }
    },
    {
        type:appScreen.board,
        round:2,
        table:1,
        boards:[3,4],
        ns:1,
        ew:6,
    },
    {
        type: appScreen.movement,
        round: 3,
        table: 1,
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
        type: appScreen.message,
        message: "Obrót pudełka o 90 stopni"
    },
    {
        type:appScreen.board,
        round:3,
        table:2,
        boards: [1,2],
        ns:3,
        ew:6,
    },
    {
        type: appScreen.tournamentEnd,
    }
]