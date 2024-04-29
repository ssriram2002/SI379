
const gryffindorButton = document.getElementById('gryffindor-button');
const hufflepuffButton = document.getElementById('hufflepuff-button');
const ravenclawButton = document.getElementById('ravenclaw-button');
const slytherinButton = document.getElementById('slytherin-button');
const spellQuizButton = document.getElementById('spell-quiz-button');
const chapterQuizButton = document.getElementById('chapter-quiz-button');
const characterQuizButton= document.getElementById('character-quiz-button');
const backbuttons = document.querySelectorAll(".back-button");
const newQuiz= document.querySelector('.new-quiz-button');
let previous_interval;

/* -----------------CHOOSING HOUSE CHANGING THEME, OPENING QUIZES------------------*/
function changeBackgroundColor(img_url,font_color) {
    var htmlElement = document.documentElement;
    htmlElement.style.backgroundImage = "url(" + img_url + ")";
    var welcome_text = document.querySelector('.welcome')
    welcome_text.style.color = font_color;
  }
function showQuizzes() {
    const quizzesDivs = document.querySelectorAll(".individual-quiz-section");
    // Hide the house information section
    document.querySelector('.house-box').style.display = 'none';
    // Show the quizzes section
    document.querySelector('.quiz-section').style.display = 'flex';
    for (quiz of quizzesDivs){
        quiz.style.display ='none';
    };
  }

gryffindorButton.addEventListener('click', () => {
    changeBackgroundColor('red.png', "#d3a625");
    showQuizzes('Gryffindor');
});
hufflepuffButton.addEventListener('click', () => {
    changeBackgroundColor('yellow.png', "#372e29");
    showQuizzes('hufflepuff');
});
ravenclawButton.addEventListener('click', () => {
    changeBackgroundColor('blue.png', "#946b2d");
    showQuizzes('Ravenclaw');
});
slytherinButton.addEventListener('click', () => {
    changeBackgroundColor('green.png', "#aaaaaa");
    showQuizzes('Slytherin');
});



/* CHOOSING QUIZ TYPE, CHANGING TO THAT PAGE*/
function showSpellQuiz() {
    document.querySelector('.quiz-section').style.display = 'none';
    document.querySelector('#spell-quiz-section').style.display = 'flex';
    showQuestion();
  }
  spellQuizButton. addEventListener('click', () => {
    showSpellQuiz();
  });


function showCharacterQuiz() {
    document.querySelector('.quiz-section').style.display = 'none';
    document.querySelector('#character-quiz-section').style.display = 'flex';
  }
  characterQuizButton. addEventListener('click', () => {
    showCharacterQuiz();
  });

function showChapterQuiz() {
    document.querySelector('.quiz-section').style.display = 'none';
    document.querySelector('#chapter-quiz-section').style.display = 'flex';
    initializeChapterQuiz();
  }

characterQuizButton. addEventListener('click', () => {
    showCharacterQuiz();
  });

chapterQuizButton. addEventListener('click', () => {
    showChapterQuiz();
  });

for (button of backbuttons){
    button.addEventListener('click', () => {
    showQuizzes();
    console.log("showed quizes ")
    })
};

//------------------------------ SPELLS QUIZ ------------------------------ //
/**
 * A function to randomly shuffle the items in an array and return a copy of the shuffled array.
 * Based on: https://stackoverflow.com/a/12646864
 * 
 * @param {Array} array An array of any type
 * @returns A shuffled copy of the array
 */
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Copy the array

    // Shuffle the copy of the array using https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) { // For each index,
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements i and j
    }
    return shuffledArray; // Return the shuffled copy
}
async function fetchPotions() {
    const repsonse = await
    fetch ('https://api.potterdb.com/v1/potions');
    const data= await repsonse.json();
    //console.log(data);
    return data;  
}
async function fetchSpells() {
    const repsonse = await
    fetch ('https://api.potterdb.com/v1/spells');
    const data= await repsonse.json();
    //console.log(data);
    return data;  
}

let currentQuestionIndex = 0;
let correctCount = 0;
let attemptedCount= 0;
q_clicked= false;


