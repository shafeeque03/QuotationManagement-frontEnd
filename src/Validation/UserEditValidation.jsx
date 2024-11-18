import * as Yup from "yup";
const passwordRule =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*?&]/;
export const userEditValidation = Yup.object({
    name: Yup.string().required("Name is required"),
    email:Yup.string().email("Please enter valid email").required("please enter your email"),
    phone:Yup.number().min(1000000000, 'Phone number should be 10 digits')
    .max(9999999999, 'Phone number should be 10 digits').required("Please enter your phone number"),
    loginId:Yup.string().min(5).required('Please Enter Login ID'),
  });

  export const passwordValidation = Yup.object({
    newPassword: Yup.string()
      .min(5, "Password should contain 5-16 characters")
      .max(16, "Password should contain 5-16 characters")
      .matches(
        passwordRule,
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
      )
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords do not match")
      .required("Confirm Password is required"),
  });