// Dino constructor 
class Dinos {
	constructor({
		species, weight, height, diet, where, when, fact
	}) {
		this.species = species;
		this.weight = weight;
		this.height = height;
		this.diet = diet;
		this.where = where;
		this.when = when;
		this.fact = fact;
		return this;
	}
}

// Create dino Object
// Using fatch to call dino.json
let dinosaurs = [];
const getDinos = fetch("dino.json").then(function(resp) {
	return resp.json();
}).then(function(data) {
	dinosaurs = data.Dinos.map((dino) => new Dinos(dino));
	console.log(dinosaurs);
});

// Human constructor 
class Humans {
	constructor() {
		this.species = 'human';
		this.name = document.getElementById('name').value;
		this.feet = document.getElementById('feet').value;
		this.inches = document.getElementById('inches').value;
		this.height = (this.feet * 12) + this.inches;
		this.weight = document.getElementById('weight').value;
		this.diet = document.getElementById('diet').value;
		return this;
	}
}


// Human object 
let humanArray = [];

function humanData() {
	humanArray = new Humans();
	console.log(humanArray);
}

// Using splice to make a new array for dino.species and human.name
let dinoArray = [];

function newFactory() {
	dinosaurs.forEach((dinosaurs) => {
		dinoArray.push(dinosaurs.species);
	});
	let humanName = humanArray.name;
	dinoArray.splice(4, 0, humanName);
	console.log(dinoArray);
}

// Create tiles and push the tiles to the grid 
function displayData() {
	const grid = document.querySelector("#grid");
	for(i = 0; i < 9; i++) {
		if(i == 4) {
			grid.innerHTML += `
      <div class="grid-item">
      <h3 class="title">${dinoArray[4]}</h3>
      <img class="Image" src="images/human.png">
      <p class="randomFact${dinoArray[4].replaceAll(" ", "")}"></p>
      </div>
        `;
		} else if(i == 8) {
			grid.innerHTML += `
        <div class="grid-item">
        <h3 class="title">${dinoArray[8]}</h3>
        <img class="Image" src="images/${dinoArray[8].toLowerCase()}.png">
        <p>All birds are living dinosaurs.</p>
        </div>
        `;
		} else {
			grid.innerHTML += `
        <div class="grid-item">
        <h3 class="title">${dinoArray[i]}</h3>
        <img class="Image" src="images/${dinoArray[i].toLowerCase()}.png">
        <p class="randomFact${dinoArray[i].replaceAll(" ", "")}"></p>
        </div>
        `;
		}
	}
}

// Create random facts and methods
function displayFact() {
	dinosaurs.forEach((dinosaurs) => {
		let randomFact = document.querySelector(".randomFact" + dinosaurs.species.replaceAll(" ", ""));
		if(randomFact !== null) {
			
			// Generate method function
			const functionFactory = {
				compareWeight() {
				        if (dinosaurs.weight > humanArray.weight) {
						let weight = dinosaurs.species + ' is ' + (dinosaurs.weight - humanArray.weight) + ' ibs heavier than ' + humanArray.name;
						return weight;
						
					}
				        if (dinosaurs.weight < humanArray.weight) {
					        let weight = dinosaurs.species + ' is ' + (humanArray.weight - dinosaurs.weight) + ' ibs lighter than ' + humanArray.name;
						return weight;
					} 
					return `${dinosarus.species} and ${humanArray.name} have the same weight.`;
				},
				
				compareHeight() {
					if (dinosaurs.height > humanArray.height) {
						let height = dinosaurs.species + ' is ' + (dinosaurs.height - humanArray.height) + ' inches taller than ' + humanArray.name;
						return height;
					}
				        if (dinosaurs.height < humanArray.height) {
						let height = dinosaurs.species + ' is ' + (humanArray.height - dinosaurs.height) + ' inches smaller than ' + humanArray.name;
						return height;
					}
					return `${dinosaurs.species} and ${humanArray.name} have the same height.`;

				},		
				 
				compareDiet() {
					if (dinosaurs.diet && humanArray.diet) {
						let diet = dinosaurs.species + ' and ' +humanArray.name + ' has the same diet. ';
						return diet;
					} 
					else {
		                               return `${dinosaurs.species} and ${humanArray.name} have the different diet.`;
					}	
				},
					origin() {
						let origin = dinosaurs.species + ' lived in ' + dinosaurs.where;
						return origin;
					},
					birthTime() {
						let birthTime = dinosaurs.species + ' lived in the period of ' + dinosaurs.when;
						return birthTime;
					}
			};
			
			// Random facts generator 
			let randomNum = Math.floor(Math.random() * 6);
			switch(randomNum) {
				case 0:
					randomFact.innerHTML = functionFactory.compareWeight();
					break;
				case 1:
					randomFact.innerHTML = functionFactory.compareHeight();
					break;
				case 2:
					randomFact.innerHTML = functionFactory.compareDiet();
					break;
				case 3:
					randomFact.innerHTML = functionFactory.origin();
					break;
				case 4:
					randomFact.innerHTML = functionFactory.birthTime();
					break;
				case 5:
					randomFact.innerHTML = dinosaurs.fact;
			}
		}
	});
}

// hide the form
function formHidden() {
	dinoForm.style.display = 'none';
}

// show the grid
function gridShow() {
	grid.style.visibility = "visible";
}

// Remove form from screen
const compareButton = document.getElementById('btn');
const dinoForm = document.getElementById('dino-compare');

// On button click, prepare and display infographic
compareButton.addEventListener("click", function(e) {
	formHidden();
	gridShow();
	humanData();
	newFactory();
	displayData();
	displayFact();
});
