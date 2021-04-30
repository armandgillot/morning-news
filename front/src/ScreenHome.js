import React from "react";
import "./App.css";
import { Input, Button } from "antd";
import { useState } from "react";
import { connect } from "react-redux";

function ScreenHome(props) {
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpemail, setSignUpemail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInemail, setSignInemail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [errorIn, setErrorIn] = useState();
  const [errorUp, setErrorUp] = useState();

  async function signUp() {
    var request = await fetch("/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameUp=${signUpUsername}&emailUp=${signUpemail}&passwordUp=${signUpPassword}`,
    });
    let response = await request.json();
    console.log(response);
    if (response.result === true) {
      console.log("on est dans le if response.result === true");
      props.addToken(response.token);
      return props.history.replace("/screensource");
    } else {
      setErrorUp("Adresse EMAIL déjà utilisée !");
    }
  }

  async function signIn() {
    var request = await fetch("/users/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailIn=${signInemail}&passwordIn=${signInPassword}`,
    });
    let response = await request.json();
    console.log(response);
    if (response.result === true) {
      console.log("on est dans le if");
      props.addToken(response.token);
      return props.history.replace("/screensource");
    } else {
      setErrorIn("Erreur d'identification !!");
    }
  }

  return (
    <div className="Login-page">
      {/* SIGN-IN */}

      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="arthur@lacapsule.com"
          onChange={(e) => setSignInemail(e.target.value)}
        />

        <Input.Password
          className="Login-input"
          placeholder="password"
          onChange={(e) => setSignInPassword(e.target.value)}
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => signIn()}
        >
          Sign-in
        </Button>
        <p className="error">{errorIn}</p>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
        <Input
          className="Login-input"
          placeholder="Arthur G"
          onChange={(e) => setSignUpUsername(e.target.value)}
        />

        <Input
          name="emailUp"
          className="Login-input"
          placeholder="arthur@lacapsule.com"
          onChange={(e) => setSignUpemail(e.target.value)}
        />

        <Input.Password
          className="Login-input"
          placeholder="password"
          onChange={(e) => setSignUpPassword(e.target.value)}
        />

        <Button
          style={{ width: "80px" }}
          type="primary"
          onClick={() => signUp()}
        >
          Sign-up
        </Button>
        <span className="error">{errorUp}</span>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

export default connect(null, mapDispatchToProps)(ScreenHome);
