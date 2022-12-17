import React, { Component } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import axios from "axios";

export class StepFinal extends Component {

  render() {
    const { values: { 
      typeTravaux,
      latitude,
      longitude,
      adresse,
      dateDebut,
      dateFin,
      document,
      infoSupp,
      email } } = this.props

      var date1 = new Date(dateDebut);
      var date2 = new Date(dateFin);

      var Difference_In_Time = date2.getTime() - date1.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

      var duree = Math.floor(Difference_In_Days/30);

      var dateToday = new Date().toJSON().slice(0,10).replace(/-/g,'-');
 
      let toStringIdTypeTravaux = String("/apiplatform/type_travauxes/"+String(typeTravaux));
      let toStringPositionX = String(latitude);
      let toStringPositionY = String(longitude);
      let toStringDateDebut = String(dateDebut);
      let toStringDateFin = String(dateFin);
      let toStringDocument = String(document);
      let toStringInfoSupplementaire = String(infoSupp);
      let toStringEmail = String(email);

      console.log(toStringPositionX);
      const devis = { 
        "idTypeTravaux": toStringIdTypeTravaux,
        "positionX": toStringPositionX,
        "positionY": toStringPositionY,
        "codePostal": parseInt(adresse),
        "dateDebut": toStringDateDebut,
        "dateFin": toStringDateFin,
        "duree": parseInt(duree), 
        "document": toStringDocument,
        "infoSupplementaire": toStringInfoSupplementaire,
        "email": toStringEmail,
        "createdAt": dateToday,
        "etat": 0
      };

      axios.post(`http://localhost:8000/apiplatform/devis_clients`, devis)
        .then(res => {
          console.log(res);
        })
        .catch(error => {console.log(error);})
      


 return (
    <div className="card text-center">
    <div className="card-body">
        <Player  src='https://assets2.lottiefiles.com/packages/lf20_s2lryxtd.json' style={{width: 300}} className="player" loop autoplay />
          <p className="text-success">
            Un responsable vous contactera dans quelques jours.
          </p>
    </div>
  </div>
  );
}
}
 
export default StepFinal;