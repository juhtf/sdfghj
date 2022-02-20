alarm=" ";
status=" ";
object=[];

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="status:Detecting Objects";
}

function preload(){
  alarm=loadSound("audio.mp3");
}

function draw(){
    image(video,0,0,380,380);
    /*fill("#FF0000");
    text("dog",45,75);
    noFill();
    stroke("green");
    rect(30,60,450,350);

    fill('#ffff00');
    text('cat',320,120);
    noFill();
    stroke("green");
    rect(300,90,270,320);*/
    if(status !=" "){
        objectDetector.detect(video,gotResults);
        for(i=0; i<object.length;i++){
        r=random(255);
        g=random(255);
        b=random(255);
        
            document.getElementById("status").innerHTML="Status=Object Detected";
           
            fill(r,g,b);

            percent= Math.floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].height,object[i].width);
            if(object[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby has been found!!!!:)";
                alarm.stop()
            }else{
                document.getElementById("number_of_objects").innerHTML="Baby has not been found!!:(";
                alarm.play();
            }
        }
            
    }
}

function modelLoaded(){
console.log("Model Loaded!!!");
status=true;

}

function gotResults(error,results){
if(error){
    console.log(error);
}
console.log(results);
object=results;
}