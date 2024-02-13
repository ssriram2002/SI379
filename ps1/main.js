let score = 0;

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class


const interval = setInterval(() => {
    console.log('TODO: Add the "needs-whack" class to a random hole');
    if (document.getElementById(getRandomUnwhackedHoleId())!= null ){
        document.getElementById(getRandomUnwhackedHoleId()).classList.add("needs-whack");} 
}, 1000);



for(const id of getAllHoleIds()) {
    // Write code that adds a "click" listener to the element with this id
    //     When the user clicks on it, *if* the element has class "needs-whack" then:
    //          1. Remove the "needs-whack" class
    //          2. Add the "animating-whack" class *for 500 milliseconds*
    //          3. Increment the score by 1 (and update the score display)
    //          4. If the score is 45 or higher, stop the game (by clearing the interval)
        const onTimeout = () => {
            document.getElementById(id).classList.remove("animating-whack");
         }
        const whack = () => {
            if(document.getElementById(id).classList.contains("needs-whack")) {
                document.getElementById(id).classList.remove("needs-whack")
                document.getElementById(id).classList.add("animating-whack");
                setTimeout(onTimeout, 500);
                score ++ ;
                document.getElementById("score").innerHTML= "Score: " + score;
            }
            if (score >= 45){
                clearInterval(interval);
                console.log(`TODO: Add a click listener for #${id} here`)
            } ;
    }
    document.getElementById(id).addEventListener("click", whack);
}




/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}