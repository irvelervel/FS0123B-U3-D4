import './App.css'
// il fatto di aver installato bootstrap e react-bootstrap nel mio progetto
// non rende bootstrap automaticamente disponibile in ogni componente!
import 'bootstrap/dist/css/bootstrap.min.css'
import CustomNavbar from './components/CustomNavbar'
import Home from './components/Home'
import ReservationForm from './components/ReservationForm'
import ReservationList from './components/ReservationList'
// questo rende disponibile il file CSS di bootstrap a tutto il mio progetto

const App = () => {
  return (
    // JSX
    <div className="App">
      {/* questa è un'INVOCAZIONE di un componente React */}
      <CustomNavbar brandTitle="Homepage" />
      {/* grazie alla prop brandTitle possiamo personalizzare
      parte del testo nella sezione "brand" */}
      {/* <CustomNavbar brandTitle="Stefano" /> */}

      <ReservationList />
      <ReservationForm />

      <Home />
    </div>
  )
}

export default App
