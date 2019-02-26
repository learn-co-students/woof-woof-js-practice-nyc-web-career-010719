const filterBtn = document.querySelector('#filter-div')
const dogDiv = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const filterDiv = document.querySelector('#filter-div')
const goodFilterBtn = document.querySelector('#good-dog-filter')
fetchDogs()

dogDiv.addEventListener('click', handleRenderDogInfo)
dogInfoDiv.addEventListener('click', handleGoodBadToggle)
filterDiv.addEventListener('click', handleToggleFilterBtn)

function handleToggleFilterBtn(e){
  if (e.target.innerText === "Filter good dogs: OFF") {
    console.log(e.target)
    const button = e.target
    filterDogs(button)
  } else {
    fetchDogs()
  }

}
function filterDogs(button){
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(function(dogs){
    const goodDogs = []

    dogs.filter(dog=>{
      if (dog.isGoodDog === true) {
        goodDogs.push(dog)
      }
    })
    dogDiv.innerHTML = ""
    goodFilterBtn.innerText = "Filter good dogs: ON"
    renderDogs(goodDogs)
  })
}
function handleGoodBadToggle(e){
  if (e.target.id === 'good-btn') {
    const goodBtn = e.target
    fetchForPatch(goodBtn)
  }
}
function fetchForPatch(goodBtn){
  let id = parseInt(goodBtn.dataset.id)
  let data
  if (goodBtn.innerText === 'Bad Dog!') {
    data = {isGoodDog: true}
  } else {
    data = {isGoodDog: false}
  }
  fetch(`http://localhost:3000/pups/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(dog => renderChangeBtn(dog))
}
function renderChangeBtn(dog){
  const goodBtn = document.querySelector('#good-btn')
  if (dog.isGoodDog === false) {
    goodBtn.innerText = `Bad Dog!`
  } else {
    goodBtn.innerHTML = `Good Dog!`

  }

}
function handleRenderDogInfo(e){
  if (e.target.id === 'dogSpan') {
    let id = e.target.dataset.id
    fetchSpecificDog(id)
  }
}
function renderSpecificDogInfo(dog){
  if (dog.isGoodDog === false) {
    dogInfoDiv.innerHTML = `<h2> ${dog.name} </h2> <img src=${dog.image}> <button data-id="${dog.id}" id="good-btn">Bad Dog!</button>`
  } else {
    dogInfoDiv.innerHTML = `<h2> ${dog.name} </h2> <img src=${dog.image}> <button data-id="${dog.id}" id="good-btn">Good Dog!</button>`
  }

}
function fetchSpecificDog(id){
  fetch(`http://localhost:3000/pups/${id}`)
  .then(response => response.json())
  .then(dog => renderSpecificDogInfo(dog))
}
function fetchDogs(){
  dogDiv.innerHTML = ""
  goodFilterBtn.innerText = "Filter good dogs: OFF"
  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(dogs => renderDogs(dogs))
}
function renderDogs(dogs){
  dogs.forEach(renderSingleDog)
}
function renderSingleDog(dog){
  dogDiv.innerHTML += `<span id="dogSpan" data-id="${dog.id}">${dog.name}</span>`
}
