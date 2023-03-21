import { useFormik } from "formik";
import React, { useRef } from "react";
import cn from "classnames";
import { requiredSchema } from "../../../validation/validate";
import { Button, Input } from "../../other";
import { useActions } from "../../../hooks/useAction";

interface CreteTypeProps {
	index: number,
	activePage: number
}

const CreteType: React.FC<CreteTypeProps> = ({index, activePage}) => {
	const { createType } = useActions();

  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      name: "Телефон",
      value: "Phone",
    },
		validationSchema: requiredSchema(['name', 'value']),
    onSubmit: async (values) => {
      createType(values);
    },
  });

  return (
    <div className={cn("page-content", "create-type-page", {active: index === activePage})} data-index={index}>
      <h4 className="page-content__title">Створити тип</h4>
      <form
        className="create-form"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <div className="create-form__field">
          <Input
            name="name"
            label="Назва"
            message={formik.errors.name}
            onChange={formik.handleChange}
            touched={formik.touched.name}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="value"
            label="Значеня (англ.)"
            message={formik.errors.value}
            onChange={formik.handleChange}
            touched={formik.touched.value}
            onBlur={formik.handleBlur}
            value={formik.values.value}
          />
        </div>
        <div className="create-form__btn">
          <Button type="submit">
            Створити тип
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreteType;
