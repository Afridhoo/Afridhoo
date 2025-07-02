let player1 = document.querySelector('.player1');
let player2 = document.querySelector('.player2');
let simpanpoit = document.querySelector('.sp');
let current1 = document.querySelector('.current1');
let current2 = document.querySelector('.current2');
let kocokdadu = document.querySelector('.kd');
let brain;
let brain1;
let playerMove = true;
let score1 = document.querySelector('.score1');
let score2 = document.querySelector('.score2');
let scoresatu = 0;
let scoredua = 0;
let img = document.querySelector('.img');
let newGame = document.querySelector('.ng');
let rulesbutton = document.querySelector('.rl');
let rulesisi = document.querySelector('.rules');
let closeRules = document.querySelector('.close-rules');
let overlay = document.querySelector('.overlay');
let head = document.querySelector('.head');
let current1Isi = 0;
let current2Isi = 0;
let p1 = document.querySelector('.p1');
let p2 = document.querySelector('.p2');
let scoreplayer1 = document.querySelector('.scoreplayer1');
let scoreplayer2 = document.querySelector('.scoreplayer2');
let highscoreplayer1 = document.querySelector('.highscoreplayer1');
let highscoreplayer2 = document.querySelector('.highscoreplayer2');
let scoreNew1 = 0;
let highscore1 = 0;
let scoreNew2= 0;
let highscore2 = 0;


overlay.addEventListener('click', function () {
  rulesisi.style.display = 'none';
  head.style.filter = 'none';
});
closeRules.addEventListener('click', function () {
  rulesisi.style.display = 'none';
  overlay.style.display = 'none';
  head.style.filter = 'none';
});
rulesbutton.addEventListener('click', function () {
  rulesisi.style.display = 'block';
  head.style.filter = 'blur(4px)';
  overlay.style.display = 'block';
});

newGame.addEventListener('click', function () {
  current1.textContent = 0;
  current2.textContent = 0;
  score1.textContent = 0;
  score2.textContent = 0;
  scoresatu = 0;
  scoredua = 0;
  brain = 0;
  brain1 = 0;
  img.src = 'dadu0.png';
  scoreplayer1.textContent = 'Player 1 : 0';
  scoreplayer2.textContent = 'Player 2 : 0';
});

kocokdadu.addEventListener('click', function () {
  brain = Math.floor(Math.random() * 6 + 1);
  brain1 = Math.floor(Math.random() * 6 + 1);

  if (scoresatu >= 10) {
    p1.textContent = 'Player 1';
    p1.style.color = '#000';
    p2.textContent = 'Player 2';
    p2.style.color = '#000';
    scoresatu = 0;
     player2.style.backgroundColor = 'rgb(243, 223, 236)';
      player1.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
 
    score1.textContent = 0;
  } else if (scoredua >= 10) {
    p2.textContent = 'Player 2';
    p2.style.color = '#000';
    score2.textContent = 0;
    p1.textContent = 'Player 1';
    p1.style.color = '#000';
    scoredua = 0;
  
     player1.style.backgroundColor = 'rgb(243, 223, 236)';
      player2.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
  }
  if (brain === 1) {
    playerMove = false;

    current1Isi = 0;
    player1.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
    player2.style.backgroundColor = 'rgb(243, 223, 236)';
    current1.textContent = 0;
  } else if (brain <= 6 && playerMove) {
    brain1 = false;
    current1.textContent = current1Isi += brain;
    if (brain === 1) {
      img.src = 'dadu1.png';
    } else if (brain === 2) {
      img.src = 'dadu2.png';
    } else if (brain === 3) {
      img.src = 'dadu3.png';
    } else if (brain === 4) {
      img.src = 'dadu4.png';
    } else if (brain === 5) {
      img.src = 'dadu5.png';
    } else if (brain === 6) {
      img.src = 'dadu6.png';
    }
  }

  if (playerMove === false) {
    brain = false;
    current2.textContent = current2Isi += brain1;

    if (brain1 === 1) {
      img.src = 'dadu1.png';
    } else if (brain1 === 2) {
      img.src = 'dadu2.png';
    } else if (brain1 === 3) {
      img.src = 'dadu3.png';
    } else if (brain1 === 4) {
      img.src = 'dadu4.png';
    } else if (brain1 === 5) {
      img.src = 'dadu5.png';
    } else if (brain1 === 6) {
      img.src = 'dadu6.png';
    }

    if (brain1 === 1) {
      current2Isi = 0;
      playerMove = true;
      player1.style.backgroundColor = ' rgb(243, 223, 236)';
      player2.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
      current2.textContent = 0;
    }
  }

  console.log(`Ini brain 1 : ${brain}`);
  console.log(`Ini brain 2 : ${brain1}`);
});

simpanpoit.addEventListener('click', function () {
  let testCur1 = Number(current1.textContent);
  let testCur2 = Number(current2.textContent);
  if (testCur1 > 0) {
    if (playerMove === true && testCur1 !== 0) {
      current1Isi = 0;
      img.src = 'dadu0.png';
      score1.textContent = scoresatu += testCur1;
      player1.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
      current1.textContent = 0;
      player2.style.backgroundColor = 'rgb(243, 223, 236)';
      playerMove = false;
    }
  } else if (testCur2 > 0) {
    if (playerMove === false && testCur2 !== 0) {
      current2Isi = 0;
      score2.textContent = scoredua += testCur2;
      img.src = 'dadu0.png';
      playerMove = true;
      current2.textContent = 0;
      player1.style.backgroundColor = 'rgb(243, 223, 236)';
      player2.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
    }
  }
  if (scoresatu >= 10) {
    p1.textContent = 'Player 1 Wins🎉';
    p2.textContent = 'Player 2 Lose!';
    p2.style.color = 'red';
     player1.style.backgroundColor = 'rgb(243, 223, 236)';
      player2.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
    img.src = 'dadu0.png';
     scoreplayer1.textContent = `Player 1 : ${scoreNew1 +=1}`;
        highscoreplayer1.textContent = `Player 1 : ${highscore1+=1}`
  } else if (scoredua >= 10) {
    p2.textContent = 'Player 2 Wins🎉';
    p1.textContent = 'Player 1 Lose!';
    p1.style.color = 'red';
     player2.style.backgroundColor = 'rgb(243, 223, 236)';
      player1.style.backgroundColor = ' rgba(128, 131, 128, 0.505)';
    img.src = 'dadu0.png';
    scoreplayer2.textContent = `Player 2 : ${scoreNew2 +=1}`;
    highscoreplayer2.textContent = `Player 2 : ${highscore2+=1}`;
  }
  console.log(`Ini score 1 : ${scoresatu}`);
  console.log(`Ini score 2 : ${scoredua}`);
});
