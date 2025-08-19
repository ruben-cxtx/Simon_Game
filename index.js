class Game {
    constructor() {
        this.gameButtons = [];
        this.$greenButton = $("#green")
        this.$redButton = $("#red")

        this.playButtonAudio();
        this.addEventListeners();
        this.showPressedKey();
    }


    addEventListeners() {
        $("body").click((event) => {
            this.showPressedKey(event);
        })
    }

    playButtonAudio(id) {
        let audio = new Audio(`sounds/${id}.mp3`)
        audio.play()
    }

    showPressedKey(event) {
        const buttonId = event.target.id;

        $(`#${buttonId}`).toggleClass("pressed")

        this.gameButtons.push(`${buttonId}`)

        this.playButtonAudio(buttonId)

        setTimeout(() => {
            $(`#${buttonId}`).toggleClass("pressed");
        }, 100);

    }



}

new Game()
