const SearchResultsStack = ({ data }) => {
  return (
    <div className="py-20 bg-blue-700">
      <p className="text-4xl text-bold py-6">This is search result from Stack Overflow.</p>
      <div className="">
        {data?.map((d, i) => (
          <div key={i} className="text-white hover:underline text-lg py-3">
            <a
              href={d.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-300"
            >
              {d.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsStack;
