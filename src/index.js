allDogs = []
let dogContainer = document.querySelector('#dog-bar')
document.addEventListener("DOMContentLoaded", () => {
  fetchDogs()

  let dogBar = document.querySelector('#dog-bar')
  dogBar.addEventListener("click", function(e) {
    if (e.target.id === "doggo") {
      fetchDog(e.target.innerHTML)
    }
  })

  let dogSummary = document.querySelector('#dog-summary-container')
  dogSummary.addEventListener("click", function(e) {
    if (e.target.id === "dogStatus") {
      let dog = allDogs.find(dog => dog.name === e.target.dataset.name)
      let targetDog = e.target.parentElement.querySelector('#dogStatus')
      if (targetDog.innerHTML === "Good Dog!") {
        dogStatus = "Bad Dog!"
      } else (
        dogStatus = "Good Dog!"
      )
      targetDog.innerHTML = ""
      targetDog.innerHTML = dogStatus
      updateDogStatusDb(dog.id, dog.isGoodDog)
    }
  })

  let filterDiv = document.querySelector('#good-dog-filter')
  filterDiv.addEventListener("click", filterDogs)

}) //DOMContentLoaded

function filterDogs(e) {
  let filteredDogs = []
  let dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ""
  if (e.target.innerText == 'Filter good dogs: OFF') {
    e.target.innerText = "Filter good dogs: ON"

    filteredDogs = allDogs.filter(dog => dog.isGoodDog === true)
    console.log(filteredDogs)
    for (var dog in filteredDogs) {
      console.log(dog)
      dogBar.innerHTML += `
      <span id="doggo">${filteredDogs[dog].name}</span>`
    }
  } else {
    dogBar.innerHTML = ""
    e.target.innerText = "Filter good dogs: OFF"
    fetchDogs()
  }
}

function updateDogStatusDb(dogId, dogStatus) {
  fetch(`http://localhost:3000/pups/${dogId}`, {
  method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({isGoodDog: !dogStatus})
  })
  .then(response => response.json())
  .then(function(updatedDog) {
    allDogs = allDogs.map(d => {
      if (d.id == updatedDog.id) {
        return updatedDog
      } else {
        return d
      }
    })
  })
}

function fetchDogs() {
  let dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ""
  fetch('http://localhost:3000/pups')
    .then(dogs => dogs.json())
    .then(function(parsed) {
      allDogs = parsed
      for (var dog in parsed) {
        dogBar.innerHTML += `
        <span id="doggo">${parsed[dog].name}</span>`
      }
    })
}

function fetchDog(dogName) {
  let dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ""
  fetch(' http://localhost:3000/pups')
    .then(dogs => dogs.json())
    .then(function(parsed) {
      for (var dog in parsed) {
        let dogStatus = ""
        if (parsed[dog].isGoodDog === true) {
          dogStatus = "Good Dog!"
        } else (
          dogStatus = "Bad Dog!"
        )
        if (parsed[dog].name === dogName)
        dogInfo.innerHTML = `
        <img src=${parsed[dog].image}>
        <h2>${parsed[dog].name}</h2>
        <button data-name="${parsed[dog].name}" id="dogStatus">${dogStatus}</button>`
      }
    })
}
