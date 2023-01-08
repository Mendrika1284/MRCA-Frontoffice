/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import "./_styles/planification.css"
import 'react-responsive-datepicker/dist/index.css'

const Agenda = () => {
  const idArtisan = localStorage.getItem("idArtisan");
  const userId = localStorage.getItem("id");
  const [isRenovation, setIsRenovationData] = useState(false);
  const [renovationData, setRenovationData] = useState(null);
  const [isMaintenance, setIsMaintenance] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(null);
  const [voirTemps, setVoirTemps] = useState(null);

  useEffect(() => {
    getRenovationData();
  }, []);

  useEffect(() => {
    getMaintenanceData();
  }, []);

  const getRenovationData = () => {
    axios
      .get(`http://localhost:8000/listeInterventionRenovation/${idArtisan}`)
      .then((response) => {
        const fetchedRenovation = response.data;
        setRenovationData(fetchedRenovation);
      })
      .catch((error) => {
        console.error(`Erreur: ${error}`);
      });
  };

  const getMaintenanceData = () => {
    axios
      .get(`http://localhost:8000/listeInterventionMaintenance/${idArtisan}`)
      .then((response) => {
        const fetchedMaintenance = response.data.listeInterventionMaintenance;
        setMaintenanceData(fetchedMaintenance);
      })
      .catch((error) => {
        console.error(`Erreur: ${error}`);
      });
  };

  useEffect(() => {
    if (isRenovation) {
      setIsMaintenance(false);
    }
  }, [isRenovation]);

  useEffect(() => {
    if (isMaintenance) {
      setIsRenovationData(false);
    }
  }, [isMaintenance]);


  // Pour la planification de l'heure et jour de travail
  const [selectedId, setSelectedId] = useState('');

  const handleClickCalendar = (event) => {
    const id = event.currentTarget.id;
    setSelectedId(id);
    setOpenCalendar(id);
  }

  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState(['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']);
  const [selected, setSelected] = useState([]);
  const [times, setTimes] = useState({});

  const toggleSelection = (item) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
      setTimes((prevState) => ({ ...prevState, [item]: undefined }));
    } else {
      setSelected([...selected, item]);
    }
  };

  const handleTimeChange = (event, item) => {
    const { name, value } = event.target;
    setTimes((prevState) => ({ ...prevState, [item]: { ...prevState[item], [name]: value } }));
  };

  const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = selected.map((item) => ({
        item,
        day: selected,
        startTime: times[item]?.startTime,
        endTime: times[item]?.endTime
            })
        );

        const startTimes = data.map((item) => item.startTime);
        const endTimes = data.map((item) => item.endTime);
        const days = data.map((item) => item.day);

        axios.post('http://localhost:8000/planifierTemps/'+selectedId, {
            idUtilisateur: userId,
            idDevisClient: selectedId,
            heureDebut: startTimes,
            heureFin: endTimes,
            jour: days
        });
  };


  const [tempsPlannifier, setTempsPlannifier] = useState(null);

  const VoirMonTemps = (event) => {
    const id = event.currentTarget.id;
    setVoirTemps(id);
    axios
      .get(`http://localhost:8000/voirTempsConfigurer/${id}`)
      .then((response) => {
        const fetchedTemps = response.data;
        setTempsPlannifier(fetchedTemps);
      })
      .catch((error) => {
        console.error(`Erreur: ${error}`);
      });
  }

console.log(tempsPlannifier);

