document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const mealResults = document.getElementById('mealResults');
    let mealsList = [];
    let showMoreButton;

    async function searchMeals() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') return;

        const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.meals) {
                mealsList = data.meals;
                displayMeals(mealsList.slice(0, 5));
                if (mealsList.length > 5) {
                    showMoreButton.style.display = 'block';
                } else {
                    showMoreButton.style.display = 'none';
                }
            } else {
                displayMessage('No meals found. Please try again.');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayMeals(meals) {
        mealResults.innerHTML = '';

        meals.forEach(meal => {
            const mealDiv = createMealElement(meal);
            mealResults.appendChild(mealDiv);
        });
    }

    function createMealElement(meal) {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal-item');

        mealDiv.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%;">
            <p>${meal.strCategory}</p>
            <p>${meal.strInstructions}</p>
        `;

        return mealDiv;
    }

    function displayMessage(message) {
        mealResults.innerHTML = `<p>${message}</p>`;
    }

    function showMoreMeals() {
        const remainingMeals = mealsList.slice(5);
        displayMeals(remainingMeals);
        showMoreButton.style.display = 'none';
    }

    searchInput.addEventListener('input', searchMeals);

    showMoreButton = document.createElement('button');
    showMoreButton.id = 'showMoreBtn';
    showMoreButton.className = 'show-more-btn';
    showMoreButton.textContent = 'Show More';
    showMoreButton.style.display = 'none';
    showMoreButton.addEventListener('click', showMoreMeals);
    document.querySelector('main').appendChild(showMoreButton);
});
