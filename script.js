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
