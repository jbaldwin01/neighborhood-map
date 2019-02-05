import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import MainPage from './components/pages/MainPage'
import './App.css'
import  image from './images/powered-by-foursquare-blue.png'

class App extends Component {

  state = {
    venues: [],
    markers: [],
    showingLocations: [],
    map: null,
    infoWindow: null
  }

  componentDidMount() {
    this.getVenues()
  }

  // Update state with filtered locations
  updateLocations = (showingLocations) => {
    this.setState({ showingLocations })
  }

  /*
   * Async request to retrieve venues dynamically.
   * Set renderMap() as callback function of setState() to 
   * ensure renderMap() gets called after async call to 
   * getVenues() has completed and vanues have been stored in state.
   */
  getVenues() {
    const endpoint = "https://api.foursquare.com/v2/venues/explore?"
    const client_id = "FDAMFVN2CLVPRFZSHTJCWLYP34V0FZ1U2N0EU3TO4QUDMBHZ"
    const client_secret = "1I1TBKGC1CI5Z5LMTCJJRUCFLK5AWPANS4QHHEGMDQXEMJWY"
    const near = "Hartford"
    const query = "live music"
    const limit = 12
    fetch(`${endpoint}v=20180323&client_id=${client_id}&client_secret=${client_secret}&near=${near}&query=${query}&limit=${limit}`)
    .then(response => response.json())
    .then(data => {
      this.setState({
        venues: data.response.groups[0].items
      },this.renderMap()) // set renderMap() as callback function
    })
    .catch(error => {console.log(`ERROR: ${error}`)})
  }

  /*
   * Display the map on the page
   */
  renderMap() {
    loadMapAPI("https://maps.googleapis.com/maps/api/js?key=AIzaSyDs8apc-US8cnhHdTl8djgb6tPxXwfGjzg&callback=initMap")
    window.initMap = this.initMap
  }

  // Initialize the map
  initMap = () => {
    const { animateMarker } = this
    const { venues } = this.state
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 41.7658, lng: -72.6734},
      zoom: 12
    })
    this.setState({ map })

    const infoWindow = new window.google.maps.InfoWindow()
    
    // Add location markers to the map
    let mapMarkers = venues.map(mapVenue => {
      let contentString = `${mapVenue.venue.name}<p/>${mapVenue.venue.location.address || 'Address not available'}<p/><img class="fourSquare-image" src=${image} alt="Powered by Foursquare">`
      
      let marker = new window.google.maps.Marker({
        id: mapVenue.venue.id,
        position: {lat: mapVenue.venue.location.lat, lng: mapVenue.venue.location.lng},
        title: mapVenue.venue.name,
        animation: window.google.maps.Animation.DROP,
        map: map
      })

      // Marker clicked
      marker.addListener('click', () => animateMarker(marker, infoWindow, contentString, map))
      return marker
    })
    this.setState({ markers: mapMarkers })
    this.setState({ showingLocations: venues.slice() })
    this.setState({ infoWindow: infoWindow })
  }

  // Bounce marker and open infoWindow
  animateMarker = (marker, infoWindow, contentString, map) => {
    // Animiate marker when clicked
     marker.setAnimation(window.google.maps.Animation.BOUNCE); // Bounce marker
     marker.setAnimation(null) // Stop bounce

    // Change infoWindow content
    infoWindow.setContent(contentString)
    
    // Open infoWindow
    infoWindow.open(map, marker)
  }

  render() {
    return(
      <div className="App">
        <Route exact path='/' render={() => (
            <MainPage
              venues={this.state.venues}
              markers={this.state.markers}
              map={this.state.map}
              showingLocations={this.state.showingLocations}
              updateLocations={this.updateLocations}
              animateMarker={this.animateMarker}
              infoWindow={this.state.infoWindow}
            />
          )}
        />
      </div>
    )
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
