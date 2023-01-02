/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const HistoriqueIntervention = () => {
  const userId = localStorage.getItem("id");
  const [interventions, setInterventions] = useState(null);

  useEffect(() => {
    getInterventions();
  }, []);

  const getInterventions = () => {
    axios
      .get(`http://localhost:8000/listeInterventionClient/${userId}`)
      .then((response) => {
        const fetchedInterventions = response.data.interventions;
        setInterventions(fetchedInterventions);
      })
      .catch((error) => {
        console.error(`Erreur: ${error}`);
      });
  };

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };


  // Add a state variable to store the selected intervention's id
  const [selectedId, setSelectedId] = useState(null);

  // Modify the voirDetail function to set the state variables

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  function voirDetail(id){
    setShow(true);
    setSelectedId(id);
  }

  return (
    <div className='content'>
        <div className="Dashboard section-title"  data-aos="fade-up">
        <h2>Historique intervention</h2>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th className="text-center">#</th>
                        <th className="text-center">Date Demande</th>
                        <th className="text-center">Date Intervention</th>
                        <th className="text-center">Etat Intervention</th>
                        <th className="text-center">Etat Paiement</th>
                        <th className="text-center">Nom Artisan</th>
                    </tr>
                </thead>
                <tbody>
                    {interventions &&
                    interventions.map((intervention) => (
                        <tr key={intervention.idDevis} onClick={() => voirDetail(intervention.idDevis)}>
                            <td className="text-center">{intervention.idDevis}</td>
                            <td className="text-center">{new Date(intervention.dateDemande.date).toLocaleDateString("fr-FR", options)}</td>
                            <td className="text-center">{new Date(intervention.dateIntervention.date).toLocaleDateString("fr-FR", options)}</td>
                            <td className="text-center">{intervention.etatIntervention}</td>
                            <td className="text-center">{intervention.etatPaiement}</td>
                            <td className="text-center">{intervention.nomArtisan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal className="d-flex justify-content-center" show={show} onHide={handleClose}>
                <Modal.Body>
                    {selectedId}
                </Modal.Body>
            </Modal> 
        </div>
    </div>
  );
};

export default HistoriqueIntervention;