class LazinessCalculator {
    constructor() {
        this.questions = [
            {
                text: "How often do you procrastinate on important tasks?",
                options: [
                    { text: "Never, I do everything right away", value: 0 },
                    { text: "Sometimes, but I get things done", value: 3 },
                    { text: "Often, but before deadlines", value: 7 },
                    { text: "Always, until the last possible minute", value: 10 }
                ]
            },
            {
                text: "What's your preferred weekend activity?",
                options: [
                    { text: "Hiking or exercising", value: 0 },
                    { text: "Meeting friends or shopping", value: 3 },
                    { text: "Watching movies in bed", value: 7 },
                    { text: "Sleeping all day", value: 10 }
                ]
            },
            {
                text: "How do you feel about doing household chores?",
                options: [
                    { text: "I enjoy keeping things clean and organized", value: 0 },
                    { text: "I do them when needed", value: 4 },
                    { text: "I'll do them when it gets really bad", value: 7 },
                    { text: "What are chores?", value: 10 }
                ]
            },
            {
                text: "Your phone is charging across the room. The battery is at 1%. You are in bed. What do you do?",
                options: [
                    { text: "Get up and get it immediately", value: 0 },
                    { text: "Wait until I really need it", value: 4 },
                    { text: "Use another device instead", value: 7 },
                    { text: "Let it die, that's tomorrow's problem", value: 10 }
                ]
            },
            {
                text: "How many alarms do you set in the morning?",
                options: [
                    { text: "Just one, I wake up immediately", value: 0 },
                    { text: "2-3, just in case", value: 3 },
                    { text: "5-7, spaced out", value: 7 },
                    { text: "10+, spanning several hours", value: 10 }
                ]
            },
            {
                text: "What's your approach to exercise?",
                options: [
                    { text: "Regular workout schedule", value: 0 },
                    { text: "Occasional gym visits", value: 4 },
                    { text: "Walking to the fridge counts, right?", value: 7 },
                    { text: "I get tired watching sports on TV", value: 10 }
                ]
            },
            {
                text: "How long do you take to respond to non-urgent messages?",
                options: [
                    { text: "Immediately", value: 0 },
                    { text: "Within a few hours", value: 3 },
                    { text: "Days... maybe weeks", value: 7 },
                    { text: "Bold of you to assume I respond", value: 10 }
                ]
            },
            {
                text: "What's your solution for being hungry but food requires preparation?",
                options: [
                    { text: "Cook a proper meal", value: 0 },
                    { text: "Make something quick", value: 3 },
                    { text: "Order delivery", value: 7 },
                    { text: "Sleep it off", value: 10 }
                ]
            },
            {
                text: "How do you handle a full trash bin?",
                options: [
                    { text: "Take it out immediately", value: 0 },
                    { text: "Will do it after this show", value: 4 },
                    { text: "Stack things around it", value: 7 },
                    { text: "Move to another room", value: 10 }
                ]
            },
            {
                text: "Your laziness level is getting measured. How much effort did you put into these answers?",
                options: [
                    { text: "Carefully considered each one", value: 0 },
                    { text: "Gave it some thought", value: 3 },
                    { text: "Clicked whatever", value: 7 },
                    { text: "Too lazy to even read them fully", value: 10 }
                ]
            }
        ];

        this.currentQuestion = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.initializeUI();
    }

    initializeUI() {
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.querySelector('.options-container');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.submitBtn = document.getElementById('submit-btn');
        this.progressBar = document.querySelector('.progress');
        this.resultContainer = document.querySelector('.result-container');
        this.quizContainer = document.querySelector('.quiz-container');
        this.restartBtn = document.getElementById('restart-btn');
        this.shareBtn = document.getElementById('share-btn');

        this.prevBtn.addEventListener('click', () => this.previousQuestion());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.submitBtn.addEventListener('click', () => this.showResults());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.shareBtn.addEventListener('click', () => this.shareResults());

        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        this.questionText.textContent = question.text;
        this.optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option';
            if (this.answers[this.currentQuestion] === index) {
                button.classList.add('selected');
            }
            button.textContent = option.text;
            button.addEventListener('click', () => this.selectOption(index));
            this.optionsContainer.appendChild(button);
        });

        this.updateNavigation();
        this.updateProgress();
    }

    selectOption(index) {
        this.answers[this.currentQuestion] = index;
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        this.nextBtn.disabled = false;
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        }
    }

    updateNavigation() {
        this.prevBtn.classList.toggle('hidden', this.currentQuestion === 0);
        this.nextBtn.classList.toggle('hidden', this.currentQuestion === this.questions.length - 1);
        this.submitBtn.classList.toggle('hidden', this.currentQuestion !== this.questions.length - 1);
        this.nextBtn.disabled = this.answers[this.currentQuestion] === null;
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
    }

    calculateScore() {
        const totalPoints = this.answers.reduce((sum, answer, index) => {
            return sum + this.questions[index].options[answer].value;
        }, 0);
        return Math.round((totalPoints / (this.questions.length * 10)) * 100);
    }

    getScoreDescription(score) {
        if (score < 25) {
            return {
                title: "The Energizer Bunny 🔋",
                description: "You're so active, laziness probably isn't even in your vocabulary! Maybe you should teach a class on productivity... if you can sit still long enough."
            };
        } else if (score < 50) {
            return {
                title: "The Balanced Sloth 🦥",
                description: "You've mastered the art of selective laziness. You know when to relax and when to get things done. Perfect balance!"
            };
        } else if (score < 75) {
            return {
                title: "The Professional Procrastinator 🛋️",
                description: "You've elevated laziness to an art form. Your ability to find shortcuts and delay tactics is truly impressive!"
            };
        } else {
            return {
                title: "The Legendary Couch Potato 👑",
                description: "Congratulations! You've achieved peak laziness. Even reading this probably feels like too much work."
            };
        }
    }

    showResults() {
        const score = this.calculateScore();
        const { title, description } = this.getScoreDescription(score);

        document.getElementById('score-value').textContent = score;
        document.getElementById('score-title').textContent = title;
        document.getElementById('score-description').textContent = description;

        this.quizContainer.classList.add('hidden');
        this.resultContainer.classList.remove('hidden');
    }

    restartQuiz() {
        this.currentQuestion = 0;
        this.answers = new Array(this.questions.length).fill(null);
        this.resultContainer.classList.add('hidden');
        this.quizContainer.classList.remove('hidden');
        this.displayQuestion();
    }

    shareResults() {
        const score = document.getElementById('score-value').textContent;
        const title = document.getElementById('score-title').textContent;
        const text = `🦥 My Laziness Score: ${score}/100\n${title}\nTake the test yourself!`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Laziness Calculator Results',
                text: text,
            }).catch(console.error);
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text)
                .then(() => alert('Result copied to clipboard!'))
                .catch(console.error);
        }
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new LazinessCalculator();
});
