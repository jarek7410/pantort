import {CreatePlayDto} from "./cought_them_all.dto";

export const getMeczID =async (code):Promise<{data,code,mechID}> => {
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
        return {data,code,mechID:data.mecz.id}
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
        const data = await response.json();
        // console.log("data", data)
        return data
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