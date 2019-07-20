//get it started 
$(document).ready(function(){
// set the array of string for the different games
var games= ["Final Fantasy", "Elder Scrolls", "Fallout", "Super Mario", "Dark Souls", "Fire Emblem", "Castlevania"];
// work out a function that displays the gif buttons 
function createButtons(){
    //clears this
        $("#GameButtons").empty();
    // creating the for loot for the array above
        for(var i = 0; i < games.length; i++)
        var gamebtn = $("<button>");
     // Adding a class
     gamebtn.addClass("game");
     gamebtn.addClass("btn btn-primary");
     // Adding a data-attribute with a value of the game at index i
     gamebtn.attr("data-name", games[i]);
    // adding the .text to games array
     gamebtn.text(games[i]);   
     // Adding the button to the HTML
     $("#GameButtons").append(gamebtn);     
     }

//Add the function for adding a new button 
function addnewBttn(){
    //adds the on click function to the id addGif
    $("#addGif").on("click", function(){
        var newgame= $("#game-input").val().trim()
    // making sure if nothing is there return as false 
    if (newgame== ""){
        return false;
    }
    games.push(newgame);
    displayGifBttns();
    return false;
    });
    }
    //last gif to be removed from the display function 
    function removeBttn(){
        $("removeGif").on("click", function(){
            games.pop(newgame);
            createButtons();
            return false;
        });
    }
    // create the function to display Gifs 
    function showGif(){
        var game = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=Ev1KYAtk15ulvyrOPWrj3K1YzTLtD2OA&limit=10";
        
    // Create the ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // responce for gifs 
    .done(function(responce){
        $("#gifsView").empty();
        var results = responce.data;
    //create the for loop 
    for (var i=0; i<results.length; i++){
    // create the div for the var 
        var gifDiv= $("<div>");
        gifDiv.addClass("gifDiv")
    //adding the rating to the to the div 
    // add a p tag for the text
    var Rated= $("<p>").text("Rating: " + results[i].rating);
    gifDiv.append(Rated);
    // grabbing the gif
    // set this var to img tag
    var gifImage= $("<img>");
    // set all attr to play/animate/stop
    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
    gifImage.attr("data-animate", results[i].images.fixed_height_small_still.url);
    gifImage.attr("data-state", "still");
    
    // add the image class to gifImages
    
    gifImage.addClass("image");
    gifDiv.append(gifImage);
    $("#gifsView").prepend(gifDiv);
    }
    });
    }
    //don't forget at the end call every function so it works 
    createButtons();
    addnewBttn();
    removeBttn();
    
    //document 
    $(document).on("click", ".game", showGif);
    $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    // if and else statements 
    if (state == 'still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
      }
    });
    });
    
    
    