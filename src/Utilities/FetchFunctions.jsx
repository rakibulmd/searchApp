import axios from "axios";


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
// async function getWikiData(searchText) {
//     try {
//       const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${searchText}`);
//       if(response?.data?.search.length != 0) {
//         console.log(response?.data?.search);
//         return response?.data?.search
//       }
//       else {
//         return 0;
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

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