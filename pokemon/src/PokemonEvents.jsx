// src/PokemonEvents.jsx

import { useState } from 'react';

function PokemonEvents() {
    const [inputValue, setInputValue] = useState('');
    const [eventStatus, setEventStatus] = useState('Pokemon Finder');
    const [pokemon, setPokemon] = useState();
    const [pokemonError, setPokemonError] = useState('');
    const [errorStatus, setErrorStatus] = useState('');
		
		 // Event handler for button click
    const handleClick = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(response => response.json())
            .then(data => setPokemon(data))
            .then(setPokemonError("")) // reset pokemon error message
            .catch(() => setPokemonError(`${inputValue} is not a valid Pokemon`));
    };

    // Event handler for input change
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    // Event handlers for mouse events
    const handleMouseOver = () => {
        setEventStatus('Mouse has entered the button, you can click it now!');
    };

    const handleMouseOut = () => {
        setEventStatus('The mouse has left the button, clicking is not possible ):');
    };

    // Event handlers for keyboard events
    const handleKeyDown = (event) => {
        setEventStatus(`Key down: ${event.key}`);
    };

    const handleKeyUp = (event) => {
        setEventStatus(`Key up: ${event.key}`);
    };

    // Event handlers for focus events
    const handleFocus = () => {
        setEventStatus('Input field is focused, type a Pokemon name!');
    };

    const handleBlur = () => {
        setEventStatus('Input field lost focus, there will be no searching...');
    };

    // Event handlers for image load events
    const handleLoad = () => {
        setEventStatus('Image loaded successfully!');
    };

    const handleError = () => {
        setErrorStatus('Error loading image');
    };
	
		return (
        <div>
            <h2>Simple PokeDex</h2>
            <form>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                    placeholder="Type a Pokemon Name..."
                />

                <button
                    type="button"
                    onClick={handleClick}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    Load Pokemon
                </button>

            </form>

			

				{pokemon && (
		                <div>
		                    <p style={{ textTransform: 'capitalize' }}><b>{pokemon.name}</b></p>
		                    <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
		                </div>
			    )}

            	{pokemonError && <p style={{ color: 'red' }}>{pokemonError}</p>}      

            	<p>{eventStatus}</p>

	            <img
	                src="notValidImage.jpg"
	                alt="Not valid Image"
	                onLoad={handleLoad}
	                onError={handleError}
	            />

	            {errorStatus && <p style={{ color: 'red' }}>{errorStatus}</p>}

			
        </div>
    );	
}

export default PokemonEvents;