document.addEventListener("DOMContentLoaded", function() {
  /***************************************
          CONSTANTS & VARIABLES
  ****************************************/
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")
  const goodDogFilter = document.querySelector("#good-dog-filter")
  let dogs = []
  let goodDogs = []
  let dogFilter = false
  // console.log(goodDogFilter);


  /***************************************
              FETCH REQUESTS
  ****************************************/
  // grabbing all the dogs from the database
  // rendering the dog name
  fetch("http://localhost:3000/pups")
  .then(response => response.json())
  .then(res => {
    dogs = res
    dogs.forEach( dog => {
      dogBar.innerHTML += `<span data-id=${dog.id} data-action="select">${dog.name}</span>`
    })
  })

  /***************************************
              EVENT LISTENERS
  ****************************************/
  // renders the dog that is selected
  dogBar.addEventListener("click", function(event) {
    if (event.target.dataset.action === "select") {
      showDog(event.target.dataset.id)
    }
  })

  // changes the "good dog" status
  dogInfo.addEventListener("click", function(event) {
    if (event.target.dataset.action === "good-dog") {
      changeGoodDog(event.target.dataset.id)
      // console.log(event.target);
    }
  })

  goodDogFilter.addEventListener("click", function(event) {
    if (dogFilter == false) {
      this.innerText = "Filter good dogs: ON"
      dogFilter = true
    } else {
      this.innerText = "Filter good dogs: OFF"
      dogFilter = false
    }
    filterDogs()
  })


  /***************************************
              HELPER FUNCTIONS
  ****************************************/
  function showDog(id) {
    let dog = dogs.find(dog => {
      return dog.id == id
    })

    let goodDog = "Good Dog!"
    if (dog.isGoodDog == false) {
      goodDog = "Bad Dog!"
    }

    dogInfo.innerHTML = `
      <img src="${dog.image}">
      <h2>${dog.name}</h2>
      <button data-id="${dog.id}" data-action="good-dog">${goodDog}</button>`
  }

  function changeGoodDog(id) {
    let dog = dogs.find(dog => {
      return dog.id == id
    })

    dog.isGoodDog = !dog.isGoodDog

    fetch(`http://localhost:3000/pups/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then( response => response.json())
    .then( res => {
      dogInfo.innerHTML = ""
      showDog(res.id)
      filterDogs()
    })
  }

  function filterDogs() {
    dogBar.innerHTML = ""

    if (dogFilter == true) {
      let goodDogs = dogs.filter(function(dog) {
        return dog.isGoodDog === true
      })
      goodDogs.forEach( d => {
        dogBar.innerHTML += `<span data-id=${d.id} data-action="select">${d.name}</span>`
      })
    } else {
      dogs.forEach( d => {
        dogBar.innerHTML += `<span data-id=${d.id} data-action="select">${d.name}</span>`
      })
    }

  }

}) // end of DOMContentLoaded
