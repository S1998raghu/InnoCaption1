    import axios from 'axios';

    const API_URL = 'https://dummyjson.com';

    export const getProducts = () => {
        return axios.get(`${API_URL}/products`)
          .then(response => {
            console.log(response); 
            return response;
          });
      };
      
      export const searchProducts = (query) => {
        var url = `${API_URL}/products/search?q=${query}`;
        return axios.get(url)
          .then(response => {
            // console.log(response); 
            return response;
          });
      };