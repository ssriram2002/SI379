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


async function fetchQuestions() {
    const repsonse = await
    fetch ('https://the-trivia-api.com/v2/questions');
    const data= await repsonse.json();
    console.log(data);
    return data;
    
}

let currentQuestionIndex = 0;
let correctCount = 0;
let attemptedCount= 0;


async function showQuestion() {
    const questions_API = await fetchQuestions();
    const currentQuestion = questions_API[currentQuestionIndex];
    console.log(currentQuestion);
    const questionText = currentQuestion['question']['text'];
    console.log(questionText);
    const correct_answer= currentQuestion['correctAnswer'];
    console.log(correct_answer);
    const inocorrect_answers= currentQuestion['incorrectAnswers'];
    const answers = [correct_answer, ...inocorrect_answers];

    
    const shuffledAnswers = shuffleArray(answers);

    const currentQBox = document.createElement('div');


    currentQBox.innerHTML +=`${questionText}`;

    
    const answerList = document.createElement('ul');

    for (const answer of shuffledAnswers){
        console.log(answer);
        let q_clicked = false;
        const answerListElem = document.createElement("li");
        const answerListElemButton= document.createElement("button");

        answerListElemButton.innerHTML += `${answer}`;
        answerListElem.append(answerListElemButton);
        answerList.append(answerListElem);
        answerListElem.addEventListener('click', () => {
            if (q_clicked!=true){
                attemptedCount++;
                document.getElementById('attempted-count').textContent = attemptedCount;
                if (answer === correct_answer) {
                    console.log('correct_answer');
                    console.log(correct_answer);
                    answerListElemButton.classList.add=='green';
                    correctCount++; 
                    document.getElementById('correct-count').textContent = correctCount;
                    
                }else{
                    answerListElemButton.classList.add=='red';
                    q_clicked === true;
                }
    
        }
        });

    }

    currentQBox.appendChild(answerList);
    document.getElementById('questionsBox').appendChild(currentQBox);
}


for (let i = 0; i < 11; i++) {
    showQuestion();
  };