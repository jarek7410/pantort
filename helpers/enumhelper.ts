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

export const isWindVul=(windVar:wind,vul:Vulnerability)=>{
    if(vul===Vulnerability.BOTH){
        return true;
    }
    if(vul===Vulnerability.NONE){
        return false;
    }
    if(vul===Vulnerability.NS){
        if(windVar===wind.NS||windVar===wind.N||windVar===wind.S){
            return true;
        }
        return false;
    }
    if(vul===Vulnerability.EW){
        if(windVar===wind.EW||windVar===wind.E||windVar===wind.W){
            return true;
        }
        return false;
    }
    return false;
}
export const windIsWindy=(wind1:wind,wind2:wind)=>{
    if(wind1===wind.N||wind1===wind.S){
        if(wind2===wind.N||wind2===wind.S){
            return true;
        }
        return false;
    }
    if(wind1===wind.E||wind1===wind.W){
        if(wind2===wind.E||wind2===wind.W){
            return true;
        }
        return false;
    }
    return false;

}
