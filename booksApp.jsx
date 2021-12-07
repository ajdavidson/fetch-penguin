function App() {
  const {useState, useEffect} = React;
  const {
    Container,
    Button,
    Modal,
    Card,
    Image,
    ListGroup,
    ListGroupItem,
    InputGroup,
    FormControl,
    Row,
    Col,
    Spinner
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
  const [isbn, setIsbn] = useState('0');
  const [year, setYear] = useState('1');
  const [price, setPrice] = useState(0);
  //const [isLoading, setIsLoading] = useState(true);

  console.log("Rendering App");

  useEffect(() => {
    $("#books").hide()
    $("#spinner").show()
    $("#loading").show()
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

      if (!$.fn.dataTable.isDataTable('#books')) {
        $('#books').DataTable({
          destroy: true,
          "order": [1, 'asc'],
          "autoWidth": false,
          columnDefs: [
            { orderable: false, targets: 0 }
          ],
          //"scrollY": 450,
          //"scrollCollapse": true,
          language: {
            search: `<i class="fas fa-search fa-lg" style="color: #FF6600"></i> ` /*Empty to remove the label*/
          },
          "columns": [
            {"width": "1%"},
            {"width": "40%"},
            {"width": "20%"},
            {"width": "20%"},
            {"width": "05%"},
            {"width": "05%"},
            {"width": "05%"},
            // { "width": "20px" }
          ],

        });

      }
      // else {
      //     $("#books").DataTable().clear();
      //   $("#books").DataTable().draw();
      // }


      // $('#books tbody').on('click', 'tr', function () {
      //     /// do stuff here ///
      //     alert('hi');
      //     console.log(result.data.title)
      //     console.log(query)
      // });


      // $('#books').DataTable({
      //   //    ajax: "https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=code",
      //   fixedHeader: true,
      //   scrollY: '67vh',
      //   scrollCollapse: true,
      //   "order": [1, 'asc'],
      //   "autoWidth": true,
      //   language: {
      //     'search': 'Search' /*Empty to remove the label*/
      //   },
      //
      // });


    };


    fetchData().then(r => {
      //$("#books").hide()

      $("#books").show()
      $("#spinner").hide()
      $("#loading").hide()


    });

  }, [url]);

  function handlePre() {
    //$("#books").DataTable().clear();
    //$("#books").DataTable().draw();
    $("#books").hide()
    $("#books").DataTable().destroy();
    // $("thead", $("#books").DataTable()).remove();

  }

  function handlePost() {
    //let url = `https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`
    //$("#books").DataTable().url(url).reload();

    setUrl(`https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`)

    //$("#books").show()
  }

  const handleClose = () => setShow(false);

  const handleShow = (title, cover, author, format, pages, bio, copy, isbn, year, price) => {
    setShow(true);
    //year = year.substring(t.onsaledate.length - 4);
    setTitle(title);
    setCover(cover);
    setAuthor(author);
    setFormat(format);
    setPages(pages);
    setBio(bio);
    setCopy(copy);
    setIsbn(isbn);
    setYear(year.substring(year.length - 4));
    setPrice(price);
  }
  // const handleClick = () => {
  //   setQuery('lord');
  //   alert(query);
  //   console.log({ query })
  // }

  return (
    <Container fluid>

      <Row>
        <Col>
          <Image src="PRH-logo.png" width="250px"/>

        </Col>
        <Col className="d-flex align-items-end" style={{paddingBottom: '10px'}}>
          <InputGroup className="mb-3">
            <InputGroup.Text style={{color: 'FF6600', background: 'none', width: '50px', border: '0'}}>
              <Spinner className="spinner" id="spinner" size="sm" animation="border" role="status"
                       style={{color: 'FF6600'}}/></InputGroup.Text>
            <InputGroup.Text>
              Keywords or Phrase:</InputGroup.Text>
            <FormControl
              placeholder={query}
              aria-label="Keywords"
              aria-describedby="basic-addon2"
              //value={query}
              onChange={event => setQuery(event.target.value)}
              aria-label="Recipient's username with two button addons"
            />
            <Button
              style={{backgroundColor: 'FF6600', color: 'white'}}
              variant="outline-secondary"
              id="button-load"
              onClick={() => {
                handlePre()

                handlePost()
                //handlePost().then(() => $("#books").show())
                //setUrl(`https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`)
                //$("#books").DataTable().draw();
              }
              }>
              Load
            </Button>
          </InputGroup>
          {/*<InputGroup>*/}
          {/*  <Button variant="outline-secondary" id="button-addon1"*/}
          {/*          style={{width: '50px', border: '0', color: 'FF6600'}}>*/}
          {/*    <Spinner className="spinner" id="spinner" size="sm" animation="border" role="status"*/}
          {/*             style={{color: 'FF6600'}}/>*/}
          {/*  </Button>*/}
          {/*  <InputGroup.Text style={{color: 'FF6600',background:'none'}}>*/}
          {/*    Enter Keywords</InputGroup.Text>*/}
          {/*  <FormControl*/}
          {/*    value={query}*/}
          {/*    onChange={event => setQuery(event.target.value)}*/}
          {/*    aria-label="Recipient's username with two button addons"*/}
          {/*  />*/}
          {/*  <Button*/}
          {/*    variant="outline-secondary"*/}
          {/*    onClick={() => {*/}
          {/*      handlePre()*/}

          {/*      handlePost()*/}
          {/*      //handlePost().then(() => $("#books").show())*/}
          {/*      //setUrl(`https://reststop.randomhouse.com/resources/titles?start=0&max=100&expandLevel=1&search=${query}`)*/}
          {/*      //$("#books").DataTable().draw();*/}
          {/*    }*/}
          {/*    }*/}

          {/*  >Load</Button>*/}
          {/*</InputGroup>*/}

        </Col>
      </Row>

      <table id="books" class="display" style={{width: "100%"}}>
        {/*<caption>Result Table for Keyword: {query} </caption>*/}
        <thead>
        <tr style={{color: 'FF6600'}}>
          <th></th>
          <th>Title</th>
          <th>Author</th>
          <th>Format</th>
          <th>Pages</th>
          <th>Year</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {!data ? console.log('no data') : data.map(t => (
          <tr>
            <td width={'100px'}>
              <Button variant="outline-*"
                      x={t.titleweb}
                      onClick={() => {
                        handleShow(t.titleweb, t['@uri'], t.authorweb, t.formatname, t.pages, t.authorbio, t.flapcopy, t.isbn, t.onsaledate, t.priceusa);
                        console.log('Zoom...');
                      }
                      }><i class="fas fa-search-plus" style={{color: 'FF6600'}}></i>
              </Button>
            </td>
            {/* <td><img height="55px" src={t['@uri']} /></td> */}
            <td>{t.titleweb}</td>
            <td>{t.authorweb}</td>
            <td>{t.formatname}</td>
            <td>{t.pages}</td>
            <td>{t.onsaledate.substring(t.onsaledate.length - 4)}</td>
            <td>${t.priceusa}</td>
          </tr>
        ))}
        </tbody>
        {/* <tfoot>
          <tr style={{ color: 'FF6600' }}>
            <th></th> */}
        {/* <th>Image</th> */}
        {/* <th>Title</th>
            <th>Author</th>
            <th>Format</th>
            <th>Pages</th>
            <th>Year</th>
            <th>Price</th>
          </tr>
        </tfoot> */}
      </table>

      {/*<Spinner className="spinner" id="spinner" size="lg" animation="grow" variant="secondary" role="status"/>*/}
      <Modal show={show} size="xl" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h1><i className="fas fa-book"
                              style={{color: 'FF6600'}}/> {title}</h1></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem><i className="fab fa-readme fa-3x"
                              style={{color: 'FF6600', float: 'left', paddingRight: '10px'}}></i>
              <Card.Img src={cover}
                        style={{
                          width: '250px',
                          float: 'right',
                          paddingLeft: '25px'
                        }}/> <span
                dangerouslySetInnerHTML={{__html: copy}}/></ListGroupItem>
            <ListGroupItem><i class="fas fa-user" style={{color: 'FF6600'}}></i> <span
              dangerouslySetInnerHTML={{__html: bio}}/></ListGroupItem>
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Modal.Title style={{paddingRight: '20px'}}><i class="fas fa-bookmark" style={{color: 'FF6600'}}></i> {format}
          </Modal.Title>
          <Modal.Title style={{paddingRight: '20px'}}><i className="fas fa-book-open"
                                                         style={{color: 'FF6600'}}></i> {pages} pgs </Modal.Title>
          <Modal.Title style={{paddingRight: '20px'}}><i class="fas fa-calendar-alt"
                                                         style={{color: 'FF6600'}}></i> {year} </Modal.Title>
          <Modal.Title style={{paddingRight: '20px'}}><i class="fas fa-barcode" style={{color: 'FF6600'}}></i> {isbn}
          </Modal.Title>
          <Modal.Title style={{color: 'FF6600'}}> ${price} </Modal.Title>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

// ========================================
ReactDOM.render(<App/>, document.getElementById("root"));

