import axios, {AxiosResponse, AxiosError} from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleSuccess = (res: AxiosResponse) => res.data;
const handleError = (err: AxiosError) => Promise.reject(err.message);

const Api = axios.create({
  baseURL: API_URL,
});

Api.interceptors.request.use(function (config: any) {
	let token;
	if (typeof window !== 'undefined') {
		token = localStorage.getItem("token");
	}
	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
}, function (error: any) {
	return Promise.reject(error);
});

export const ApiCall = (method: 'get' | 'post' | 'delete' | 'put', url: string, data?: any) => Api[method](url, data).then(handleSuccess).catch(handleError);