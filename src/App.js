import React, { Component } from "react";
import "./App.css";
import FacebookLoginButton from "./FacebookLoginButton";
import { Router, Link, useHistory } from "react-router-dom";

class App extends Component {
  state = {
    username: null,
    name: ''
  };

  liveWithFacebook = () => {
    window.FB.api("/me/permissions", function (response) {
      console.log("response", response);
      window.FB.api(
        "/1083491909160242/live_videos",
        "POST",
        {
          status: "LIVE_NOW",
          title: '"Today\'s Live Video"',
          description: '"This is the live video for today."',
          access_token:
            "EAAElpaLrkrYBANGpxdlpq4jOSqay0qvPoPOp7KJ5jh4HDeAU7yMFn6snZCag1IAslyU40D6GZBt4A7CBZA6rTZAEZCUNafZCwI2ydJLdcDbpGat1NnQ4eg7f27ZAl1Q2976L3eUCMCazk5xhZCAvDV8jnZB9dFqhgz2LecMVNEJDOZA04rP6oP2kd4is0MyNMyAk4wNMQKkvnQQVjykv2XQjxO",
        },
        function (response) {
          console.log("response", response);
        }
      );
    });
  };

  facebookLoginHandler = (response) => {
    if (response.status === "connected") {
      this.FB.api("/me", (userData) => {
        let result = {
          ...response,
          user: userData,
        };
        this.props.onLogin(true, result);
      });
    }
    //else {
    //   this.props.onLogin(false);
    // }
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    if (loginStatus === true) {
      this.setState({
        username: resultObject.user.name,
      });
      console.log("data", resultObject.user.name);
    } else {
      console.log("Facebook login error");
    }
  };
  redirect = () => {};

  render() {
   
    const { username } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h4 className="App-title" >React Go To Live Facebook </h4>
          <div className="App-intro">
            {!username && (
              <div>
                <p>Click on one of any button below to login</p>
                <FacebookLoginButton onLogin={this.onFacebookLogin}>
                <button type="button" class="btn btn-info">Facebook</button>
                </FacebookLoginButton>
              </div>
            )}
            {username && <p>Welcome back, {username}</p>}
            {/* <button type="button" class="btn btn-info" onClick={this.liveWithFacebook}>
              live
            </button> */}
            <a href="https://www.facebook.com/live/producer/670722920811318"  class="button">
            <button type="button" class="btn btn-info">Go live</button>
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
