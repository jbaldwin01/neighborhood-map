import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap()
    this.getVenues()
  }

  getVenues() {
    fetch(`https://api.foursquare.com/v2/venues/explore?v=20180323&client_id=FDAMFVN2CLVPRFZSHTJCWLYP34V0FZ1U2N0EU3TO4QUDMBHZ&client_secret=1I1TBKGC1CI5Z5LMTCJJRUCFLK5AWPANS4QHHEGMDQXEMJWY&near=Hartford`)
    .then(response => response.json())
    .then(data => console.log(data))
    // .then(data => console.log(data.response.groups[0].items.map(item => item.venue.name)))
    .catch(error => {console.log(`ERROR: ${error}`)})
  }

  /*
   * Display the map on the page
   */
  renderMap() {
    loadMapAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyDs8apc-US8cnhHdTl8djgb6tPxXwfGjzg&callback=initMap")
    window.initMap = this.initMap
  }

  initMap() {
  // initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.7658, lng: -72.6734},
      zoom: 15
    });
    // map.setZoom(5)
  }

  render() {
    return (
      <main className="app">
        <div id="map"></div>
      </main>
    );
  }
}

/*
 * Create the script element for the map API
 * i.e. <script src="url" async defer></script>
 */
function loadMapAPI(url) {
  const index = window.document.getElementsByTagName("script")[0]
  const script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
