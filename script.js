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

let draggingClock = false;


clockHand.addEventListener("mousedown", function() {

    draggingClock = true;

});


document.addEventListener("mouseup", function() {

    draggingClock = false;

});


document.addEventListener("mousemove", function(event) {

    if (!draggingClock) {
        return;
    }

    const rect = clock.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = event.clientX - centerX;
    const y = event.clientY - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI);

    angle = angle + 90;

    if (angle < 0) {
        angle = angle + 360;
    }

    clockHand.style.transform =
        "translateX(-50%) rotate(" + angle + "deg)";


    if (angle < 60) {

        clockMemory.textContent =
            "I remember the sound first.";

    } else if (angle < 120) {

        clockMemory.textContent =
            "It was quiet.";

    } else if (angle < 180) {

        clockMemory.textContent =
            "I was waiting.";

    } else if (angle < 240) {

        clockMemory.textContent =
            "Someone was supposed to come.";

    } else if (angle < 300) {

        clockMemory.textContent =
            "Then I heard the door.";

    } else {

        clockMemory.textContent =
            "I remember now.";

    }

});
