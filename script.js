// --------------------------------
// SCENE CONTROL
// --------------------------------

function showScene(sceneNumber) {
    const scenes = document.querySelectorAll(".scene");

    scenes.forEach(function(scene) {
        scene.classList.remove("active");
    });

    const nextScene = document.getElementById("scene" + sceneNumber);
    nextScene.classList.add("active");
}


// --------------------------------
// START THE STORY
// --------------------------------

document.getElementById("scene1").addEventListener(
    "click",
    function() {
        showScene(2);
    }
);
const clockHand = document.getElementById("clock-hand");
const clock = document.getElementById("clock");
const clockMemory = document.getElementById("clock-memory");
const scene2 = document.getElementById("scene2");

let draggingClock = false;
let currentMemory = 0;
let finalMemoryReached = false;


/* MEMORY LINES */

const memories = [
    "I remember the sound first.",
    "It was quiet.",
    "I was waiting.",
    "Someone was supposed to come.",
    "Then I heard the door.",
    "I remember now."
];


/* START DRAGGING */

clockHand.addEventListener("mousedown", function() {

    draggingClock = true;

    scene2.classList.add("time-changing");

});


/* STOP DRAGGING */

document.addEventListener("mouseup", function() {

    draggingClock = false;

    scene2.classList.remove("time-changing");

});


/* MOVE CLOCK */

