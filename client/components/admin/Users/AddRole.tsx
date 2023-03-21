import { useFormik } from "formik";
import React, { useRef } from "react";
import cn from "classnames";
import { requiredSchema } from "../../../validation/validate";
import { Button, Input } from "../../other";

interface AddRoleProps {
	index: number,
	activePage: number
}

const AddRole: React.FC<AddRoleProps> = ({index, activePage}) => {
  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      userId: "12bj12b3jhv3j12h3j",
      roleId: "123n2n3bh1bk2b3k12",
    },
		validationSchema: requiredSchema(['userId', 'roleId']),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div className={cn("page-content", "add-role-page", {active: index === activePage})} data-index={index}>
      <h4 className="page-content__title">Додати роль</h4>
      <form
        className="create-form"
        ref={formRef}
        onSubmit={formik.handleSubmit}
      >
        <div className="create-form__field">
          <Input
            name="userId"
            label="Користувач"
            message={formik.errors.userId}
            onChange={formik.handleChange}
            touched={formik.touched.userId}
            onBlur={formik.handleBlur}
            value={formik.values.userId}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="roleId"
            label="Роль"
            message={formik.errors.roleId}
            onChange={formik.handleChange}
            touched={formik.touched.roleId}
            onBlur={formik.handleBlur}
            value={formik.values.roleId}
          />
        </div>
        <div className="create-form__btn">
          <Button type="submit">
            Додати роль
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRole;
