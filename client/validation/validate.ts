import * as Yup from "yup";
import { defineFormSchema } from "./formikValidation";

export const requiredText = "Required field";
export const invalidFileFormat = "Invalid file format";
export const tooBigFile = "The File is too big";
export const unauthorized = "Unauthorized";
export const shortPasswordError = "The password must be at least 8 characters.";
export const emailInputError = "Enter correct email address";
export const phoneInputError = "Enter correct phone number";
export const passwordConfirmationError = "Passwords do not match";

// export const filesValidation = (file: File) => {
// 	if(file){
// 		if(['image/jpeg', 'image/jpg', 'image/png', 'image/svg', 'image/svg+xml'].includes(file.type)){
// 			return 'ok';
// 		}else{
// 			return invalidFileFormat;
// 		}
// 		if(file.size < 3000000){
// 			return 'ok';
// 		}else{
// 			return tooBigFile;
// 		}
// 	}else {
// 		return invalidFileFormat;
// 	}
// }

export const requiredSchema = (names: string[]) => {
  let schema = {};
  names.map((e: string) => {
    schema = { ...schema, [e]: Yup.string().required(requiredText) };
  });
  return defineFormSchema(schema);
};

export const accountSchema = defineFormSchema({
  name: Yup.string().required(requiredText),
  surname: Yup.string().required(requiredText),
  byFather: Yup.string(),
  phoneNumber: Yup.string().required(requiredText).min(14, phoneInputError),
  email: Yup.string().required(requiredText).email(emailInputError),
});

export const loginSchema = defineFormSchema({
  login: Yup.string().required(requiredText),
  password: Yup.string().required(requiredText).min(6, shortPasswordError),
});

export const createDeviceSchema = defineFormSchema({
  name: Yup.string().required(requiredText),
  price: Yup.number().required(requiredText),
  discount: Yup.number(),
	//brandId: Yup.number().required(requiredText),
  //typeId: Yup.number().required(requiredText),
});

export const registrationSchema = defineFormSchema({
  login: Yup.string().required(requiredText),
  name: Yup.string().required(requiredText),
  surname: Yup.string().required(requiredText),
  byFather: Yup.string(),
  phoneNumber: Yup.string().required(requiredText).min(14, phoneInputError),
  email: Yup.string().required(requiredText).email(emailInputError),
  password: Yup.string().required(requiredText).min(8, shortPasswordError),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], passwordConfirmationError)
    .required(requiredText),
});

export const changePasswordSchema = defineFormSchema({
  current: Yup.string().required(requiredText),
  new: Yup.string().required(requiredText).min(8, shortPasswordError),
  confirm: Yup.string()
    .oneOf([Yup.ref("new")], passwordConfirmationError)
    .required(requiredText),
});

export const emailSchema = defineFormSchema({
  email: Yup.string().required(requiredText).email(emailInputError),
});
