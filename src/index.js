url = 'http://localhost:3000/pups/'
alldogs = []
document.addEventListener("DOMContentLoaded", function(event) {
  fetchToys()
  let dogCard = document.querySelector('#dog-bar')
  let summaryContainer = document.querySelector('#dog-info')
  let filter = document.querySelector('#good-dog-filter')
  dogCard.addEventListener('click', grabDogCard)
  filter.addEventListener('click', flip)
});

function flip(e){
    if (e.target.innerText === "Filter good dogs: ON"){
      document.querySelector('#dog-bar').innerHTML = ''
      alldogs.forEach(renderSingleDogToDom)
      e.target.innerText = "Filter good dogs: OFF"
    }
    else {
      goodDogs = alldogs.filter(function(x){return x.isGoodDog === true})
      document.querySelector('#dog-bar').innerHTML = ''
      goodDogs.forEach(renderSingleDogToDom)
      e.target.innerText = "Filter good dogs: ON"
    }
}
function patchMe(myDog, e){
  fetch(`${url}${myDog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: !myDog.isGoodDog
    })
  })
  .then(resp => resp.json())
  .then(newDog => {
    e.target.innerText = newDog.isGoodDog
    badDataDog = alldogs.find(dog => dog.name === newDog.name)
    badDataDog.isGoodDog = newDog.isGoodDog
  })

}
function grabMyDogForPatch(e){
  dogName = (e.target.previousElementSibling.innerText)
  let myDog = alldogs.find(dog => dog.name === dogName)
  patchMe(myDog, e)
}
function handleButton(button){
  button.addEventListener('click', grabMyDogForPatch)
}
function renderDogInfo(e){

  let summaryContainer = document.querySelector('#dog-info')
  let myDog = alldogs.find(dog => dog.id === parseInt(e.target.dataset.id))
  summaryContainer.innerHTML = `
  <img src=${myDog.image}>
  <h2>${myDog.name}</h2>
  <button>${myDog.isGoodDog}</button>
  `
 button = summaryContainer.querySelector('button')
 handleButton(button)
}
function grabDogCard(e){
  if (e.target.dataset.id){
    renderDogInfo(e)
  }
}
function renderSingleDogToDom(dog){
  let dogBar = document.querySelector('#dog-bar')
  document.querySelector('#dog-bar').innerHTML += `
  <span data-id=${dog.id}>${dog.name}</span>

  `
}
function renderdogsToDom(dogs){
  alldogs = dogs
  dogs.forEach(renderSingleDogToDom)
}
function fetchToys(){
  fetch(url)
  .then(function(resp){
    return resp.json();
  })
  .then(dogs => renderdogsToDom(dogs))
}
