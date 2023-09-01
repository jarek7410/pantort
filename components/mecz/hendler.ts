export const codePretty = (code) => {
    if(code.length > 3){
        return(code.slice(0,3) + ' '+ code.slice(3))
    }
    else{
        return(code)
    }
}