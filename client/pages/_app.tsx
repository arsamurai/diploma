import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "../store/index";
import "../sass/style.sass";

const WrappedApp: React.FC<AppProps> = ({ Component, ...rest }) => {
	const { store, props } = wrapper.useWrappedStore(rest);
	const { pageProps } = props;
	
  return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
};

export default WrappedApp;
