import { useFormik } from "formik";
import React, { useRef } from "react";
import { Button, Input, PasswordInput, PhoneInput } from "../../components/other";
import { MainLayout } from "../../layouts";
import { registrationSchema } from "../../validation/validate";

const Registration: React.FC = () => {
  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      login: "",
      name: "",
      surname: "",
      byFather: "",
      phone: "",
      email: "",
      password: "",
      confirm: "",
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <MainLayout specContainer>
      <div className="registration">
        <h3 className="registration__title title">Створити користувача</h3>
        <form
          className="registration-form"
          ref={formRef}
          onSubmit={formik.handleSubmit}
        >
          <div className="registration-form__block">
            <div className="registration-form__fields">
              <div className="registration-form__field">
                <Input
                  name="login"
                  label="Логін"
                  message={formik.errors.login}
                  onChange={formik.handleChange}
                  touched={formik.touched.login}
                  onBlur={formik.handleBlur}
                  value={formik.values.login}
                />
              </div>
            </div>
          </div>
          <div className="registration-form__block">
            <h5 className="registration-form__subtitle">Особисті дані:</h5>
            <div className="registration-form__fields">
              <div className="registration-form__field">
                <Input
                  name="surname"
                  label="Фамілія"
                  message={formik.errors.surname}
                  onChange={formik.handleChange}
                  touched={formik.touched.surname}
                  onBlur={formik.handleBlur}
                  value={formik.values.surname}
                />
              </div>
              <div className="registration-form__field">
                <Input
                  name="name"
                  label="Ім'я"
                  message={formik.errors.name}
                  onChange={formik.handleChange}
                  touched={formik.touched.name}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
              <div className="registration-form__field">
                <Input
                  name="byFather"
                  label="По батькові"
                  message={formik.errors.byFather}
                  onChange={formik.handleChange}
                  touched={formik.touched.byFather}
                  onBlur={formik.handleBlur}
                  value={formik.values.byFather}
                />
              </div>
            </div>
          </div>
          <div className="registration-form__block">
            <h5 className="registration-form__subtitle">Контакти:</h5>
            <div className="registration-form__fields">
              <div className="registration-form__field">
                <PhoneInput
                  name="phone"
                  label="Номер телефону"
                  message={formik.errors.phone}
                  onChange={formik.handleChange}
                  touched={formik.touched.phone}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className="basket-form__field"
                />
              </div>
              <div className="registration-form__field">
                <Input
                  name="email"
                  type="email"
                  label="Пошта"
                  message={formik.errors.email}
                  onChange={formik.handleChange}
                  touched={formik.touched.email}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </div>
            </div>
          </div>
          <div className="registration-form__block">
            <h5 className="registration-form__subtitle">
              Пароль та підтвердження:
            </h5>
            <div className="registration-form__fields">
              <div className="registration-form__field">
                <PasswordInput
                  name="password"
                  label="Пароль"
                  message={formik.errors.password}
                  onChange={formik.handleChange}
                  touched={formik.touched.password}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              <div className="registration-form__field">
                <PasswordInput
                  name="confirm"
                  label="Повторіть пароль"
                  message={formik.errors.confirm}
                  onChange={formik.handleChange}
                  touched={formik.touched.confirm}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirm}
                />
              </div>
            </div>
          </div>
          <div className="registration-form__btn">
            <Button type="submit">
              Створити користувача
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Registration;
