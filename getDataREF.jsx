function App() {
  const { useState, useEffect } = React;
  const { Container } = ReactBootstrap;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("lord");
  const [url, setUrl] = useState("https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=lord");


  console.log("Rendering App");

  useEffect(() => {

    console.log("Fetching data...");
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data.title);
      console.log(result.data.title)
      const titles = result.data.title.map(t => {
        return [t.titleweb, t.authorweb].join(" ");
      }
      );
      console.log(titles[0])
      //setData(titles);
      console.log(result.data.title[0].titleweb)
    };

    fetchData();

  }, []);

  return (
    <Container>
      {/* <input
        type="text"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() => setUrl("https://ghibliapi.herokuapp.com/films/")}
      >
        Search
      </button> */}
      {data.map(t => (
        <ul style={{ listStyleType: "none" }}>
          <li>{t.titleweb}</li>
          <li>{t.authorweb}</li>
          {/* <li>{movie.release_date}</li>
          <li><img src={movie.image} width="20%" /></li> */}
        </ul>
      ))
      }
    </Container >
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

//  // "https://hn.algolia.com/api/v1/search?query=redux"
