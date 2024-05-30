// Submitting a form with react-router-dom using the action and Form features
import React from "react";
// Easier to handle form component from react-router-dom (action)
import { Form, redirect, useNavigation } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

// API URL endpoint
const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';

// action handling Form request
// like loaders, must setup in App
// Gives access to formData on submit
  // comes back as array and need to convert it back to an object
export const action = async ({request}) => {
  // formData function returns formData instance
  const formData = await request.formData()
  // Converting formData instance into an object
    // Very important for functionality that our input element has the name attribute
  const data = Object.fromEntries(formData)
  // Error handle form submit request with trycatch block
  // Ideal to handle action error within the action function, instead of some global errorElement
  try {
    // Making a post request to our API url and passing our data object
    const response = await axios.post(newsletterUrl, data);
    // rendering toast response with success msg from response
    toast.success(response.data.msg);
    return redirect('/');
  } catch (error) {
    console.log(error)
    // Optional chaining checking if properties are there for error msg
    toast.error(error?.response?.data?.msg);
    return error;
  }

}


const Newsletter = () => {
  // Accessing submitting state to change button text render
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form className="form" method="POST">
      <div className="form-row">
        <h4 style={{ textAlign: "center", marginBottom: "2rem" }}>
          our newsletter
        </h4>
        {/* name */}
        <label htmlFor="name" className="form-label">
          name
        </label>
        <input
          type="text"
          className="form-input"
          name="name"
          id="name"
          // checking for value, can't submit form with out a value
          required
        />
      </div>
      {/* lastName */}
      <div className="form-row">
        <label htmlFor="lastName" className="form-label">
          last name
        </label>
        <input
          type="text"
          className="form-input"
          name="lastName"
          id="lastName"
          required
        />
      </div>
      {/* email */}
      <div className="form-row">
        <label htmlFor="email" className="form-label">
          email
        </label>
        <input
          type="text"
          className="form-input"
          name="email"
          id="email"
          required
          defaultValue="test@test.com"
        />
      </div>
      <button
        type="submit"
        className="btn btn-block"
        style={{ marginTop: "0.5rem" }}
        // Disable button while isSubmitting is true
        disabled = {isSubmitting}
      >
      {/* Conditionally rendering button text based on isSubmitting state */}
        {isSubmitting  ? 'submitting' : 'submit'}
      </button>
    </Form>
  );
};

export default Newsletter;
