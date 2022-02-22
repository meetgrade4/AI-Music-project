right_x = 0;
left_x = 0;
right_y = 0;
left_y = 0;
left_s = 0;
right_s = 0;
maxstatus = "";
one_status = null;
two_status = null;

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
    image(video,0,0,600,500);

    fill('red');
    stroke('red');

    one_status = music.isPlaying();
    two_status = music2.isPlaying();

    if(left_s > 0.2){
        circle(left_x, left_y, 20);
        music2.stop();
        if(one_status != true){
            music.play();
        }
        maxstatus = "song 1";
        document.getElementById("status").innerHTML = "song 1";
    }

    if(right_s > 0.2){
        circle(right_x, right_y, 20);
        music.stop();
        if(two_status != true){
            music2.play();
        }
        maxstatus = "song 2";
        document.getElementById("status").innerHTML = "song 2";
    }
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
        left_s = s[0].pose.keypoints[9].score;
        right_s = s[0].pose.keypoints[10].score;

        console.log(s);
        console.log('right x - ', right_x, 'left x - ', left_x, 'right y - ', right_y, 'left y - ', left_y);
    }
}

