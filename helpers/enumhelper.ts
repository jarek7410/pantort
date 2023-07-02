export enum type{
    OK= 200,
    CANCEL=400,
    number=0,
    bid,
    vals,
    result,
    wind=4,
    suit,

}
export enum suit{
    SPADES='spades',
    HEARTS='hearts',
    DIAMONDS='diamonds',
    CLUBS='clubs',
    NT='nt',
}
export enum wind{
    NS="NS",
    EW="EW",
    E="E",
    W="W",
    N="N",
    S="S",
}
export enum bid{
    none="none",
    x='x',
    xx='xx',
}
export enum vals{
    two=2,
    tree,
    four,
    five,
    six,
    seven,
    eight,
    nine,
    T=10,
    J,
    Q,
    K,
    A,
}
export enum result{
    under="-",
    over="+",
    fair="="
}
export enum Boardsceen{
    BACK,
    board,
    contract,
    lead,
    result,
    DONE,
}
export enum appScreen{
    hello,
    plauers,
    board,
    movement,
    tournamentEnd,
    menu,
    message,

}
export enum Vulnerability{
    NONE='none',
    NS='ns',
    EW= 'ew',
    BOTH='both',
}