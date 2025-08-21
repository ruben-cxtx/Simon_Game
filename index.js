class Game {
    constructor() {
        this.BUTTONS = ['green', 'red', 'yellow', 'blue'];
        this.FLASH_MS = 100;
        this.STEP_GAP_MS = 600;
        this.NEXT_LEVEL_DELAY_MS = 800;


        this.sequence = [];
        this.level = 0;
        this.inputIndex = 0;
        this.isReplaying = false;

        this.onStartKey = this.start.bind(this);
        this.onButtonClick = this.handleUserPress.bind(this);

        this.bindEvents();
    }


    bindEvents() {
        $(document).on('keydown', this.onStartKey);

        $('.btn').off('click').on('click', this.onButtonClick);
    }

    start() {
        this.hardReset();
        this.nextLevel();
    }

    hardReset() {
        this.sequence = [];
        this.level = 0;
        this.inputIndex = 0;
        this.isReplaying = 0;
        $("#level-title").text('level: 0');
    }

    async nextLevel() {
        this.level += 1;
        $('#level-title').text(`Level: ${this.level}`);
        this.inputIndex = 0;

        //add new random button
        const id = this.BUTTONS[Math.floor(Math.random() * this.BUTTONS.length)];
        this.sequence.push(id);

        await this.playSequence();
    }

    sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async playSequence(){
        this.isReplaying = true;
        for(const id of this.sequence){
            this.flash(id);
            this.playButtonAudio(id);
            await this.sleep(this.STEP_GAP_MS);
        }
        this.isReplaying = false;
    }



    handleUserPress(event) {
        const id = event.currentTarget.id;
        if(this.isReplaying) return;

        this.flash(id);
        this.playButtonAudio(id);

        if(id !== this.sequence[this.inputIndex]) {
            this.handleGameOver()
            return;
        }

        this.inputIndex += 1;

        if(this.inputIndex === this.sequence.length) {
            setTimeout(() => this.nextLevel(), this.NEXT_LEVEL_DELAY_MS);
        }

    }



    handleGameOver() {
        this.playWrong();
        $('body').addClass('game-over')
        setTimeout(() => $('body').removeClass('game-over'), 200);
        $("#level-title").text("Game Over 🧌 Press Any Key to Restart");

        $(document).one("keydown", () => this.start());
    }



    flash(id){
        if(!this.BUTTONS.includes(id)) return;
        const $el = $(`#${id}`);
        $el.addClass('pressed');
        setTimeout(() => $el.removeClass('pressed'), this.FLASH_MS);
    }

    playButtonAudio(id) {
        if(!id) return;
        let audio = new Audio(`sounds/${id}.mp3`)
        audio.currentTime = 0;
        audio.play()
    }

    playWrong() {
        const audio = new Audio('sounds/wrong.mp3');
        audio.currentTime = 0;
        audio.play();
    }
}
new Game()

//To-dos
//3. Check answer function
// - add a counter that everytime the user levels up then it restart and when the user pressed a button it goes up to check the next answer
//4, Handle user buttons
//- set a counter that checks if they match in order
