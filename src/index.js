document.addEventListener('DOMContentLoaded', () => {
  const dogBar = document.querySelector('#dog-bar')
  const dogUrl = 'http://localhost:3000/pups'
  const dogInfo = document.querySelector('#dog-info')
  const filter = document.querySelector('#good-dog-filter')
  let allDogs = []

  fetch(dogUrl)
    .then(res => res.json())
    .then(function(dogs) {
      dogBar.innerHTML = ""
      allDogs = dogs
      allDogs.forEach(showDogs)
    })

  dogBar.addEventListener("click", function(e) {
    let dogId = parseInt(e.target.dataset.id)
    let pup = allDogs.find(dog => dog.id === dogId)
    if (e.target.nodeName === "SPAN") {
      goodDog(pup)
    }//end of if Good Dog clause
  })//end of dogBar

  dogInfo.addEventListener("click", function(e){
    if (e.target.nodeName === "BUTTON") {
      let puppy = e.target.previousElementSibling.innerText
      let pup = allDogs.find(dog => dog.name === puppy)
        fetch(`${dogUrl}/${pup.id}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "isGoodDog": !pup.isGoodDog
          })
        })
        .then(res => res.json())
        .then(function(editPup){
          let index = allDogs.indexOf(pup)
          allDogs[index]= editPup
          goodDog(editPup)
        })
    }
  }) // end of dogInfo

  filter.addEventListener("click", function(e){
    let status = e.target.innerText
    if (status === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON"
      goodDogs = []
      dogBar.innerHTML = ""
      allDogs.map(function(dog) {
        if (dog.isGoodDog === true) {
          // adds dogs on the initial get request
          goodDogs.push(dog)
        }
      })
      goodDogs.forEach(showDogs)
    } else if (status === "Filter good dogs: ON") {
      dogBar.innerHTML = ""
      e.target.innerText = "Filter good dogs: OFF"
      allDogs.forEach(showDogs)
    }
  })


  function goodDog(pup){
    if (pup.isGoodDog === true) {
      dogInfo.innerHTML = `
      <img src="${pup.image}">
      <h2>${pup.name}</h2>
      <button>Good Dog!</button>
      `
    } else {
      dogInfo.innerHTML = `
      <img src="${pup.image}">
      <h2>${pup.name}</h2>
      <button>Bad Dog!</button>
      `
    }
  }
  function showDogs(dog){
    dogBar.innerHTML += `<span data-id="${dog.id}">${dog.name}</span>`
  }
}) // end of DOMContentLoaded
