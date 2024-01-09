// eslint-disable-next-line react/prop-types
const SearchResultsWiki = ({ data }) => {
  function removeHtmlTags(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.body.textContent || "";
  }
  return (
    <div className="py-20 bg-blue-700">
      <p className="text-4xl text-bold py-6">This is search result from Wikipedia.</p>
      <div className="">
        {data?.map((d, i) => (
          <div key={i} className="text-white hover:underline text-lg py-3">
            <a
              href={`https://en.wikipedia.org/wiki/?curid=${d.pageid}
              `}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              {d?.title} <div> {removeHtmlTags(d?.snippet)}</div>
            </a>
           
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsWiki;
