// Declaring IIFE inside a variable
let pokemonRepository = (function () {
    // Added empty array for the pokemon list
    let pokemonList = []
    // apiURL data
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

    // Load list function to fetch the actual data
    function loadList(){
        return fetch(apiURL).then((response) => {
            return response.json()
        }).then((data) => {
            data.results.forEach((item) =>{
                let pokemon = {
                    name : item.name,
                    detailsUrl: item.url
                }
                add(pokemon)
            })
        }).catch((e) =>{
            console.error(e)
        })
    }

    // // Load details function
    // function loadDetails(item){
    //     let url = item.detailsUrl;
    //     return fetch(url).then((response) =>{
    //         return response.json()
    //     }).then((data) =>{
    //         console.log(data)
    //     }).catch((e) =>{
    //         console.error(e)
    //     })
    // }



    // Retrieves all the list of pokemons
    function getAll() {
        let getListOfPokemon = document.querySelector('.pokemon-list');
        let createList = document.createElement('li');
        let createButton = document.createElement('button');
        return pokemonList;
    }

    // Add a new pokemon
    function add(pokemon) {
        // conditional if object then add if not error message
        if (
            typeof pokemon === 'object'
        ) {
            return pokemonList.push(pokemon);
        } else {
            return console.error('Something went wrong! Add a pokemon object');
        }
    }

    function addv(pokemon) {
        // Valid keys to add a pokemon
        let validKeys = ['name', 'height', 'type'];
        // The keys added by the function
        let inputKeys = Object.keys(pokemon);
        // Valid value data type to add a pokemon
        let validValues = [typeof 'string', typeof 1, typeof []];
        // Values added by the function
        let valuesAdded = Object.values(pokemon);
        // Checking if the the input key matches
        let checkKeysMatch = inputKeys.every(
            (key, index) => key === validKeys[index]
        );
        // Checking if the values data type are valid
        let checkValidType = valuesAdded.every(
            (value, index) => typeof value === validValues[index]
        );
        // If all the conditions meet the pokemon added has the correct input
        if (
            typeof pokemon === 'object' &&
            validKeys.length === inputKeys.length &&
            checkKeysMatch &&
            checkValidType
        ) {
            return pokemonList.push(pokemon);
        } else {
            return console.error('Something went wrong! Add a pokemon object');
        }
    }

    // Add searchByName parameter
    function findPokemonByName(searchByName) {
        // Filter the pokemon list to find the search pokemon
        // Put the filter method into a variable to return the value searched
        let searchedPokemon = pokemonList.filter(pokemon => {
            // Find the full name or the pokemons that start with using the startWith string method
            return pokemon.name.startsWith(searchByName);
        });
        //Log in the searched pokemon into the console
        console.table(searchedPokemon);
    }

    // Getting list of pokemons in the interface
    function addListItem(pokemon) {
        // Select the pokemon unordered list
        let getListOfPokemon = document.querySelector('.pokemon-list');

        // Create button and list element
        let createListElement = document.createElement('li');
        let createButtonElement = document.createElement('button');

        // Give the to the new button element the pokemon's name
        createButtonElement.innerText = `${pokemon.name}`;

        // Append the new created button and list items to the parent element
        getListOfPokemon.appendChild(createListElement);
        createListElement.appendChild(createButtonElement);

        // Add event listener to the buttons
        eventShowDetails(createButtonElement, pokemon);
    }

    // Show details of the pokemons
    function showDetails(pokemonList) {
        // retrieving information from the pokemon list in a table
        console.table(pokemonList);
    }

    // Event listener on clicking button to show more
    function eventShowDetails(button, pokemon) {
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }

    // IIFE return values to be global values
    return {
        getAll: getAll,
        add: add,
        addv: addv,
        findPokemonByName: findPokemonByName,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
    };
})();


//Checking if showDetails function retrieve the pokemonList array
pokemonRepository.showDetails();

//Checking if the data was fetched
pokemonRepository.loadList().then(() =>{
    pokemonRepository.getAll().forEach(pokemon => {
    //Created a new function getListOfPokemons to continue the FP principle
    pokemonRepository.addListItem(pokemon);
});

})
