import { useFormik } from "formik";
import React, { useRef } from "react";
import { requiredSchema } from "../../validation/validate";
import { Input } from "../other";

interface BasketDeliveryProps {
  setDelivery: (values: string[]) => void
}
const BasketDelivery: React.FC<BasketDeliveryProps> = ({setDelivery}) => {
  const onFormChange = () => {
    //setDelivery([])
  };

  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      city: "Одеса",
      region: "Одеська обл.",
      delivery: "Нова Пошта 1",
      zip: "56403",
    },
    validationSchema: requiredSchema(["city", "region", "delivery", "zip"]),
    onSubmit: async () => {},
  });

  return (
    <form ref={formRef} onChange={onFormChange} className="basket-form">
      <div className="basket-form__field">
        <Input
          name="city"
          label="Місто"
          message={formik.errors.city}
          onChange={formik.handleChange}
          touched={formik.touched.city}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        />
      </div>
      <div className="basket-form__field">
        <Input
          name="region"
          label="Область"
          message={formik.errors.region}
          onChange={formik.handleChange}
          touched={formik.touched.region}
          onBlur={formik.handleBlur}
          value={formik.values.region}
        />
      </div>
      <div className="basket-form__field">
        <Input
          name="delivery"
          label="Відділення пошти"
          message={formik.errors.delivery}
          onChange={formik.handleChange}
          touched={formik.touched.delivery}
          onBlur={formik.handleBlur}
          value={formik.values.delivery}
        />
      </div>
      <div className="basket-form__field">
        <Input
          name="zip"
          label="Код"
          message={formik.errors.zip}
          onChange={formik.handleChange}
          touched={formik.touched.zip}
          onBlur={formik.handleBlur}
          value={formik.values.zip}
        />
      </div>
    </form>
  );
};

export default BasketDelivery;
