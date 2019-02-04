import React, { Component } from 'react'

class Map extends Component {
  render () {
    const { showListView } = this.props
    return (
      <div id="map" role="application" className={(showListView === true) ? "map push" : "map"}></div>
    )
  }
}

export default Map