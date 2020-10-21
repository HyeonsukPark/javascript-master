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
let dinosarus = [];
const getDinos = fetch("dino.json").then(function(resp) {
	return resp.json();
}).then(function(data) {
	dinosarus = data.Dinos.map((dino) => new Dinos(dino));
	console.log(dinosarus);
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
	dinosarus.forEach((dinosarus) => {
		dinoArray.push(dinosarus.species);
	});
	let humanName = humanArray.name;
	dinoArray.splice(4, 0, humanName);
	console.log(dinoArray);
}

// Create tiles and push the tiles to the grid 
function displayData() {
	//Do a cycle from 1 to 9 and then for each number you assign that position to a random dino. If the number is 5 then you choose human
	const grid = document.querySelector("#grid");
	for(i = 0; i < 9; i++) {
		if(i == 4) {
			grid.innerHTML += `
      <div class="grid-item">
      <h3 class="title">${dinoArray[4]}</h3>
      <img class="Image" src="images/human.png">
      <p class="randomFact${dinoArray[4].replaceAll(" ", "")}s"></p>
      </div>
        `;
		} else if(i == 8) {
			grid.innerHTML += `
        <div class="grid-item">
        <h3 class="title">${dinoArray[8]}</h3>
        <img class="Image" src="images/${dinoArray[8]}.png">
        <p>All birds are living dinosaurs.</p>
        </div>
        `;
		} else {
			grid.innerHTML += `
        <div class="grid-item">
        <h3 class="title">${dinoArray[i]}</h3>
        <img class="Image" src="images/${dinoArray[i]}.png">
        <p class="randomFact${dinoArray[i].replaceAll(" ", "")}"></p>
        </div>
        `;
		}
	}
}

// Create random facts and methods
function displayFact() {
	dinosarus.forEach((dinosarus) => {
		let randomFact = document.querySelector(".randomFact" + dinosarus.species.replaceAll(" ", ""));
		if(randomFact !== null) {
			
			// Generate method function
			const functionFactory = {
				compareWeight() {
						let weight = dinosarus.species + ' is ' + dinosarus.weight + ' ibs. ' + humanArray.name + ' is ' + humanArray.weight + ' ibs.';
						return weight;
					},
					compareHeight() {
						let height = dinosarus.species + ' is ' + dinosarus.height + ' inches. ' + humanArray.name + ' is ' + humanArray.height + ' inches.';
						return height;
					},
					compareDiet() {
						let diet = dinosarus.species + ' is ' + dinosarus.diet + '. ' + humanArray.name + ' is ' + humanArray.diet + '.';
						return diet;
					},
					origin() {
						let origin = dinosarus.species + ' lived in ' + dinosarus.where;
						return origin;
					},
					birthTime() {
						let birthTime = dinosarus.species + ' lived in the period of ' + dinosarus.when;
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
					randomFact.innerHTML = dinosarus.fact;
			}
		}
	});
}

// hide the form
function formHidden() {
	dinoForm.style.visibility = "hidden";
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