const Fields = [
  {
    type: "text",
    rules: {
      required: { value: true, message: "First name is required" },
      minLength: {
        value: 3,
        message: "First name should have more than 2 characters",
      },
      maxLength: {
        value: 100,
        message: "First name should have less than 100 characters",
      },
    },
    name: "firstName",
    placeholder: "First Name",
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Last name is required" },
      minLength: {
        value: 3,
        message: "Last name should have more than 2 characters",
      },
      maxLength: {
        value: 100,
        message: "Last name should have less than 100 characters",
      },
    },
    name: "lastName",
    placeholder: "Last Name",
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Email is required" },
      email: { value: true, message: "Invalid email" },
    },
    name: "email",
    placeholder: "Email",
  },
  {
    type: "password",
    rules: {
      required: { value: true, message: "Password is required" },
      minLength: {
        value: 6,
        message: "Password should have more than 5 characters",
      },
    },
    name: "password",
    placeholder: "Password",
  },
];
export default Fields;
