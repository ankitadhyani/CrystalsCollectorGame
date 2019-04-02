
$(document).ready(function(){

    var $userTotalScore = 0; //Variable which will store the total score of user after selecting a particular image 

    var $wins = 0;
    $("#wins").text($wins);

    var $losses = 0;
    $("#losses").text($losses);

    var $targetNumber = 0; //Creating a variable that stores the max value to be reached

    var isGameRunning = false; //New game start flag 

    var imageCount = 5; //Total count of images added to the game
    var imageValues = []; //Values assigned to each image
    //Creating the images array
    var imageList = [   
        "assets/images/GreenCrystal.jpg",
        "assets/images/OrangeCrystal.jpg",
        "assets/images/PinkCrystal.jpg",
        "assets/images/PurpleCrystal.jpg",
        "assets/images/RedCrystal.jpg"];

    //Function returns a random number between min and max (both included)    
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
    //Function that executes whenever a new game starts
    function startNewGame() {

        //Creating a variable that stores the max value to be reached (value b/w 19 - 120)
        $targetNumber = getRndInteger(19, 120);
        $("#targetNumber").text($targetNumber);

        //Reset user's total score at start of a new game and write it to page
        $userTotalScore = 0;
        $("#userTotalScore").text($userTotalScore);


        isGameRunning = true; //Will be set to true only when new game starts

        imageValues = []; //Reset values w.r.t. each image


        //Generate random number for each of the images b/w 1 - 12 and store them in an array
        for(var i=0 ; i<imageCount ; i++) {

            var num = getRndInteger(1, 12);

            //If random value has already been assigned to another image then loop again to get a different value
            if(imageValues.includes(num)) {
                i--;
                continue; //Continue to next iteration
            }

            imageValues[i] = num;

        } //End of for loop
        console.log("imageValues: " + imageValues);    


        // Next we create a for loop to create crystal images for every imageValues[].
        for (var i = 0; i < imageCount; i++) {

            // For each iteration, we will create an image
            var imageCrystal = $("<img>");

            // First each crystal will be given the class ".crystal-image"
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal imageList[]
            imageCrystal.attr("src", imageList[i]);

            // Each imageCrystal will be given a data attribute called crystalValue.
            // This data attribute will be set equal to the array value imageValues[]
            imageCrystal.attr("crystalvalue", imageValues[i]);

            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);

            console.log("imageCrystal created");
        } //End of for loop

    }//End of startNewGame()


    //Load game for the 1st time
    startNewGame();


    //The game will always start when this button is pressed after 1st load
    $("#startNewGame").on("click", function() { 

        console.log("New game started...");
        $("#crystals").empty();
        startNewGame();
    });
    

    // OnClick event for every image
    $("#crystals").on("click", ".crystal-image",  function() { 

        console.log("In crystal-image onClick() ");

        //If game is finished i.e. isGameRunning=false, do nothing
        if(isGameRunning === false) {
            console.log("isGameRunning = false");
            return;
        }

        //Getting value of crystal based on the image clicked
        var crystalValue = ($(this).attr("crystalvalue"));
        console.log("crystalValue: " + crystalValue);

        $userTotalScore += parseInt(crystalValue);
        $("#userTotalScore").text($userTotalScore);

        
        //If current user's total is greater than target number then user LOOSES
        if($userTotalScore > $targetNumber) {
            $losses++;
            $("#losses").text($losses);
            isGameRunning = false; //game finished
        }

        //If current user's total is equal to target number then user WINS
        else if($userTotalScore === $targetNumber) {
            $wins++;
            $("#wins").text($wins);
            isGameRunning = false; //game finished
        }

        //If current user's total is less than the target number then user continues playing
        else {
            isGameRunning = true; //game continues
        }

    });



});
