import React, { Component } from "react";

class Skills extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">Bio</h3>
            <p className="lead">
              I am Full Stack Web Developer I have a passion problems solving
              and working with team to develop innovative solutions ,I am
              continuase learner Always motivated to learn more and more , I
              have the ability to improve every second .{" "}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="p-3">
                  <i className="fa fa-check" /> HTML
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> CSS
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> React Js
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Node.Js
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Express
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> Bootstrap
                </div>{" "}
                <div className="p-3">
                  <i className="fa fa-check" /> github
                </div>{" "}
                <div className="p-3">
                  <i className="fa fa-check" /> heroku
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> mongoDB
                </div>
                <div className="p-3">
                  <i className="fa fa-check" /> jQuery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Skills;
