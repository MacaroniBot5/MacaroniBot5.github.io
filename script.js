document.getElementById('fetchDataBtn').addEventListener('click', fetchData);

function fetchData() {
    // Replace this URL with your desired API endpoint
    const apiUrl = 'https://api.themoviedb.org/3/search/movie?query=Pokemon';
    //const apiUrl = 'https://api.themoviedb.org/3/movie/447404?language=en-US';

    // Set up the headers and options for the cURL-like request
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODFjZDA3OWE3N2EzNjkyZDY1ZTZkYzcxNWJiMTM1ZSIsIm5iZiI6MTczMzAxMDQyMC43OTIsInN1YiI6IjY3NGJhM2Y0N2IxZjBjNDQ3OTQ2MGFiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8LICJhyVq-D83vWl50hTA9Vkx4RGfYXdmMUiMpZKnKA' // Replace with your actual token if needed
    };

    const options = {
        method: 'GET', // Change to 'POST' or other methods if required
        headers: headers
    };

    fetch(apiUrl, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            downloadJSON(data);
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function downloadJSON(data) {
    // Convert the data to a JSON string
    const jsonString = JSON.stringify(data, null, 2);
    console.log(jsonString);
    console.log(data.results[0]);
    sessionStorage.setItem('testData', jsonString);
    sessionStorage.setItem('queryData', data);
    const temp = sessionStorage.getItem('queryData');
    const temp2 = sessionStorage.getItem('testData');
    const temp3 = JSON.parse(temp2);
    console.log(temp3.results[0]);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    //console.log(blob.text());
    
    // Create a link element
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'data.json'; // The name of the file to be downloaded
    downloadLink.style.display = 'block'; // Show the download link
    downloadLink.innerText = 'Download JSON'; // Set the link text
}