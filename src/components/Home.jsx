import { Component } from 'react'
// le parentesi graffe servono quando dovete importare un qualcosa
// che NON È l'export di default del pacchetto

// import MIGLIORE per un componente react-bootstrap
import Carousel from 'react-bootstrap/Carousel'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

import dishes from '../data/menu.json'
// dishes è un array di piatti

// import meno efficiente: (non usare)
// import { Carousel } from 'react-bootstrap'

// state
// È possibile fornire un componente di uno STATO
// uno stato è un oggetto JS in cui è possibile memorizzare delle informazioni
// lo stato si RESETTA ogni volta che il componente viene ri-montato
// è nostra intenzione utilizzare lo stato del componente Home per ricordarci
// qual è l'ultima pasta su cui abbiamo cliccato, qual è la pasta SELEZIONATA
// in fondo alla pagina mostreremo le recensioni della pasta SELEZIONATA

// un oggetto state è una funzionalità presente solo in COMPONENTI A CLASSE!

class Home extends Component {
  // quest'oggetto si chiama "state"
  // non potete chiamarlo "stefano" :(
  state = {
    // inseriamo lo stato INIZIALE del componente
    selectedPasta: null,
    // selectedPasta diventerà al click del carosello
    // uno degli oggetti del json!
    // diventerà un oggetto dopo il click del carosello,
    // ma come valore iniziale (visto che non abbiamo ancora cliccato su nulla)
    // gli fornisco 'null'
  }

  // render è l'unico metodo OBBLIGATORIO
  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            {/* col-12 col-md-8 col-lg-6 */}
            <Carousel>
              {dishes.map((dish) => {
                return (
                  <Carousel.Item key={dish.id}>
                    {/* OGNI VOLTA che fate un map, dovete fornire
                    all'elemento che generate una proprietà "key"
                    con valore univoco */}
                    {/* aggiungere una key è fondamentale a livello
                    di PERFORMANCE! */}
                    <img
                      className="d-block w-100"
                      src={dish.image}
                      alt="First slide"
                      onClick={() => {
                        console.log('Ciao!')
                        this.setState({
                          selectedPasta: dish,
                        })
                        // lo state object è immutabile nei componenti React
                        // è possibile solamente crearne uno nuovo ogni volta
                        // tramite il metodo chiamato "setState" che trovate
                        // su this
                        // setState accetta un parametro che sarà il nuovo
                        // stato del componente
                      }}
                    />
                    <Carousel.Caption>
                      <h3>{dish.name}</h3>
                      <p>{dish.description}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <ListGroup>
              {/* ? è un operatore chiamato OPTIONAL CHAINING */}
              {this.state.selectedPasta?.comments.map((review) => {
                return (
                  <ListGroup.Item key={review.id}>
                    {review.rating} | {review.comment}
                  </ListGroup.Item>
                )
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Home
