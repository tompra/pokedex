// Declaring IIFE inside a variable
let pokemonRepository = (function () {
    // Added empty array for the pokemon list
    let pokemonList = []
    // apiURL data
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    // Creating loading element
    let loadingElement = document.createElement('p')
    loadingElement.innerHTML = 'Loading...'

    // Retrieves all the list of pokemons
    function getAll() {
        return pokemonList;
    }

    // Add a new pokemon
    function add(pokemon) {
        // conditional if object then add if not error message
        if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
            return pokemonList.push(pokemon);
        } else {
            return console.error('Something went wrong! Add a pokemon object');
        }
    }

    // Getting list of pokemons in the interface
    function addListItem(pokemon) {
        // Select the pokemon unordered list
        let getListOfPokemon = document.querySelector('.list-group');

        // Create button, list element, image
        let createListElement = document.createElement('li');
        let createButtonElement = document.createElement('button');
        let createImageElement = document.createElement('img')

        // Give the to the new button element the pokemon's name
        createButtonElement.innerText = `${pokemon.name}`;

        // Set the button source attribute
        createImageElement.setAttribute('src',`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`)
        createImageElement.setAttribute('alt', `A small image of ${pokemon.name}`)
        // createImageElement.classList.add('img-fluid')
        createImageElement.classList.add('img-button')


        // Append the new created button, list items and the image to the parent element
        getListOfPokemon.appendChild(createListElement);
        createListElement.appendChild(createButtonElement);
        createButtonElement.appendChild(createImageElement)

        // Add class to li elements
        createListElement.classList.add('list-group-item')
        // createListElement.classList.add('list-group-item-action')

        // Add class to button element
        createButtonElement.classList.add('btn')
        // createButtonElement.classList.add('btn-warning')
        createButtonElement.classList.add('button-pokemon')

        // Add attribute to button to toggle modal
        createButtonElement.setAttribute('data-bs-toggle', 'modal')
        createButtonElement.setAttribute('data-bs-target', '#exampleModal')

        createListElement.classList.add('col-lg-3')
        createListElement.classList.add('col-sm-6')
        createListElement.classList.add('col-md-4')
        createListElement.classList.add('col-6')
        
        // Add event listener to the buttons
        eventShowDetails(createButtonElement, pokemon);
    }

    // Show details of the pokemons
    function showDetails(pokemon) {
        // retrieving information from the pokemon list in a table
        loadDetails(pokemon).then(() =>{
            showModal(pokemon)
        }).catch((e) =>{
            console.error(e)
        })
    }

    // Event listener on clicking button to show more
    function eventShowDetails(button, pokemon) {
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }

    // Load list function to fetch the actual data
   function loadList(){
        showLoadingMessage()  
        return fetch(apiURL).then((response) =>{
            return response.json()
        }).then((data) =>{
            hideLoadingMessage()
            data.results.forEach((item,index) =>{
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url,
                    id: index + 1
                }
                add(pokemon)
            })
        }).catch((e) =>{
            hideLoadingMessage()
            console.error(e)
        })
    }
   

  // Load details function
  function loadDetails(item) {
       showLoadingMessage()
       let url = item.detailsUrl;
       return fetch(url).then((response) =>{
            return response.json()
       }).then((data) => {
            hideLoadingMessage()
            item.img = data.sprites.other['official-artwork'].front_default,
            item.height = data.height,
            item.types = data.types
            item.abilities = data.abilities
       }).catch((e) =>{
            hideLoadingMessage()
            console.error(e)
       })
  }

  //loading message functions
  function showLoadingMessage(){
    document.body.appendChild(loadingElement)
  }

  function hideLoadingMessage(){
    document.body.removeChild(loadingElement)
  }

  // Show modal
  function showModal(pokemon){
    const modalHeader = document.querySelector('.modal-header')
    const modalBody = document.querySelector('.modal-body')

    // Clear all before adding elements
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';

    // Heading
    const heading = document.createElement('h1')
    heading.classList.add('modal-title')
    heading.classList.add('fs-3')
    heading.innerText = pokemon.name
    
    // Close button
    const closeButton = document.createElement('button')
    closeButton.setAttribute('type', 'button')
    closeButton.setAttribute('data-bs-dismiss', 'modal')
    closeButton.setAttribute('data-bs-toggle', 'modal')
    closeButton.setAttribute('data-bs-target', '#exampleModal')
    closeButton.setAttribute('aria-label', 'close')
    closeButton.classList.add('btn-close')
    closeButton.classList.add('btn-close-white')


    // Content 
    // Type
    const descriptionType = document.createElement('p')
    const titleType = document.createElement('p')
    const typeNames = pokemon.types.map((item) =>{
        return item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1)
    }).join(', ')
    titleType.innerText = 'Type'
    titleType.classList.add('modal__pokemon--title')
    descriptionType.innerText = `${typeNames}`
    
    // Height
    const descriptionHeight = document.createElement('p')
    const titleHeight = document.createElement('p')
    titleHeight.innerText = 'Height'
    titleHeight.classList.add('modal__pokemon--title')
    descriptionHeight.innerText = `${pokemon.height}m`

    // Image
    const image = document.createElement('img')
    image.setAttribute('src', pokemon.img)
    image.setAttribute('alt', `Image of ${pokemon.name}`)
    image.classList.add('img-fluid')
    image.classList.add('rounded')
    image.classList.add('img-card')

    // Abilities
    const descriptionAbilities = document.createElement('p')
    const titleAbilities = document.createElement('p')
    const pokemonAbilities = pokemon.abilities.map((item) =>{
       return item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1)
    }).join(', ')
    descriptionAbilities.innerText = `${pokemonAbilities}`
    titleAbilities.innerText = 'Abilities'
    titleAbilities.classList.add('modal__pokemon--title')

    // Append
    modalHeader.appendChild(heading)
    modalHeader.appendChild(closeButton)
    modalBody.appendChild(image)
    modalBody.appendChild(titleHeight)
    modalBody.appendChild(descriptionHeight)
    modalBody.appendChild(titleType)
    modalBody.appendChild(descriptionType)
    modalBody.appendChild(titleAbilities)
    modalBody.appendChild(descriptionAbilities)
  }


    // IIFE return values to be global values
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
    };
})();

const searchBtn = document.getElementById('searchBtn')
const searchInput = document.getElementById('searchInput')
const clearBtn = document.getElementById('clearBtn')

 pokemonRepository.loadList().then(() =>{
    pokemonRepository.getAll().forEach(pokemon => {
    pokemonRepository.addListItem(pokemon);
})})


searchBtn.addEventListener('click', e =>{
    e.preventDefault();
    let pokemonList = document.querySelector('.list-group')
    pokemonList.innerHTML= ''
    const searchValue = searchInput.value.toLowerCase()
    pokemonRepository.getAll().filter((pokemon) =>{
       if(pokemon.name.startsWith(searchValue)){
        return pokemonRepository.addListItem(pokemon)
       }
    })
})

clearBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let pokemonList = document.querySelector('.list-group')
    pokemonList.innerHTML= ''
    searchInput.value = ''
    pokemonRepository.getAll().forEach((pokemon => pokemonRepository.addListItem(pokemon)))
})

