import { fetchData } from "./utils/fetchData.mjs"

const videosContainer = document.getElementById("content")
const channelName = document.getElementById("name")
const channelDescription = document.getElementById("description")
const channelBanner = document.getElementById("banner")
const channelSubsCount = document.getElementById("subs")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8c1888b591msh85851edc364f38fp19c284jsnad90d8f735b5',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

const showVideos = (videos) =>{
    videos.forEach(video => {
        videosContainer.innerHTML+=
        `<a href=https://www.youtube.com/watch?v=${video.id.videoId}>
          <img alt="Thumbnails of ${video.snippet.title}" width="320" height="180" src="${video.snippet.thumbnails.medium.url}">
          <p>${video.snippet.title}</p>
        </a>`
    });    
}

const getChannel = async () =>{
    const channelId = window.location.hash.replace("#","")
    console.log(channelId)
    getDescription(channelId)
    getVideos(channelId)
}

const getDescription = async (channelId) =>{
    const API = `https://youtube-v31.p.rapidapi.com/channels?part=snippet%2Cstatistics&id=${channelId}`
    try {
        const descrption = await fetchData(API, options)
        const information = descrption.items[0].brandingSettings
        channelName.innerText=information.channel.title
        channelDescription.innerText=information.channel.description
        channelBanner.src=information.image.bannerExternalUrl
        channelBanner.alt=`Banner of ${information.channel.title}`
        channelBanner.width="100vw"
        channelSubsCount.innerText=`${descrption.items[0].statistics.subscriberCount} subs`
    } catch (error) {
        console.error(error);
    }
}

const getVideos = async (channelId) => {
    const API = `https://youtube-v31.p.rapidapi.com/search?channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=10`
    try {
        const videos = await fetchData(API, options)
        console.log(videos)
        showVideos(videos.items) 
    } catch (error) {
        console.error(error);
    }
}
getChannel()