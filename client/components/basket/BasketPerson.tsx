import React, { useRef } from "react";
import { useFormik } from "formik";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { accountSchema } from "../../validation/validate";
import { Input, PhoneInput } from "../other";

interface BasketPersonProps {
  setPerson: (values: string[]) => void
}

const BasketPerson: React.FC<BasketPersonProps> = ({setPerson}) => {

  const { user, isLoading } = useTypedSelector((state) => state.user);

	const onFormChange = () => {
		//setPerson([])
	}

  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
			surname: user.surname,
			name: user.name,
			byFather: user.byFather,
			phoneNumber: user.phoneNumber,
			email: user.email,
    },
    validationSchema: accountSchema,
    onSubmit: async () => {}
  });

	if (isLoading) {
		return (
				<p>Loading...</p>
		);
	}

  return (
    <form ref={formRef} onChange={onFormChange} className="basket-form">
      <div className="basket-form__field">
        <Input
          name="surname"
          label="Прізвище"
          message={formik.errors.surname}
          onChange={formik.handleChange}
          touched={formik.touched.surname}
          onBlur={formik.handleBlur}
          value={formik.values.surname}
        />
      </div>
      <div className="basket-form__field">
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
      <div className="basket-form__field">
        <PhoneInput
          name="phoneNumber"
          label="Номер телефону"
          message={formik.errors.phoneNumber}
          onChange={formik.handleChange}
          touched={formik.touched.phoneNumber}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          className="basket-form__field"
        />
      </div>
      <div className="basket-form__field">
        <Input
          type="email"
          name="email"
          label="Пошта"
          message={formik.errors.email}
          onChange={formik.handleChange}
          touched={formik.touched.email}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
      </div>
    </form>
  );
};

export default BasketPerson;
