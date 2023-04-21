const ErrorHandler = (key, value) => {
  let error = "";
  switch (key) {
    case "name":
      error = value ? "" : "please enter your name";
      break;
    case "company":
      error = value ? "" : "please enter your company name";
      break;
    case "position":
      error = value ? "" : "please enter your position";
      break;
    case "recipient":
      error = value ? "" : "please enter your boss's name";
      break;
    case "date":
      error = value ? "" : "please enter the resignation date";
      break;
    case "description":
      error = value ? "" : "please enter the reason of resignation";
      break;
    default:
      break;
  }
  return error;
};

export default ErrorHandler;
