import * as yup from "yup";

const numberReg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/;
const linkTg =
  /^((ftp|http|https):\/\/t.me)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
const link =
  /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
const cardReg = /\b[3-6]\d{3}[ \-_.]?(\d{4}[ \-_.]?){2}\d{4}\b/;
const ttnReg = /\d{2}[ \-_.]?(\d{4}[ \-_.]?){2}\d{4}\b/;
const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export const regexSchemaPresets = () => ({
  phone: yup.string().matches(numberReg, "Помилка!"),
  linkTg: yup.string().matches(linkTg, "Помилка!"),
  link: yup.string().matches(link, "Помилка!"),
  cardNumber: yup.string().matches(cardReg, "Помилка!"),
  ttnNumber: yup.string().matches(ttnReg, "Помилка!"),
  email: yup.string().matches(emailReg, "Помилка!"),
});

export function defineFormSchema(fields: any): any {
  return yup.object().shape(fields);
}
