import React from 'react';

class GoogleAuth extends React.Component {

    state = { isSignedIn: null }; // pongo null porque al inicio no sabemos si está o no logueado

  componentDidMount() {
    console.log(process.env.REACT_APP_CLIENT_ID);
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
        plugin_name: "streamy",
      }).then(() => { // then porque devuelve una promise
            this.auth = window.gapi.auth2.getAuthInstance();
            this.setState({ isSignedIn: this.auth.isSignedIn.get() }); //this.auth.isSignedIn.get() es true si está autenticado
      });
    });
  }

  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div>I dont know if we are signed in</div>;
    } else if (this.state.isSignedIn) {
      return <div>I am signed in!</div>;
    } else {
      return <div>I am not signed in</div>;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

export default GoogleAuth;