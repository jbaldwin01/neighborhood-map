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
      console.log(`isMatched=${isMatched} ${location.venue.name}`)
      const marker = markers.find(marker => marker.id === location.venue.id)
      if (isMatched) {
        marker.setMap(map)
      } else {
        marker.setMap(null)
      }
      return marker
    })
  }
    
  render() {
    const { updateQuery } = this
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
          <h1>Neighborhood Locations</h1>
          <div>
            <input id="show-locations" type="button" value="Show Locations"/>
            <input id="hide-locations" type="button" value="Hide Locations"/>
          </div>
          <hr/>
          <div>
            <input 
              id="places-search" 
              type="search" 
              placeholder="Filter locations"
              value={query}
              onChange={(event) => updateQuery(event.target.value)} 
            />
          </div>
          <div>
            <ol className="locations-list">
              {myLocations.map((location, i) => {
                return <li key={i}>{location.venue.name}</li>
              })}
            </ol>
          </div>
        </div>
        <div id="map"></div>
        </div>
      </main>
    )
  }
}
export default MainPage
