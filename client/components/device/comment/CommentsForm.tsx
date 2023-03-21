import { useFormik } from "formik";
import Image from "next/image";
import React, { useRef } from "react";
import ReactStars from "react-rating-stars-component";
import { requiredSchema } from "../../../validation/validate";
import { Button, Input, TextArea } from "../../other";
import star from "../../../assets/images/icons/star.svg";
import starHalf from "../../../assets/images/icons/star-half.svg";
import starLine from "../../../assets/images/icons/star-line.svg";
import { devicesApi } from "../../../API/devices";
import { IDevice } from "../../../models/IDevice";
import { useTypedDispatch } from "../../../hooks/useTypedDispatch";
import { setDevice } from "../../../store/reducers/device/slice";

interface InitialValuesProps {
	username: string,
	dignity: string,
	limitations: string,
	text: string
	stars: number
}

interface CommentsFormProps {
	closeModal: () => void,
	device: IDevice,
}

const CommentsForm: React.FC<CommentsFormProps> = ({ closeModal, device }) => {
	const dispatch = useTypedDispatch();

  const formRef: any = useRef();
  const formik = useFormik({
    initialValues: {
      username: "Musienko Artur",
      dignity: "Легкий в користуванні",
      limitations: "Важкий в користуванні",
      text: "Норм впринципі",
			stars: 0,
    } as InitialValuesProps,
		validationSchema: requiredSchema(['stars', 'username','text']),
    onSubmit: async (values: InitialValuesProps) => {
      addComment(values, device._id);
			closeModal();
    },
  });

	const addComment = async (values: InitialValuesProps, deviceId: number) => {
    try {
      const comment = await devicesApi.addComment({
				username: values.username,
				dignity: values.dignity,
				limitations: values.limitations,
				text: values.text,
				stars: values.stars,
				deviceId: deviceId,
			});
      dispatch(setDevice({ ...device, comments: [comment, ...device.comments] }));
    } catch (e) {
      console.log(e);
    }
  };

	const onRateChange = (stars: number) => {
		formik.setFieldValue('stars', stars);
	}

  return (
    <form
      className="comments-form"
      ref={formRef}
      onSubmit={formik.handleSubmit}
    >
      <div className="comments-form__row">
        <ul className="comments-form__rating">
          <div className="rating">
            <ReactStars
              className="react-rating"
              value={formik.values.stars}
              size={15}
              isHalf={true}
							onChange={onRateChange}
              filledIcon={<Image className="rating-star" src={star} alt="star" />}
              halfIcon={<Image className="rating-star" src={starHalf} alt="star" />}
              emptyIcon={<Image className="rating-star" src={starLine} alt="star" />}
            />
          </div>
          <div className="labels">
            <p className="labels__label">Поганий</p>
            <p className="labels__label">Так собі</p>
            <p className="labels__label">Нормальний</p>
            <p className="labels__label">Гарний</p>
            <p className="labels__label">Відмінний</p>
          </div>
        </ul>
      </div>
      <div className="comments-form__row">
        <Input
          name="dignity"
          label="Переваги"
          maxLength={75}
          message={formik.errors.dignity}
          onChange={formik.handleChange}
          touched={formik.touched.dignity}
          onBlur={formik.handleBlur}
          value={formik.values.dignity}
          className="comments-form__input"
        />
      </div>
      <div className="comments-form__row">
        <Input
          name="limitations"
          label="Недоліки"
          maxLength={75}
          message={formik.errors.limitations}
          onChange={formik.handleChange}
          touched={formik.touched.limitations}
          onBlur={formik.handleBlur}
          value={formik.values.limitations}
          className="comments-form__input"
        />
      </div>
      <div className="comments-form__row">
        <TextArea
          name="text"
          label="Коментарій"
          message={formik.errors.text}
          onChange={formik.handleChange}
          touched={formik.touched.text}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          className="comments-form__textarea"
          rows={5}
        />
      </div>
      <div className="comments-form__row">
        <Input
          name="username"
          label="Ваші ім'я та фамілія"
          message={formik.errors.username}
          onChange={formik.handleChange}
          touched={formik.touched.username}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="comments-form__input"
        />
      </div>
      <div className="comments-form__btns">
        <Button className="comments-form__btn" type="submit">
          Залишити відгук
        </Button>
        <Button className="comments-form__btn" simplified onClick={closeModal}>
          Відміна
        </Button>
      </div>
    </form>
  );
};

export default CommentsForm;
