class Game {
    constructor() {
        this.buttonList = ['green', 'red', 'yellow', 'blue'];
        this.gameButtons = [];

        this.playButtonAudio();
        this.addEventListeners();
        this.handleUserPress();
        this.flash();
        this.flashGameOver();
        this.handleGameOver();
        this.addButtonSequence();
        this.startGame();
    }


    addEventListeners() {
        $(".btn").click((event) => {
            this.handleUserPress(event);
        })

        $(document).one("keydown", (event) => this.startGame());


    }

    playButtonAudio(id) {

        if(!id) return;
        let audio = new Audio(`sounds/${id}.mp3`)
        audio.currentTime = 0;
        audio.play()
    }

    addButtonSequence() {
        const buttonId = this.buttonList[Math.floor(Math.random() * this.buttonList.length)]
        this.gameButtons.push(buttonId);
        console.log(this.gameButtons);
        this.gameButtons.forEach((id, index) => {
            setTimeout(() => this.flash(id), 600 * index)
        })
    }

    handleUserPress(event) {
        const buttonId = event.target.id;

        this.flash(buttonId)
    }

    handleGameOver() {
        this.flashGameOver();
        $("#level-title").text("Game Over 🧌 Press Any Key to Restart");
        $(document).one("keydown", () => this.startGame());
    }

    startGame(event){
        $("body").on("keydown", () => {
            this.addButtonSequence();
        })
        $("body").on("keydown", () => {
            console.log(event);
        })
    }

    flashGameOver(){
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200)
    }

    flash(buttonId){
        if (this.buttonList.includes(buttonId)) {
            $(`#${buttonId}`).addClass("pressed");

            this.playButtonAudio(buttonId);

            setTimeout(() => {
                $(`#${buttonId}`).removeClass("pressed");
            }, 100);
        }
    }
}
new Game()

//To-dos
//1. Game0ver Function (what happens when the user selects a wrong answer)
//2. level up function
//3. Check answer function
//4. Try again function
