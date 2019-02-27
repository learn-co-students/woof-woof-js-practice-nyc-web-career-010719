let allDogs = [];
let goodDogs = allDogs;
const dogBar = document.querySelector("#dog-bar");
const dogDiv = document.querySelector("#dog-info");
const filter = document.querySelector("#good-dog-filter");

dogBar.addEventListener("click", e => {
  let favDog = allDogs.find(dog => {
    return dog.name === e.target.innerText;
  });
  renderDogToCenter(favDog);
});

dogDiv.addEventListener("click", e => {
  if (e.target.id === "dog-button") {
    let goodBadDog = allDogs.find(dog => {
      return dog.name === dogDiv.querySelector("#dog-name").innerText;
    });

    toggleDog(goodBadDog);
  };
});

filter.addEventListener("click", e => {
  banishBadDogs();
});

function fetchAllDogs() {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {
      allDogs = dogs;
      renderDogsToBar(allDogs);
    });
};

function renderDogsToBar(dogs) {
  dogs.forEach(dog => {
    dogBar.innerHTML += `
    <span>${dog.name}</span>
    `;
  });
};

function renderDogToCenter(dog) {
  dogDiv.innerHTML = ``;

  let dogButtonText;

  if (dog.isGoodDog === true) {
    dogButtonText = "Bad Dog!"
  } else {
    dogButtonText = "Good Dog!"
  };

  dogDiv.innerHTML = `
    <img src=${dog.image}>
    <h2 id="dog-name">${dog.name}</h2>
    <p>Is good dog?</p>
    <p id="is-good">${dog.isGoodDog}</p>
    <button id="dog-button">${dogButtonText}</button>
  `;
};

function toggleDog(dog) {
  let data;

  if (dog.isGoodDog === true) {
    data = {isGoodDog: false};
  } else {
    data = {isGoodDog: true};
  };

  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(resp => resp.json())
    .then(doggo => {
      let thisDog = allDogs.find(pup => {
        return pup.id === doggo.id;
      });
      thisDog.isGoodDog = doggo.isGoodDog;
    })
    .then(updateDisplay)
};

function updateDisplay() {
  let dogButton = dogDiv.querySelector("#dog-button");
  let isGood = dogDiv.querySelector("#is-good");

  if (dogButton.innerText === "Good Dog!") {
    dogButton.innerText = "Bad Dog!"
  } else {
    dogButton.innerText = "Good Dog!"
  };

  if (isGood.innerText === "true") {
    isGood.innerText = "false";
  } else {
    isGood.innerText = "true";
  };
};

function banishBadDogs() {
  if (goodDogs.length === 0 || goodDogs === allDogs) {

  goodDogs = allDogs.filter(dog => {
      return dog.isGoodDog === true;
    });

    dogBar.innerHTML = "";
    renderDogsToBar(goodDogs);
    filter.innerText = "Filter good dogs: ON";
  } else {
    dogBar.innerHTML = "";
    goodDogs = allDogs;
    renderDogsToBar(allDogs);
    filter.innerText = "Filter good dogs: OFF";
  };
};

fetchAllDogs();
