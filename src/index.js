dogBar = document.querySelector('#dog-bar')
dogBar.addEventListener('click', showPupInfo)
dogInfo = document.querySelector('#dog-info')
dogInfo.addEventListener('click', displayGoodBadDog)
dogFilter = document.querySelector('#filter-div')
dogFilter.addEventListener('click', updateFilter)

document.addEventListener("DOMContentLoaded", function(e) {
  fetchDogs();
})

function fetchDogs(){
fetch('http:localhost:3000/pups')
  .then (function(response) {
    return response.json();
  })
  .then(function(myJson) {
    dogs = myJson
    showDogs(dogs)
  })
}

function showDogs(array){
    dogBar = document.querySelector('#dog-bar')
    dogBar.innerHTML = ""
    array.forEach(function(e){
      dogBar.innerHTML += `<span data-id=${e.id}>${e.name}</span>`
    })
  }

function showPupInfo(e){
    dogInfo = document.querySelector('#dog-info')
    e.preventDefault()
    if (e.target){
      let dog = dogs.find(d => d.id == e.target.dataset.id)
      dogInfo.innerHTML = `<img src=${dog.image}>
      <br><h2>${dog.name}</h2>`
      if (dog.isGoodDog == true) {
        dogInfo.innerHTML += `<button data-action="true" data-id=${dog.id}> Good Dog! </button>`
      }
      else {
        dogInfo.innerHTML += `<button data-action="" data-id=${dog.id}> Bad Dog! </button>`
      }
    }
  }

function displayGoodBadDog(e){
    dogInfo = document.querySelector('#dog-info')
    if (e.target.dataset.action == ""){
      dogInfo.querySelector('button').innerText = "Good Dog!"
      dogInfo.querySelector('button').dataset.action = "true"
    }
    else if (e.target.dataset.action == "true") {
      dogInfo.querySelector('button').innerText = "Bad Dog!"
      dogInfo.querySelector('button').dataset.action = ""
    }
    updateGoodBadData();
  }

function updateGoodBadData(){
  let id = dogInfo.querySelector('button').dataset.id
  let name = dogInfo.querySelector('h2').innerText
  let isGoodDog = Boolean(dogInfo.querySelector('button').dataset.action)
  let image = dogInfo.querySelector('img').src
  let data = {
    id: id,
    name: name,
    isGoodDog: isGoodDog,
    image: image
  }
  fetch(`http:localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
    })
    .then(function(response){
      return response.json()
    })
    .then(function(res){
      // dogs = dogs.map((dog => dog.id == res.id))
      dog = dogs.find(dog => dog.id == res.id)
      dog.isGoodDog = res.isGoodDog
    })
  }

function updateFilter(e){
  e.preventDefault();
  if (e.target.innerText.includes('OFF')){
    e.target.innerText = "Filter good dogs: ON"
    goodDogs = dogs.filter(dog => dog.isGoodDog == true)
    showDogs(goodDogs)
  } else {
    e.target.innerText = "Filter good dogs: OFF"
    showDogs(dogs)
  }
}