const optionsDate = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  return (
        <div className='content'>
            <div className="Dashboard section-title"  data-aos="fade-up">
                <h2 style={{marginBottom: '200px'}}>Planification intervention</h2>
                {
                    isRenovation === false && isMaintenance === false ? 
                    (
                        <>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card mb-3 shadow p-3 mb-5 bg-body rounded" onClick={() => setIsRenovationData(true)} style={{marginLeft: '200px' ,maxWidth: '540px'}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src="../assets/img/renovation.webp" style={{height: '170px'}} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                            <div className="card-body">
                                                <h1 className="card-title mt-4">Rénovation</h1>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card mb-3 shadow p-3 mb-5 bg-body rounded" onClick={() => setIsMaintenance(true)} style={{maxWidth: '540px'}}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src="../assets/img/depannage.jpeg" style={{height: '170px'}} className="img-fluid rounded-start" alt="..." />
                                            </div>
                                            <div className="col-md-8">
                                            <div className="card-body">
                                                <h1 className="card-title mt-4">Maintenance</h1>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : 
                    isRenovation === true && isMaintenance === false ? 
                    (
                        <div data-aos="fade-up">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID du devis</th>
                                        <th scope="col">Type de travaux</th>
                                        <th scope="col">Date de demande</th>
                                        <th scope="col">Etat de l'intervention</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renovationData ?(
                                    renovationData.listeInterventionRenovation.map((item, index) => (
                                        <tr key={index}>
                                            <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.idDevis}</td>
                                            <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.nomTypeTravaux}</td>
                                            <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate)}</td>
                                            <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.etatIntervention}</td>
                                            <td id={item.idDevis} onClick={(e) => VoirMonTemps(e)} data-bs-toggle="modal" data-bs-target="#exampleModal2">Voir mon temps</td>
                                        </tr>
                                                )
                                            )
                                        ) : (
                                        <tr>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : 
                    isRenovation === false && isMaintenance === true ?
                    (
                        <div data-aos="fade-up">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID du devis</th>
                                        <th scope="col">Type de travaux</th>
                                        <th scope="col">Date de demande</th>
                                        <th scope="col">Etat de l'intervention</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maintenanceData ? (
                                        maintenanceData.listeInterventionMaintenance.map((item, index) => (
                                            <tr key={index}>
                                                <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.idDevis ?? null}</td>
                                                <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.nomTypeTravaux ?? null}</td>
                                                <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{new Date(item.dateCreation).toLocaleDateString("fr-FR", optionsDate) ?? null}</td>
                                                <td id={item.idDevis} onClick={(e) => handleClickCalendar(e)} data-bs-toggle="modal" data-bs-target="#exampleModal">{item.etatIntervention ?? null}</td>
                                                <td id={item.idDevis} onClick={(e) => VoirMonTemps(e)} data-bs-toggle="modal" data-bs-target="#exampleModal2">Voir mon temps</td>
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : null
                }
            </div>
            {
                            openCalendar !== null ? (
                                <div>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <form onSubmit={handleSubmit}>
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Planifier mon temps</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className='container'>
                                                        {items.map((item) => (
                                                            <div key={item}>
                                                                <div className="d-grid gap-2">
                                                                    <button
                                                                        onClick={() => toggleSelection(item)}
                                                                        className='btn btn-outline-secondary mb-4 text-dark'
                                                                        style={{
                                                                        backgroundColor: selected.includes(item) ? 'lightgreen' : 'white',
                                                                        }}
                                                                    >{item}</button>
                                                                </div>
                                                                {selected.includes(item) && (
                                                                    <div>
                                                                    <div className='input-group mb-3'>
                                                                        <span className='input-group-text' id='basic-addon1'>
                                                                            Heure début
                                                                        </span>
                                                                        <input
                                                                            type='time'
                                                                            name='startTime'
                                                                            className='form-control'
                                                                            aria-label='start'
                                                                            value={times[item]?.startTime || ''}
                                                                            onChange={(event) => handleTimeChange(event, item)}
                                                                            />
                                                                        </div>
                                                                        <div className='input-group mb-3'>
                                                                            <span className='input-group-text' id='basic-addon1'>
                                                                                Heure fin
                                                                            </span>
                                                                            <input
                                                                                type='time'
                                                                                name='endTime'
                                                                                className='form-control'
                                                                                aria-label='end time'
                                                                                aria-describedby='basic-addon1'
                                                                                value={times[item]?.endTime || ''}
                                                                                onChange={(event) => handleTimeChange(event, item)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    )
                                                                }
                                                            </div>
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Enregistrer</button>
                                                </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                ) : null
                            }
                            {
                                voirTemps !== null ? (
                                    <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel2">Plannification</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                            {tempsPlannifier && tempsPlannifier.detailDevis ? (
                                            <div>
                                                {tempsPlannifier.detailDevis[0].jour[0].map((day, index) => (
                                                <div key={index}>
                                                   <p className="text-dark">{day}: {tempsPlannifier.detailDevis[0].heureDebut[index]} à {tempsPlannifier.detailDevis[0].heureFin[index]}</p>
                                                </div>
                                                ))}
                                            </div>
                                            ) : (
                                            <p>Pas de plannification</p>
                                            )}
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null
                            }
        </div>
  );
};

export default Agenda;