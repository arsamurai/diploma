import { useState } from "react";
import { devicesApi } from "../../API/devices";
import { DevicesPageLayout, MainLayout } from "../../layouts";
import { IDevice } from "../../models/IDevice";
import { wrapper } from "../../store";
import { DevicesActionCreators } from "../../store/reducers/devices/action-creator";
import { FiltersActionCreators } from "../../store/reducers/filters/action-creator";

const Phones: React.FC = () => {
  return (
      <MainLayout>
				<DevicesPageLayout title="Телефони" type="phones" />
      </MainLayout>
  );
}

export default Phones;

export const getServerSideProps = wrapper.getServerSideProps(
  (state) =>
    async ({resolvedUrl}) => {
			const type = resolvedUrl.slice(1);
			const dispatch = state.dispatch;
      await dispatch(FiltersActionCreators.fetchFilterBrands(type));
      return {
        props: {},
      };
    }
)