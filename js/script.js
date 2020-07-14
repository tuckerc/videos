"use strict";

const searchSubmit = document.getElementById("searchSubmit");
searchSubmit.addEventListener("click", (e) => {
  e.stopPropagation();
  const searchField = document.getElementById("searchField");
  if (searchField.value != "" && searchField.value != null) {
    searchField.classList.remove("border", "border-danger");
    const videosContainer = document.getElementById("videosContainer");
    videosContainer.innerHTML = "";
    fetch(`http://www.omdbapi.com/?apikey=1ec0e6fa&s=${searchField.value}`)
      .then((response) => response.json())
      .then((data) => {
        // make a button with text value of searchField.value
        const newButton = document.createElement("button");
        newButton.classList.add("btn", "btn-outline-success", "mx-2");
        newButton.textContent = searchField.value;
        newButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const videosContainer = document.getElementById("videosContainer");
          videosContainer.innerHTML = "";
          fetch(
            `http://www.omdbapi.com/?apikey=1ec0e6fa&s=${e.target.textContent}`
          )
            .then((response) => response.json())
            .then((data) => {
              data.Search.forEach((result) => {
                makeCard(result);
              });
            });
        });
        const buttonsContainer = document.getElementById("buttonsContainer");
        buttonsContainer.appendChild(newButton);
        data.Search.forEach((result) => {
          makeCard(result);
        });
        searchField.value = "";
      });
  } else {
    searchField.classList.add("border", "border-danger");
  }
  e.preventDefault();
});

function makeCard(result) {
  const newCard = document.createElement("div");
  newCard.classList.add("card", "m-3");
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = result.Poster;
  newCard.appendChild(cardImage);
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title", "text-center");
  cardTitle.textContent = result.Title;
  cardBody.appendChild(cardTitle);
  const cardSubTitle = document.createElement("h6");
  cardSubTitle.classList.add(
    "card-subtitle",
    "mb-2",
    "text-muted",
    "text-center"
  );
  cardSubTitle.textContent = `${
    result.Type.charAt(0).toUpperCase() + result.Type.slice(1)
  } - ${result.Year}`;
  cardBody.appendChild(cardSubTitle);
  newCard.appendChild(cardBody);
  const quotesContainer = document.getElementById("videosContainer");
  quotesContainer.appendChild(newCard);
}
