/* ==========================
        Project Bloom
========================== */

const scenes = document.querySelectorAll(".scene");

function showScene(id){

    scenes.forEach(scene=>{

        scene.classList.remove("active");

    });

    document
    .getElementById(id)
    .classList.add("active");

}

/* ==========================
        Loading
========================== */

window.addEventListener("load",()=>{

    setTimeout(()=>{

        showScene("introScene");

    },2500);

});

/* ==========================
        Intro
========================== */

const continueBtn =
document.getElementById("continueBtn");

continueBtn.onclick=()=>{

    clickSound.currentTime=0;
    clickSound.play();

    showScene("questionScene");

};

/* ==========================
      Funny Messages
========================== */

const funnyMessages=[

"Nice try 😄",

"Catch me first!",

"Still trying?",

"Nope 😂",

"Almost... not really.",

"You have to press YES 💜"

];

const funnyText=
document.getElementById("funnyText");

/* ==========================
      Escaping No Button
========================== */

const noBtn=
document.getElementById("noBtn");

function moveNoButton(){

    const x=Math.random()*220-110;

    const y=Math.random()*180-90;

    noBtn.style.transform=
    `translate(${x}px,${y}px)`;

    funnyText.textContent=

    funnyMessages[
    Math.floor(
    Math.random()*funnyMessages.length
    )];

}

noBtn.addEventListener(

"mouseenter",

moveNoButton

);

noBtn.addEventListener(

"touchstart",

e=>{

e.preventDefault();

moveNoButton();

}

);

/* ==========================
         Yes Button
========================== */

document
.getElementById("yesBtn")
.onclick=()=>{

clickSound.currentTime=0;

clickSound.play();

startCountdown();

};

/* ==========================
       Countdown
========================== */

function startCountdown(){

showScene("countdownScene");

const counter=

document.getElementById("countdown");

let number=3;

counter.textContent=number;

const timer=setInterval(()=>{

number--;

if(number===0){

clearInterval(timer);

showBirthdayScene();

return;

}

counter.textContent=number;

},1000);

}

/* ==========================
      Birthday Scene
========================== */

function showBirthdayScene(){

showScene("birthdayScene");

launchConfetti();

createSparkles();

triggerAgeAnimation();

}

/* ==========================
      Music
========================== */

const music=

document.getElementById("birthdayMusic");

const musicBtn=

document.getElementById("musicBtn");

musicBtn.onclick=()=>{

if(music.paused){

music.play().catch(err => {
    console.log("Autoplay prevented:", err);
});

musicBtn.innerHTML="⏸ Pause Music";

musicBtn.classList.add('playing');

}else{

music.pause();

musicBtn.innerHTML="🎵 Play Music";

musicBtn.classList.remove('playing');

}

};

/* ==========================
      Sounds
========================== */

const clickSound=

document.getElementById("clickSound");

const openSound=

document.getElementById("openSound");
/* ==========================
        Stars Canvas
========================== */

const canvas=document.getElementById("stars");

const ctx=canvas.getContext("2d");

let stars=[];

function resizeCanvas(){

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

}

window.addEventListener(

"resize",

resizeCanvas

);

resizeCanvas();

/* Create Stars */

for(let i=0;i<170;i++){

stars.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*2+0.4,

speed:Math.random()*0.35+0.05,

alpha:Math.random(),

dir:Math.random()>0.5?1:-1

});

}

function drawStars(){

ctx.clearRect(

0,

0,

canvas.width,

canvas.height

);

stars.forEach(star=>{

star.y+=star.speed;

if(star.y>canvas.height){

star.y=-5;

star.x=Math.random()*canvas.width;

}

star.alpha+=0.01*star.dir;

if(star.alpha>=1){

star.dir=-1;

}

if(star.alpha<=0.2){

star.dir=1;

}

ctx.beginPath();

ctx.arc(

star.x,

star.y,

star.r,

0,

Math.PI*2

);

ctx.fillStyle=

`rgba(255,255,255,${star.alpha})`;

ctx.shadowBlur=10;

ctx.shadowColor="#fff";

ctx.fill();

});

requestAnimationFrame(

drawStars

);

}

