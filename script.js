document.getElementById('searchForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm === '') return;

    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.meals) {
            displayMeals(data.meals);
        } else {
            displayMessage('No meals found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})
async function fetchFoodItems() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayFoodItems(data.categories);
    } catch (error) {
        console.error('Error fetching food items:', error);
    }
}

function displayFoodItems(categories) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';

    if (!categories) {
        mealResults.innerHTML = '<p>No food items found.</p>';
        return;
    }

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('meal-item');

        categoryDiv.innerHTML = `
            <h2>${category.strCategory}</h2>
            <img src="${category.strCategoryThumb}" alt="${category.strCategory}" style="width: 100%;">
            <p>${category.strCategoryDescription}</p>
        `;

        mealResults.appendChild(categoryDiv);
    });
}

async function searchMeals() {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayMeals(data.meals);
    } catch (error) {
        console.error('Error fetching meals:', error);
    }
}

function displayMeals(meals) {
    const mealResults = document.getElementById('mealResults');
    mealResults.innerHTML = '';

    if (!meals) {
        mealResults.innerHTML = '<p>No meals found.</p>';
        return;
    }

    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-item');

        mealDiv.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%;">
            <p>${meal.strCategory}</p>
            <p>${meal.strInstructions}</p>
        `;

        mealResults.appendChild(mealDiv);
    });
    // Get the search container element
const searchContainer = document.getElementById('searchContainer');

// Get the offset position of the search container
const containerOffset = searchContainer.offsetTop;

// Add scroll event listener
window.addEventListener('scroll', () => {
    // Check if the user has scrolled past the search container
    if (window.pageYOffset > containerOffset) {
        // If scrolled past, fix the search container
        searchContainer.style.position = 'fixed';
        searchContainer.style.top = '0';
    } else {
        // Otherwise, reset the position to static
        searchContainer.style.position = 'static';
    }
});

}
