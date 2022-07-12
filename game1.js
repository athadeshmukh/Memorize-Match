let symb = ["🍄","🍙","🥦","🌀","🌺","🍋","✨","🍐","🌴","🥝",
            "🍇","🥥","🌈","🍓","🍒","🍎","🧁","🎂","💐","🍉",
            "🍬","🍩","🍫","🎈","🍊","🥭","🍍","🌵","🍔","🍕","🌹",
            "🍅","🍴","🌻","🌶️"];

//Shuffling above array
let tmp, c, p = symb.length;
if(p) while(--p) {
   c = Math.floor(Math.random() * (p + 1));
   tmp = symb[c];
   symb[c] = symb[p];
   symb[p] = tmp;
}

//Variables
let pre="", pID, p1ID=0, turn=0, trans="transform", flip="rotateX(180deg)", flipBack="rotateX(0deg)", time, mode;

//Resizing Screen
window.onresize = init;
function init() {
   W = innerWidth;
   H = innerHeight;
   $('body').height(H+"px");
   $('#bac').height(H+"px");
}

//Showing instructions
window.onload = function() {
    $("#bac").html(`<center><div id="inst">
    <h3>Welcome !</h3>Instructions For Game<br/><br/>
    <li>Make pairs of similiar blocks by flipping them.</li>
    <li>To flip a block you can click on it.</li>
    <li>If two blocks you clicked are not similar, they will be flipped back.</li>
    <p style="font-size:18px;">Click one of the following mode to start the game.</p>
    </div><button onclick="start(3, 4)">3 x 4</button>
    <button onclick="start(4, 4)">4 x 4</button>
    <button onclick="start(4, 5)">4 x 5</button>
    <button onclick="start(5, 6)">5 x 6</button>
    <button onclick="start(6, 6)">6 x 6</button></center>`);
}

//Starting the game
function start(r,l) {
    //Timer and moves
    min=0, sec=0, moves=0;
    $("#time").html("Time: 00:00");
    $("#moves").html("Moves: 0");
    time = setInterval(function() {
      sec++;
      if(sec==60) {
          min++; sec=0;
      }
      if(sec<10) 
          $("#time").html("Time: 0"+min+":0"+sec);
      else 
        $("#time").html("Time: 0"+min+":"+sec);
    }, 1000);
    tsymb=r*l/2, noItems=tsymb;
    mode = r+"x"+l;
    //Generating item array and shuffling it
    let items = [];
    for (let i=0;i<noItems;i++)
        items.push(symb[i]);
    for (let i=0;i<noItems;i++)
        items.push(symb[i]);
    let tmp, c, p = items.length;
    if(p) while(--p) {
        c = Math.floor(Math.random() * (p + 1));
        tmp = items[c];
        items[c] = items[p];
        items[p] = tmp;
    }
    
    //Creating table
    $("table").html("");
    let n=1;
    for (let i=1;i<=r;i++) {
        $("table").append("<tr>");
        for (let j=1;j<=l;j++) {
           $("table").append(`<td id='${n}' onclick="change(${n})">
           <div class='inner'><div class='front'></div>
           <div class='back'>
           <p>${items[n-1]}</p>
           </div></div></td>`);
           n++;
         }
         $("table").append("</tr>");
    }
    
    //Hiding instructions screen
    $("#bac").fadeOut(500);
}

//Flipping blocks
function change(x) {
  //Variables
  let i = "#"+x+" .inner";
  let f = "#"+x+" .inner .front";
  let b = "#"+x+" .inner .back";
  
  //Dont flip conditions
  if (turn==2 || $(i).attr("flip")=="block" || p1ID==x) {}
  
  //Flip
  else {
    $(i).css(trans, flip);
    if (turn==1) {
      //Prevent spam clicking
      turn=2;
      
      //Flipped blocks are not same
      if (pre!=$(b).text()) {
         setTimeout(function() {
            $(pID).css(trans, flipBack);
            $(i).css(trans, flipBack);
            p1ID=0;
         },1000);
      }
      
      //Flipped are same
      else {
          tsymb--;
          $(i).attr("flip", "block");
          $(pID).attr("flip", "block");
      }
      
      setTimeout(function() {
         turn=0;
         //Increase moves
         moves++;
         $("#moves").html("Moves: "+moves);
      },1150);
      
    }
    else {
      pre = $(b).text();
      p1ID = x;
      pID = "#"+x+" .inner";
      turn=1;
    }
    
    //All flips are matched
    if (tsymb==0) {
          clearInterval(time);
          if (min==0) {
              time = `${sec} seconds`;
          }
          else {
              time = `${min} minute(s) and ${sec} second(s)`;
          }
          setTimeout(function() {
              $("#bac").html(`<center><div id="iol">
              <h2>Congrats!</h2>
              <p style="font-size:23px;padding:10px;">You completed the ${mode} mode in ${moves} moves. It took you ${time}.</p>
              <p style="font-size:18px">Comment Your Score!<br/>Play Again ?</p>
              <button onclick="start(3, 4)">3 x 4</button>
              <button onclick="start(4, 4)" style="w">4 x 4</button>
              <button onclick="start(4, 5)">4 x 5</button>
              <button onclick="start(5, 6)">5 x 6</button>
              <button onclick="start(6, 6)">6 x 6</button>
              </div></center>`);
              $("#bac").fadeIn(750);
          }, 1500);
    }
  }
}