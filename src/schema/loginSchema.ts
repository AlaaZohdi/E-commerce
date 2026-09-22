import * as zod from "zod";

const loginSchema = zod.object({

  email: zod.string()
    .nonempty("enter email")
    .email("invalid email"),

  password: zod.string()
    .nonempty("enter password")
    .regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "invalid password"),


});

export default loginSchema;