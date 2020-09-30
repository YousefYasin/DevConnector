import React, { Component } from "react";
import About from "./About";
import Skills from "./Skills";
import Card from './Card'
class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <About />
        <Skills />
        <Card/>
      </div>
    );
  }
}
export default Contact;
