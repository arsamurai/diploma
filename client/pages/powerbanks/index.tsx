import { DevicesPageLayout, MainLayout } from "../../layouts";
import { wrapper } from "../../store";
import { FiltersActionCreators } from "../../store/reducers/filters/action-creator";

const Powerbanks: React.FC= () => {
  return (
      <MainLayout>
				<DevicesPageLayout title="Повербанки" type="powerbanks" />
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