//Normal Timer

let previous_interval_spell;
function Timer(time) {
    let countdownTimeS = time;
    let minutes_S = Math.floor(time / 60);
    let seconds_S = time % 60;

    const timerElementspell = document.getElementById('spell-timer');
    console.log("timer element spell" , timerElementspell);
    timerElementspell.textContent =`${minutes_S}:${seconds_S.toString().padStart(2, '0')}`;
    
    clearInterval(previous_interval_spell);
    previous_interval_spell = setInterval(() =>{
        countdownTimeS--;
        countdownS_M= Math.floor(countdownTimeS / 60);
        countdownS_S= countdownTimeS % 60;
        timerElementspell.textContent =`${countdownS_M}:${countdownS_S.toString().padStart(2, '0')}`;
    // Check if the countdown has reached zero
    if (countdownTimeS === 0) {
        clearInterval(previous_interval_spell); // Stop the timer when it reaches zero
        // Perform any action you want when the countdown reaches zero
        console.log("Countdown finished!");
        document.getElementById('spell-quiz-box').innerHTML = ` Times Up! You scored ${correctCount} out of ${attemptedCount} answered questions on the spells and potions quiz. Click New Quiz to try again! `
        
    } }
    , 1000)
}

async function showQuestion() {
    Timer(600);
    const potions_raw_data = await fetchPotions();
    const potions_array_data= potions_raw_data['data'];
    //console.log(potions_API_data);
    const spells_raw_data = await fetchSpells();
    const spells_array_data= spells_raw_data['data'];
    const combined_spells_potions_data_raw = potions_array_data.concat(spells_array_data);
    const filtered_spells_potions_data = combined_spells_potions_data_raw.filter(item => item.attributes.effect);
    let combined_spells_potions_data = shuffleArray(filtered_spells_potions_data);



    let spells_potions_names = [];
    for (let item in combined_spells_potions_data){
        const name = combined_spells_potions_data[item].attributes.name;
        //console.log(name);
        spells_potions_names.push(name);
    }
    console.log(spells_potions_names);

    let questionCount = 0;

    for (let q in combined_spells_potions_data){
        
        if (questionCount >= 10) {
            break; 
        }
        const shuffledNames = shuffleArray(spells_potions_names);
        const currentQuestion = combined_spells_potions_data[currentQuestionIndex];
        console.log(currentQuestion);
        const effectText = currentQuestion.attributes.effect;
        //console.log(effectText);
        const answer_name= currentQuestion.attributes.name;
        //console.log(answer_name);
        let answers = [answer_name];

        for (let i = 0; answers.length < 4 && i < shuffledNames.length; i++) {
            const name = shuffledNames[i];
            if (name !== answer_name && !answers.includes(name)) {
                answers.push(name);
            }
        }

        shuffledAnswers= shuffleArray(answers);
        //console.log(shuffledAnswers);
        const currentQBox = document.createElement('div');
        currentQBox.innerHTML +=`${effectText}`;
        const answerList = document.createElement('ul');
        for (const answer of shuffledAnswers){
            //console.log(answer);
            let q_clicked = false;
            const answerListElem = document.createElement("li");
            const answerListElemButton= document.createElement("button");
    

            answerListElemButton.innerHTML += `${answer}`;
            answerListElem.append(answerListElemButton);
            answerList.append(answerListElem);
            answerListElemButton.addEventListener('click', () => {
                if (!q_clicked) {
                    attemptedCount++;
                    document.getElementById('attempted-count').textContent = attemptedCount;
                    if (answer === answer_name) {
                        correctCount++;
                        document.getElementById('correct-count').textContent = correctCount;
                        // Add the 'correct' class if the answer is correct
                        answerListElemButton.classList.add('correct');
                    } else {
                        // Add the 'incorrect' class if the answer is incorrect
                        answerListElemButton.classList.add('wrong');
                    }
            
                    q_clicked = true;
            
                    // Disable all buttons after clicking
                    const answerButtons = answerList.querySelectorAll('button');
                    answerButtons.forEach(button => {
                        button.disabled = true;
                    });
                }
            if (attemptedCount===10) {
                clearInterval(previous_interval_spell);
                document.getElementById('spell-quiz-box').innerHTML = `You scored ${correctCount} out of ${attemptedCount} on the spells and potions quiz. Click New Quiz to try again! `

            }
            });
            

        } 
        currentQuestionIndex++;
        questionCount++;

        currentQBox.appendChild(answerList);

        document.getElementById('spell-quiz-box').appendChild(currentQBox);
}

};


