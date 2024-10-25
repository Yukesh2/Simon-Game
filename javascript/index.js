const colors = ['green', 'blue', 'yellow', 'red'];
let  sequence = [];
let usersequence = [];
let level = 0;
//starting the game 
function startgame(){
    level  = 0;
    sequence = [];
    nextsequence();
}
//starting the sequence of the colors to work 
function nextsequence(){
    usersequence = [];
    level++
    $('h1').text('level '  + level);
    //generating the random colors 
    const randomColor = colors[Math.floor(Math.random()*colors.length)];
    sequence.push(randomColor);
    playSequence();
}
function playSequence(){
    //selecting the color in sequence and their index 
   sequence.forEach((color,index)=>{
    setTimeout(() =>{
        $('.box.' + color).addClass('glow');
        //playing  the sound here
        document.getElementById('sound-' + color).play(); 
        setTimeout(() => {
            $('.box.' + color).removeClass('glow');
        },300);
    },index * 600);
   });
}
function checkAnswer(currentlevel){
    //the value of currentlevel is passed from checkAnswer(usersequence.length-1)
    if(usersequence[currentlevel] === sequence[currentlevel]){
        if(usersequence.length === sequence.length){
            setTimeout(nextsequence,1000);
        }


    }else{
        $('h1').text('Game Over to press any key to start');
      
    }
}
//pushing the clicking value to the usersequence
$('.box').click(function(){
    if(sequence.length>0){
        //this refers to the specific box that was clicked.
        //attr retrives the class attribute,which might be green box..
        //split spilts the green box to green to 0 index and box to 1 inde
         //since the index is [1] it will access green.
        const color = $(this).attr('class').split(' ')[1];
        //usersequecnce,push color means it will push the value of color to the usersequecnec
        usersequence.push(color);
        //
        checkAnswer(usersequence.length-1);
    }
});

$(document).keypress(startgame);