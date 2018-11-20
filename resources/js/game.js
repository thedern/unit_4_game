$(document).ready(function() {


    /* ==========================================================================
       Pageload items
       ========================================================================== */

    // parent-scoped variables
    let gemArray = [];
    let playerScore = 0;
    let playerWins = 0;
    let playerLosses = 0;
    let magicNumVal;
    
    // set wins and losses on page load
    $('#playerWins').html(`Wins: <span>${playerWins}<span>`);
    $('#playerWins span').css('color', 'green');

    $('#playerLosses').html(`Losses: <span>${playerLosses}<span>`);
    $('#playerLosses span').css('color', 'red');

    
    // create audio elements on page load
    var imageHover = document.createElement('audio');
    imageHover.setAttribute('src', './resources/sound/zapsplat_multimedia_game_sound_positive_action_tone_018_25077.mp3');

    $('#magicImageGem').on('click', function() {
        imageHover.play();
    });

    var gemClick = document.createElement('audio');
    gemClick.setAttribute('src', './resources/sound/zapsplat_multimedia_game_sound_positive_action_tone_013_25072.mp3');

    var looser = document.createElement('audio');
    looser.setAttribute('src', './resources/sound/little_robot_sound_factory_fantasy_Dragon_Growl_00.mp3');

    var winner = document.createElement('audio');
    winner.setAttribute('src', './resources/sound/zapsplat_multimedia_male_voice_processed_says_winner_001_21568.mp3');


    /* ==========================================================================
       Initalize Game
       ========================================================================== */
    
    
    init();

    function init() {

        // set/rest current score to 0
        playerScore = 0;
        $('#currentScore').text(playerScore);
        $('#currentScore').css('font-size', '40px');
        $('#currentScore').css('color', 'blue');
        $('#magicNumber').text('Magic Number:');

        // crystal numbers are generated between 1 - 12, return to gemArray
        function randGem () {
            return Math.floor(Math.random() * 12) + 1;
        }

        // magic number generated between 19 - 120, display on screen
        function randMagicNum (min, max) {
            magicNumVal = Math.floor(Math.random() * (max - min)) + min;
            $('#magicNumber').append(`<p>${magicNumVal}</p>`);
            $('#magicNumber p').css('font-size', '120px');
            $('#magicNumber p').css('color', 'red');
        }
    
        // generate random number for gems and populate gemArray
        for (let g = 0; g < 3; g++) {
            gemArray.push(randGem());
        }
        
        // generate random magic number
        randMagicNum(19, 120);
    }


    /* ==========================================================================
       Game Play - Gem Indexes: 0 = red; 1 = purple; 2 = gold
       ========================================================================== */
    
    // function to update score based on gem value
    function scoreUpdate(gemVal) {
    // delay to try to synchronize the sound and score update
        setTimeout (function(){
            playerScore += gemVal;
            // update the score after each click
            $('#currentScore').text(playerScore);
            // play sound after score update
            gemClick.play();
            // check score agains magic number
            if (playerScore > magicNumVal ) {
                $('#magicNumber').append('<img src="resources/img/cat.jpg" />');
                $('#magicNumber').append('<p><span>Photo by Sophie Dale on Unsplash</span></p>');
                $('#magicNumber span').css('font-size', '12px');
                
                looser.play();
                playerLosses += 1;
                $('#playerLosses').html(`Losses: <span>${playerLosses}<span>`);
                $('#playerLosses span').css('color', 'red');
                // delay for roar and looser image, else resets too fast
                setTimeout(init, 3000);
           
            } else if (playerScore === magicNumVal ) {
                winner.play();
                playerWins += 1;
                $('#playerWins').html(`Wins: <span>${playerWins}<span>`);
                $('#playerWins span').css('color', 'green');
                $('#magicNumber').append('<p><span>WINNNER!!</span></p>');
                $('#magicNumber span').css('color', 'gold');
                // delay winner and winner image, else resets too fast
                setTimeout(init, 3000);
            }   
        }, 1500);
    }

    $('#redGem').on('click', function (){
        scoreUpdate(gemArray[0]);
    });

    $('#purpleGem').on('click', function (){
        scoreUpdate(gemArray[1]);
    });

    $('#goldGem').on('click', function (){
        scoreUpdate(gemArray[2]);
    });

});
