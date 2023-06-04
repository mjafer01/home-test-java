const Fields = [
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
    },
    name: "password",
    placeholder: "Password",
  },
];
export default Fields;
