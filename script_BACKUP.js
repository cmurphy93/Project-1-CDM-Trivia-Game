const timerDuration = 15;
let timerInterval;

const questions = [
      {
      question: 'The Earth is approximately how many miles away from the sun?',
      options: ['9.3 million', '39 million', '93 million', '193 million'],
      correctAnswer: '93 million'
      },
      {
      question: 'Which of the following men does not have a chemical element named after him?',
      options: ['Albert Einstein', 'Niels Bohr', 'Isaac Newton', 'Enrico Fermi'],
      correctAnswer: 'Isaac Newton'
      },
      {
      question: 'In the childrens book series, where is Paddington Bear originally from?',
      options: ['India','Peru','Canada','Iceland'],
      correctAnswer: 'Peru'
      },
      {
      question: 'Now used to refer to a cat the word "tabby" is derived from the name of a district of what world capital?',
      options: ['Baghdad','New Delhi','Cairo','Moscow'],
      correctAnswer: 'Baghdad'
      },
      {
      question: 'What club did Alan Shepard use to make his famous golf shot on the moon?',
      options: ['Nine Iron','Sand wedge','Six iron','Seven iron'],
      correctAnswer: 'Six iron'
      },
      {
      question: 'Which of these names is not in the title of a Shakespeare play?',
      options: ['Hamlet','Romeo','Macbeth','Darren'],
      correctAnswer: 'Darren'
      },
      {
      question: 'In the United States, what is traditionally the proper way to address a judge?',
      options: ['Your holiness','Your honor','Your eminence','You da man!'],
      correctAnswer: 'Your honor'
      },
      {
      question: 'Which month of the year was named after Julius Caesar?',
      options: ['October','June','July','August'],
      correctAnswer: 'July'
      },
      {
      question: 'When playing Blackjack, how many points would be considered a bust?',
      options: ['22','21','15','19'],
      correctAnswer: '22'
      },
      {
      question: 'The Statue of Liberty was originally supposed to function as what?',
      options: ['A port of entry','A border marker','A gift shop','A lighthouse'],
      correctAnswer: 'A lighthouse'
      },
      {
       question: '"Heart of Glass" was a single recorded by which 1970s band?',
       options: ['The Ramones','Joy Division','The Bee Gees','Blondie'],
       correctAnswer: 'Blondie' 
      },
      {
       question: 'Which one of these historical meanies died from a nosebleed?',
       options: ['Napoleon','Adolph Hitler','Atilla the Hun','Marie Antoinette'],
       correctAnswer: 'Atilla the Hun' 
      },
      {
       question: 'Which of these rock groups released an album titled "The Joshua Tree"?',
       options: ['U2','Kings of Leon','Led Zeppelin','Arcade Fire'],
       correctAnswer: 'U2'
      },
      {
       question: 'What was Will Ferrells characters name in the 2003 hit movie Elf?',
       options: ['Elf','Buddy','Sam','Billy'],
       correctAnswer: 'Buddy'
      },
      {
       question: 'How many years are there in an eon?',
       options: ['35 years','1 billion years','1,000 years','25,000 years'],
       correctAnswer: '1 billion years' 
      },
  ];

function startTimer() {
    const timerElement = document.querySelector('.base-timer__path-elapsed');
    let timePassed = 0;

    timerInterval = setInterval(() => {
        console.log('Interval triggered');
        timePassed += 1;
        const progress = ((timePassed / timerDuration) * 283).toFixed(0);
        timerElement.style.strokeDasharray = `${progress} 283`;

        if (timePassed === timerDuration) {
            clearInterval(timerInterval);
            selectOption();
        }
    }, 1000);
}

function resetTimer () {
    clearInterval(timerInterval);
    const timerElement = document.querySelector('.base-timer__path-elapsed');
    timerElement.computedStyleMap.strokeDasharray = '283 283';
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

shuffleQuestions();

function displayQuestion() {
    resetTimer(); 
    startTimer(); 

    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;

    const optionsList = document.getElementById('options');
    optionsList.innerHTML = '';

    currentQuestion.options.forEach((option) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(option));
        optionsList.appendChild(button);
      });
}

function selectOption(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    const optionsList = document.getElementById('options');
    const buttons = optionsList.getElementsByTagName('button');

    for(const button of buttons) {
        if(button.textContent === currentQuestion.correctAnswer) {
            button.classList.add('options-correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('options-incorrect');
        }
    }

    if (selectedOption === currentQuestion.correctAnswer) {
        score++;
        updateScoreStatus(true);
    } else {
        updateScoreStatus(false, selectedOption);
    }

    document.getElementById('score').textContent = score;

    currentQuestionIndex++; //
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById('question-container').innerHTML = 'Thank you for playing!';
    }
}

let currentQuestionIndex = 0;
let score = 0;
 
  function updateScoreStatus(correct) {
    //let's check what the question index is right now....
    console.log(currentQuestionIndex);

    const questionNumber = questions.length - currentQuestionIndex;
    const scoreListItem = document.getElementById(`score-${questionNumber}`);
    
    if (scoreListItem) {
        const statusSpan = scoreListItem.querySelector('span');

        if (statusSpan) {
            statusSpan.textContent = correct ? 'Correct!' : 'Incorrect';
        } else {
            console.error(`No <span> found in ${scoreListItem.id}`);
        }
    } else {
        console.error(`No element found with id score-${questionNumber}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    shuffleQuestions();
    updateScoreStatus();
    displayQuestion();
});
