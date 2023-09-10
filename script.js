document.addEventListener('DOMContentLoaded', () => {
    const outputDiv = document.getElementById('output');
    const fetchNumbersButton = document.getElementById('fetchNumbers');

    const fetchNumbers = () => {
        console.log('Fetch Numbers button clicked');

        // Replace with your server URL where the microservice is running
        const serverUrl = 'http://localhost:8008/numbers?url=http://20.244.56.144/numbers/primes&url=http://20.244.56.144/numbers/fibo';
  
        fetch(serverUrl)
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    outputDiv.innerHTML = `<p>Processed Numbers: ${data.result.join(', ')}</p>`;
                } else {
                    outputDiv.innerHTML = '<p>No data available.</p>';
                }
            })
            .catch(error => {
                console.error('Fetch Numbers Error:', error);
                outputDiv.innerHTML = '<p>Error fetching data.</p>';
            });

        const testServerUrls = [
            'http://20.244.56.144/numbers/primes',
            'http://20.244.56.144/numbers/fibo',
            'http://20.244.56.144/numbers/odd',
            'http://20.244.56.144/numbers/rand'
        ];

        Promise.all(testServerUrls.map(url => fetch(url)))
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(results => {
                results.forEach((data, index) => {
                    if (data.result) {
                        outputDiv.innerHTML += `<p>API ${testServerUrls[index]} Data: ${data.result.join(', ')}</p>`;
                    } else {
                        console.error(`Error in API ${testServerUrls[index]}`);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data from test server APIs:', error);
                outputDiv.innerHTML += '<p>Error fetching data from test server APIs.</p>';
            });
    };

    fetchNumbersButton.addEventListener('click', fetchNumbers);

    // Call the fetchNumbers function when the page loads
    fetchNumbers();
});
