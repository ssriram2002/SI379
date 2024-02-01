const image = document.querySelector("#clickable_elem");

const onTimeout = () => {
        image.classList.remove("clicked");
    }

const toggleImg = () => {
    if(image.classList.contains("clickable")) {
        image.classList.add("clicked");
        setTimeout(onTimeout, 1000);
    }
};




image.addEventListener("click", toggleImg)
toggleColor();
4
