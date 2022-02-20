right_x = 0;
left_x = 0;
right_y = 0;
left_y = 0;

function preload() {
    music = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotResults)
}

function draw() {
    image(video,0,0,550,550);
}

function modelLoaded() {
    console.log("modelLoaded");

}

function gotResults(s) {
    if(s.length > 0){
        right_x = s[0].pose.rightWrist.x;
        left_x = s[0].pose.leftWrist.x;
        left_y = s[0].pose.leftWrist.y;
        right_y = s[0].pose.rightWrist.y;

        console.log(s);
        console.log('right x - ', right_x, 'left x - ', left_x, 'right y - ', right_y, 'left y - ', left_y);
    }
}

