prediction = "";

Webcam.set({
    height: 300,
    width: 300,
    image_format: "png",
    png_quality: 90
})
camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture() {
    Webcam.snap(function (data) {
        document.getElementById("result").innerHTML = "<img id='pic' src=" + data + ">";
    });
}
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/wf2Vi-sBH/model.json", modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {
    synth = window.speechSynthesis;
    speak_pre = "The prediction is " + prediction;
    utterThis = new SpeechSynthesisUtterance(speak_pre);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("pic");
    classifier.classify(img, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        prediction = result[0].label;
        speak()
        if (prediction == "thumbs up") {
            document.getElementById("emotion1").innerHTML = prediction;
            document.getElementById("emoji1").innerHTML = "👍🏻";
        }
        else if (prediction == "thumbs down") {
            document.getElementById("emotion1").innerHTML = prediction;
            document.getElementById("emoji1").innerHTML = "👎🏻";
        }
        else if (prediction == "peace") {
            document.getElementById("emotion1").innerHTML = prediction;
            document.getElementById("emoji1").innerHTML = "✌🏻";
        }
        else {
            document.getElementById("emotion1").innerHTML = prediction;
            document.getElementById("emoji1").innerHTML = "👌🏻";
        }
    }
}