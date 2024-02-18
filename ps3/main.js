const UMevents = [];
const timeout_id = null; 
//want the timeout id to be empty so we set to null

getUMEventsWithImages((eventsData) =>{
    UMevents = eventsData;
    const thumbnails = document.querySelector("#thumbnails");
    for (let i = 0; i<UMevents.length; i++){
        const currentEv = UMevents[i];
        //img contains information
        const imgElem = document.createElement("img");
        //creating an image that will be in the UM list and in the thumbnail div 
        imgElem.setAttribute('id',`thumb-${currentEv.id}`);
        //set id to current id number
        //this is only in the list UM events 
        imgElem.setAttribute('src', currentEv.styled_images.event_thumb);
        //current image that we are on were getting the URL of the image through source
        //set to the image element (imgElem), img we wanna display is from the URL of the event were currently on
        //styled_images.event_thumb is the url source 
        thumbnails.append(imgElem);
        //were appending the image element to the thumbnail div

    }
        
});

function setSelectedIndex (selectedEvent){
    const evTitle = selectedEvent.event_title;
    const evLink= selectedEvent.permalink;
    const evImg = selectedEvent.image_url;
    const evStartTime = getReadableTime(selectedEvent.datetime_start);
    const evDesc = selectedEvent.description

    document.querySelector('#selected-title').innertext = evTitle;
    //sets inner text to title
    document.querySelector('#selected-title').setAttribute('href', evLink);
    //sets title href to img src url 
    document.querySelector('#selected-date').innertext = evStartTime;

    document.querySelector('selected-image').setAttribute('src', evImg);

    document.querySelector('#selected-description').innertext = evDesc;

    if (timeout_id){
        clearTimeout(timeout_id);
    }
    //clears timeout
    timeout_id = setTimeout(()=> {
        setSelectedIndex((selectedEvent+1)%events.length);
    }, 10000)
    //set time out has two arguments: function refrence and the time 
    //function we want to run after 10 sections is set selected index of the next item/img
    //modular function, returns remainder of division function. dividing length by #of events and if it is remainder 1 returns to index 0 

}


imgElem.addEventListener("onclick", (ev) =>{
    imgElem.classList.add("selected");
    setSelectedIndex (imgElem.id);
});