newQuiz.addEventListener("click", () => {
    document.getElementById('spell-quiz-box').innerHTML = '';
    // Reset variables
    currentQuestionIndex = 0;
    correctCount = 0;
    attemptedCount = 0;
    q_clicked = false;
    // Show new questions
    showQuestion();
    document.getElementById('attempted-count').textContent = 0;
    document.getElementById('correct-count').textContent = 0;
    attemptedCount = 0;
    correctCount=0;
})




//------------------------------ CHARACTER QUIZ ------------------------------ //

async function fetchCharacterData() {
    const repsonse = await
    fetch ('https://hp-api.onrender.com/api/characters');
    const data= await repsonse.json();
    //console.log(data);
    return data;  
}

let submit_time = false;
let attemptedCountCharacter = 0;
let correctCountCharacter = 0;

// Function to display the character image
function displayCharacter(character) {
    console.log('display character' , character);
    submit_time = false;
    document.getElementById("guess-input").disabled = false;
    document.getElementById("submit-guess").disabled= false;
    const characterImageContainer = document.getElementById('character-image-container');
    let img = document.createElement('img');
    img.src = character.image;
    img.alt = character.name;
    characterImageContainer.innerHTML = ''; // Clear previous image
    characterImageContainer.appendChild(img);
    fadeIn(img);

    characterTimer(img.alt,30);
    return;
}

// CharacterTimer
function characterTimer(correctAnswer,time) {
    let countdownTime = time;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    const timerElement = document.getElementById('char-timer');
    timerElement.textContent =`${minutes}:${seconds.toString().padStart(2, '0')}`;
    console.log('timer element' , timerElement) // Display the current countdown time
    clearInterval(previous_interval);
    previous_interval = setInterval(() =>{
        countdownTime--;
        countdown_M= Math.floor(countdownTime / 60);
        countdown_S= countdownTime % 60;
        timerElement.textContent =`${countdown_M}:${countdown_S.toString().padStart(2, '0')}`;
    // Check if the countdown has reached zero
    if (countdownTime === 0) {
        clearInterval(previous_interval); // Stop the timer when it reaches zero
        // Perform any action you want when the countdown reaches zero
        console.log("Countdown finished!");
        document.getElementById('result').textContent = `Character: ${correctAnswer}`;
        attemptedCountCharacter++;
        document.getElementById('attempted-count-character').textContent = attemptedCountCharacter;
        document.getElementById("guess-input").disabled = true;
        document.getElementById("submit-guess").disabled= true;
    } }
    , 1000)
};


function fadeIn(element) {
    var opacity = 0;
    var intervalID = setInterval(function() {
        if (opacity < 1) {
            opacity += 0.0001; // You can adjust the increment value for smoother or faster fading
            element.style.opacity = opacity;
        } else {
            clearInterval(intervalID);
        }
    }, 10); // Adjust the interval duration for smoother or faster fading
}

function submitGuessHandler(charactersData, currentCharacterIndex) {
    console.log(charactersData);
    console.log("currentCharacterIndex submit button clicked ", currentCharacterIndex);
    clearInterval(previous_interval);
    document.getElementById("guess-input").disabled = true;
    document.getElementById("submit-guess").disabled = true;
    attemptedCountCharacter++;
    //console.log(attemptedCount);
    let userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
    console.log("user guess" + userGuess);
    let correctAnswer = charactersData[currentCharacterIndex].name.toLowerCase();
    console.log("correctanswer" + correctAnswer)
    if (userGuess === correctAnswer) {
        document.getElementById('result').textContent = 'Correct!';
        console.log('correct count');
        correctCountCharacter++;
        console.log(correctCount);
        document.getElementById('correct-count-character').textContent = correctCountCharacter;
        document.getElementById('attempted-count-character').textContent = attemptedCountCharacter;

    } else {
        document.getElementById('result').textContent = `Incorrect. The character is: ${correctAnswer}`;
        document.getElementById('attempted-count-character').textContent = attemptedCountCharacter;
    }

    document.getElementById('guess-input').value = '';

    // Remove event listener after function execution
    document.getElementById('submit-guess').removeEventListener('click', submitGuessHandler);
};

