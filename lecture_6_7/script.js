const submitButton = document.querySelector("button");
const ulElem = document.querySelector("ul");
const inp = document.querySelector("input");


function doSubmit() {
    const inputValue = inp.value;
    if (inputValue.length > 0){
        const liElm = document.createElement("li");
        ulElem.append(liElm);
        for (const letter of inputValue){
            const spanElem = document.createElement("span");
            spanElem.classList.add("letter");
            spanElem.innerText = letter;
            liElm.append(spanElem);
        }
        inp.value = "";
    }
}


submitButton.addEventListener("click", doSubmit);
inp.addEventListener("keydown", (ev) =>{
    if (ev.key==="Enter"){
        doSubmit();
       console.log("ENTER KEY HIT")
    }
});