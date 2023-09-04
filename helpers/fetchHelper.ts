import {CreatePlayDto} from "./cought_them_all.dto";

export const getMeczID =async (code) => {
    try {
        const response = await fetch("https://pantort.jrk.fi" + '/join/mecz/' + code, {
            method: "GET",
            cache: "no-cache",
            referrerPolicy: "unsafe-url",
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        // console.log("response",response)
        const data = await response.json();
        // console.log("data", data)
        return {data,code,mechID:data.mecz.id,title:data.name,pass:data.password}
    } catch (e) {
        console.log("e", e)
    }
}
export const getPlays =async (mechID)=> {
    try {
        const response = await fetch("https://pantort.jrk.fi" + '/match/' + mechID, {
            method: "GET",
            cache: "no-cache",
            referrerPolicy: "unsafe-url",
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        // console.log("response",response)
        // const data = await response.json();
        // console.log("data", data)
        return response.json()
    } catch (e) {
        console.log("e", e)
    }
}
export const postMeczPlay =async (mechID:number,playDto:CreatePlayDto) => {
    try {
        const sendthis={meczId:mechID,play:playDto}
        console.log("sendthis",sendthis)
        const response = await fetch("https://pantort.jrk.fi" + '/match/' + mechID, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set your desired content type here
                'Accept': '*/*',
                // Add other headers if needed
            },
            body: JSON.stringify(sendthis),
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        return true
    } catch (e) {
        console.log("e", e)
    }
    return false
}
export const postGuestMecz =async (name:string,passward="") => {
    const meczId= await postMecz(69,name)//69 variable from my imagination
    const {code,title}= await postJoinMecz(meczId,name,passward)
    return {meczId,code,title}
}
export const postMecz =async (userId:number,name:string):Promise<number> => {
    try {
        const sendthis={userId,name}
        console.log("sendthis",sendthis)
        const response = await fetch("https://pantort.jrk.fi" + '/match/' , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set your desired content type here
                'Accept': '*/*',
                // Add other headers if needed
            },
            body: JSON.stringify(sendthis),
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.id
    } catch (e) {
        console.log("e", e)
    }
}
export const postJoinMecz =async (meczId:number,name:string,password:string) => {
    try {
        const sendthis={meczId,name,password}
        console.log("sendthis",sendthis)
        const response = await fetch("https://pantort.jrk.fi" + '/join/mecz/' , {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Set your desired content type here
                'Accept': '*/*',
                // Add other headers if needed
            },
            body: JSON.stringify(sendthis),
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("join code",data)
        return {code:data.code,title:data.name}
    } catch (e) {
        console.log("e", e)
    }
}
export const getResult =async (mechID)=> {
    try {
        const response = await fetch("https://pantort.jrk.fi" + '/match/' + mechID+"/result", {
            method: "GET",
            cache: "no-cache",
            referrerPolicy: "unsafe-url",
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        // console.log("response",response)
        const data = await response.json();
        // console.log("data", data)
        return {imp:data.imp,ended:data.ended}
    } catch (e) {
        console.log("e", e)
    }
}
export const deletePlay =async (mechID,playId)=> {
    try {
        const response = await fetch("https://pantort.jrk.fi" + '/match/' + mechID+"/"+playId, {
            method: "DELETE",
            cache: "no-cache",
            referrerPolicy: "unsafe-url",
        })
        if (!response.ok) {
            console.log("some error:", response)
            throw new Error('Network response was not ok');
        }
        // console.log("delete play",mechID,"/",playId)
        //  console.log("response",response)
        // const data = await response.json();
        // console.log("data", data)
        // return {imp:data.imp,ended:data.ended}
    } catch (e) {
        console.log("e", e)
    }
}