// Function to initialize the quiz
async function initializeQuiz() {

    const charactersDataRaw = await fetchCharacterData();
    const filtered_characters_data = charactersDataRaw.filter(item => item.image);
    const charactersData = shuffleArray(filtered_characters_data);


    let currentCharacterIndex = 0;

    console.log("currentCharacterIndex ",currentCharacterIndex );
    displayCharacter(charactersData[currentCharacterIndex]);
    console.log(charactersData[currentCharacterIndex]);
    //console.log("after display character is called currentCharacterIndex ",currentCharacterIndex );
    // Display the first character image
      
    // Event listener for the submit guess button
    document.getElementById('submit-guess').addEventListener('click', () => {
        if (!submit_time) {
            submit_time = true; // Set submit_time to true to prevent further submissions until next question
            submitGuessHandler(charactersData, currentCharacterIndex);
            document.getElementById('guess-input').value = '';
        }
        });

    document.getElementById('next-q').addEventListener('click', () => {
        currentCharacterIndex++;
        document.getElementById('guess-input').value = ' ';
        document.getElementById('result').textContent = ' ';
        displayCharacter(charactersData[currentCharacterIndex]);
    });
}
initializeQuiz();



//------------------------------ CHAPTER QUIZ ------------------------------ //

async function fetchBooks() {
   const repsonse = await
   fetch ('https://api.potterdb.com/v1/books');
   const data= await repsonse.json();
   //console.log(data);
   return data;  
}


async function fetchChapterInfo(bookId, chapterID){
    const repsonse = await
   fetch (`https://api.potterdb.com/v1/books/${bookId}/chapters/${chapterID}`);
   const data= await repsonse.json();
   //console.log(data);
   return data; 
}

let currentChapterIndex = 0;
let currentBookId = null;
let currentChapterId = null;
let shuffledChapterIds = [];
const book_chapters_id_dic = {};
const chapter_ids_array = [];
const book_id_title_dic = {};
const buttons = document.querySelectorAll('.book-button');
let previous_interval_chapter;

async function initializeChapterQuiz(){
    const booksDataRaw = await fetchBooks();
    for (book of booksDataRaw['data']){
        let chapter_lst= [];
        let book_id =  book['id'];
        //console.log(book_id);
        let book_title = book['attributes'].title;
        //console.log(book_title);
        book_id_title_dic[book_id]= book_title;
        //console.log("bookid" ,book_id);
        for(let chapter of book['relationships'].chapters.data){
            chapter_lst.push(chapter['id']);
            chapter_ids_array.push(chapter['id']);
            };
        book_chapters_id_dic[book_id] = chapter_lst;
    }
    loadNextChapter();

};

async function loadNextChapter() {
    const shuffledChapterIds = shuffleArray(chapter_ids_array);
    //console.log("shuffled chapter IDs: ",shuffledChapterIds);
    const nextChapterId = shuffledChapterIds[currentChapterIndex];
    //console.log("next chapter ID: "+ nextChapterId); 
    const bookId = getBookIdForChapter(nextChapterId);
   // console.log("load next chapter function book id:" , bookId);
    if (bookId) {
        currentBookId = bookId;
        currentChapterId = nextChapterId;
        //console.log("load next chapter function chapter id:" , currentChapterId);
        chapterData = await fetchChapterInfo(bookId, nextChapterId);
        //console.log(chapterData);
        displayChapter(chapterData);
    } else {
        console.error('Book ID not found for chapter ID:', nextChapterId);
    }
}


