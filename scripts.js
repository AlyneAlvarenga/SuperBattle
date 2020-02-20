const superHeroApp = {};


superHeroApp.superhero1 = $('#superhero1');
superHeroApp.superhero2 = $('#superhero2');
superHeroApp.typeOfBattle = $('#battleCondition');

superHeroApp.battleButton = $('.battleButton');
superHeroApp.resetButton = $('.resetButton');

//to disappear
superHeroApp.instructionContainer = $('.instructionContainer');
superHeroApp.flexContainer = $('.flexContainer'); //all three selects

superHeroApp.userSelection1 = '';
superHeroApp.userSelection2 = '';
superHeroApp.userSelection3 = '';

superHeroApp.powerStats = [
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

superHeroApp.player1 = function(){
superHeroApp.superhero1.on('change', function () {
    superHeroApp.userSelection1 = superHeroApp.superhero1.val();

    $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: `https://superheroapi.com/api/2827401063977440/${superHeroApp.userSelection1}`
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
        superHeroApp.powerStats[0].name = result.name;
        superHeroApp.powerStats[0].intelligence = result.powerstats.intelligence;
        superHeroApp.powerStats[0].speed = result.powerstats.speed;
        superHeroApp.powerStats[0].combat = result.powerstats.combat;
        })
    })
}

superHeroApp.player2 = function(){
    superHeroApp.superhero2.on('change', function () {
        superHeroApp.userSelection2 = superHeroApp.superhero2.val();

        $.ajax({
            url: 'http://proxy.hackeryou.com',
            method: 'GET',
            dataType: 'json',
            data: {
                reqUrl: `https://superheroapi.com/api/2827401063977440/${superHeroApp.userSelection2}`
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
            superHeroApp.powerStats[1].name = result.name;
            superHeroApp.powerStats[1].intelligence = result.powerstats.intelligence;
            superHeroApp.powerStats[1].speed = result.powerstats.speed;
            superHeroApp.powerStats[1].combat = result.powerstats.combat;
        })
    })
}

superHeroApp.heroBattle = function(){
    superHeroApp.typeOfBattle.on('change', function () {
    superHeroApp.userSelection3 = superHeroApp.typeOfBattle.val();

    superHeroApp.powerStats[2].selection = superHeroApp.userSelection3;
    })
}
//*code for svg circle https://itnext.io/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript-d0171d1fb6f7


superHeroApp.total = 283;

superHeroApp.calculatePercentage = function(num){
    return num * superHeroApp.total / 100;
}

superHeroApp.drawCircles = function(num1, num2) {

const circleDasharray1 = `${(superHeroApp.calculatePercentage(num1).toFixed(0))} 283`;
    $('.secondCircleHero1').attr('stroke-dasharray', circleDasharray1);
    $('.circleLabelHero1').append(`${num1}%`);

    const circleDasharray2 = `${(superHeroApp.calculatePercentage(num2).toFixed(0))} 283`;
    $('.secondCircleHero2').attr('stroke-dasharray', circleDasharray2);
    $('.circleLabelHero2').append(`${num2}%`);
}

superHeroApp.whoIsWinner = function() {
    const chosenBattle = superHeroApp.powerStats[2].selection;

    //will change which div this appends to, because we want this at the top
    //use .winnerContainer was using .test
    $('.winnerContainer').append(`
    <div class="winnerTitle">
        <p>The winner of the battle of ${chosenBattle} is...<p>
            </div>`)

    const hero1 = superHeroApp.powerStats[0][chosenBattle];
    const hero1Num = parseInt(hero1);

    const hero2 = superHeroApp.powerStats[1][chosenBattle];
    const hero2Num = parseInt(hero2);

    superHeroApp.drawCircles(hero1Num, hero2Num);

    if (hero1Num > hero2Num) {
        console.log('Hero 1 wins');
        $('div.winnerTitle').append(`<h3>${superHeroApp.powerStats[0].name}</h3>`);

    } else if (hero2Num > hero1Num) {
        console.log('Hero 2 wins');
        $('div.winnerTitle').append(`<h3>${superHeroApp.powerStats[1].name}</h3>`);

    } else if (hero1Num === hero2Num) {
        console.log(`It's a tie`);
        $('div.winnerTitle').append(`<h3>Both! It's a tie!</h3>`);
    }
}

superHeroApp.button = function(){
superHeroApp.battleButton.on('click', function () {
    superHeroApp.instructionContainer.css('display', 'none');
    superHeroApp.flexContainer.css('display', 'none');
    $('.winnerContainer').css('display', 'block');
    $('.test').css('display', 'flex');
    $('main').css('height', '81.2vh');
    if ($(window).width() <= 720) {
        $('main').css('min-height', '205vh');
    }

    superHeroApp.whoIsWinner();
    superHeroApp.battleButton.css('display', 'none');
    superHeroApp.resetButton.css('display', 'block');

    
    })
}

superHeroApp.resetButton.on('click', function () {

    $('.result1').children().remove();
    $('.result2').children().remove();
    $('.test').css('display', 'none');
    $('.winnerContainer').children().remove();
    superHeroApp.instructionContainer.css('display', 'block');
    superHeroApp.flexContainer.css('display', 'flex');
    superHeroApp.battleButton.css('display', 'flex');
    superHeroApp.resetButton.css('display', 'none');
    if ($(window).width() <= 720) {
        $('main').css('min-height', '110vh');
    }
    //https://stackoverflow.com/questions/10502093/how-to-reset-a-select-element-with-jquery
    superHeroApp.superhero1.prop('selectedIndex', 0);
    superHeroApp.superhero2.prop('selectedIndex', 0);
    superHeroApp.typeOfBattle.prop('selectedIndex', 0);
    //!the last selected options are still on the select element; the problem with that is, if the user only changes one or two of the options, it doesn't work properly. need a hard refresh of the page? or somehow reset the selects? Solved it maybe with .prop
})

superHeroApp.init = function(){
    this.player1();
    this.player2();
    this.heroBattle();
    this.button();
}


$(function() {
    superHeroApp.init();
});