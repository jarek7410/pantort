
export const expectablePointsTableka=(number:number,val:boolean)=>{
    const num:number=number>=20?number-20:20-number;
    const multiplier:number=number>=20?1:-1;
    if(num<=0){
        return 0;
    }
    if(num<=1){
        return 50*multiplier;
    }
    if(num<=2){
        return 90*multiplier;
    }
    if(num<=3){
        return 130*multiplier;
    }
    if(num<=4){
        return (val?260:220)*multiplier;
    }
    if(num<=5){
        return (val?400:300)*multiplier;
    }
    if(num<=6){
        return (val?600:400)*multiplier;
    }
    if(num<=7){
        return (val?630:430)*multiplier;
    }
    if(num<=8){
        return (val?660:460)*multiplier;
    }
    if(num<=9){
        return (val?690:490)*multiplier;
    }
    if(num<=10){
        return (val?720:520)*multiplier;
    }
    if(num<=11){
        return (val?1000:700)*multiplier;
    }
    if(num<=12){
        return (val?1350:900)*multiplier;
    }
    if(num<=13){
        return (val?1440:990)*multiplier;
    }
    if(num<=14){
        return (val?1800:1250)*multiplier;
    }
    if(num<=15){
        return (val?2100:1400)*multiplier;
    }
    if(num<=16){
        return (val?2200:1400)*multiplier;
    }
    if(num>=17){
        return (val?2200:1400)*multiplier;
    }
}
export const impTable=(differences:number)=>{
    // console.log("imptool",difference)
    const difference:number=differences>=0?differences:-differences;
    const multiplier:number=differences>=0?1:-1;
    let imps:number
    if(difference<=10){
        imps = 0;
    }
    else if (difference<=40){
        imps = 1;
    }
    else if (difference<=80){
        imps = 2;
    }
    else if (difference<=120){
        imps = 3;
    }
    else if (difference<=160){
        imps = 4;
    }
    else if (difference<=210){
        imps = 5;
    }
    else if (difference<=260){
        imps = 6;
    }
    else if (difference<=310){
        imps = 7;
    }
    else if (difference<=360){
        imps = 8;
    }
    else if (difference<=420){
        imps = 9;
    }
    else if (difference<=490){
        imps = 10;
    }
    else if (difference<=590){
        imps = 11;
    }
    else if (difference<=740){
        imps = 12;
    }
    else if (difference<=890){
        imps = 13;
    }
    else if (difference<=1090){
        imps = 14;
    }
    else if (difference<=1290){
        imps = 15;
    }
    else if (difference<=1490){
        imps = 16;
    }
    else if (difference<=1740){
        imps = 17;
    }
    else if (difference<=1990){
        imps = 18;
    }
    else if (difference<=2240){
        imps = 19;
    }
    else if (difference<=2490){
        imps = 20;
    }
    else if (difference<=2990){
        imps = 21;
    }
    else if (difference<=3490){
        imps = 22;
    }
    else if (difference<=3990){
        imps = 23;
    }
    else if(difference<=4490){
        imps = 24;
    }
    else if(difference<=4990){
        imps = 25;
    }
    else if(difference<=5990){
        imps = 26;
    }
    else if(difference<=6490){
        imps = 27;
    }
    else if(difference<=7090){
        imps = 28;
    }
    else if(difference<=7490){
        imps = 29;
    }
    else if(difference<=7990){
        imps = 30;
    }
    else if(difference>=7990){
        imps = 31;
    }
    return imps*multiplier;
}
