// questo componente si occuperà di RECUPERARE l'array di prenotazioni
// esistenti, contattando l'API di riferimento e facendo una GET

import { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

// 'https://striveschool-api.herokuapp.com/api/reservation'

// questo componente farà di nuovo uso dello STATE, quindi dobbiamo creare
// ReservationList come CLASSE

// ogni volta che avrete la necessità di caricare un componente e di
// pre-riempirlo con dei dati da un'API... come procedere?
// ogni volta che avrete da salvare dei dati recuperati da un'api
// avrete bisogno di salvarli nello STATE OBJECT

class ReservationList extends Component {
  state = {
    // predisponiamo un posto per accogliere i dati che eventualmente
    // arriveranno dalle API
    reservations: [], // lo inizializziamo come ARRAY VUOTO,
    // perchè in futuro il valore verrà sostituito da un array di oggetti
    // il consiglio è in questo caso di non cambiare il TIPO di dato
    isLoading: true,
    isError: false,
  }

  // quello che ci manca da fare è riempire l'array reservations nello state
  getAllReservations = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/reservation'
      )
      if (response.ok) {
        let data = await response.json()
        console.log(data)
        this.setState({
          reservations: data,
          isLoading: false,
        })
      } else {
        console.log('errore nella chiamata')
        this.setState({
          isLoading: false,
          isError: true,
        })
      }
    } catch (error) {
      console.log(error)
      this.setState({
        isLoading: false,
        isError: true,
      })
    }
  }

  // quello che ci servirebbe è un altro metodo del lifecycle
  // che abbia la garanzia di venire invocato UNA-SOLA-VOLTA!
  componentDidMount() {
    // esiste solamente in componenti fatti a classe!
    // questo è il posto corretto dove inserire la vostra funzione
    // che si occupa di fare il popolamento iniziale del componente!

    // DOPO LA PRIMA INVOCAZIONE DI RENDER PARTE COMPONENTDIDMOUNT!
    console.log('SONO COMPONENTDIDMOUNT()!')
    this.getAllReservations()

    // componentDidMount è il posto IDEALE per fare fetch iniziali
    // o per qualsiasi operazione costosa, dispensiosa, esosa in termini
    // di risorse
  }

  render() {
    // NON VA BENE CHIAMARE getAllReservations() nel render()
    // perchè getAllReservations() dopo aver preso i dati fa un setState()!
    // setState() invoca render() automaticamente di nuovo
    // ......... infinite loop :''(
    // this.getAllReservations()
    console.log('SONO RENDER()!')
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <h2>LISTA DELLE PRENOTAZIONI</h2>

            {/* LOGICA DI ERRORE */}
            {this.state.isError && (
              <Alert variant="danger">Qualcosa è andato storto :(</Alert>
            )}

            {/* LOGICA DI CARICAMENTO */}
            {/* RENDERING CONDIZIONALE 1: ternary operator */}
            {/* {this.state.isLoading ? <div>ok</div> : <div>non ok</div>} */}

            {/* RENDERING CONDIZIONALE 2: SHORT CIRCUIT*/}
            {/* && --> SHORT CIRCUIT OPERATOR */}
            {this.state.isLoading && (
              <div className="text-center">
                <Spinner animation="border" role="status" variant="success">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}

            <ListGroup>
              {/* predisponiamo questa lista per leggere costantemente
                il valore di this.state.reservations e generare dinamicamente
                i list item per ogni prenotazione */}
              {this.state.reservations.map((booking) => (
                <ListGroup.Item key={booking._id}>
                  {booking.name} per {booking.numberOfPeople}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ReservationList

// CATENA DEGLI EVENTI DI QUESTO COMPONENTE
// 1) IL COMPONENTE VIENE CREATO, LO STATO È INIZIALIZZATO CON L'ARRAY VUOTO
// 2) RENDER, il metodo obbligatorio, viene invocato una prima volta,
// di fatto genera tutte le parti statiche (con il container, la listgroup vuota etc.)
// 3) visto che l'abbiamo inserito, viene lanciato COMPONENTDIDMOUNT, un metodo
// di cui abbiamo la garanzia venga invocato UNA SOLA VOLTA per lifecycle
// 4) componentDidMount fa la fetch, e con i dati ottenuti SETTA LO STATO
// 5) setState in un componente a classe RI-INVOCA render()!
// 6) render() riparte, react è furbo abbastanza da NON ridisegnare le parti
// statiche che erano già state inserite nel DOM alla prima invocazione, ma
// arrivato all parte dinamica con il .map() questa volta si occuperà di generare
// tutti i list item necessari

// REGOLE CHE ABBIAMO IMPARATO OGGI:
// 1) setState() provoca una nuova invocazione di render()
// 2) se presente, componentDidMount verrà invocato immediatamente dopo
// la prima invocazione di render()
