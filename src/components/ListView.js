import React, { Component } from 'react'

class ListView extends Component {
  render() {
    const { myLocations, query, updateQuery, handleClick } = this.props
    return (
      myLocations &&
      <div className="options-box">
        <div>
          <input
            aria-label="Filter locations"
            id="places-search"
            type="search"
            placeholder="Enter restaurant name"
            onChange={(event) => updateQuery(event.target.value)}
          />
        </div>
        <div>
          <ul className="locations-list">
            {myLocations.map((location) => {
              return (
                <li key={location.venue.id} onClick={() => handleClick(location.venue.id)}>
                  {location.venue.name}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default ListView