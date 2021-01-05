const selectItem = document.querySelector('#dogbreed');
const selectImage = document.querySelector('#dogImage');

async function getJSON(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch {
        throw ('Could not reach the website')
    }
}

getJSON('https://dog.ceo/api/breeds/list/all')
    .then(generateHTML)
    .catch(err => {
        selectItem.innerHTML = '<option>Something went wrong</option>';
        return console.log(err)
    })

function generateHTML(dogJSON) {
    const dogList = Object.keys(dogJSON.message)
    const optionList = dogList.map(dogName => {
        return `<option value=${dogName}>${dogName}</option>`
    });
    selectItem.innerHTML = '<option></option>' + optionList.join(' ');
}

selectItem.addEventListener('change', () => {
    const dogImageUrl = `https://dog.ceo/api/breed/${selectItem.value}/images/random`;
    if (selectItem.value) {
        getJSON(dogImageUrl)
            .then(json => selectImage.src = json.message)
    } else {
        selectImage.src = '';
    }
});
