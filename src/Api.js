const API_URL = 'https://mock-api.mortgagebasket.co.uk/v1/users?pageSize=100';

const Api = async() => await fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => {
    
    console.error('Error:', error);
  });

export default Api
