import { useFormik } from "formik";
import React, { useRef } from "react";
import cn from "classnames";
import { requiredSchema } from "../../../validation/validate";
import { Button, Input } from "../../other";

interface CreateRoleProps {
	index: number,
	activePage: number
}

const CreateRole: React.FC<CreateRoleProps> = ({index, activePage}) => {
  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      value: "User",
      description: "Користувач",
    },
		validationSchema: requiredSchema(['value', 'description']),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className={cn("page-content", "create-role-page", {active: index === activePage})} data-index={index}>
      <h4 className="page-content__title">Створити роль</h4>
      <form
        className="create-form"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <div className="create-form__field">
          <Input
            name="value"
            label="Назва"
            message={formik.errors.value}
            onChange={formik.handleChange}
            touched={formik.touched.value}
            onBlur={formik.handleBlur}
            value={formik.values.value}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="description"
            label="Опис"
            message={formik.errors.description}
            onChange={formik.handleChange}
            touched={formik.touched.description}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
        </div>
        <div className="create-form__btn">
          <Button type="submit">
            Створити роль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateRole;
