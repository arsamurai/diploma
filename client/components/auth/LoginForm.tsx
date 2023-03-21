import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useActions } from "../../hooks/useAction";
import { ILoginValues } from "../../models/IUser";
import { loginSchema } from "../../validation/validate";
import { Button, Input, PasswordInput } from "../other";

interface LoginForm {
	setActiveModal: (e?: any) => void
}

const LoginForm: React.FC<LoginForm> = ({setActiveModal}) => {

	const history = useRouter();
	const { login } = useActions();

  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      login: "Arturio",
      password: "123123",
    } as ILoginValues,
    validationSchema: loginSchema,
    onSubmit: async (values: ILoginValues) => {
			setActiveModal(false)
      login(values);
    },
  });

	const registrationHandler = () => {
		history.push('/account/registration')
	}

  return (
    <form ref={formRef} className="login-form" onSubmit={formik.handleSubmit}>
      <div className="login-form__field">
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
      <div className="login-form__field">
        <PasswordInput
          name="password"
          label="Пароль"
          message={formik.errors.password}
          onChange={formik.handleChange}
          touched={formik.touched.password}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="login-form__password"
        />
      </div>
      <div className="login-form__btns">
        <Button type="submit">
          Вхід
        </Button>
        <Button simplified onClick={registrationHandler}>
					Новий користувач
				</Button>
      </div>
    </form>
  );
};

export default LoginForm;