drawStars();

/* ==========================
      Sparkles
========================== */

function createSparkles(){

setInterval(()=>{

const cake=

document.querySelector(".cake");

if(!cake) return;

const s=

document.createElement("div");

s.className="sparkle";

s.style.left=

Math.random()*260+"px";

s.style.top=

Math.random()*170+"px";

s.style.animationDuration=

2+Math.random()*2+"s";

cake.appendChild(s);

setTimeout(()=>{

s.remove();

},4000);

},250);

}

/* ==========================
      Particles
========================== */

function createParticle(){

const p=

document.createElement("div");

p.style.position="fixed";

p.style.left=

Math.random()*100+"vw";

p.style.top="110vh";

p.style.width="3px";

p.style.height="3px";

p.style.borderRadius="50%";

p.style.background="white";

p.style.opacity=.7;

p.style.pointerEvents="none";

p.style.boxShadow=

"0 0 12px #fff";

p.style.transition=

"transform 12s linear, opacity 12s linear";

document.body.appendChild(p);

requestAnimationFrame(()=>{

p.style.transform=

`translateY(-130vh)
translateX(${Math.random()*80-40}px)`;

p.style.opacity=0;

});

setTimeout(()=>{

p.remove();

},12000);

}

setInterval(

createParticle,

700

);

/* ==========================
      Confetti
========================== */

const confettiCanvas=

document.createElement("canvas");

confettiCanvas.id="confetti";

document.body.appendChild(confettiCanvas);

const cctx=

confettiCanvas.getContext("2d");

function resizeConfetti(){

confettiCanvas.width=

window.innerWidth;

confettiCanvas.height=

window.innerHeight;

}

resizeConfetti();

window.addEventListener(

"resize",

resizeConfetti

);

let confetti=[];

function launchConfetti(){

confetti=[];

for(let i=0;i<180;i++){

confetti.push({

x:

Math.random()*
confettiCanvas.width,

y:

-20-Math.random()*400,

size:

4+Math.random()*8,

speed:

2+Math.random()*4,

angle:

Math.random()*360,

rotate:

Math.random()*8,

color:

[

"#FF7BC8",

"#7A3EFF",

"#FFD56F",

"#ffffff"

][

Math.floor(Math.random()*4)

]

});

}

animateConfetti();

}

function animateConfetti(){

cctx.clearRect(

0,

0,

confettiCanvas.width,

confettiCanvas.height

);

confetti.forEach(c=>{

c.y+=c.speed;

c.angle+=c.rotate;

cctx.save();

cctx.translate(

c.x,

c.y

);

cctx.rotate(

c.angle*Math.PI/180

);

cctx.fillStyle=c.color;

cctx.fillRect(

-c.size/2,

-c.size/2,

c.size,

c.size

);

cctx.restore();

});

confetti=

confetti.filter(

c=>c.y<
confettiCanvas.height+30

);

if(confetti.length){

requestAnimationFrame(

animateConfetti

);

}

}
/* ==========================
        Message Text
========================== */

const birthdayMessage = `Some moments become memories...
simply because of the people they belong to.

أتمنى تكون سنة مليانة راحة...
وفرحة...
ولحظات تخلي قلبك يبتسم قبل وشك.

I hope this year brings you peace,
beautiful surprises,
and countless reasons to smile.

Happy Birthday,
دعاء 💜
Doaa ✨`;

const typingText =
document.getElementById("typingText");

let typingIndex = 0;

function typeMessage(){

    showScene("messageScene");

    typingText.innerHTML="";

    typingIndex=0;

    function write(){

        if(typingIndex>=birthdayMessage.length){

            document
            .getElementById("nextGiftBtn")
            .style.display="inline-block";

            return;
        }

        typingText.innerHTML+=
        birthdayMessage.charAt(typingIndex);

        typingIndex++;

        setTimeout(write,35);

    }

    write();

}

