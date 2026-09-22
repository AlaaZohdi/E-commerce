import * as zod from "zod";

const schema = zod.object({
  name: zod.string()
    .nonempty("enter name")
    .min(3, "enter more than 3")
    .max(8, "enter less than 8")
    .regex(/^[A-Z][a-z]{2,5}$/, "invalid name"),
    
    phone: zod.string()
  .nonempty(" enter phone number ")
  .regex(/^01[0125][0-9]{8}$/, "invalid phone "),

  email: zod.string()
    .nonempty("enter email")
    .email("invalid email"),

  password: zod.string()
    .nonempty("enter password")
    .regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "invalid password"),

  rePassword: zod.string()
    .nonempty("enter repassword").regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
}).refine((obj) => obj.password === obj.rePassword, {
  path: ["rePassword"],
  message: "Passwords do not match"
});

export default schema;