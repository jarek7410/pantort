
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
        return 70*multiplier;
    }
    if(num<=3){
        return 110*multiplier;
    }
    if(num<=4){
        return (val?290:200*multiplier);
    }
    if(num<=5){
        return (val?440:300)*multiplier;
    }
    if(num<=6){
        return (val?520:350)*multiplier;
    }
    if(num<=7){
        return (val?600:400)*multiplier;
    }
    if(num<=8){
        return (val?630:430)*multiplier;
    }
    if(num<=9){
        return (val?660:460)*multiplier;
    }
    if(num<=10){
        return (val?690:490)*multiplier;
    }
    if(num<=11){
        return (val?800:600)*multiplier;
    }
    if(num<=12){
        return (val?1050:700)*multiplier;
    }
    if(num<=13){
        return (val?1350:900)*multiplier;
    }
    if(num<=14){
        return (val?1500:1000)*multiplier;
    }
    if(num<=15){
        return (val?1650:1100)*multiplier;
    }
    if(num<=16){
        return (val?1800:1200)*multiplier;
    }
    if(num>=17){
        return (val?2100:1400)*multiplier;
    }
}
export const impTable=(difference:number)=>{
    // console.log("imptool",difference)
    if(difference<=10){
        return 0;
    }
    if (difference<=40){
        return 1;
    }
    if (difference<=80){
        return 2;
    }
    if (difference<=120){
        return 3;
    }
    if (difference<=160){
        return 4;
    }
    if (difference<=210){
        return 5;
    }
    if (difference<=260){
        return 6;
    }
    if (difference<=310){
        return 7;
    }
    if (difference<=360){
        return 8;
    }
    if (difference<=420){
        return 9;
    }
    if (difference<=490){
        return 10;
    }
    if (difference<=590){
        return 11;
    }
    if (difference<=740){
        return 12;
    }
    if (difference<=890){
        return 13;
    }
    if (difference<=1090){
        return 14;
    }
    if (difference<=1290){
        return 15;
    }
    if (difference<=1490){
        return 16;
    }
    if (difference<=1740){
        return 17;
    }
    if (difference<=1990){
        return 18;
    }
    if (difference<=2240){
        return 19;
    }
    if (difference<=2490){
        return 20;
    }
    if (difference<=2990){
        return 21;
    }
    if (difference<=3490){
        return 22;
    }
    if (difference<=3990){
        return 23;
    }
    if(difference<=4490){
        return 24;
    }
    if(difference<=4990){
        return 25;
    }
    if(difference<=5990){
        return 26;
    }
    if(difference<=6490){
        return 27;
    }
    if(difference<=7090){
        return 28;
    }
    if(difference<=7490){
        return 29;
    }
    if(difference<=7990){
        return 30;
    }
    return 31;
}