export const sendData = async (url, data) => {

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:  JSON.stringify(data)
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            console.log(data)
        })

};