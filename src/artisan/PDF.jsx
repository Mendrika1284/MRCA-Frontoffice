import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
  } from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
  // PDF Styles
  const styles = StyleSheet.create({
    page: {
      color: "black",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    viewer: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });
  
  // Create Document Component
  function PDF() {
    let { id } = useParams();

    const [detailDevis, setDetailDevis] = useState(null);

    useEffect(() => {
        getDetailDevis();
    }, []);

    const getDetailDevis = () => {
        axios
          .get("http://localhost:8000/visualiserDevisArtisanApreparer/" + parseInt(id))
          .then((response) => {
            const devisClient = response.data;
            setDetailDevis(devisClient);
          })
          .catch((error) => {
            console.error(`Erreur: ${error}`);
          });
      };

    return (
      detailDevis ? (
          <PDFViewer style={styles.viewer}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                  <Text>Type Travaux: {detailDevis.detailDevis[0].nomTypeTravaux}</Text>
                  <Text>Nom: {detailDevis.detailUtilisateur[0].nomUtilisateur}</Text>
                  <Text>Prénom: {detailDevis.detailUtilisateur[0].prenomUtilisateur}</Text>
                  <Text>Contact: {detailDevis.detailUtilisateur[0].contactUtilisateur}</Text>
                  <Text>Email: {detailDevis.detailDevis[0].emailClient}</Text>
                  <Text>Montant: {detailDevis.detailDevis[0].montant} Ariary</Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
      ) : (
          <PDFViewer style={styles.viewer}>
          <Document>
            <Page size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text>Donnée non trouvable</Text>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )
    );
  }
  export default PDF;