import * as Yup from "yup";

const passwordRule =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%*?&]/;
export const adminValidation = Yup.object().shape({
    name:Yup.string().min(5).required("Please Enter your name"),
    address1:Yup.string().min(5).required("Please Enter address"),
    pincode:Yup.number().min(5).required("Please Enter pincode"),
    email:Yup.string().email("Please enter valid email").required("please enter your email"),
    phone:Yup.number().min(1000000000, 'Phone number should be 10 digits')
    .max(9999999999, 'Phone number should be 10 digits').required("Please enter your phone number"),
    password: Yup
    .string()
    .min(5, "Password should contain 5-16 characters")
    .max(16, "Password should contain 5-16 characters")
    .matches(
      passwordRule,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 5-16 characters long."
    )
    .required("Required"),
    cPassword:Yup.string().oneOf([Yup.ref("password")],"Password Not match")
});
