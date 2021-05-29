window.addEventListener('load', ()=>{
    // Weather App
    let lat;
    let long;

    const temp_zone = document.querySelector(".temp_zone");
    const temp_desc = document.querySelector(".temp_desc");
    const temp_degree = document.querySelector(".temp");

    const key = "4305d3f216e436c25198ac20c941f86b";

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            //var proxy = "https://cors-anywhere.herokuapp.com/";
            //var {proxy}
            var api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const{country} = data.sys;
                const[{description}] = data.weather;
                const{temp} = data.main;

                const celcius = (temp -  277.15);

                temp_zone.textContent = country;
                temp_desc.textContent = description;
                temp_degree.textContent = Math.floor(celcius);

            });
        });
    }
    

    //Recipe App...
    const recipe_search_response = document.querySelector('.recipe-response-container')
    const tform = document.querySelector('form');
    const img = document.querySelector('img');
    const title = document.querySelector('.title');
    const viewRecipe = document.querySelector('.view-recipe');
    const recipeDescription = document.querySelector('.recipe-description');

    var user_query = "";
    const api_id = 'd9bc637d';
    const api_key = '28f82d078f11ec659a7228b81149f29f';
    // path:https://api.edamam.com/search;

    tform.addEventListener('submit', (f)=>{
        f.preventDefault();
        user_query = f.target.querySelector('.user_input').value;
        console.log(user_query);
        //Fetch Data
        fetchData();
    })
    async function fetchData(){

        const base_url = `https://api.edamam.com/search?q=${user_query}&app_id=${api_id}&app_key=${api_key}`;
        const recipe_url_response = await fetch(base_url);
        const data = await recipe_url_response.json();
        createContent(data.hits);
        console.log(data);
    }

    function createContent(results){
        let intialContent = '';
        results.map(recipe_response_data=>{
            intialContent+=
            `<div class="recipe-response">
            <img src="${recipe_response_data.recipe.image}" alt="">
           <div class="recipe-child-container">
              <h1 class="title">${recipe_response_data.recipe.label}</h1>
              <a href="${recipe_response_data.recipe.url}" class="view-recipe">View Recipe</a>
          <p class="recipe-description">Calories: ${recipe_response_data.recipe.calories.toFixed(2)}</p>
      </div>
      </div>`;
        })
        recipe_search_response.innerHTML=intialContent;   
    }
})