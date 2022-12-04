import React, { Component } from "react";
import { Player } from '@lottiefiles/react-lottie-player';

export class StepFinal extends Component {

  render() {
    const { values: { 
      typeTravaux,
      latitude,
      longitude,
      adresse,
      duree,
      document,
      infoSupp,
      email } } = this.props


 return (
    <div className="card text-center">
    <div className="card-body">
        <Player  src='https://assets2.lottiefiles.com/packages/lf20_s2lryxtd.json' style={{width: 300}} className="player" loop autoplay />
          <p>
            <strong>Type Travaux:</strong> {typeTravaux}
          </p>
          <p>
            <strong>Latitude :</strong> {latitude}
          </p>
          <p>
            <strong>Longitude :</strong> {longitude}
          </p>
          <p>
            <strong>Adresse :</strong> {adresse}
          </p>
          <p>
            <strong>Duree :</strong> {duree}
          </p>
          <p>
            <strong>Document :</strong> {document}
          </p>
          <p>
            <strong>infoSupp :</strong> {infoSupp}
          </p>
          <p>
            <strong>Email :</strong> {email}
          </p>
    </div>
  </div>
  );
}
}
 
export default StepFinal;