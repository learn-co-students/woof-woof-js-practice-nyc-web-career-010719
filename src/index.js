

document.addEventListener("DOMContentLoaded", function(event) {

  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")
  const goodDogFilter = document.querySelector("#good-dog-filter")


  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(renderAllDogs)


  dogBar.addEventListener("click", (e) => {
    // console.log(e.target)
    if (e.target.className == "span") {
      let dogId = parseInt(e.target.dataset.id)
      getClickedDog(dogId)
    }
  })
  dogInfo.addEventListener("click", (e) => {
    if (e.target.dataset.action == "changeStatus") {
      changeDogStatus(e.target)
    }
  })
  goodDogFilter.addEventListener("click", (e) => {
    filterDogs(e)
  })

  function filterDogs(e) {
    if (e.target.innerText === "Filter good dogs: OFF") {
      e.target.innerText = "Filter good dogs: ON"
      fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(showOnlyGoodDogs)
    }
    else if (e.target.innerText === "Filter good dogs: ON") {
      e.target.innerText = "Filter good dogs: OFF"
      dogBar.innerHTML = ""
      fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(renderAllDogs)
    }
  }

  function showOnlyGoodDogs(dogs) {
    goodDogs = dogs.filter(dog => dog.isGoodDog === true)
    dogBar.innerHTML = ""
    renderAllDogs(goodDogs)
  }

  function changeDogStatus(statusButton) {
    let dogId = parseInt(statusButton.dataset.id)
    let status = statusButton.innerText
    let newStatus

    if (status === "Good Dog!") {
      newStatus = false
    }
    else if (status === "Bad Dog!") {
      newStatus = true
    }

    let data = {
      "isGoodDog": newStatus
    }

    fetch(`http://localhost:3000/pups/${dogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(dog => renderDogDescription(dog))
  }


  function getClickedDog(dogId) {
    fetch(`http://localhost:3000/pups/${dogId}`)
      .then(resp => resp.json())
      .then(dog => renderDogDescription(dog))
  }

  function renderDogDescription(dog) {
    let status
    (dog.isGoodDog) ? status = "Good Dog!" : status = "Bad Dog!"
    dogInfo.innerHTML = `<img src=${dog.image}>
    <h2>${dog.name}</h2>
    <button data-action="changeStatus" data-id="${dog.id}">${status}</button>`
  }


  function renderAllDogs(dogs) {
    dogs.forEach(dog => renderDog(dog))
  }
  function renderDog(dog) {
    dogBar.innerHTML += `<span class="span" data-id=${dog.id}>${dog.name}</span>`
  }
})
