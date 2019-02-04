import React, { Component } from 'react'
import escapeRegexp from 'escape-string-regexp'
import Header from '../Header.js'
import ListView from '../ListView.js'
import Map from '../Map.js'
import image from '../../images/powered-by-foursquare-blue.png'

class MainPage extends Component {
  state = {
    query: '',
    showListView: true
  }
  filteredLocations = []

  updateQuery = (query) => {
    const { venues, updateLocations, markers, map } = this.props
    this.setState({ query: query })
    // only show matching markers
    if (query) {
      // filter list of locations
      const match = new RegExp(escapeRegexp(query), 'i') // ignore case
      this.filteredLocations = venues.filter((location) => match.test(location.venue.name))
    } else {
      this.filteredLocations = venues
    }
    updateLocations({ showingLocations: this.filteredLocations })

    venues.map(location => {
      const isMatched = location.venue.name.toLowerCase().includes(query.toLowerCase())
      const marker = markers.find(marker => marker.id === location.venue.id)
      if (isMatched) {
        marker.setMap(map)
      } else {
        marker.setMap(null)
      }
      return marker
    })
  }

  handleClick = (id) => {
    // this.toggleListView()
    const { venues, markers, map, animateMarker, infoWindow } = this.props
    const marker = markers.find(marker => marker.id === id)
    const location = venues.find(location => location.venue.id === id)
    const contentString = `${location.venue.name}<p/>${(location.venue.location.address) || 'Address not available'}<p/><img class="fourSquare-image" src=${image} alt="Powered by Foursquare">`
    animateMarker(marker, infoWindow, contentString, map)
  }

  toggleListView = () => {
    const isVisible = this.state.showListView === false ? true : false
    this.setState({ showListView: isVisible })
  }

  render() {
    const { updateQuery, handleClick, toggleListView } = this
    const { showingLocations } = this.props
    const { showListView } = this.state

    let myLocations
    if (showingLocations.length > 0) {
      myLocations = showingLocations
    } else {
      myLocations = this.filteredLocations
    }

    return (
      <main className="main-page">
        <Header
          toggleListView={toggleListView}
        />
        <div className="container">
          <ListView
            myLocations={myLocations}
            updateQuery={updateQuery}
            handleClick={handleClick}
            showListView={showListView}
          />
          <Map 
            showListView={showListView}
          />
        </div>
      </main>
    )
  }
}
export default MainPage
