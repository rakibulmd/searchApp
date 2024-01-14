import axios from "axios";

// function to fetch data when the search engine is stack overflow
// it receives the search text as parameter and return the data on success or empty array if failed. 
async function getStackOverflowData (searchText) {
    try {
      const response = await axios.get(`https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q=${searchText}`);
      if(response?.data?.items.length != 0) {
        return response?.data?.items
      }
      else {
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  }

// function to fetch data when the search engine is wikipedia
// it receives the search text as parameter and return the data on success or empty array if failed.
async function getWikiData(searchText) {
    try {
      const callbackName = 'wikiCallback' + Date.now();
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchText}&callback=${callbackName}`;
  
      const script = document.createElement('script');
  
      return new Promise((resolve) => {
        window[callbackName] = (data) => {
          document.head.removeChild(script);
          resolve(data || []);
          delete window[callbackName];
        };
  
        script.src = apiUrl;
        document.head.appendChild(script);
      });
    } catch (error) {
      console.error(error);
      return [];
    }
  }

export default {getStackOverflowData, getWikiData};