/* ==========================
      Gift Button
========================== */

document
.getElementById("giftBtn")
.onclick=()=>{

    clickSound.play();

    typeMessage();

};

document
.getElementById("nextGiftBtn")
.onclick=()=>{

    showScene("giftScene");

};

/* ==========================
      Gift Opening
========================== */

const gift =
document.getElementById("giftBox");

const rose =
document.getElementById("roseContainer");

gift.onclick=()=>{

    gift.classList.add("open");

    openSound.currentTime=0;

    openSound.play();

    setTimeout(()=>{

        createRose();

        rose.classList.add("show");

    },900);

};

/* ==========================
        Rose SVG
========================== */

function createRose(){

rose.innerHTML=`

<svg width="220"
height="250"
viewBox="0 0 220 250">

<defs>

<linearGradient id="petal"
x1="0"
x2="1">

<stop
offset="0%"
stop-color="#ffffff"/>

<stop
offset="100%"
stop-color="#ffe5f5"/>

</linearGradient>

</defs>

<g>

<path

d="M110 70
C80 20,
40 70,
80 105

C95 118,
105 130,
110 145

C115 130,
125 118,
140 105

C180 70,
140 20,
110 70"

fill="url(#petal)"/>

<path

d="M110 145
L110 225"

stroke="#4caf50"

stroke-width="5"/>

<path

d="M110 185
C95 170,
75 180,
85 195"

stroke="#4caf50"

stroke-width="4"

fill="none"/>

<path

d="M110 175
C125 165,
145 178,
135 195"

stroke="#4caf50"

stroke-width="4"

fill="none"/>

</g>

</svg>

`;

setTimeout(()=>{

showEnding();

},4500);

}

/* ==========================
        Ending
========================== */

function showEnding(){

showScene("endingScene");

createMeteor();

}

/* ==========================
        Meteor
========================== */

function createMeteor(){

const meteor=

document.createElement("div");

meteor.className="meteor";

document.body.appendChild(meteor);

setTimeout(()=>{

meteor.remove();

},7000);

}

/* ==========================
     Keyboard Shortcuts
========================== */

document.addEventListener(

"keydown",

e=>{

if(e.code==="Space"){

if(music.paused){

music.play();

}else{

music.pause();

}

}

});

/* ==========================
        Age Animation (16 -> 17)
========================== */

function triggerAgeAnimation(){
    const ageNum = document.querySelector('.age-num');
    if(!ageNum) return;
    
    setTimeout(()=>{
        ageNum.classList.add('kick-out');
        
        setTimeout(()=>{
            ageNum.textContent = '17';
            ageNum.classList.remove('kick-out');
            ageNum.classList.add('kick-in');
            
            setTimeout(()=>{
                ageNum.classList.remove('kick-in');
            }, 800);
        }, 400);
    }, 1500);
}

/* ==========================
        Restart Functionality
========================== */

document.getElementById('restartBtn').onclick = ()=>{
    clickSound.currentTime = 0;
    clickSound.play();
    
    // Reset all scenes
    scenes.forEach(scene => scene.classList.remove('active'));
    
    // Reset age
    const ageNum = document.querySelector('.age-num');
    if(ageNum) {
        ageNum.textContent = '16';
        ageNum.classList.remove('kick-out', 'kick-in');
    }
    
    // Stop music
    music.pause();
    music.currentTime = 0;
    musicBtn.innerHTML = "🎵 Play Music";
    
    // Reset confetti
    confetti = [];
    
    // Go back to loading
    showScene('loadingScene');
    
    setTimeout(()=>{
        showScene('introScene');
    }, 2500);
};

/* ==========================
        Finishing Touch
========================== */

console.log(

"%cProject Bloom 🌸",

"color:#ff7bc8;font-size:22px;font-weight:bold"

);

console.log(

"Made with 💜 for Doaa."

);