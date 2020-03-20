const superHeroApp = {};


superHeroApp.superhero1 = $('#superhero1');
superHeroApp.superhero2 = $('#superhero2');
superHeroApp.typeOfBattle = $('#battleCondition');

superHeroApp.battleButton = $('.battleButton');
superHeroApp.resetButton = $('.resetButton');

//use them to appear and disappear from the page
superHeroApp.instructionContainer = $('.instructionContainer');
superHeroApp.flexContainer = $('.flexContainer'); //all three selects

superHeroApp.userSelection1 = '';
superHeroApp.userSelection2 = '';
superHeroApp.userSelection3 = '';

//where we store the info on each API call
superHeroApp.powerStats = [
  {
    name: '',
    intelligence: 0,
    speed: 0,
    combat: 0,
    strength: 0,
  },
  {
    name: '',
    intelligence: 0,
    speed: 0,
    combat: 0,
    strength: 0,
  },
  { selection: '' },
];

superHeroApp.player1 = function(){
  superHeroApp.superhero1.on('change', function () {
    //get the value from the user selection to use it in the API call
    superHeroApp.userSelection1 = superHeroApp.superhero1.val();

    $.ajax({
      url: 'https://proxy.hackeryou.com',
      method: 'GET',
      dataType: 'json',
      data: {
        reqUrl: `https://superheroapi.com/api/2827401063977440/${superHeroApp.userSelection1}`
      }
    }).then(function (result) {
      const htmlToAppend = `
      <div class="resultContainer">
        <h2>${result.name}</h2>
        <div class="flexContainerImgCircle">
          <div class="imgContainer">
            <img src="${result.image.url}" alt="${result.name}"/>
          </div>
          <div class="circleContainer">
            <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g class="svgGroup">
              <circle class="baseCircle" cx="50" cy="50" r="45" />
              <path class="secondCircleHero1" d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0"></path>
              </g>
            </svg>
            <span class="circleLabel circleLabelHero1"></span>
          </div>
        </div>
      </div>`;
      //place the result on the page
      $('.result1').html(htmlToAppend);

      //store the info in our local object, to use later
      superHeroApp.powerStats[0].name = result.name;
      superHeroApp.powerStats[0].intelligence = result.powerstats.intelligence;
      superHeroApp.powerStats[0].speed = result.powerstats.speed;
      superHeroApp.powerStats[0].combat = result.powerstats.combat;
      superHeroApp.powerStats[0].strength = result.powerstats.strength;
    })
  })
}

superHeroApp.player2 = function(){
  superHeroApp.superhero2.on('change', function () {
    //get the value from the user selection to use it in the API call
    superHeroApp.userSelection2 = superHeroApp.superhero2.val();

    $.ajax({
      url: 'https://proxy.hackeryou.com',
      method: 'GET',
      dataType: 'json',
      data: {
        reqUrl: `https://superheroapi.com/api/2827401063977440/${superHeroApp.userSelection2}`
      }
    }).then(function (result) {
      const htmlToAppend = `
      <div class="resultContainer">
        <h2>${result.name}</h2>
        <div class="flexContainerImgCircle">
          <div class="imgContainer">
            <img src="${result.image.url}" alt="${result.name}"/>
          </div>
          <div class="circleContainer">
            <svg class="svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <g class="svgGroup">
              <circle class="baseCircle" cx="50" cy="50" r="45" />
              <path class="secondCircleHero2" d="
                  M 50, 50
                  m -45, 0
                  a 45,45 0 1,0 90,0
                  a 45,45 0 1,0 -90,0"></path>
              </g>
            </svg>
            <span class="circleLabel circleLabelHero2"></span>
          </div>
        </div>
      </div>`;
      //place the result on the page
      $('.result2').html(htmlToAppend);

      //store the info in our local object, to use later
      superHeroApp.powerStats[1].name = result.name;
      superHeroApp.powerStats[1].intelligence = result.powerstats.intelligence;
      superHeroApp.powerStats[1].speed = result.powerstats.speed;
      superHeroApp.powerStats[1].combat = result.powerstats.combat;
      superHeroApp.powerStats[1].strength = result.powerstats.strength;
    })
  })
}

superHeroApp.heroBattle = function(){
  superHeroApp.typeOfBattle.on('change', function () {
    //get the value from the user selection
    superHeroApp.userSelection3 = superHeroApp.typeOfBattle.val();
    //store the info in our local object, to use later
    superHeroApp.powerStats[2].selection = superHeroApp.userSelection3;
  })
}
//*code for svg circle https://itnext.io/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript-d0171d1fb6f7

//number for the circumference of the base circle
superHeroApp.total = 283;

//turn the numbers from the API into a percentage
superHeroApp.calculatePercentage = function(num){
  return num * superHeroApp.total / 100;
}

