const API_KEY = "ZW8tYF-xICxhuq4sS5p7ZYVwVic";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById('submit').addEventListener('click', e => postForm(e));

async function postForm(e) {
    const form = new FormData(document.getElementById('checksform'));

    const response = await fetch(API_URL, {
                        method: "POST",
                        headers: {
                            "Authorization": API_KEY,
                        },
                        body: form,
    });
}

async function getStatus(e) {

    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error); //data.error- це описове повідомлення з json, яке було повернуто.
    }

}

function displayStatus(data) {
    let heading = 'API Key Status';
    let result = `<div>Your key is valid until:</div>`;
    result += `<div>${data.expiry}</div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = result;


    resultsModal.show();
}



