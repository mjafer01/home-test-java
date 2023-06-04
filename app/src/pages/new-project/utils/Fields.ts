const Fields = [
  {
    type: "text",
    rules: {
      required: { value: true, message: "Project name is required" },
      minLength: {
        value: 3,
        message: "Project name should have more than 2 characters",
      },
      maxLength: {
        value: 100,
        message: "Project name should have less than 100 characters",
      },
    },
    name: "projectName",
    placeholder: "Project Name",
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Project description is required" },
      minLength: {
        value: 3,
        message: "Project description should have more than 10 characters",
      },
      maxLength: {
        value: 100,
        message: "Project description should have less than 100 characters",
      },
    },
    name: "projectDescription",
    placeholder: "Project Description",
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Project hours is required" },
    },
    name: "projectHours",
    placeholder: "Project Hours",
  },
  {
    type: "text",
    rules: {
      required: { value: true, message: "Project end is required" },
    },
    name: "projectEnd",
    placeholder: "Project End",
  },
];
export default Fields;
