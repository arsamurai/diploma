import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import { createDeviceSchema } from "../../../validation/validate";
import { Button, FileUpload, Input, TextArea } from "../../other";
import { IType } from "../../../models/IType";
import { IBrand } from "../../../models/IBrand";
import { BrandList } from "../../device";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useActions } from "../../../hooks/useAction";

interface CreteDeviceProps {
  index: number;
  activePage: number;
}

const CreteDevice: React.FC<CreteDeviceProps> = ({ index, activePage }) => {
  const { brands } = useTypedSelector((state) => state.brands);
  const { types } = useTypedSelector((state) => state.types);
  const { fetchBrands, fetchTypes, createDevice } = useActions();

  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState<string>();
  const [type, setType] = useState<string>();
  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      name: "Товар",
      price: 13300,
      discount: 15,
      screenDiagonal: "",
      screenRefreshRate: "",
      batteryCapacity: "",
      сonnection: "",
      size: "",
      weight: "",
      color: "",
      otherDescr: "",
      countryProductManufacturer: "",
      brandId: "",
      typeId: "",
    },
    validationSchema: createDeviceSchema,
    onSubmit: (values) => {
      image && createDevice(image, values);
    },
  });

  const onChangeBrand = (brand: string) => {
    setBrand(brand);
		formik.setFieldValue('brandId', brands.find(obj => obj.value === brand)?._id);
  };
  const onChangeType = (type: string) => {
    setType(type);
		formik.setFieldValue('typeId', types.find(obj => obj.value === type)?._id);
  };

  useEffect(() => { 
    fetchBrands();
		fetchTypes();
		setBrand(brands[0]?.value);
		setType(types[0]?.value);
		brands[0] && formik.setFieldValue('brandId', brands[0]?._id);
		types[0] && formik.setFieldValue('typeId',  types[0]?._id);
  }, [brands, types]);

  return (
    <div
      className={cn("page-content", "create-device-page", {
        active: index === activePage,
      })}
      data-index={index}
    >
      <h4 className="page-content__title">Створити товар</h4>
      <form
        ref={formRef}
        className="create-form"
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
            name="price"
            label="Ціна"
            message={formik.errors.price}
            onChange={formik.handleChange}
            touched={formik.touched.price}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="discount"
            label="Скидка"
            message={formik.errors.discount}
            onChange={formik.handleChange}
            touched={formik.touched.discount}
            onBlur={formik.handleBlur}
            value={formik.values.discount}
          />
        </div>
        <FileUpload file={image} setFile={setImage}>
          <Button outlined>Додати картинку</Button>
        </FileUpload>
        <div className="create-form__field">
          <Input
            name="screenDiagonal"
            label="Діагональ екрану"
            message={formik.errors.screenDiagonal}
            onChange={formik.handleChange}
            touched={formik.touched.screenDiagonal}
            onBlur={formik.handleBlur}
            value={formik.values.screenDiagonal}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="screenRefreshRate"
            label="Частота оновлення екрана"
            message={formik.errors.screenRefreshRate}
            onChange={formik.handleChange}
            touched={formik.touched.screenRefreshRate}
            onBlur={formik.handleBlur}
            value={formik.values.screenRefreshRate}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="batteryCapacity"
            label="Ємність акумулятора"
            message={formik.errors.batteryCapacity}
            onChange={formik.handleChange}
            touched={formik.touched.batteryCapacity}
            onBlur={formik.handleBlur}
            value={formik.values.batteryCapacity}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="сonnection"
            label="З'єднання"
            message={formik.errors.сonnection}
            onChange={formik.handleChange}
            touched={formik.touched.сonnection}
            onBlur={formik.handleBlur}
            value={formik.values.сonnection}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="size"
            label="Розміри"
            message={formik.errors.size}
            onChange={formik.handleChange}
            touched={formik.touched.size}
            onBlur={formik.handleBlur}
            value={formik.values.size}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="weight"
            label="Вага"
            message={formik.errors.weight}
            onChange={formik.handleChange}
            touched={formik.touched.weight}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="color"
            label="Колір"
            message={formik.errors.color}
            onChange={formik.handleChange}
            touched={formik.touched.color}
            onBlur={formik.handleBlur}
            value={formik.values.color}
          />
        </div>
        <div className="create-form__field">
          <TextArea
            name="otherDescr"
            label="Додатковий опис"
            message={formik.errors.otherDescr}
            onChange={formik.handleChange}
            touched={formik.touched.otherDescr}
            onBlur={formik.handleBlur}
            value={formik.values.otherDescr}
          />
        </div>
        <div className="create-form__field">
          <Input
            name="countryProductManufacturer"
            label="Країна-виробник"
            message={formik.errors.countryProductManufacturer}
            onChange={formik.handleChange}
            touched={formik.touched.countryProductManufacturer}
            onBlur={formik.handleBlur}
            value={formik.values.countryProductManufacturer}
          />
        </div>
				<div className="create-form__field">
				<span>Тип: </span>
				<select name="types" value={type} onChange={(e) => onChangeType(e.target.value)}>
          {types.map((type) => {
            return <option key={type.value} value={type.value}>{type.name}</option>;
          })}
        </select>
				</div>
				<div className="create-form__field">
					<span>Бренд: </span>
				<select name="brands" value={brand} onChange={(e) => onChangeBrand(e.target.value)}>
          {brands.map((brand) => {
            return <option key={brand.value} value={brand.value}>{brand.name}</option>;
          })}
        </select>
				</div>
        <div className="create-form__btn">
          <Button type="submit">Створити товар</Button>
        </div>
      </form>
    </div>
  );
};

export default CreteDevice;
