
const dogsUrl = "http://localhost:3000/pups"
let allDogs = []
const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const filterBtn = document.querySelector("#good-dog-filter")

document.addEventListener("DOMContentLoaded", function(event) {

  fetchDogs()
})

dogBar.addEventListener("click", function(e){
  dogId = e.target.dataset.id
  allDogs.forEach(function(dog){
    if (dog.id === parseInt(dogId)){
      handleShowDog(dog)
    }
  })
})

dogInfo.addEventListener("click", function(e){
  if(e.target.dataset.action === "good"){
    let dogId = e.target.dataset.id
    if(e.target.innerText === "true"){e.target.innerText = "false"}
    else{e.target.innerText = "true"}
    let div = e.target
    fetch(`${dogsUrl}/${parseInt(dogId)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: `${e.target.innerText}`
      })
    })
    .then(r => r.json())
    .then(function(updatedDog){
      console.log(allDogs)
      allDogs = allDogs.map(function(dog){
        if(dog.id === parseInt(dogId)){
          // debugger
          return updatedDog
        }
        else {return dog}
      })
      console.log(allDogs)
    })
  }
})

filterBtn.addEventListener("click", function(e){
  let goodDogs = []
  goodDogs = allDogs.filter(function (dog){
    return dog.isGoodDog == "true"
  })
  // debugger

  // debugger
  if(event.target.innerText === "Filter good dogs: OFF"){
    event.target.innerText = "Filter good dogs: ON"
    dogBar.innerHTML = ""
    renderAllDogs(goodDogs)
  }
  else {
    event.target.innerText = "Filter good dogs: OFF"
    dogBar.innerHTML = ""
    renderAllDogs(allDogs)
  }



})

function fetchDog(){
  // debugger
  fetch(`${dogsUrl}/${parseInt(dogId)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      isGoodDog: `${div.innerText}`
    })
  })
  .then(r => r.json())
  .then(dog => console.log(dog))
}

function fetchDogs(){
  fetch(dogsUrl)
  .then(r => r.json())
  .then(function(dogs){
    allDogs = dogs
    // debugger
    // console.log(allDogs)
    renderAllDogs(allDogs)
  })
}

function renderDog(dog){
  // debugger
  // console.log(dogBar.innerHTML)
  dogBar.innerHTML += `
  <span data-id=${dog.id}>${dog.name}</span>
  `
}

function renderAllDogs(dogs){
  dogs.forEach(function(dog){
    renderDog(dog)
  })
}

function handleShowDog(dog){
  dogInfo.innerHTML = `
    <img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-action="good" data-id=${dog.id}>${dog.isGoodDog}</button>
  `}