function getBookIdForChapter(chapterId) {
    //console.log(chapterId);
    const bookIDs = Object.keys(book_chapters_id_dic)
   //console.log(bookIDs);
    for (let bookId of bookIDs) {
        let chapters_in_book = book_chapters_id_dic[bookId];
        if (chapters_in_book.includes(chapterId) ) {
            //console.log("bookId: ",bookId);
            return bookId;
        }
    }
    return null;
}

function formatChapterTitle(chapterTitle) {
    let words = chapterTitle.split('-');
    let capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    let formattedTitle = capitalizedWords.join(' ');
    return formattedTitle;
}


function displayChapter(chapterData) {
    for (button of buttons){
        button.disabled=false;
        button.style.cursor= 'pointer';
    };
    ChapterTimer(60);
    document.getElementById("chapter-hint-button").style.display = "block";
    document.getElementById('chapter-hint').style.display= "none";
    let chapterNameRaw = chapterData["data"].attributes.slug;
    let chapterName =formatChapterTitle(chapterNameRaw);
    let chapterSummary = chapterData["data"].attributes.summary;
    if (!chapterSummary || chapterSummary.trim() === '') {
        document.getElementById("chapter-hint-button").style.display = "none";
    }
    document.getElementById('chapter-name').textContent = chapterName;
    document.getElementById('chapter-hint').textContent = chapterSummary;
    document.getElementById('result').textContent = '';
}


correctCountChapter= 0;
attemptedCountChapter = 0;
function checkAnswer(selectedBookTitle) {

    attemptedCountChapter++;
    const correctBookId= getBookIdForChapter(currentChapterId);
    console.log("book_id_title_dic check answer funtion", book_id_title_dic);
    correctBookTitle=  book_id_title_dic[correctBookId];
    for (button of buttons){
        if (button.id != correctBookTitle){
            button.disabled=true;
            button.style.cursor= 'not-allowed';
        }
        else{
            button.style.cursor= 'not-allowed';
        }
    };
    clearInterval(previous_interval_chapter);
    console.log("correctBookID", correctBookId);
    console.log("selectedBook", selectedBookTitle);
    console.log("correctBook", correctBookTitle);
    const resultText = document.getElementById('result');
    if (selectedBookTitle === correctBookTitle) {
        correctCountChapter++;
        document.getElementById('correct-count-chapter').textContent = correctCountChapter;
        document.getElementById('attempted-count-chapter').textContent = attemptedCountChapter;
    } else {
        document.getElementById('attempted-count-chapter').textContent = attemptedCountChapter;
    }
}




// Add an event listener to each button
for (ChapterButton of buttons){
    //console.log(ChapterButton);
    let buttonId = ChapterButton.id;
    //console.log(ChapterButton);
    ChapterButton.addEventListener('click', function() {
        //console.log('buttonId', buttonId );
       console.log('Button clicked!');
       //console.log(buttonId);
       checkAnswer(buttonId);
    });
};



document.getElementById('next-q-chapter').addEventListener('click', function() {
    currentChapterIndex++;
    loadNextChapter();
});

document.getElementById('chapter-hint-button').addEventListener('click', function() {
    document.getElementById('chapter-hint').style.display= "block";
});


function ChapterTimer(time) {
    let countdownTimeS = time;
    let minutes_S = Math.floor(time / 60);
    let seconds_S = time % 60;

    const timerElementChapter = document.getElementById('chapter-timer');
    console.log("timer element chapter" , timerElementChapter);
    timerElementChapter.textContent =`${minutes_S}:${seconds_S.toString().padStart(2, '0')}`;
    
    clearInterval(previous_interval_chapter);
    previous_interval_chapter = setInterval(() =>{
        countdownTimeS--;
        countdownS_M= Math.floor(countdownTimeS / 60);
        countdownS_S= countdownTimeS % 60;
        timerElementChapter.textContent =`${countdownS_M}:${countdownS_S.toString().padStart(2, '0')}`;
    // Check if the countdown has reached zero
    if (countdownTimeS === 0) {
        clearInterval(previous_interval_chapter); // Stop the timer when it reaches zero
        // Perform any action you want when the countdown reaches zero
        console.log("Countdown finished!");
        checkAnswer(" ");
        
    } }
    , 1000)
}