export enum type{
    OK= 200,
    CANCEL=400,
    number=0,
    bid,
    lead,
    result,
    wind=4,
    suit,

}
export enum suit{
    spades="spades",
    hearts="hearts",
    diamonds="diamonds",
    clubs="clubs",
    nt="nt",
}
export enum wind{
    NS="NS",
    EW="EW"
}
export enum bid{
    pass,
    x,
    xx
}
export enum lead{
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