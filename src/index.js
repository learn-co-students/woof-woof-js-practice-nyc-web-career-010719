const dogsURL = "http://localhost:3000/pups"
let dogBar = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')
let filterDiv = document.querySelector('#filter-div')

document.addEventListener('DOMContentLoaded', () => {
  console.log("dom loaded")
})

fetchDogs()

dogBar.addEventListener("click", e => {
if (e.target.className == 'span') {
   fetch(`http://localhost:3000/pups/${e.target.dataset.id}`)
 .then (resp =>resp.json())
 .then (dog => renderDogSpan(dog))
}})
dogInfo.addEventListener("click", e => {
  let newStatus
  let status = dogInfo.lastElementChild.innerText
  if (e.target.dataset.action === "statusBtn") {
  if (status === "Good Dog!") {
    newStatus = false
    dogInfo.lastElementChild.innerText = "Bad Dog!"
  } else if (status === "Bad Dog!") {
    newStatus = true
    dogInfo.lastElementChild.innerText = "Good Dog!"
  }
    fetch(`http://localhost:3000/pups/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: newStatus
      })
    }
)  .then(resp => resp.json())
  .then(dog => renderDogSpan(dog))
}})
filterDiv.addEventListener("click", e => {
  if (e.target.id === "good-dog-filter") {
    filterText(e)
  }
})

function fetchDogs() {
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
}
function renderDogs(dogs) {
  dogs.forEach(renderSingleDog)
}
function renderSingleDog(dog) {
  dogBar.innerHTML += `
    <span class="span" data-id=${dog.id}>${dog.name}</span>
  `
}
function renderDogSpan(dog) {
  let status
  (dog.isGoodDog) ? status = "Good Dog!" : status = "Bad Dog!"
  dogInfo.innerHTML = ""
  dogInfo.innerHTML += `
  <img src=${dog.image}>
  <h2>${dog.name}</h2>
  <button data-id=${dog.id} data-action="statusBtn">${status}</button>
  `
}
function filterText(e) {
  console.log(e.target)
  if (e.target.innerText === "Filter good dogs: ON") {
  e.target.innerText = "Filter good dogs: OFF"
  dogBar.innerHTML = ""
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => renderDogs(dogs))
} else if (e.target.innerText === "Filter good dogs: OFF") {
  e.target.innerText = "Filter good dogs: ON"
  dogBar.innerHTML = ""
  fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => showGoodDogs(dogs))
  }
}
function showGoodDogs(dogs) {
  goodDogs = dogs.filter(dog => dog.isGoodDog == true)
  renderDogs(goodDogs)
}
