/**
 * 请求参数
 * @param BASE_URL 基础url
 * @param TIMEOUT 基础超时时间，单位毫秒
 */
interface RequestParameters {
	BASE_URL: string;
	TIMEOUT: number;
}

/**
 * 请求选项
 * @param header 请求头
 * @param timeout 超时时间，单位毫秒，会覆盖基础超时时间
 * @param completeUrl 完整的url，会覆盖BASE_URL
 * @param [key: string] 其他自定义参数
 */
interface RequestOptions {
	header?: Record<string, string>;
	timeout?: number;
	completeUrl?: string;
	[key: string]: any;
}

/**
 * 请求参数
 * @param url 请求路径
 * @param method 请求方法 默认 GET
 * @param urlParams url参数
 * @param data 请求数据
 * @param options 请求选项
 */
interface RequestArguments {
	url: string;
	method?:
		| "GET"
		| "POST"
		| "PUT"
		| "DELETE"
		| "CONNECT"
		| "HEAD"
		| "OPTIONS"
		| "TRACE";
	urlParams?: Record<string, any>;
	data?: any;
	options?: RequestOptions;
}

/**
 * 响应数据
 * @param code 状态码
 * @param data 响应数据
 * @param message 消息
 */
interface ResponseData<T> {
	code: number;
	data: T;
	message: string;
}

// 基础url
const BASE_URL = "/";

// 定义请求类
class RequestService {
	// 定义请求类的属性
	private BASE_URL: string;
	private TIMEOUT: number;
	// 请求拦截器数组
	requestInterceptors: Array<
		(options: RequestArguments) => Promise<void> | void
	> = [];

	// 响应拦截器数组
	responseInterceptors: Array<
		<T>(response: ResponseData<T>) => Promise<void> | void
	> = [];

	constructor(parameters: RequestParameters) {
		this.BASE_URL = parameters.BASE_URL;
		this.TIMEOUT = parameters.TIMEOUT;
	}

	/**
	 * 发起请求
	 * @param options 请求参数
	 * @returns 响应数据
	 */
	async request<T>(options: RequestArguments): Promise<ResponseData<T>> {
		for (const interceptor of this.requestInterceptors) {
			await interceptor(options);
		}

		const response = await uni.request({
			url: options?.options?.completeUrl || this.BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data,
			timeout: options.options?.timeout || this.TIMEOUT,
			header: options.options?.header,
		});

		try {
			// 默认错误消息处理
			let message = "";
			if (response.statusCode) {
				switch (response.statusCode) {
					case 400:
						message = "请求错误";
						break;
					case 401:
						message = "未授权，请登录";
						break;
					case 403:
						message = "拒绝访问";
						break;
					case 404:
						message = "请求地址不存在";
						break;
					case 500:
						message = "服务器内部错误";
						break;
					case 600:
						break;
					default:
						break;
				}
			} else if (response.errMsg) {
				// uni.request 特有的错误
				if (response.errMsg.includes("timeout")) {
					message = "请求超时，请检查网络";
				} else if (response.errMsg.includes("fail")) {
					if (
						!(await new Promise((resolve) => {
							uni.getNetworkType({
								success: (res) => {
									resolve(res.networkType !== "none");
								},
								fail: () => {
									resolve(false);
								},
							});
						}))
					) {
						message = "网络连接已断开，请检查网络设置";
					} else {
						message = "当前网络不可用，请稍后重试";
					}
				} else {
					message = "网络异常，无法连接服务器";
				}
			} else if ((response as any).message) {
				message = (response as any).message;
			}
			if (message) {
				throw new Error(message);
			}

			for (const interceptor of this.responseInterceptors) {
				await interceptor<T>(response.data as ResponseData<T>);
			}
		} catch (error) {
			console.error("请求失败:", error);

			if (error instanceof Error) {
				uni.showToast({
					title: error.message || "请求失败",
					icon: "none",
				});
			} else {
				uni.showToast({
					title: "未知错误",
					icon: "none",
				});
			}
		}

		return response.data as ResponseData<T>;
	}
}

const requestService = new RequestService({
	BASE_URL,
	TIMEOUT: 15 * 1000,
});

// 配置请求拦截器
requestService.requestInterceptors = [
	// 设置默认请求头
	(options) => {
		options.options = options.options || {};
		options.options.header = options.options.header || {};
		options.options.header["Content-Type"] =
			options.options.header["Content-Type"] || "application/json";
		// 从本地存储获取token并添加到请求头
		const token = uni.getStorageSync("token");
		if (token) {
			options.options.header["Authorization"] = `Bearer ${token}`;
		}
	},

	// 拼接url参数
	(options) => {
		if (options.urlParams) {
			let queryString = "?";
			for (const key in options.urlParams) {
				if (
					Object.hasOwn(options.urlParams, key) &&
					options.urlParams[key] !== undefined
				) {
					queryString += `${key}=${options.urlParams[key]}&`;
				}
			}
			// 移除最后一个&
			if (queryString.length > 1) {
				queryString = queryString.slice(0, -1);
			}
			if (options.options?.completeUrl) {
				options.options.completeUrl += queryString;
			} else {
				options.url += queryString;
			}
		}
	},

	// 处理空字符串参数
	(options) => {
		if (options.data) {
			for (const key in options.data) {
				if (
					Object.hasOwn(options.data, key) &&
					options.data[key] === ""
				) {
					delete options.data[key];
				}
			}
		}
	},
];

// 配置响应拦截器
requestService.responseInterceptors = [
	<T>(response: ResponseData<T>) => {
		if (response.code !== 200) {
			throw new Error(response.message || "请求失败");
		}
	},
];

export default requestService;
