import React, { Component } from 'react'
import escapeRegexp from 'escape-string-regexp'

class MainPage extends Component {
  state = {
    query: ''
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
    const { venues, markers, map, animateMarker, infoWindow } = this.props
    const marker = markers.find(marker => marker.id === id)
    const location = venues.find(location => location.venue.id === id)
    const contentString = `${location.venue.name}<p/>${(location.venue.location.address) || 'Address not available'}`
    animateMarker(marker, infoWindow, contentString, map)
  }

  render() {
    const { updateQuery, handleClick } = this
    const { query } = this.state
    const { showingLocations } = this.props

    let myLocations
    if (showingLocations.length > 0) {
      myLocations = showingLocations
    } else {
      myLocations = this.filteredLocations
    }

    return (
      showingLocations &&
      <main className="main-page">
        <div className="container">
        <div className="options-box">
          <h1>Neighborhood Restaurants</h1>
          <hr/>
          <div>
            <label htmlFor="places-search">Filter Locations</label>
            <input 
              id="places-search"
              type="search"
              placeholder="Enter restaurant name"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
          <div>
            <ol className="locations-list">
              {myLocations.map((location) => {
                return (
                  <li key={location.venue.id} onClick={() => handleClick(location.venue.id)}>
                    {location.venue.name}
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
        <div id="map" role="application"></div>
        </div>
      </main>
    )
  }
}
export default MainPage
