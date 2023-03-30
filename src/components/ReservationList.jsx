// questo componente si occuperà di RECUPERARE l'array di prenotazioni
// esistenti, contattando l'API di riferimento e facendo una GET

import { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

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
        })
      } else {
        console.log('errore nella chiamata')
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    // NON VA BENE CHIAMARE getAllReservations() nel render()
    // perchè getAllReservations() dopo aver preso i dati fa un setState()!
    // setState() invoca render() automaticamente di nuovo
    // ......... infinite loop :''(
    // this.getAllReservations()
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8} lg={6}>
            <h2>LISTA DELLE PRENOTAZIONI</h2>
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
