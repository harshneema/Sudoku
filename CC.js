const easy = [
  "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------",
  "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];

var board = document.querySelector('board');

window.onload = function () {
 document.getElementById('str-btn').addEventListener("click",startGame);
 document.getElementById('check-btn').addEventListener("click",endGame);
 document.getElementById('check-btn').style.display = "none";
// '6' 853291 '7' 497148 '5' 3 '2' 623476 '1' 859 '362' 5749 '81' 54 '96' 18732 '71' 82 '9' 3 '4' 6 '5' 8 '2' 394 '651' 719 '78' 5264 '345' 6137298
}


function startGame(){


  var n = 0 ;
  document.getElementById('str-btn').disabled = "disable";
  document.getElementById('str-btn').style.display = "none";
  document.getElementById('check-btn').style.display = "block";
  
  for (let i = 0; i < 9; i++) {

     for (let j = 0; j < 9; j++) {
      var box = document.createElement("div");
      box.id = "demo"+ [i+1] + '-' + [j+1] ;
      box.classList.add('demo'+ [i+1] , 'common' ) ;
      document.querySelector(".board").appendChild(box);
      
      // var atmpt = document.createElement("p");
      // atmpt.id = "attempt"+ [i+1] + '-' + [j+1] ;
      // atmpt.classList.add('rslts' ) ;
      // document.querySelector(".result").appendChild(atmpt);

      if ( easy[0][j+n] != "-") {
        var boxinp = document.createElement("input") ;
        box.appendChild(boxinp) ;
        boxinp.id = "cantype" +  [i+1] + '-' + [j+1] ;
        boxinp.classList.add("commoninp");
        boxinp.value = easy[0][j+n] ;
        boxinp.disabled = "disabled" ; 
        // atmpt.textContent = easy[0][j+n] ;
        console.log(n) ;
      }
      else {
         var boxinp = document.createElement("input") ;
         box.appendChild(boxinp) ;
         boxinp.id = "cantype" +  [i+1] + '-' + [j+1] ;
         boxinp.classList.add("commoninp");
         

        boxinp.type = "number" ;
        boxinp.min = "1";
        boxinp.max = "9";
         


      }
    } 
      n = n+9;

      
      
  }

  // for (let i = 0; i < 81; i++) {
  //   const input = document.querySelectorAll(".commoninp")[i];
  //   var log = document.querySelectorAll('.rslts');
    

  
  //    input.addEventListener('change', updateValue);
  //    console.log("Hello world!");
  
  //   function updateValue(e) {
  //     log[i].innerHTML = e.target.value ;
  //   }

  
  // }
 

  
    
}

function endGame() {

  for (let i = 0; i < 81; i++) {
    
    if ( document.querySelectorAll(".commoninp")[i].value == easy[1][i] ) {
      document.getElementById("final").textContent = 'You Won!!' ; 
    }
    else{
      document.getElementById("final").textContent = 'You need to try again!!' ;
    }
    
  }

  
}
