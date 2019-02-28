document.addEventListener('DOMContentLoaded',(e)=>{
  //VARIABLES-------------------------------------------------------------------
  const dogBar = document.querySelector("#dog-bar")
  const dogInfoDiv = document.querySelector("#dog-info")
  const dogURL = "http://localhost:3000/pups"
  const filterBtn = document.querySelector("#good-dog-filter")
  var isGoodDog = null

  //EVENT LISTENERS-------------------------------------------------------------
  dogBar.addEventListener('click',function(e){
    if (e.target.tagName === "SPAN") {
      fetchSpecificDoggoOnClick(`http://localhost:3000/pups/${e.target.dataset.id}`)
    }
  })

  dogInfoDiv.addEventListener('click',function(e){
    if(e.target.tagName === "BUTTON") {
      console.log(e.target.innerHTML)
      if (e.target.innerHTML.split(" ")[0] === "Bad"){
        isGoodDog = true
        e.target.innerHTML = "Good Dog!"
      } else if (e.target.innerHTML.split(" ")[0] === "Good"){
        isGoodDog = false
        e.target.innerHTML = "Bad Dog!"
      }
      updatePupInfo(`http://localhost:3000/pups/${e.target.dataset.id}`,isGoodDog)
    }
  })

  filterBtn.addEventListener('click', (e)=> {
    console.log(e.target.innerText)
    if(e.target.innerText === 'Filter good dogs: ON') {
      e.target.innerText = 'Filter good dogs: OFF'
    } else {
      e.target.innerText = 'Filter good dogs: ON'
    }
  })
  //FUNCTIONS------------------------------------------------------------------

  fetchDoggos()

  function fetchDoggos(url){
    fetch(dogURL)
    .then(response => {
      return response.json()
    })
    .then(parsedJSON => {
      renderPups(parsedJSON)
    })
  }

  function fetchSpecificDoggoOnClick(url){
    fetch(url)
    .then(response => {
      return response.json()
    })
    .then(parsedJSON => {
      renderPupInfo(parsedJSON)
    })
  }

  function renderPupInfo(pup){
    dogInfoDiv.innerHTML = `
      <img src=${pup.image}>
      <h2>${pup.name}</h2>
      <button id="info-btn" type="button" data-id=${pup.id}>${pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>
    `
  }

  function updatePupInfo(url,isGoodDog){
    console.log(isGoodDog)
    fetch(url,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: isGoodDog
      })
    })
    .then(response => {
      return response
    })
    .then(parsedJSON => {
      console.log("I ran")
    })
  }

  function renderPup(pup){
    dogBar.innerHTML += `
    <span data-id=${pup.id}>${pup.name}</span>`
  }

  function renderPups(pups){
    if (filterBtn.innerHTML === 'Filter good dog: OFF'){
      pups.forEach(renderPup)
    } else {
      // pups.filter(pup => pup.isGoodDog )
      // if dogInfoDiv.innerHTML {
      //   if (document.querySelector("#info-btn").innerText === 'Good Dog!'){
      //     let goodDogs = pups.filter(pup => pup.isGoodDog = true)
      //     goodDogs.forEach(renderpup)
      //   } else if (document.querySelector("#info-btn").innerText === 'Bad Dog!') {
      //     let badDogs = pups.filter(pup => pup.isGoodDog = false)
      //     badDogs.forEach(renderPup)
        // }
      // }
      pups.forEach(renderPup)
    }
  }

})
