import React, { Component } from 'react'

class Map extends Component {
  render () {
    const { showListView } = this.props
    return (
      <section id="map" role="application" className={(showListView === true) ? "map push" : "map"}></section>
    )
  }
}

export default Map