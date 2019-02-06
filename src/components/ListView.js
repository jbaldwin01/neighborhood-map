import React, { Component } from 'react'

class ListView extends Component {
  render() {
    const { myLocations, updateQuery, handleClick, showListView } = this.props
    return (
      myLocations &&
      <section className={(showListView === true) ? "options-box open" : "options-box"}>
        <input
          aria-label="Filter locations"
          id="places-search"
          type="search"
          placeholder="Enter restaurant name"
          onChange={(event) => updateQuery(event.target.value)}
        />
        <ul id="locations" className="locations-list">
          {myLocations.map((location) => {
            return (
              <li
                tabIndex="0"
                aria-labelledby="locations"
                key={location.venue.id}
                onClick={() => handleClick(location.venue.id)}>
                {location.venue.name}
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default ListView