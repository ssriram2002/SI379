const searchElement = document.querySelector('#search'); // The <input> element
const searchButton = document.querySelector('#search-button'); // The <button> element
const resultsElement = document.querySelector('#results'); // The list of results (a <ul> element)

/**
 * Gets the itunes search API URL for the given search term
 * 
 * @param {string} term The term to search for
 * @returns The URL to use to search for the term with the iTunes API
 */
function getURLForSearch(term) {
    return `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music`;
}

/**
 * This is a convenience function to create a new <li> element that displays the track information
 * 
 * @param {string} trackName The name of the track
 * @param {string} trackViewUrl The URL to view the track in iTunes
 * @param {string} previewUrl The URL to preview the audio of the track
 * @param {string} artworkUrl100 The URL to the artwork for the track
 * @returns A new <li> element that displays the track information
 */
function createTrackDisplay(trackName, trackViewUrl, previewUrl, artworkUrl100) {
    const li = document.createElement('li'); // Create a new <li> element

    const trackNameDisplay = document.createElement('a'); // Will contain the track name
    trackNameDisplay.innerText = trackName || '(Unknown Track)'; // If the track name is not provided, display (Unknown Track)
    if(trackViewUrl) { trackNameDisplay.setAttribute('href', trackViewUrl); } // If a track view URL is provided, set the href attribute
    li.append(trackNameDisplay);

    if(previewUrl) { // If a preview URL is provided
        const preview = document.createElement('audio');
        preview.setAttribute('controls', '');
        preview.setAttribute('src', previewUrl);
        li.append(preview);
    }

    if(artworkUrl100) {
        const artwork = document.createElement('img');
        artwork.setAttribute('src', artworkUrl100);
        li.append(artwork);
    }

    return li;
}