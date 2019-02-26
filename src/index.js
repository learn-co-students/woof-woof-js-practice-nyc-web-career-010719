document.addEventListener('DOMContentLoaded', function () {
  let dogList = []
  const dogBar = document.querySelector('#dog-bar')
  const dogSummary = document.querySelector('#dog-summary-container')
  const dogFilter = document.querySelector('#good-dog-filter')

  dogFilter.addEventListener('click', function(e) {
    // console.log(e.target.innerHTML.split(' ')[3])
    // debugger
    dogFilterToggle(e,dogList)
  })

  dogBar.addEventListener('click', function(e) {
    const dogId = e.target.dataset.id
    const pupInfo = dogInfo(dogList,dogId)
    renderDogInfo(pupInfo)
  })

  dogSummary.addEventListener('click', function(e) {
    const dogId = e.target.dataset.id
    const pupInfo = dogInfo(dogList,dogId)
    const dogFilterText = dogFilter.innerHTML.split(' ')[3]
    if (e.target.dataset.action === 'toggle') {
      let data = dogStatusToggle(pupInfo)
      fetch(`http://localhost:3000/pups/${dogId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(r => r.json())
        .then(pup => {
          dogList = dogList.map( dog => {
            if (dog.id === pup.id) {
              return pup
            } else {
              return dog
            }
          })
          if (dogFilterText === 'ON') {
            renderAllPups(dogFilterContent(dogList))
          }
          renderDogInfo(pup)
        })
    }
  })

  fetch('http://localhost:3000/pups')
    .then(r => r.json())
    .then(pups => {
      dogList = pups
      renderAllPups(pups)
    })



})


function dogFilterContent(dogList) {
  let filteredDog = dogList.filter( pup => pup.isGoodDog === true)
  return filteredDog
}

function dogFilterToggle(e,dogList) {
  if (e.target.innerHTML.split(' ')[3] === 'OFF') {
    dogList = dogFilterContent(dogList)
    renderAllPups(dogList)
    return e.target.innerHTML = 'Filter good dogs: ON'
  } else {

    renderAllPups(dogList)
    return e.target.innerHTML = 'Filter good dogs: OFF'
  }
}

function dogStatusToggle(pupInfo) {
  let data = {}
  if (pupInfo.isGoodDog) {
    data.isGoodDog = false
    return data
  } else {
    data.isGoodDog = true
    return data
  }
}

function dogInfo(dogList,dogId) {
  return dogList.find(pup => pup.id === parseInt(dogId))
}

function renderDogInfo(dogInfo) {
  const dogSummary = document.querySelector('#dog-info')
  dogSummary.innerHTML = ''
  dogSummary.innerHTML = `
    <img src=${dogInfo.image}>
    <h2>${dogInfo.name}</h2>
    <button data-id="${dogInfo.id}" data-action="toggle">${dogInfo.isGoodDog ? 'Bad Dog' : 'Good Dog!'}</button>
  `
}

function renderAllPups(pups) {
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ''
  pups.forEach( pup => renderSinglePup(pup))
}

function renderSinglePup(pup) {
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML += `
  <span data-id="${pup.id}"> ${pup.name} </span>
  `
}
