// Create a list that holds all of your cards
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-bomb", "fa fa-bomb", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];

// depois de apagar as cartas do html, pego no sitio onde estavam, ul class deck...
const cardsContainer = document.querySelector(".deck");

// para o Timer
const timerContainer = document.querySelector(".timer");
let runTimer, totalSeconds = 0;
timerContainer.innerHTML = totalSeconds;

// este array ira coleccionar as cartas q se vao mostrando em cada jogada
let openCards = [];

// este array ira coeleccionar os pares q sejam iguais
let matchedCards = [];

// ... e vou cria-las aqui
// criar as cartas no tabuleiro usando CARD pq existe .card no app.css
// criar a li na ul e dar-lhe a class card.
// na funcao START abaixo

/*****  FUNCTION START Q INICIA (e reinicia) O JOGO DISPONDO AS CARTAS  *****/

function start(){
  shuffle(cards);
  for (var i = 0; i < cards.length; i++){
    const card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = `<i class="${cards[i]}"></i>`; //para colocar os icons nas cartas
    cardsContainer.appendChild(card);

    // call a funcao do click event
    click(card);

  }

}


/*****  FUNCTION PARA CRIAR O TIMER  *****/

function startTimer(){
  runTimer = setInterval(function(){
    totalSeconds++;
    timerContainer.innerHTML = totalSeconds;
  }, 1000);
}

// para comecar o timer apos o 1º click
let isFirstClick = true;

/*****  FUNCTION PARA CRIAR O CLICK EVENT  *****/

function click(card){
// para criar o click event em cada carta
    card.addEventListener("click", function(){

// para comecar o timer apos o 1º click
      if(isFirstClick){
        startTimer();
        isFirstClick = false;
      }

      const currentCard = this;
      const previousCard = openCards[0];

// viramos a carta 1 q ira para o openCards array
      if(openCards.length === 1){

        card.classList.add("open", "show", "disable");
        openCards.push(this);

// viramos a carta 2 e comparamos com carta 1, dando-lhe a classe match

/******  FUNCAO COMPARACAO (CHECKPAIR) *****/
checkPair(currentCard,previousCard);

// ou se esta nao for a carta 1:
      } else {
        currentCard.classList.add("open", "show", "disable");
        openCards.push(this);
      }
    });
}

function checkPair(currentCard,previousCard){
  if(currentCard.innerHTML === previousCard.innerHTML){

    currentCard.classList.add("match");
    previousCard.classList.add("match");

// e mandamo-las para o array matchedCards
    matchedCards.push(currentCard, previousCard);

// esvaziamos o array openCards, depois de ter virado carta 2
    openCards = [];

// verific se ´e o ult par e entao jogo acaba
    gameOver();

  } else {

// caso nao sejam iguais, tb damos tempo para estar visiveis
    setTimeout(function(){
      currentCard.classList.remove("open", "show", "disable");
      previousCard.classList.remove("open", "show", "disable");
// esvaziamos o array openCards, depois de ter virado carta 2
    }, 400);
      openCards = [];
  }

// e adicionamos 1 MOVE fazendo o call a funcao ADDMOVE
  addMove();
}


/*****  VERIF GAME OVER  *****/

function gameOver(){
  if(cards.length === matchedCards.length){

// lança o modal    
                toggleModal();
//alert("Game Over!");

//para parar o Timer
//    stopTimer();
      clearInterval(runTimer);
  }
 
}


/*****  MOVES  *****/

const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove(){
  moves++;
// e actualiza no marcador de moves
  movesContainer.innerHTML = moves;
// e actualiza no marcador de estrelas
  rating();
}


/*****   PARA O RATING   *****/

const score = document.querySelector(".stars");
score.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
function rating(){
  switch(moves){
    case 10:
      score.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
    break;

    case 13:
      score.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
    break;

    case 15:
      score.innerHTML = `<li><i class="fa fa-star"></i></li>`;
    break;

    case 16:
      score.innerHTML = "";
    break;
  }
}


/*****   PARA O RESTART BUTTON   *****/

const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", function(){
  
  // remover todas as cartas
  cardsContainer.innerHTML = "";

  // START para criar as novas cartas
  start();

  // remover as variaveis
  matchedCards = [];
  moves = 0;
  movesContainer.innerHTML = moves;
  score.innerHTML = `<li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;

  clearInterval(runTimer);
  isFirstClick = true;
  totalSeconds = 0;
  timerContainer.innerHTML = totalSeconds;
});


/**   MODAL   **/

    var modal = document.querySelector(".modal");
//  var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");

    function toggleModal() {
        modal.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
//            toggleModal();
// sem a linha de cima, clicando fora da x o modal nao fecha.
        }
    }

//    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);


/*****   PARA O RESTART BUTTON   *****/

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// para comecar o jogo pela primeira vez (START)
start();




/*********************   PARA O README   *********************

You need to put a minimum of section in it:
A title
How to install and run your app
How to play
Minimum requered to use it
And so on....


E AINDA FALTA:

  shuffle -> feito
  timer -> feito s´o para segundos
  modal -> qs feito! Falta mod o conteudo

  
  transitions das cartas
  mudar para arrow functions
  responsive - display flex, etc do Flexbox e alguns break-points

  bug do game over cujo popup aparece antes de mostrar ult carta


*************************************************************/

