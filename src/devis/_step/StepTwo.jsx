import { React, useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../_styles/StepTwo.css';
import L from 'leaflet';
import { Modal } from "react-bootstrap";

const StepTwo = ({ nextStep, handleChange, prevStep, values }) => {
  const mapRef = useRef();

  const defaultCenter = [-18.855910, 47.484868];
  const defaultZoom = 12;

  const [positions, setPosition] = useState({
    latitude: '',
    longitude: ''
  })
  let updatedValue = {};


  const LocationFinderDummy = (a) => {
    // eslint-disable-next-line no-unused-vars
    const map = useMapEvents({
        click(e) {
          updatedValue = {latitude: e.latlng.lat, longitude: e.latlng.lng}
          setPosition(positions => ({
            ...positions,
            ...updatedValue
          }
          ))
        },
    });
    return null;
};

const latLng = [positions.latitude, positions.longitude];
values.latitude = positions.latitude;
values.longitude = positions.longitude;

//Icon
var myIcon = L.icon({
	iconUrl: 'assets/img/marker.png',
	iconSize: [25, 45],
	iconAnchor: [12, 45],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});

//Popup
const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


// after form submit validating the form data using validator
 const submitFormData = (e) => {
   e.preventDefault();

   nextStep();
 };




 return(
<div data-aos="fade-left">
      <button onClick={handleShow} className="btn btn-primary" type="submit">Voir la carte</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
          <LocationFinderDummy />
          <Marker position={latLng} icon={myIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
        </MapContainer>
        </Modal.Body>
      </Modal>
  <div className="">
    <form onSubmit={submitFormData}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Latitude</label>
        <input className="form-control" type="text" defaultValue={values.latitude} onMouseMove={handleChange("latitude")} name="latitude" aria-label="readonly input example" readOnly required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Longitude</label>
        <input className="form-control" type="text" defaultValue={values.longitude} onMouseMove={handleChange("longitude")} name="longitude" aria-label="readonly input example" readOnly required/>
      </div>
      <div className="mb-3">
                 <label htmlFor="exampleFormControlInput1" className="form-label">Adresse</label>
                 <input type="text" className="form-control" defaultValue={values.adresse} onChange={handleChange("adresse")} id="exampleFormControlInput1" name="adresse" placeholder="" required/>
             </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button className="btn btn-warning" type="submit" onClick={prevStep}>Précédent</button>
        <button className="btn btn-primary" type="submit">Suivant</button>
      </div>
    </form>
  </div>
  </div>
 )
}
 
export default StepTwo;