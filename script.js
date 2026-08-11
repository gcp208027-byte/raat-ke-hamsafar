// Load YouTube API

const tag = document.createElement("script");

tag.src =
    "https://www.youtube.com/iframe_api";

const firstScriptTag =
    document.getElementsByTagName("script")[0];

firstScriptTag.parentNode.insertBefore(
    tag,
    firstScriptTag
);

let player;


function onYouTubeIframeAPIReady() {

    player = new YT.Player(
        "youtube-player",
        {

            height: "200",

            width: "200",

            playerVars: {

                listType: "playlist",

                list: "RDCLAK5uy_lmQJPAbjefudy9EfVbgMNgqh3mQ6i9WmU",

                controls: 0

            }

        }
    );

}

const playButton =
    document.getElementById("play");

let isPlaying = false;


playButton.addEventListener(
    "click",
    function () {

        if (!player) {
            return;
        }


        if (isPlaying) {

            player.pauseVideo();

            playButton.innerHTML = "▶";

            isPlaying = false;

        } else {

            player.playVideo();

            playButton.innerHTML = "❚❚";

            isPlaying = true;

        }

    }
);

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");


previousButton.addEventListener(
    "click",
    function () {

        if (player) {

            player.previousVideo();

        }

    }
);


nextButton.addEventListener(
    "click",
    function () {

        if (player) {

            player.nextVideo();

        }

    }
);

const progress =
    document.querySelector(".progress");

const currentTime =
    document.getElementById("current-time");

const totalTime =
    document.getElementById("total-time");


function updateProgress() {

    if (!player ||
        typeof player.getDuration !== "function") {

        return;

    }


    const duration =
        player.getDuration();

    const current =
        player.getCurrentTime();


    if (duration > 0) {

        const percentage =
            (current / duration) * 100;

        progress.style.width =
            percentage + "%";

        currentTime.innerText =
            formatTime(current);

        totalTime.innerText =
            formatTime(duration);

    }

}


setInterval(
    updateProgress,
    500
);


function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const secondsRemaining =
        Math.floor(seconds % 60);


    return (
        minutes +
        ":" +
        String(secondsRemaining)
            .padStart(2, "0")
    );

}
const progressContainer =
    document.querySelector(
        ".progress-container"
    );


progressContainer.addEventListener(
    "click",
    function (event) {

        if (!player) {
            return;
        }


        const width =
            this.clientWidth;

        const clickPosition =
            event.offsetX;

        const duration =
            player.getDuration();


        const newTime =
            (clickPosition / width)
            * duration;


        player.seekTo(
            newTime,
            true
        );

    }
);
