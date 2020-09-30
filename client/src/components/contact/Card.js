import React, { Component } from "react";
import Moment from "react-moment";

class Card extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h3 className="text-center text-info">Experience</h3>
            <ul className="list-group">
              {" "}
              <li className="list-group-item">
                <h4>Gaza PLUS </h4>
                <p>
                  <Moment format="YYYY/MM">2020/4</Moment> -
                  <Moment format="YYYY/MM">2020/9</Moment>
                </p>
                <p>
                  <strong>Position: </strong>
                  Trainee
                </p>
                <p>
                  <span>
                    <strong>Location: </strong>
                    Gaza
                  </span>
                </p>
                <p>
                  <span>
                    <strong>Description: </strong>I spent five months 12 hour
                    per day, learning to program, gaining a lot of techniques,
                    improving self-learning capabilities, soft skills, and
                    working on a lot of projects.
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3 className="text-center text-info">Education</h3>

            <ul className="list-group">
              <li className="list-group-item">
                <h4>The Islamic University</h4>
                <p>
                  <Moment format="YYYY/">2015</Moment> -
                  <Moment format="YYYY/MM/DD">2020</Moment>
                </p>
                <p>
                  <strong>Degree: </strong>
                  Bachelor
                </p>
                <p>
                  <strong>Field Of Stufy: </strong>
                  Civil Engineering
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
