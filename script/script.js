window.onload = function()
{
	generatePokemon("numberSubmit1", "numberInput1", "pokemonData1");
	generatePokemon("numberSubmit2", "numberInput2", "pokemonData2");
	generatePokemon("numberSubmit3", "numberInput3", "pokemonData3");
	generatePokemon("numberSubmit4", "numberInput4", "pokemonData4");
	generatePokemon("numberSubmit5", "numberInput5", "pokemonData5");
	generatePokemon("numberSubmit6", "numberInput6", "pokemonData6");
	generatePokemon("numberSubmit7", "numberInput7", "pokemonData7");
	generatePokemon("numberSubmit8", "numberInput8", "pokemonData8");
	generatePokemon("numberSubmit9", "numberInput9", "pokemonData9");
	generatePokemon("numberSubmit10", "numberInput10", "pokemonData10");
	generatePokemon("numberSubmit11", "numberInput11", "pokemonData11");
	generatePokemon("rivalSubmit1", "rivalInput1", "rivalData1");
	generatePokemon("rivalSubmit2", "rivalInput2", "rivalData2");
	generatePokemon("rivalSubmit3", "rivalInput3", "rivalData3");
	generatePokemon("rivalSubmit4", "rivalInput4", "rivalData4");
	generatePokemon("rivalSubmit5", "rivalInput5", "rivalData5");
	generatePokemon("rivalSubmit6", "rivalInput6", "rivalData6");
	generatePokemon("rivalSubmit7", "rivalInput7", "rivalData7");
	generatePokemon("rivalSubmit8", "rivalInput8", "rivalData8");
	generatePokemon("rivalSubmit9", "rivalInput9", "rivalData9");
	generatePokemon("rivalSubmit10", "rivalInput10", "rivalData10");
	generatePokemon("rivalSubmit11", "rivalInput11", "rivalData11");
}

function generatePokemon(submitID, inputID, pokemonData)
{
	document.getElementById(submitID).addEventListener("click", function(event)
	{
		event.preventDefault();
		const value = document.getElementById(inputID).value.toLowerCase();
		console.log(value);
		const url = "https://pokeapi.co/api/v2/pokemon/" + value;
		fetch(url)
			.then(function(response)
			{
				return response.json();
			})
			.then(function(json)
			{
				console.log(json);
				var results = "";
				results += "<h2>" + json.species.name + "</h2>";
				results += "<img src = " + json.sprites.front_default + "><h4>Type:<br>";
				for (var i = 0; i < json.types.length; i++)
				{
					results += json.types[i].type.name;
					if (i !== json.types.length - 1)
					{
						results+="/";
					}
				}
				results += "";
				results += "<br>Speed:<br>" + json.stats[0].base_stat;
				results += "<br>Entry hazards:";
				var canUseEntryHazards = false;
				var canUseStealthRock = false;
				var canUseStickyWeb = false;
				var canUseSpikes = false;
				var canUseToxicSpikes = false;
				for (var i = 0; i < json.moves.length; i++)
				{
					if (json.moves[i].move.name === "stealth-rock")
					{
						canUseEntryHazards = true;
						canUseStealthRock = true;
					}
					if (json.moves[i].move.name === "sticky-web")
					{
						canUseEntryHazards = true;
						canUseStickyWeb = true;
					}
					if (json.moves[i].move.name === "spikes")
					{
						canUseEntryHazards = true;
						canUseSpikes = true;
					}
					if (json.moves[i].move.name === "toxic-spikes")
					{
						canUseEntryHazards = true;
						canUseToxicSpikes = true;
					}
				}
				if (canUseEntryHazards === true || json.species.name === "roserade" || json.species.name === "masquerain")
				{
					if (canUseStealthRock)
					{
						results += "<br>-stealth rock";
					}
					if (canUseStickyWeb || json.species.name === "masquerain")
					{
						results += "<br>-sticky web";
					}
					if (canUseSpikes)
					{
						results += "<br>-spikes";;
					}
					if (canUseToxicSpikes || json.species.name === "roserade")
					{
						results += "<br>-toxic spikes";
					}
				}
				else
				{
					results += " <br>-None";
				}
				results += "<br>Hazard Removal:<br>";
				var canUseDefOrRS = false;
				for (var i = 0; i < json.moves.length; i++)
				{
					if (json.moves[i].move.name === "rapid-spin")
					{
						canUseDefOrRS = true;
					}
					if (json.moves[i].move.name === "defog")
					{
						canUseDefOrRS = true;
					}
				}
				if (canUseDefOrRS === true)
				{
					results += " -Yes</h4>";
				}
				else
				{
					results += " -No</h4>";
				}
				if (json.species.name === "leavanny")
				{
					results+="<h4>Don't pick it.<br>It sucks.</h4>";
				}

				document.getElementById(pokemonData).innerHTML = results;
			}).
			catch(function()
			{
				document.getElementById(pokemonData).innerHTML = "Pokemon not found.";
			});
	})
}