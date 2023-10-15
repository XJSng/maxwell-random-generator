document.addEventListener("DOMContentLoaded", function () {
  // When DOM is loaded execute these files
  const jsonDataUrl = "storeData.json";
  const storeList = document.querySelector("#store-list");
  //    const storeFilter = document.querySelector("#store-filter");
  const drinksFilter = document.querySelector("#drinks-filter");
  const dessertFilter = document.querySelector("#dessert-filter");
  const halalFilter = document.querySelector("#halal-filter");
  const budgetFilter = document.querySelector("#budget-filter");
  const generateFoodButton = document.querySelector("#generate-food-button");

  let storeData = [];

  fetch(jsonDataUrl) // fetching from json file
    .then((response) => response.json())
    .then((data) => {
      storeData = data;
      populateStoreList();
    })
    .catch((error) => {
      console.error("Error fetching JSON data: ", error);
    });

  function populateStoreList() {
    // add json file into store listing below
    storeList.innerHTML = ""; // let html be empty first

    // const searchTerm = storeFilter.value.toLowerCase(); // Adding Searchable Terms
    const drinksValue = drinksFilter.value; // get the value from form
    const dessertValue = dessertFilter.value; // get the value from form
    const halalValue = halalFilter.value; // get the value from form
    const budgetValue = budgetFilter.value; // get the value from form

    for (const food of storeData) {
      // cycle through foodData.json
      // const foodName = food.name.toLowerCase();
      if (
        // foodName.includes(searchTerm) &&
        (budgetValue === "" || food.budget.includes(budgetValue) === true) &&
        (drinksValue === "" || food.drinks === drinksValue) &&
        (dessertValue === "" || food.dessert === dessertValue) &&
        (halalValue === "" || food.halal === halalValue)
      ) {
        // Create an li element
        const li = document.createElement("li");
        li.textContent = `${food.storeNumber}: ${food.name}`; // Paste into HTML
        storeList.appendChild(li); // Append onto the storeList div
      }
    }
  }

  generateFoodButton.addEventListener("click", function () {
    // random food generator
    const budgetValue = budgetFilter.value;
    const drinksValue = drinksFilter.value;
    const dessertValue = dessertFilter.value;
    const halalValue = halalFilter.value;

    const filteredFoods = storeData.filter(
      (
        food // Food filtering feature
      ) =>
        (drinksValue === "" || food.drinks === drinksValue) && // if drink value is any OR food drinks value are the same, return true
        (dessertValue === "" || food.dessert === dessertValue) && // Same for the other values
        (halalValue === "" || food.halal === halalValue) &&
        (budgetValue === "" || food.budget.includes(budgetValue) === true) // if budget includes $5/$10/$15 == true
    );

    if (filteredFoods.length === 0) {
      alert("No matching food found.");
    } else {
      const randomIndex = Math.floor(Math.random() * filteredFoods.length); //random generator
      const randomFood = filteredFoods[randomIndex];
      window.confirm(`Give ${randomFood.storeNumber}: ${randomFood.name} a try!`);
    }
  });

  populateStoreList();
});

// CRUD Review feature
// Select the form and review list elements
const addReviewForm = document.getElementById("add-review-form");
const reviewsList = document.getElementById("reviews-list");

// Define a function to add a new review
function addReview(author, text) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${author}:</strong> ${text}`;
  reviewsList.appendChild(li);
}

// Handle form submission to add a new review
addReviewForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const author = document.getElementById("review-author").value;
  const text = document.getElementById("review-text").value;
  addReview(author, text);

  // You can also save the review data to your JSON file or database (server-side).
  //push data to json file "reviewData.json"

  // Ensure data validation and security when handling user input.
});
