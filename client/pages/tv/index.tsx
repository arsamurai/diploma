import { useState } from "react";
import { devicesApi } from "../../API/devices";
import { DevicesPageLayout, MainLayout } from "../../layouts";
import { IDevice } from "../../models/IDevice";
import { wrapper } from "../../store";
import { FiltersActionCreators } from "../../store/reducers/filters/action-creator";

const Powerbanks: React.FC= () => {
  return (
      <MainLayout>
				<DevicesPageLayout title="Телевізори" type="tv" />
      </MainLayout>
  );
}

export default Powerbanks;

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