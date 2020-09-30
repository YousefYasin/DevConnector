import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "./../common/TextFieldGroup";
import TextAreaFieldGroup from "./../common/TextAreaFieldGroup";
import InputGroup from "./../common/InputGroup";
import SelectListGroup from "./../common/SelectListGroup";
import { createProfile } from "./../../actions/profileAction";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
      instagram: this.state.instagram,
    };
    this.props.createProfile(profileData, this.props.history);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    //select option for status
    const options = [
      { lable: "* Select professional status", value: 0 },
      { lable: "Developer ", value: "Developer" },
      { lable: "Junior Developer ", value: "Junior Developer" },
      { lable: "Senior Developer ", value: "Senior Developer" },
      { lable: "Manager ", value: "Manager" },
      { lable: "Student or Learning ", value: "Student or Learning" },
      { lable: "Instructor or Teacher ", value: "Instructor or Teacher" },
      { lable: "Intern ", value: "Intern" },
      { lable: "Other ", value: "Other" },
    ];
    const { errors, displaySocialInputs } = this.state;
    let socialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter profile URL"
            name="twitter"
            icon="fab fa-twitter"
            onChange={this.onChange}
            value={this.state.twitter}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook profile URL"
            name="facebook"
            onChange={this.onChange}
            icon="fab fa-facebook"
            value={this.state.facebook}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            onChange={this.onChange}
            value={this.state.linkedin}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube profile URL"
            name="youtube"
            icon="fab fa-youtube"
            onChange={this.onChange}
            value={this.state.youtube}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram profile URL"
            name="instagram"
            icon="fab fa-instagram"
            onChange={this.onChange}
            value={this.state.instagram}
            error={errors.instagram}
          />
        </div>
      );
    }
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row"></div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Your Profile</h1>
            <p className="lead text-center">
              Let's get some information to make your profile stand out
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="* Profile Handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your full name, company name, nickname"
              />
              <SelectListGroup
                placeholder="* Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                options={options}
                error={errors.status}
                info="Give us an idea where you are at in your career"
              />
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Could be your own company or a company one"
              />
              <TextFieldGroup
                placeholder="Website"
                name="website"
                value={this.state.website}
                onChange={this.onChange}
                error={errors.website}
                info="Could be your own website or a website one"
              />
              <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City or city & state suggested (eg. Boston, MA)"
              />
              <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please use comma separated values(eg. HTML,CSS, JavaScript,PHP)"
              />
              <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error={errors.githubusername}
                info="If you want your latest reposs and a Github link, include your username"
              />
              <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a little about yourself"
              />
              <div className="mb-3">
                <button
                  type="button"
                  onClick={() => {
                    this.setState((prevState) => ({
                      displaySocialInputs: !prevState.displaySocialInputs,
                    }));
                  }}
                  className="btn btn-ligth"
                >
                  Add Social Network Links
                </button>
                <span className="text-muted">Optional</span>
              </div>
              {socialInputs}
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
