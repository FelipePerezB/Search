import { fetchData } from "./utils/fetchData.mjs"

const searchButton = document.getElementById("search-button")
const channelContainer = document.getElementById("channels-container")

const searchInput = document.getElementById("search-input")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c1888b591msh85851edc364f38fp19c284jsnad90d8f735b5',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

searchInput.addEventListener("keyup", (event)=>{
    if (event.key === "Enter" && searchInput.value!=="") {
        getChannel(searchInput.value)
    }
})

searchButton.addEventListener("click", ()=>{
    const searchInput = document.getElementById("search-input").value
    getChannel(searchInput)
})

const getChannel = async (channel) =>{
    const API = `https://youtube-v31.p.rapidapi.com/search?q=${channel}&part=snippet%2Cid&regionCode=US&maxResults=50&order=relevance`
    try {
        const response = await fetchData(API, options)
        const items = response.items.filter((item)=>item.id.kind=="youtube#channel")
        const finalItems = []
        if(items.length>0){
            const orderedItems = items.sort()
            for (let i=0; i<orderedItems.length; i++){
                if(orderedItems[i]!==orderedItems[i+1]){
                    finalItems.push(orderedItems[i])
                }    
            }
            finalItems.forEach((item)=> {
                channelContainer.innerHTML+=`<a href="./youtuber.html#${item.id.channelId}">${item.snippet.channelTitle}</a>`
            })
        } else{
            channelContainer.innerHTML+=`<span>Youtuber not found :(</span>`
        }
    } catch (error) {
        console.error(error);
    }
}