document.addEventListener("mousemove", function(event) {

    if (!draggingClock) {
        return;
    }


    const rect = clock.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;


    const x =
        event.clientX - centerX;

    const y =
        event.clientY - centerY;


    let angle =
        Math.atan2(y, x) *
        (180 / Math.PI);


    angle = angle + 90;


    if (angle < 0) {
        angle += 360;
    }


    /* Move the clock hand */

    clockHand.style.transform =
        "translateX(-50%) rotate(" +
        angle +
        "deg)";


    /*
       Determine which memory
       the viewer has reached.
    */

    const memoryNumber =
        Math.floor(angle / 60);


    if (memoryNumber !== currentMemory) {

    currentMemory = memoryNumber;

    changeMemory(
        memories[memoryNumber]
    );

    updateMemoryVisuals(
        memoryNumber
    );

    playMemorySound(
        120 + (memoryNumber * 25),
        0.25,
        0.018
    );

}




/* CHANGE MEMORY TEXT */

function changeMemory(newMemory) {

    clockMemory.style.opacity = "0";

    clockMemory.style.transform =
        "translateY(8px)";


    setTimeout(function() {

        clockMemory.textContent =
            newMemory;

        clockMemory.style.opacity =
            "1";

        clockMemory.style.transform =
            "translateY(0)";

    }, 250);

}


/* CHANGE THE VISUAL STATE */

function updateMemoryVisuals(memoryNumber) {

    /* Remove previous states */

    scene2.classList.remove(
        "memory-deep",
        "memory-deeper",
        "memory-final"
    );


    /*
       Beginning:
       Everything is clear.
    */

    if (memoryNumber <= 1) {

        return;

    }


    /*
       Middle:
       The memory begins fading.
    */

    if (memoryNumber === 2 ||
        memoryNumber === 3) {

        scene2.classList.add(
            "memory-deep"
        );

    }


    /*
       Deep memory:
       The clock is almost gone.
    */

    if (memoryNumber === 4) {

        scene2.classList.add(
            "memory-deeper"
        );

    }


    /*
       Final memory.
    */

    if (memoryNumber === 5 &&
        !finalMemoryReached) {

        finalMemoryReached = true;

        scene2.classList.add(
            "memory-final"
        );

        beginFinalMemory();

    }

}


/* FINAL MEMORY */

function beginFinalMemory() {

    clockMemory.textContent =
        "I remember now.";


    /*
       Wait before moving
       to the next scene.
    */

    setTimeout(function() {

    scene2.classList.add(
        "fade-out"
    );


    setTimeout(function() {

        showScene(3);

        scene2.classList.remove(
            "fade-out"
        );

    }, 2000);

}, 2500);

}
const memory = document.getElementById("memory");
const memoryCover = document.getElementById("memory-cover");
const scene3 = document.getElementById("scene3");
const photoText = document.getElementById("photo-text");

let revealedAmount = 0;
let lastRevealX = null;
let lastRevealY = null;


/* MOUSE MOVEMENT OVER PHOTO */

memory.addEventListener("mousemove", function(event) {

    const rect = memory.getBoundingClientRect();

    const x =
        event.clientX - rect.left;

    const y =
        event.clientY - rect.top;


    /*
       Create a circular opening
       around the mouse.
    */

    const radius = 70;


    memoryCover.style.background =
    `radial-gradient(
        circle ${radius}px at ${x}px ${y}px,
        rgba(5,5,5,0) 0%,
        rgba(5,5,5,0.15) 35%,
        rgba(5,5,5,0.65) 70%,
        rgba(5,5,5,0.95) 100%
    )`;


    /*
       Count how much the viewer
       has explored.
    */

    if (lastRevealX !== null) {

        const distance = Math.sqrt(
            Math.pow(x - lastRevealX, 2) +
            Math.pow(y - lastRevealY, 2)
        );


        if (distance > 20) {

            revealedAmount += distance;

        }

    }


    lastRevealX = x;
    lastRevealY = y;


    /*
       Once they've explored enough
       of the photograph...
    */

    if (revealedAmount > 1800) {

        completePhoto();

    }

});


/* RESET WHEN CURSOR LEAVES */

memory.addEventListener("mouseleave", function() {

    memoryCover.style.background =
        "#050505";

    lastRevealX = null;
    lastRevealY = null;

});


/* COMPLETE MEMORY */

function completePhoto() {

    if (scene3.classList.contains("photo-complete")) {
        return;
    }


    scene3.classList.add(
        "photo-complete"
    );


    photoText.textContent =
        "Some things come back differently.";


    setTimeout(function() {

        /*
           We'll connect this to
           Scene 4 later.
        */

        showScene(4);

    }, 2500);

}
const pieces = document.querySelectorAll(".memory-piece");
const puzzle = document.getElementById("memory-pieces");
const scene4 = document.getElementById("scene4");

let activePiece = null;
let offsetX = 0;
let offsetY = 0;


/* START DRAGGING */

pieces.forEach(function(piece) {

    piece.addEventListener("mousedown", function(event) {

        activePiece = piece;

        const rect =
            piece.getBoundingClientRect();

        offsetX =
            event.clientX - rect.left;

        offsetY =
            event.clientY - rect.top;

        piece.style.zIndex = "10";

    });

});


/* MOVE PIECE */

document.addEventListener("mousemove", function(event) {

    if (!activePiece) {
        return;
    }


    const puzzleRect =
        puzzle.getBoundingClientRect();


    let x =
        event.clientX -
        puzzleRect.left -
        offsetX;


    let y =
        event.clientY -
        puzzleRect.top -
        offsetY;


    activePiece.style.left =
        x + "px";

    activePiece.style.top =
        y + "px";

});


/* STOP DRAGGING */

document.addEventListener("mouseup", function() {

    if (!activePiece) {
        return;
    }


    checkPiecePosition(activePiece);

    activePiece.style.zIndex = "1";

    activePiece = null;

});


/* CHECK WHETHER PIECE IS CLOSE ENOUGH */

function checkPiecePosition(piece) {

    const className =
        piece.classList[1];


    let targetX = 0;
    let targetY = 0;


    if (className === "piece1") {

        targetX = 0;
        targetY = 0;

    }


    if (className === "piece2") {

        targetX = 250;
        targetY = 0;

    }


    if (className === "piece3") {

        targetX = 0;
        targetY = 165;

    }


    if (className === "piece4") {

        targetX = 250;
        targetY = 165;

    }


    const currentX =
        parseFloat(piece.style.left);


    const currentY =
        parseFloat(piece.style.top);


    const distance =
        Math.sqrt(
            Math.pow(currentX - targetX, 2) +
            Math.pow(currentY - targetY, 2)
        );


    /*
       If the piece is close enough,
       snap it into place.
    */

    if (distance < 60) {

        piece.style.left =
            targetX + "px";

        piece.style.top =
            targetY + "px";

        piece.dataset.correct =
            "true";

    }


    checkPuzzleComplete();

}


/* CHECK ALL FOUR PIECES */

function checkPuzzleComplete() {

    let complete = true;


    pieces.forEach(function(piece) {

        if (piece.dataset.correct !== "true") {

            complete = false;

        }

    });


    if (complete) {

        finishPuzzle();

    }

}


/* FINISH SCENE 4 */

function finishPuzzle() {

    scene4.classList.add(
        "memory-complete"
    );


    setTimeout(function() {

        showScene(5);

    }, 3000);

}
document.getElementById("restart").addEventListener(
    "click",
    function() {

        showScene(1);

    }
);
/* =========================
   SOUND DESIGN
========================= */

let audioContext;
let ambientStarted = false;


/* CREATE AUDIO */

function startAudio() {

    if (ambientStarted) {
        return;
    }

    audioContext =
        new (window.AudioContext ||
        window.webkitAudioContext)();

    ambientStarted = true;

    playAmbient();

}


/* VERY QUIET AMBIENT SOUND */

function playAmbient() {

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value = 55;

    gain.gain.value = 0.015;


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

}


/* SMALL SOUND */

function playMemorySound(
    frequency = 180,
    duration = 0.15,
    volume = 0.025
) {

    if (!audioContext) {
        return;
    }


    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = "sine";

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime +
        duration
    );


    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime +
        duration
    );

}