superHeroApp.drawCircles = function(num1, num2) {
  //get the number from the powerstat that was chosen, turn it into a percentage, and draw on top of the initial circle
  const circleDasharray1 = `${(superHeroApp.calculatePercentage(num1).toFixed(0))} 283`;
  $('.secondCircleHero1').attr('stroke-dasharray', circleDasharray1);
  $('.circleLabelHero1').append(`${num1}%`);

  const circleDasharray2 = `${(superHeroApp.calculatePercentage(num2).toFixed(0))} 283`;
  $('.secondCircleHero2').attr('stroke-dasharray', circleDasharray2);
  $('.circleLabelHero2').append(`${num2}%`);
}

superHeroApp.grandBattle = function(obj) {
  //get the obj for the specific hero
  // convert all powerstats to numbers
  const first = parseInt(obj.intelligence);
  const second = parseInt(obj.speed);
  const third = parseInt(obj.combat);
  const fourth = parseInt(obj.strength);
  // add them up
  return total = ((first + second + third + fourth) / 4).toFixed(2);
  // divide them by four to get an average
}

superHeroApp.whoIsWinner = function() {
  //check which type of battle the user chose
  const chosenBattle = superHeroApp.powerStats[2].selection;

  $('.winnerContainer').append(`
  <div class="winnerTitle">
    <p>The winner of the ${chosenBattle} Battle is...<p>
  </div>`);

  let hero1Num;
  let hero2Num;

  if (chosenBattle === 'Grand') {
    hero1Num = superHeroApp.grandBattle(superHeroApp.powerStats[0]);
    hero2Num = superHeroApp.grandBattle(superHeroApp.powerStats[1]);
  } else {
    const hero1 = superHeroApp.powerStats[0][chosenBattle.toLowerCase()];
    hero1Num = parseInt(hero1);
    const hero2 = superHeroApp.powerStats[1][chosenBattle.toLowerCase()];
    hero2Num = parseInt(hero2);
  }

  superHeroApp.drawCircles(hero1Num, hero2Num);

  //determine the winner and print it to the page
  if (hero1Num > hero2Num) {
    $('div.winnerTitle').append(`<h3>${superHeroApp.powerStats[0].name}</h3>`);
  } else if (hero2Num > hero1Num) {
    $('div.winnerTitle').append(`<h3>${superHeroApp.powerStats[1].name}</h3>`);
  } else if (hero1Num === hero2Num) {
    $('div.winnerTitle').append(`<h3>Both! It's a tie!</h3>`);
  }
}

//this triggers the css changes on button click
superHeroApp.button = function(){
  const toggleInstructions = $('.toggleInstructions');
  const loadingResults = $('.loadingResults');

  superHeroApp.battleButton.on('click', function () {

    if (superHeroApp.powerStats[0].name !== '' && superHeroApp.powerStats[1].name !== '' && superHeroApp.powerStats[2].selection !== '') {
      superHeroApp.flexContainer.css('display', 'none');
      toggleInstructions.css('display', 'none');
      superHeroApp.battleButton.css('display', 'none');
      loadingResults.toggleClass('showInstructions');
  
      superHeroApp.whoIsWinner();
  
      setTimeout(() => {
        $('.result').css('display', 'flex');
        superHeroApp.resetButton.css('display', 'block');
        loadingResults.toggleClass('showInstructions');
      }, 3000);

    } else {
      alert('Please select two champions and a battle condition!');
    }

  })
}

//this resets the css changes on button click
superHeroApp.resetButton.on('click', function () {
  $('.result').css('display', 'none');

  $('.result1').children().remove();
  $('.result2').children().remove();
  $('.winnerContainer').children().remove();

  superHeroApp.powerStats = [
    {
      name: '',
      intelligence: 0,
      speed: 0,
      combat: 0,
      strength: 0,
    },
    {
      name: '',
      intelligence: 0,
      speed: 0,
      combat: 0,
      strength: 0,
    },
    { selection: '' },
  ];

  superHeroApp.instructionContainer.css('display', 'block');
  superHeroApp.flexContainer.css('display', 'flex');
  superHeroApp.battleButton.css('display', 'flex');
  superHeroApp.resetButton.css('display', 'none');

  //https://stackoverflow.com/questions/10502093/how-to-reset-a-select-element-with-jquery
  superHeroApp.superhero1.prop('selectedIndex', 0);
  superHeroApp.superhero2.prop('selectedIndex', 0);
  superHeroApp.typeOfBattle.prop('selectedIndex', 0);
  
  const toggleInstructions = $('.toggleInstructions');
  toggleInstructions.css('display', 'block');
})

superHeroApp.init = function(){
  this.player1();
  this.player2();
  this.heroBattle();
  this.button();
}

$(function() {
  superHeroApp.init();

  const instructionModal = $('.instructionModal');
  const toggleInstructions = $('.toggleInstructions');
  const closeInstructions = $('.closeInstructions');

  function toggleInstructionModal() {
    instructionModal.toggleClass('showInstructions');
  }

  function mainWindowClick(e) {
    if (e.target === instructionModal) {
      toggleInstructionModal();
    }
  }

  toggleInstructions.on('click', toggleInstructionModal);
  closeInstructions.on('click', toggleInstructionModal);
  $(window).on('click', mainWindowClick);
});