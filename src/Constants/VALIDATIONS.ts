export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: "Invalid Email",
  },
};

export const passwordValidation = {
  required: "Password is required",
  pattern: {
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    message: "Invalid Password",
  },
};

export const firstNameValidation = {
  required: "First Name is required",
};
export const lastNameValidation = {
  required: "Last Name is required",
};
export const roleValidation = {
  required: "Role is required",
};

export const otpValidation = {
  required: "otp is required",
};
