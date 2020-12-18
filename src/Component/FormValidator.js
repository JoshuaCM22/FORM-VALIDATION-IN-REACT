import React from "react";

export default class FormValidator extends React.Component {
  constructor() {
    super();

    const validationRules = {
      required: (val) => val !== null && val !== undefined && val !== "",
      phone: (phone) => {
        const re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
        return re.test(String(phone));
      },
      email: (email) => {
        const re = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;
        return re.test(String(email).toLowerCase());
      },
    };

    this.formValidationRules = {
      givenName: [
        {
          rule: validationRules.required,
          message: "Given Name is required",
        },
      ],
      lastName: [
        {
          rule: validationRules.required,
          message: "Last Name is required",
        },
      ],
      phone: [
        {
          rule: validationRules.phone,
          message: "Your Phone No is invalid",
        },
      ],
      email: [
        {
          rule: validationRules.required,
          message: "Email is required",
        },
        {
          rule: validationRules.email,
          message: "Email is invalid",
        },
      ],
    };

    this.fields = ["givenName", "lastName", "phone", "email"];

    this.state = {
      givenName: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      lastName: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      phone: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: "",
      },
      email: {
        value: "",
        isTouched: false,
        isValid: false,
        errors: [],
      },
    };
  }

  handleFieldChange = (e) => {
    let newState = { ...this.state };
    newState[e.target.name].value = e.target.value;
    this.validateForm(newState);
  };

  handleSetTouched = (e) => {
    let field = { ...this.state[e.target.name], isTouched: true };
    this.setState({ [e.target.name]: { ...field } });
  };

  validateForm = (newState) => {
    // Check if parameter called newState have value or not
    newState = newState || { ...this.state };
    this.fields.forEach((fieldName) => {
      let newField = newState[fieldName];
      newField.errors = [];
      newField.isValid = true;
      this.formValidationRules[fieldName].forEach((vRule) => {
        // Check if the property called errors is empty
        if (!vRule.rule(this.state[fieldName].value)) {
          // Insert the error messages from the object called formValidationRules in the state object
          newField.errors.push(vRule.message);
          newField.isValid = false;
        }
        newState[fieldName] = newField;
      });
    });
    // Change all properties in the state object
    this.setState(newState);
  };

  componentDidMount() {
    this.validateForm();
  }
  
  render() {
    const { givenName, lastName, phone, email } = this.state;
    return (
      <form>
        <div className="fieldGroup">
          <h2>Form Validation</h2>
          <label>Given Name</label>
          <input
            className={
              givenName.isTouched && !givenName.isValid ? "has-error" : ""
            }
            name="givenName"
            value={givenName.value}
            onChange={this.handleFieldChange}
            onBlur={this.handleSetTouched}
          />
          {givenName.isTouched &&
            givenName.errors.length > 0 &&
            givenName.errors.map((err, i) => (
              <span key={i} className="errorMessage">
                {err}
              </span>
            ))}
        </div>
        <div className="fieldGroup">
          <label>Last Name</label>
          <input
            className={
              lastName.isTouched && !lastName.isValid ? "has-error" : ""
            }
            name="lastName"
            value={this.state.lastName.value}
            onChange={this.handleFieldChange}
            onBlur={this.handleSetTouched}
          />
          {lastName.isTouched &&
            lastName.errors.length > 0 &&
            lastName.errors.map((err, i) => (
              <span key={i} className="errorMessage">
                {err}
              </span>
            ))}
        </div>
        <div className="fieldGroup">
          <label>1 Phone No (09)</label>
          <input
            className={phone.isTouched && !phone.isValid ? "has-error" : ""}
            name="phone"
            value={this.state.phone.value}
            onChange={this.handleFieldChange}
            onBlur={this.handleSetTouched}
          />
          {phone.isTouched &&
            phone.errors.length > 0 &&
            phone.errors.map((err, i) => (
              <span key={i} className="errorMessage">
                {err}
              </span>
            ))}
        </div>
        <div className="fieldGroup">
          <label>Email</label>
          <input
            className={email.isTouched && !email.isValid ? "has-error" : ""}
            name="email"
            value={this.state.email.value}
            onChange={this.handleFieldChange}
            onBlur={this.handleSetTouched}
          />
          {email.isTouched &&
            email.errors.length > 0 &&
            email.errors.map((err, i) => (
              <span key={i} className="errorMessage">
                {err}
              </span>
            ))}
        </div>
      </form>
    );
  }
}
