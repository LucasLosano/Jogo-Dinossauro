const dino = document.getElementById('dino')
const background = document.getElementById('background')
const scoreDisplay = document.getElementById('score')
let isJumping = false;
let position = 0;
let score = 0;
let gameSpeed = 1000;

function handleKeyup(event){
    if(event.code === "ArrowUp"){
        if(!isJumping){
            jump();
        }
    }else if(event.code === "ArrowUp"){

    }
}

function jump(){
    isJumping = true;
    let upInterval = setInterval(() =>{
        if(position >= 150){
            clearInterval(upInterval);
            let downInterval = setInterval(()=>{
                
                position -= 20;
                if(position === 0){
                    clearInterval(downInterval);
                    isJumping = false;
                }
                dino.style.bottom = position + 'px';
            },20)
        }
        else{
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    },20)
}

function createCactus(){
    
    let randomTime = Math.random() * 2000 + gameSpeed
    const cactus = document.createElement('div');
    cactus.className = 'cactus';
    cactus.style.right = 0;
    background.appendChild(cactus)

    let leftInterval = setInterval(()=>{              
        let cactusPosition = parseInt(cactus.style.right.replace('px',''));
        cactus.style.right = (cactusPosition + 20) + "px"
        if(window.innerWidth - 60 < cactusPosition && cactusPosition < window.innerWidth){
            if(position<60){
                document.body.innerHTML = "<div id='endgame'><h1>Fim de jogo</h1><a id='play' href=''>Jogue novamente</a></div>";
            }
        }else if(window.innerWidth + 60 < cactusPosition){
            cactus.remove();
            clearInterval(leftInterval)
            gameSpeed -= 10;
            score += 100;
            scoreDisplay.innerHTML = score;
            
        }
        
    },gameSpeed/50)

    setTimeout(createCactus, randomTime)

    
}

createCactus()



document.addEventListener('keyup',handleKeyup);