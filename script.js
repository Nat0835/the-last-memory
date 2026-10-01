// --------------------------------
// SCENE CONTROL
// --------------------------------

function showScene(sceneNumber) {

    const scenes = document.querySelectorAll(".scene");

    scenes.forEach(scene => {
        scene.classList.remove("active");
    });

    const nextScene = document.getElementById(
        "scene" + sceneNumber
    );

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

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;


    const x = event.clientX - centerX;
    const y = event.clientY - centerY;


    let angle =
        Math.atan2(y, x) * (180 / Math.PI);


    angle = angle + 90;


    if (angle < 0) {
        angle += 360;
    }


    clockHand.style.transform =
        "translateX(-50%) rotate(" +
        angle +
        "deg)";


    /*
       Convert the clock position
       into one of our memories.
    */

    const memoryNumber =
        Math.floor(angle / 60);


    if (memoryNumber !== currentMemory) {

        currentMemory = memoryNumber;

        changeMemory(memories[memoryNumber]);

    }

});


/* CHANGE MEMORY TEXT */

function changeMemory(newMemory) {

    clockMemory.style.opacity = "0";

    clockMemory.style.transform =
        "translateY(8px)";


    setTimeout(function() {

        clockMemory.textContent =
            newMemory;

        clockMemory.style.opacity = "1";

        clockMemory.style.transform =
            "translateY(0)";

    }, 250);

}
