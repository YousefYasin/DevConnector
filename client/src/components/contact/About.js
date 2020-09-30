import React, { Component } from "react";
import one from "./1.jpeg";

class About extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-3 m-auto">
                  <img className="rounded-circle" src={one} alt="" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">Yousef Yasin</h1>
                <p className="lead text-center">Full Stack Web Developer</p>
                <p>
                  <a
                    className="text-white p-2"
                    href="https://blissful-perlman-d00b3b.netlify.app/"
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>

                  <a
                    className="text-white p-2"
                    href="https://twitter.com/yossefyass"
                    target="_blank"
                  >
                    <i className="fa fa-twitter fa-2x" />
                  </a>

                  <a
                    className="text-white p-2"
                    href="https://www.facebook.com/yoseefyasin97"
                    target="_blank"
                  >
                    <i className="fa fa-facebook fa-2x" />
                  </a>
                  <a
                    className="text-white p-2"
                    href="https://www.linkedin.com/in/yousef-yassen-798983197/"
                    target="_blank"
                  >
                    <i className="fa fa-linkedin fa-2x" />
                  </a>
                  <a
                    className="text-white p-2"
                    href="https://www.instagram.com/yossefmoh97/"
                    target="_blank"
                  >
                    <i className="fa fa-instagram fa-2x" />
                  </a>
                  <a
                    className="text-white p-2"
                    href="https://github.com/YousefYasin"
                    target="_blank"
                  >
                    <i className="fa fa-github fa-2x" />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default About;
