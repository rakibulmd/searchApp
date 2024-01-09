import { useState } from "react";
import SearchResultsWiki from "../SearchResultsWiki";
import FetchFunctions from "../../Utilities/FetchFunctions";
import SearchResultsStack from "../SearchResultsStack";

const Home = () => {
  const engines = [
    { id: 1, name: "StackOverflow" },
    { id: 2, name: "Wikipedia" },
  ];


  const [searchText, setSearchText] = useState("");
  const [searchButtonDisable, setSearchButtonDisable] = useState(true);
  const [searchEngine, setSearchEngine] = useState(1);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e) => {
    setSearchText(e?.target?.value);
    if (e.target.value == "") {
      setSearchButtonDisable(true);
    } else {
      setSearchButtonDisable(false);
    }
  };

  const handleSearchButton = async () => {
    if(searchEngine === 1) {
      setIsLoading(true);
     const data =  await FetchFunctions.getStackOverflowData(searchText);
     setIsLoading(false);
     if(data) {
      // console.log(data);
      setSearchResult(data);
     }
    }
    else if(searchEngine === 2) {
      setIsLoading(true);
      const data =  await FetchFunctions.getWikiData(searchText);
      setIsLoading(false);
      if(data) {
        // console.log(data?.query?.search);
       setSearchResult(data?.query?.search);
      }
     }
    else {
      console.log("Invalid engine");
    }
  };
  return (
    <div className="h-screen w-screen bg-blue-700 text-white p-3 container mx-auto">
      <div className={`${searchResult || isLoading ? "h-1/3 justify-start" : "w-full h-full justify-center "} flex flex-col items-center transition-all duration-300`}>
        <div>
          <h1 className="text-center text-5xl py-5">Search with your preferred models/engines</h1>
          <div className="w-3/4 max-w-[800px] mx-auto block rounded-lg bg-white p-4 mt-9">
            <input
              type="text"
              placeholder="Your search text"
              onChange={handleChange}
              value={searchText}
              className="text-black w-full max-w-[800px] block rounded-sm h-12 p-2 text-lg outline-none"
            ></input>
            {/* button group */}
            <div className="flex justify-between pt-4">
              <div className="flex justify-start gap-1">
                {engines?.map((e) => {
                  return (
                    <button
                      onClick={() => {setSearchEngine(e.id); setSearchResult(null)}}
                      className={`relative ${
                        searchEngine === e.id ? "bg-blue-700 text-white" : "bg-white text-blue-700"
                      } hover:drop-shadow font-bold py-2 px-2 rounded border border-blue-500`}
                      key={e?.id}
                    >
                      {e?.name}
                      {searchEngine === e.id && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                disabled={searchButtonDisable}
                onClick={handleSearchButton}
                className={`${
                  searchButtonDisable ? "bg-gray-600 text-gray-500" : "bg-blue-700"
                } hover:drop-shadow active:bg-blue-500 shadow-zinc-100 transition-all duration-300 text-white font-bold py-2 px-8 rounded`}
              >
                Search
              </button>
            </div>
          </div>
          {isLoading && <p className="text-6xl text-center font-bold tracking-widest mt-12">Loading</p>}
        </div>
      </div>
     
      {searchResult && searchEngine == 1 && <SearchResultsStack data={searchResult}></SearchResultsStack>}
      {searchResult && searchEngine == 2 && <SearchResultsWiki data={searchResult}></SearchResultsWiki>}
    </div>
  );
};

export default Home;
