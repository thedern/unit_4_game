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

    var looserVoice = document.createElement('audio');
    looserVoice.setAttribute('src', './resources/sound/zapsplat_cartoon_voice_high_pitched_says_loser_15656.mp3');

    var winner = document.createElement('audio');
    winner.setAttribute('src', './resources/sound/zapsplat_multimedia_male_voice_processed_says_winner_001_21568.mp3');


    /* ==========================================================================
       Initalize Game
       ========================================================================== */
    
    
    init();

    function init() {

        // set/reset current score to 0
        playerScore = 0;
        $('#currentScore').text(playerScore);
        $('#currentScore').css('font-size', '40px');
        $('#currentScore').css('color', 'blue');
        $('#magicNumber').text('Magic Number:');

        // gem numbers are generated between 1 - 12, return to gemArray
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
    
        // generate random number for gems and populate gemArray (4 gems)
        for (let g = 0; g < 4; g++) {
            gemArray.push(randGem());
        }
        
        // generate random magic number as game target number
        randMagicNum(19, 120);
    }


    /* ==========================================================================
       Game Play - Gem Indexes: 0 = red; 1 = purple; 2 = gold; 3 = pink
       ========================================================================== */
    
    // function to update score based on gem value
    function scoreUpdate(gemVal) {
        
        playerScore += gemVal;
        // update the score after each click
        $('#currentScore').text(playerScore);
        
        // check score against magic number, looser scenario
        if (playerScore > magicNumVal ) {
            $('#magicNumber').append('<img src="resources/img/cat.jpg" />');
            $('#magicNumber').append('<p><span>Photo by Sophie Dale on Unsplash</span></p>');
            $('#magicNumber span').css('font-size', '12px');
            
            // shame the player
            looser.play();
            looserVoice.play();
            playerLosses += 1;

            $('#playerLosses').html(`Losses: <span>${playerLosses}<span>`);
            $('#playerLosses span').css('color', 'red');
            // delay for roar and looser image, else game resets too fast
            setTimeout(init, 5000);
        
        // check score against magic number, winner scenario
        } else if (playerScore === magicNumVal ) {
            winner.play();
            playerWins += 1;
            $('#playerWins').html(`Wins: <span>${playerWins}<span>`);
            $('#playerWins span').css('color', 'green');
            $('#magicNumber').append('<p><span>WINNNER!!</span></p>');
            $('#magicNumber span').css('color', 'gold');
            // delay winner and winner image, else game resets too fast
            setTimeout(init, 3000);
        }   
    
    }

    // click events for score updates, calls scoreUpdate function to update score
    
    $('#redGem').on('click', function (){
        // play sound after score update
        gemClick.play();
        // 2 second delay added to try to synchronize the sound and score update
        setTimeout (function(){ scoreUpdate(gemArray[0])}, 2000);
        
    });

    $('#purpleGem').on('click', function (){
        // play sound after score update
        gemClick.play();
        // 2 second delay added to try to synchronize the sound and score update
        setTimeout (function(){ scoreUpdate(gemArray[1])}, 2000);
    });

    $('#goldGem').on('click', function (){
        // play sound after score update
        gemClick.play();
        // 2 second delay added to try to synchronize the sound and score update
        setTimeout (function(){ scoreUpdate(gemArray[2])}, 2000);
    });

    $('#pinkGem').on('click', function (){
        // play sound after score update
        gemClick.play();
        // 2 second delay added to try to synchronize the sound and score update
        setTimeout (function(){ scoreUpdate(gemArray[3])}, 2000);
    });

});
