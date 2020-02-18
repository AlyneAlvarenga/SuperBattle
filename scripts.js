
const superhero1 = $('#superhero1');
const superhero2 = $('#superhero2');
const typeOfBattle = $('#battleCondition');

const battleButton = $('.battleButton');
const resetButton = $('.resetButton');

//to disappear
const instructionContainer = $('.instructionContainer');
const flexContainer = $('.flexContainer'); //all three selects

let userSelection1;
let userSelection2;
let userSelection3;

let powerStats = [
    {
        name: '',
        intelligence: 0,
        speed: 0,
        combat: 0
    },
    {
        name: '',
        intelligence: 0,
        speed: 0,
        combat: 0
    },
    { selection: '' },
];

// one major issue now is, if the user selects more than one superhero on each drop down menu, they're all saved, potentially showing three or more on the screen... 

//!use .one or is there another method that allows it to execute only the last time the user selects something?
superhero1.on('change', function () {
    userSelection1 = superhero1.val();

    $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `https://superheroapi.com/api/2827401063977440/${userSelection1}`
        }
    }).then(function (result) {
        const htmlToAppend = `
        <div class="resultContainer">
            <h2>${result.name}</h2>
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
        `;
        $('.result1').html(htmlToAppend);
        powerStats[0].name = result.name;
        powerStats[0].intelligence = result.powerstats.intelligence;
        powerStats[0].speed = result.powerstats.speed;
        powerStats[0].combat = result.powerstats.combat;
    })
})


superhero2.on('change', function () {
    userSelection2 = superhero2.val();

    $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `https://superheroapi.com/api/2827401063977440/${userSelection2}`
        }
    }).then(function (result) {
        const htmlToAppend = `
        <div class="resultContainer">
            <h2>${result.name}</h2>
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
        `;
        $('.result2').html(htmlToAppend);
        powerStats[1].name = result.name;
        powerStats[1].intelligence = result.powerstats.intelligence;
        powerStats[1].speed = result.powerstats.speed;
        powerStats[1].combat = result.powerstats.combat;
    })
})

// let one;
// let two;

typeOfBattle.on('change', function () {
    userSelection3 = typeOfBattle.val();

    powerStats[2].selection = userSelection3;
})

//*code for svg circle https://itnext.io/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript-d0171d1fb6f7
const total = 283;

function calculatePercentage(num) {
    return num * total / 100;
}

function drawCircles(num1, num2) {

    const circleDasharray1 = `${(calculatePercentage(num1).toFixed(0))} 283`;
    $('.secondCircleHero1').attr('stroke-dasharray', circleDasharray1);
    $('.circleLabelHero1').append(`${num1}%`);

    const circleDasharray2 = `${(calculatePercentage(num2).toFixed(0))} 283`;
    $('.secondCircleHero2').attr('stroke-dasharray', circleDasharray2);
    $('.circleLabelHero2').append(`${num2}%`);
}

function whoIsWinner() {
    console.log(powerStats);
    const chosenBattle = powerStats[2].selection;

    //will change which div this appends to, because we want this at the top
    //use .winnerContainer was using .test
    $('.winnerContainer').append(`
    <div class="winnerTitle">
        <p>The winner of the battle of ${chosenBattle} is...<p>
    </div>`)

    const hero1 = powerStats[0][chosenBattle];
    const hero1Num = parseInt(hero1);

    const hero2 = powerStats[1][chosenBattle];
    const hero2Num = parseInt(hero2);

    drawCircles(hero1Num, hero2Num);

    if (hero1Num > hero2Num) {
        console.log('Hero 1 wins');
        $('div.winnerTitle').append(`<h3>${powerStats[0].name}</h3>`);

    } else if (hero2Num > hero1Num) {
        console.log('Hero 2 wins');
        $('div.winnerTitle').append(`<h3>${powerStats[1].name}</h3>`);

    } else if (hero1Num === hero2Num) {
        console.log(`It's a tie`);
        $('div.winnerTitle').append(`<h3>Both! It's a tie!</h3>`);
    }
    //maybe make the loser's pic black and white?
}

battleButton.on('click', function () {
    instructionContainer.css('display', 'none');
    flexContainer.css('display', 'none');
    $('.winnerContainer').css('display', 'block');
    $('.test').css('display', 'flex');
    $('main').css('height', '81.2vh');
    whoIsWinner();
    battleButton.css('display', 'none');
    resetButton.css('display', 'block');
})

resetButton.on('click', function () {

    $('.result1').children().remove();
    $('.result2').children().remove();
    $('.test').css('display', 'none');
    $('.winnerContainer').children().remove();
    instructionContainer.css('display', 'block');
    flexContainer.css('display', 'flex');
    battleButton.css('display', 'flex');
    resetButton.css('display', 'none');
    //https://stackoverflow.com/questions/10502093/how-to-reset-a-select-element-with-jquery
    superhero1.prop('selectedIndex', 0);
    superhero2.prop('selectedIndex', 0);
    typeOfBattle.prop('selectedIndex', 0);
    //!the last selected options are still on the select element; the problem with that is, if the user only changes one or two of the options, it doesn't work properly. need a hard refresh of the page? or somehow reset the selects? Solved it maybe with .prop
})