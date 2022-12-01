import { React, useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../_styles/StepTwo.css';
import L from 'leaflet';

const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  const mapRef = useRef();

  const defaultCenter = [-18.855910, 47.484868];
  const defaultZoom = 12;

  const [positions, setPosition] = useState({
    latitude: '',
    longitude: ''
  })
  let updatedValue = {};

  //Mbola tsy mety ito
  const LocationFinderDummy = (a) => {
    const map = useMapEvents({
        click(e) {
          updatedValue = {latitude: e.latlng.lat, longitude: e.latlng.lng}
          setPosition(positions => ({
            ...positions,
            ...updatedValue
          }))
        },
    });
    return null;
};

const latLng = [positions.latitude, positions.longitude];

var myIcon = L.icon({
	iconUrl: 'assets/img/marker.png',
	iconSize: [25, 45],
	iconAnchor: [12, 45],
	popupAnchor: [-3, -76],
	shadowSize: [68, 95],
	shadowAnchor: [22, 94]
});

   //creating error state for validation
   const [error, setError] = useState(false);

   // after form submit validating the form data using validator
 const submitFormData = (e) => {
   e.preventDefault();

   values.latitude = positions.latitude;
   values.longitude = positions.longitude;

   nextStep();
 };

/* function LocationMarker() {
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={myIcon}>
      <Popup>You are here</Popup>
    </Marker>
  )
} */


 return(
  <div>
  <div className="">
      <MapContainer ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <LocationFinderDummy />
        <Marker position={latLng} icon={myIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </MapContainer>
  </div>
  <div className="">
  <form onSubmit={submitFormData}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Latitude</label>
        <input className="form-control" type="text" defaultValue={positions.latitude} placeholder={values.latitude} aria-label="readonly input example" onChange={handleFormData("latitude")} readOnly required />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Longitude</label>
        <input className="form-control" type="text" defaultValue={positions.longitude} placeholder={values.longitude} aria-label="readonly input example" onChange={handleFormData("longitude")} readOnly required/>
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