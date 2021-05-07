
//Difficuty levels for different stages
const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];
const medium = [
  "--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3---",
  "619472583243985617587316924158247369926531478734698152891754236365829741472163895"
];
const hard = [
  "-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--",
  "712583694639714258845269173521436987367928415498175326184697532253841769976352841"
];


var board = document.querySelector('board'); 
var level = [] ;  //to decide level
var Check_Array = [[],[],[],[],[],[],[],[],[]];  //all values are pushed into this array to check if the number is valid or not
var sec = 0 ; 
var min = 0 ;


window.onload = function () {
 document.getElementById('Start-btn').addEventListener("click",function () {
  Setdifficulty();
  startGame();
  timer();
  });  

 document.getElementById('validate-btn').addEventListener("click",endGame);
 document.getElementById('solve-btn').addEventListener("click",solve);
 document.getElementById('validate-btn').style.display = "none";
 document.getElementById('solve-btn').style.display = "none";
 document.querySelector('.board').style.display = "none";
 document.getElementById('timeleft').style.display = "none";
 

 
}

//Function to set difficulty as provided by the user
function Setdifficulty() {
  var x = document.getElementsByName('difficulty');
 for(i = 0; i < x.length; i++) {
    if(x[i].checked){
      if (x[i].value === "easy") { level= easy ;}
      if (x[i].value === "medium") {level= medium ;}
      if (x[i].value === "hard") {level= hard ;}
    }  
  }
}

//function to start the time clock
function timer() {
  var clock = setInterval(() => {
    if (document.getElementById("final").textContent == 'You Won!!') {
      clearInterval(clock); 
    } //to stop clock once timer stops
    else{
      sec++ ;
      if (sec<60) {
        if (sec<10) { document.getElementById('seconds').innerHTML = '0' + sec ; }
        else{ document.getElementById('seconds').innerHTML = sec ; }
      }
      else{
        min = Math.floor(sec/60) ;
        sec2 = sec%60 ;
        if (min<10) { document.getElementById('minutes').innerHTML = '0' + min + ':'; }
        else{  document.getElementById('minutes').innerHTML =  min + ':' ;  }
        if (sec<10 || sec2<10) { document.getElementById('seconds').innerHTML = '0' + sec2 ; }
        else{ document.getElementById('seconds').innerHTML = sec2 ;}
      }   
    }
  }, 1000);
  
}

//function to populate the board and provide main functioning to the input elements
function startGame(){

  var n = 0 ;
  document.getElementById('Start-btn').style.display = "none";
  document.getElementById('validate-btn').style.display = "block";
  document.getElementById('f1').style.display = "none";
  document.querySelector('.board').style.display = "grid";
  document.getElementById('timeleft').style.display = "flex";
  document.getElementById('solve-btn').style.display = "block";
  

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var box = document.createElement("div");
      box.classList.add('row'+ [i+1]) ;
      document.querySelector(".board").appendChild(box);

      //creates input elements inside 81 div element with an id of their position

      var InputBox = document.createElement("input") ;
      box.appendChild(InputBox) ;
      InputBox.id = "Input_box" +  [i+1] + '-' + [j+1] ;
      InputBox.classList.add("Input_common_class");
      InputBox.addEventListener('change', function () {
        checkGame();
        inputcheck();
      });  

      //input disabled for the numbers already given
      if ( level[0][j+n] != "-") {  
        InputBox.value = level[0][j+n] ;
        InputBox.disabled = "disabled" ; 
        console.log(n) ;
      }
      else {
        InputBox.type = "number" ;
        InputBox.min = "1";
        InputBox.max = "9";
      }
    } 
   n = n+9;  
  }
}
//to ensure the number entered is between 1 and 9 ;
function inputcheck(){
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= 9; j++) {
      if ((document.querySelector('#Input_box' + [i] + '-' + [j]).value > 9) || (document.querySelector('#Input_box' + [i] + '-' + [j]).value < 1) ) {
        document.querySelector('#Input_box' + [i] + '-' + [j]).value = '' ;  
      }
    }
  }
}

//checks if the entered input by user is valid move or not

function checkGame() {
  let Check_Array = [[],[],[],[],[],[],[],[],[]];
  
  for (let i = 1; i <= 9; i++) {

    for (let j = 1; j <= 9; j++) {
      var chkthis = document.querySelector('#Input_box' + [i] + '-' + [j]);
     let Check_Array2 =  Check_Array[i-1].push(chkthis.value);
    }
  }
  
  //array succesfully created with input elements
  // console.log(Check_Array);

  //loop runs for each block to check if its valid in rown, column and its 3x3 grid
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let blocksel = Check_Array[i][j];

      if (blocksel != "" && (document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).disabled == false)) {
        document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).style.backgroundColor = 'white' ;
        for (let k = 0; k < 9; k++) {
          if (blocksel == Check_Array[i][k] && (j != k)) {
            document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).style.backgroundColor = 'Red' ;
            console.log('block'+ [i+1] + [j+1] + 'not valid matches with'+ [i+1] + [k+1] );
          }
        }

        for (let t = 0; t < 9; t++) {
          if (blocksel == Check_Array[t][j] && (i != t)) {
            document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).style.backgroundColor = 'Red' ;
            console.log('block'+ [i+1] + [j+1] + 'not valid matches with'+ [t+1] + [j+1] );
          }
        }
        
        var m = Math.floor(i/3);
        var n = Math.floor(j/3) ;
        
        for (let c = 3*m; c < (3+(3*m)); c++) {
          for (let d = 3*n; d < (3+(3*n)); d++) {
            if (blocksel == Check_Array[c][d] && (i != c) && (j !=d) ) {
              document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).style.backgroundColor = 'Red' ;
            }
          }
        } 
      }

      if (blocksel == '' && (document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).disabled == false)) {
        document.querySelector('#Input_box' + [i+1] + '-' + [j+1]).style.backgroundColor = 'white' ;
      }   
    }  
  }
}

function endGame() {
  for (let i = 0; i < 81; i++) {
    
    if ( document.querySelectorAll(".Input_common_class")[i].value == level[1][i] ) {
      document.getElementById("final").textContent = 'You Won!!' ;  }
    else{  document.getElementById("final").textContent = 'You need to try again!!' ;}
    
  } 
}

function solve() {
  if (confirm("Are you sure ?")) {
    for (let i = 0; i < 81; i++) {
      document.querySelectorAll(".Input_common_class")[i].value = level[1][i];
      document.getElementById("final").textContent = 'You Won!!' ;
   } 
  }
}
