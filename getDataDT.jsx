function App() {
  const { useState, useEffect } = React;
  const { Container } = ReactBootstrap;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("Code");
  const [url, setUrl] = useState(`https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`);


  console.log("Rendering App");

  useEffect(() => {

    console.log("Fetching data...");
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data.title);
      console.log(result.data.title)
      var titles = result.data.title.map(t => {
        return titles = {
          title: t.titleweb,
          author: t.authorweb,
          date: t.onsaledate.substring(t.onsaledate.length - 4),
          pages: t.pages,
          price: t.priceusa,
          image: t['@uri'],

        }
      }
      );
      console.log(titles)
      //setData(titles);
      console.log(result.data.title[0].titleweb)
      $(document).ready(function () {

        $('#books').DataTable({
          "order": [1, 'asc'],
          "autoWidth": true,
          "data": titles,
          language: {
            'search': 'Search Table' /*Empty to remove the label*/
          },
          "columns": [
            {
              data: "image",
              render: function (data, type, row, meta) {
                // onclick = () => {
                //   handleClick()
                // }

                return (
                  '<a href="' + data + '" target="_new"><img src="' + data + '" height="50px"/></a>'
                );
              }
            },
            { "data": "title" },
            { "data": "author" },
            { "data": "date" },
            { "data": "pages" },
            { "data": "price", render: $.fn.dataTable.render.number(",", ".", 2, "$") },

          ]
        });
        $('#books tbody').on('click', 'tr', function () {
          /// do stuff here ///
          alert('hi');
          console.log(result.data.title)
          console.log(query)
        });
      });
    };


    fetchData();

  }, []);

  // const handleClick = () => {
  //   setQuery('lord');
  //   alert(query);
  //   console.log({ query })
  // }
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
      {/* {data.map(t => (
        <ul style={{ listStyleType: "none" }}>
          <li>{t.titleweb}</li>
          <li>{t.authorweb}</li>
          <li>{movie.release_date}</li>
          <li><img src={movie.image} width="20%" /></li>
        </ul>
      ))
      } */}
    </Container >
  );
}
// ========================================
ReactDOM.render(<App />, document.getElementById("root"));

