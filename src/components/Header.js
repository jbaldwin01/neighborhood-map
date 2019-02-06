import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Neighborhood Restaurants
          <nav 
            id="menu"
            tabIndex="0"
            className="header-menu"
            onClick={() => this.props.toggleListView()}
            >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
            </svg>
          </nav>
        </h1>
        <hr/>
      </header>
    )
  }
}

export default Header