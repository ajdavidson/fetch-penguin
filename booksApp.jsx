function App() {
    const { useState, useEffect } = React;
    const {
        Container,
        Button,
        Modal,
        Card,
        Image,
        ListGroup,
        ListGroupItem
    } = ReactBootstrap;
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("programming");
    const [url, setUrl] = useState(`https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('Empty Title');
    const [cover, setCover] = useState('Empty Link');
    const [author, setAuthor] = useState('Empty Title');
    const [format, setFormat] = useState('Empty Title');
    const [pages, setPages] = useState('Empty Title');
    const [bio, setBio] = useState('Empty Title');
    const [copy, setCopy] = useState('Empty Title');

    console.log("Rendering App");

    useEffect(() => {

        console.log("Fetching data...");
        const fetchData = async () => {
            const result = await axios(url);
            setData(result.data.title);
            console.log(result.data.title)
            // var titles = result.data.title.map(t => {
            //     return titles = {
            //         image: t['@uri'],
            //         title: t.titleweb,
            //         author: t.authorweb,
            //         date: t.onsaledate.substring(t.onsaledate.length - 4),
            //         pages: t.pages,
            //         price: t.priceusa,

            //     }
            // }

            // );
            //setData(titles)
            //console.log(titles)
            //setData(titles);
            // console.log(result.data.title[0].titleweb)

            // if (!$.fn.dataTable.isDataTable('#books')) {
            //     $('#books').DataTable({
            //         //    ajax: "https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=code",
            //         "order": [1, 'asc'],
            //         "autoWidth": true,
            //         language: {
            //             'search': 'Search Table' /*Empty to remove the label*/
            //         },

            //     });

            // }
            // else {
            //     $("#books").DataTable().ajax.reload(null, false);
            // }


            // $('#books tbody').on('click', 'tr', function () {
            //     /// do stuff here ///
            //     alert('hi');
            //     console.log(result.data.title)
            //     console.log(query)
            // });

            $('#books').DataTable({
                //    ajax: "https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=code",
                "order": [1, 'asc'],
                "autoWidth": true,
                language: {
                    'search': 'Search' /*Empty to remove the label*/
                },

            });
        };


        fetchData();

    }, []);
    const handleClose = () => setShow(false);

    const handleShow = (title, cover, author, format, pages, bio, copy) => {
        setShow(true);

        setTitle(title);
        setCover(cover);
        setAuthor(author);
        setFormat(format);
        setPages(pages);
        setBio(bio);
        setCopy(copy);
    }
    // const handleClick = () => {
    //   setQuery('lord');
    //   alert(query);
    //   console.log({ query })
    // }
    return (
        <Container>
            <Image src="PRH-logo.png" />
            {/* <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
            /> */}
            {/* <button
        type="button"
        onClick={() => setUrl("https://ghibliapi.herokuapp.com/films/")}
      >
        Search
      </button> */}
            <table id="books" class="display" style={{ width: "100%" }}>
                <thead>
                    <tr style={{ color: 'FF6600' }}>
                        <th></th>
                        {/* <th>Image</th> */}
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Pages</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(t => (
                        <tr>
                            <td>
                                <Button variant="outline-*"
                                    x={t.titleweb}
                                    onClick={() => {
                                        handleShow(t.titleweb, t['@uri'], t.authorweb, t.formatname, t.pages, t.authorbio, t.flapcopy);
                                        console.log('Showing Banner...');
                                    }
                                    }><i class="fas fa-search-plus"></i>
                                </Button>
                            </td>
                            {/* <td><img height="55px" src={t['@uri']} /></td> */}
                            <td>{t.titleweb}</td>
                            <td>{t.authorweb}</td>
                            <td>{t.onsaledate.substring(t.onsaledate.length - 4)}</td>
                            <td>{t.pages}</td>
                            <td>${t.priceusa}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr style={{ color: 'FF6600' }}>
                        <th></th>
                        {/* <th>Image</th> */}
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Pages</th>
                        <th>Price</th>
                    </tr>
                </tfoot>
            </table>
            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i class="fas fa-book-open"></i> {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><i class="far fa-bookmark"></i> {format}</ListGroupItem>
                        <ListGroupItem><i class="fas fa-pen-fancy"></i> {author}</ListGroupItem>
                        <ListGroupItem><i class="far fa-user"></i> {bio}</ListGroupItem>
                        <ListGroupItem><i class="far fa-file-alt"></i> {copy}</ListGroupItem>
                        <ListGroupItem>
                            /
                            <Card.Img src={cover} style={{ width: '50%' }} />
                        </ListGroupItem>
                    </ListGroup>
                    {/* <Card.Img src={cover} style={{ width: '50%' }} fluid /> */}
                </Modal.Body>
            </Modal>
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

