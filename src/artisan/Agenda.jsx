/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./_styles/agenda.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Agenda = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [events, setEvents] = useState([]);
    const [events2, setEvents2] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const idUtilisateur = localStorage.getItem('id');
    const idArtisan = localStorage.getItem('idArtisan');

    const fetchEvenements = async () => {
      const { data } = await axios.get(`http://localhost:8000/allEvenement/${idUtilisateur}`);
      const rendezVousWithEventType = data.evenement.map(rv => ({ ...rv, eventType: 'evenement' }));
      setEvents((prev) => [...prev, ...rendezVousWithEventType]);
  };
  
  const fetchEvenements2 = async () => {
      const { data } = await axios.get(`http://localhost:8000/allRendezVousArtisan/${idArtisan}`);
      const rendezVousWithEventType = data.rendez_vous.map(rv => ({ ...rv, eventType: 'rendez_vous' }));
      setEvents2((prev) => [...prev, ...rendezVousWithEventType]);
      console.log(events2);
  };
  
  useEffect(() => {
    fetchEvenements();
    fetchEvenements2();
}, [])

const mergedEvents = [...events, ...events2];
console.log(mergedEvents);
    const handlePrevMonth = () => {
      setCurrentMonth(currentMonth - 1);
    };
  
    const handleNextMonth = () => {
      setCurrentMonth(currentMonth + 1);
    };
  
    const addEvent = async (event) => {
      event.preventDefault();
      const newEvent = {
          idUtilisateur: localStorage.getItem('id'),
          evenement: event.target.evenement.value,
          date: event.target.date.value,
          heureDebut: event.target.heureDebut.value,
          heureFin: event.target.heureFin.value
      };
  
      await axios.post('http://localhost:8000/ajouterEvenement', newEvent);
      fetchEvenements();
      toast.success("Evenement ajouter avec succes");
  };
  
  
    
  const removeEvent = async (id) => {
    await axios.delete(`http://localhost:8000/enleverEvenement/${id}`);
    // update the state after removing the event
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    toast.warning("Evenement enlever avec succes");
};

  

    const getMonthName = (month) => {
        const monthNames = [
          "Janvier", "Fevrier", "Mars",
          "Avril", "Mai", "Juin",
          "Juillet", "Août", "Septembre",
          "Octobre", "Novembre", "Decembre"
        ];
        return monthNames[month];
      }

      const handleDayClick = (event) => {
        const clickedDay = event.target.textContent;
        const formattedMonth = (currentMonth + 1).toString().padStart(2, "0");
        const eventsOnClickedDay = events.filter(event => event.date === `${currentYear}-${formattedMonth}-${clickedDay}`);
        const formattedDay = clickedDay.toString().padStart(2, "0");
        const selectedDate = `${currentYear}-${formattedMonth}-${formattedDay}`
        document.getElementById('eventDate').defaultValue = selectedDate;
        if (eventsOnClickedDay.length > 0) {
          setSelectedEvent(eventsOnClickedDay[0]);
        }else{
          setSelectedEvent(null);
        }
      };

      const handleCloseModal = () => {
        setSelectedEvent(null);
    }

      console.log(selectedEvent);
      
      
      const renderCalendarDays = (eventMonth, eventYear) => {
        const monthDays = new Date(eventYear, eventMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(eventYear, eventMonth, 1).getDay();
        const lastDayOfPrevMonth = new Date(eventYear, eventMonth, 0).getDate();
      
        let days = [];
        let startDay = lastDayOfPrevMonth - firstDayOfMonth + 1;
        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<td className="calendar-day calendar-day-disabled">{startDay}</td>);
          startDay++;
        }
        for (let i = 1; i <= monthDays; i++) {
          const currentDate = new Date(eventYear, eventMonth, i);
          let hasEvent = false;
          let eventType = "";
          mergedEvents.forEach((event) => {
            const eventDate = new Date(event.date);
            if (eventDate.getDate() === currentDate.getDate() && eventDate.getMonth() === currentDate.getMonth() && eventDate.getFullYear() === currentDate.getFullYear()) {
              hasEvent = true;
              eventType = event.eventType;
            }
          });
          let className = `calendar-day`;
          if (hasEvent) {
            if (eventType === "rendez_vous") {
              className += ' calendar-day-rendez_vous';
            }
            if (eventType === "evenement") {
              className += ' calendar-day-evenement';
            }
          }
          if (currentDate.getDay() === 0) className += ' calendar-day-sunday';
          days.push(<td className={className} onClick={handleDayClick} style={{cursor: 'pointer'}} data-bs-toggle="modal" data-bs-target="#exampleModal" >{i}</td>);
        }
        let rows = [];
        let cells = [];
        days.forEach((day, i) => {
          if (i % 7 !== 0) {
            cells.push(day);
          } else {
            rows.push(cells);
            cells = [];
            cells.push(day);
          }
          if (i === days.length - 1) {
            rows.push(cells);
          }
        });
        let calendarDays = rows.map((d, i) => <tr key={i}>{d}</tr>);
        return calendarDays;
      }
    

      const validerRDV = (id) => {
        axios.patch(`http://localhost:8000/validerRendezVousByArtisan/${id}`, null)
          .then(response => {
            fetchEvenements2();
            toast.success("Rendez-vous valider avec succes");
          })
          .catch(error => {
            console.log(error);
          });
      }

      

      const calendarDays = renderCalendarDays(currentMonth, currentYear);
      

      const renderEventTable = () => {
        return events.map((event, index) => (
          <tr key={index}>
            <td className='text-center'>{event.evenement}</td>
            <td className='text-center'>{event.date}</td>
            <td className='text-center'>{event.heureDebut}</td>
            <td className='text-center'>{event.heureFin}</td>
            <td className='text-center'>
              <button className='btn btn-danger' onClick={() => removeEvent(event.id)}>Enlever</button>
            </td>
          </tr>
        ));
      }

      const renderRDVTable = () => {
        return events2.map((event, index) => (
          <tr key={index}>
            <td className='text-center'>{event.titre}</td>
            <td className='text-center'>{event.date}</td>
            <td className='text-center'>{event.heureDebut}</td>
            <td className='text-center'>{event.heureFin}</td>
            {
              event.etat === 0 ? 
              (<>
                <td className='text-center'>En attente validation client</td>
              </>) :
              event.etat === 1 ?
              (<>  
                <td className='text-center'>Valider par le client</td>
              </>) :
              event.etat === 2 ?
              (<>
                <td className='text-center'>Refuser par le client</td>
              </>) :
              event.etat === 5 ?
              (<>
                <td className='text-center'>En attente de votre validation</td>
                <td className='text-center'><button className='btn btn-success' onClick={() => validerRDV(event.id)}>Accepter</button></td>
              </>) :
              event.etat === 6 ?
              (<>
                <td className='text-center'>Valider par vous</td>
              </>) :
              (<></>)
            }
          </tr>
        ));
      }
    
      
  
      return (
        <div className='content'>
            <div className="Dashboard section-title"  data-aos="fade-up">
            <h2>Mon agenda</h2>
                <div className='row'>
                    <div className='col-md-6 d-flex justify-content-center'>
                        <div className="calendar">
                            <div className="calendar-header">
                                <button className="calendar-btn calendar-btn-prev" onClick={handlePrevMonth}>Préc</button>
                                <div className="calendar-date">{getMonthName(currentMonth)} {currentYear}</div>
                                <button className="calendar-btn calendar-btn-next" onClick={handleNextMonth}>Suiv</button>
                            </div>
                            <table className="calendar-table">
                                <thead>
                                <tr>
                                    <th>Dim</th>
                                    <th>Lun</th>
                                    <th>Mar</th>
                                    <th>Mer</th>
                                    <th>Jeu</th>
                                    <th>Ven</th>
                                    <th>Sam</th>
                                </tr>
                                </thead>
                                <tbody>
                                  {calendarDays}
                                </tbody>
                            </table>
                            <div className="calendar-event-form">
                                <form onSubmit={addEvent}>
                                <label>
                                    Evenement:
                                    <input className="form-control" type="text" name="evenement" required/>
                                </label>
                                <label>
                                    Date:
                                    <input className="form-control" type="date" name="date" required />
                                </label>
                                <label>
                                    Debut:
                                    <input className="form-control" type="time" name="heureDebut" required />
                                </label>
                                <label>
                                    Fin:
                                    <input className="form-control" type="time" name="heureFin" required />
                                </label>

                                <button type="submit">Ajouter</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    <h1 className='text-center'>Evenement</h1>
                    <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th className='text-center'>Evenement</th>
                                    <th className='text-center'>Date</th>
                                    <th className='text-center'>Début</th>
                                    <th className='text-center'>Fin</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {renderEventTable()}
                                </tbody>
                      </table>
                      <h1 className='text-center'>Rendez-vous</h1>
                      <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th className='text-center'>Titre</th>
                                    <th className='text-center'>Date</th>
                                    <th className='text-center'>Début</th>
                                    <th className='text-center'>Fin</th>
                                    <th className='text-center'>Etat</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {renderRDVTable()}
                                </tbody>
                      </table>
                    </div>
                </div>
            </div>
            {
              selectedEvent === null ?
              (<>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                    <form onSubmit={addEvent}>
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Ajouter evenement</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                          <div className="calendar-event-form">
                                <label>
                                    Evenement:
                                    <input className="form-control" type="text" name="evenement" required />
                                </label>
                                <label>
                                    Date:
                                    <input className="form-control" id='eventDate' type="date" name="date" readOnly/>
                                </label>
                                <label>
                                    Debut:
                                    <input className="form-control" type="time" name="heureDebut" required />
                                </label>
                                <label>
                                    Fin:
                                    <input className="form-control" type="time" name="heureFin" required />
                                </label>
                          </div>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal} data-bs-dismiss="modal">Fermer</button>
                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Ajouter</button>
                      </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>) : (
                <>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{selectedEvent.evenement}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p className='text-dark'>Date: {selectedEvent.date}</p>
                        <p className='text-dark'>Evenement: {selectedEvent.evenement}</p>
                        <p className='text-dark'>Heure debut: {selectedEvent.heureDebut}</p>
                        <p className='text-dark'>Heure fin: {selectedEvent.heureFin}</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal} data-bs-dismiss="modal">Fermer</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => removeEvent(selectedEvent.id)}>Annuler</button>
                      </div>
                    </div>
                  </div>
                </div>                
                </>
              )
            }
                    <ToastContainer
                      position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={true}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      draggable
                      pauseOnHover
                      theme="dark"
                    />
        </div>
      );
    
  };
  

export default Agenda;
