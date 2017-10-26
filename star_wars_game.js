$(document).ready(function() {


	var characterObj = {


		characterList: 
		[
		{
			name: 'Luke Skywalker',
			image: 'Images/Luke.jpg',
			health: 120,
			attack: 120,
			counterAttack: 1,
			healthId: "lukeHealth",
			id: 'lukeContainer'
		},
		{
			name: 'Darth Vader',
			image: 'Images/DarthVader.jpg',
			health: 120,
			attack: 1,
			counterAttack: 1,
			healthId: "vaderHealth",
			id: 'vaderContainer'
		},
		{
			name: 'Sith Lord',
			image: 'Images/SithLord.jpg',
			health: 130,
			attack: 1,
			counterAttack: 2,
			healthId: "lordHealth",
			id: 'lordContainer'
		},
		{
			name: 'Chewbacca',
			image: 'Images/Chewy.jpg',
			health: 120,
			attack: 1,
			counterAttack: 3,
			healthId: "chewyHealth",
			id: 'chewyContainer'
		}
		],

			attacking: false,
			yourCharacter: null,
			oppenents: null,	
			defender: null,
		};

    $.each(characterObj.characterList, function(number, character){

       var imageContainer = $("<div class='imageContainer col-lg-2 col-md-2 col-xs-3' id=" + character.id + ">" + "<h5 class='characterName'>" + character.name + "</h5>" + "<img class='characterImg' src=" + character.image + " alt='Character Images'"  + ">" + "<h5 class='characterHealth id='" + character.healthId + "'>" + character.health +  "</h5>" + "</div>");

       $("#charSelCont").append(imageContainer)

  	});

	

    $('.imageContainer').on('click', function() {

    	var attackingCharacter = $("#attackerContainer").find($(".characterName")).text()
    	var clickedCharacter = $(this).find($(".characterName")).text()
    	var	characterSelection = $(this)

     	if (characterObj.yourCharacter === null) {

	  	    characterObj.yourCharacter = $(this);
	  	    characterSelection = $(this)

	    	$("#attackerContainer").append(characterObj.yourCharacter);
	    	$("#charSelHead").remove();

	    	characterObj.oppenents = $("#charSelCont")

	    	$("#enemyContainer").append(characterObj.oppenents)

		} else if (characterObj.defender === null && clickedCharacter !== attackingCharacter) {


			characterObj.defender = $(this)

			$("#defenderContainer").append(characterObj.defender)

			characterObj.oppenents = $("#charSelCont")

	    	$("#enemyContainer").append(characterObj.oppenents)	

	    	var attackButton = $("#attackButton")

			$("#fightSection").append("<div class=row>")
			$("#fightSection").append("<br>")
			$("#fightSection").append(attackButton)


	   		$('#attackButton').on('click', function(event) {

	    		//Pulling Attackers Attack Power and Counter Attack Power
	    		var attackingCharacter = $("#attackerContainer").find($(".characterName")).text()
	    		var attackingPower = characterObj.characterList.find(o => o.name === attackingCharacter).attack
	    		var attackingHealth = characterObj.characterList.find(o => o.name === attackingCharacter).health
	    	
	    		var defendingCharacter = $("#defenderContainer").find($(".characterName")).text()
				var counterAttackPower = characterObj.characterList.find(o => o.name === defendingCharacter).counterAttack
				var defendingHealth = characterObj.characterList.find(o => o.name === defendingCharacter).health

				console.log(defendingCharacter)
				console.log(counterAttackPower)
				console.log(defendingHealth)


				attackingHealth = attackingHealth - counterAttackPower;	
				defendingHealth = defendingHealth - attackingPower;

				if (attackingHealth === 0) {

					alert("Game over! Your health reached Zero!!")

					window.location.reload();

				} else if (defendingHealth <= 0) {

					characterObj.defender.replaceWith(null)
					characterObj.defender = null;

				} else {

				    for (var i in characterObj.characterList) {

					    if (characterObj.characterList[i].name === attackingCharacter ) {

				     		characterObj.characterList[i].health = attackingHealth

				    	};

				    	if (characterObj.characterList[i].name === defendingCharacter ) {

				     		characterObj.characterList[i].health = defendingHealth

				    	};
				    };
				}; 		

				  	$("#defenderContainer").find($(".characterHealth")).text(defendingHealth)
				  	$("#attackerContainer").find($(".characterHealth")).text(attackingHealth)
	        });
		};

	});

});


