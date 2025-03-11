/**
 * api 통신 공통
 */

import axios from 'axios';
import router from '@/router';

//import {useStore} from "vuex";

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

//const store = useStore()

//const useTypes = computed(() => store.state.useTypes)
// 기본 api 서버 url
//const defaultApiUrl = "http://localhost:8081"
//const defaultApiUrl =  import.meta.env.VUE_APP_APIURL

export default class NetworkService {
    constructor(url) {
        if (url === '') url = import.meta.env.VITE_APP_APIURL;

        console.log('baseUrl :===========: %s', url);
        //console.log(process.env)
        //axios 인스턴스 생성
        this.client = axios.create({
            baseURL: url,
            timeout: 60000 * 60, //60분
            headers: this.getHeader(),
            withCredentials: true,
        });
        // response 인터셉터
        this.client.interceptors.response.use(
            (res) => {
                // console.log('response :');
                // console.log(res);
                // console.log(res.status);
                // console.log(res.data);

                if (
                    !(
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 204
                    )
                ) {
                    alert(res.data.message);
                }

                if (res.status === 401) {
                    // 로그인 페이지로 이동
                    router.push('/Login');
                }
                return res.data;
            },
            (error) => {
                console.log('resp_Error : %s', error);
                console.log(typeof error);
                let errorJson;
                try {
                    errorJson = error.toJSON();
                    console.log(errorJson);
                    /*const err = error as AxiosError; */
                    if (errorJson?.status === 401) {
                        // 로그인 페이지로 이동
                        router.push('/Login');
                        return false;
                    }
                } catch (e) {
                    console.error(e);
                }
                return error;
                //return null;
            }
        );
        //TODO.. 오류처리.
        // request 인터셉터
        this.client.interceptors.request.use(
            function (config) {
                let token = localStorage.getItem('_cnu_token');
                // console.log("req => %s%s", defaultApiUrl, config.url);
                // console.log(JSON.stringify(config.data, null, 4));
                // console.log("=> token itcpt : %s", token)
                // console.log(config)
                config.headers.Authorization = 'Bearer ' + token;
                return config;
            },
            function (error) {
                console.log('req error => %s', error);
                return Promise.reject(error);
            }
        );
    }

    // 추가적인 헤더 옵션..
    getHeader() {
        let httpHeader = {
            'Content-type': 'application/json',
        };
        return httpHeader;
    }
    query(resource, params) {
        return this.client.get(`${resource}`, params).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    get(resource) {
        return this.client.get(`${resource}`).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    post(resource, params) {
        //console.log("==> resource : ", `${resource}`)
        return this.client.post(`${resource}`, params);
    }

    //엑셀 헤더 추가
    postExcel(resource, params) {
        var headers = this.getHeader();
        axios.responseType = 'blob';
        return this.client.post(`${resource}`, params, { headers });
    }

    update(resource, slug, params) {
        return this.client.put(`${resource}/${slug}`, params);
    }

    put(resource, params) {
        return this.client.put(`${resource}`, params);
    }

    delete(resource) {
        return this.client.delete(resource).catch((error) => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }

    multipart(resource, params, files) {
        let formData = new FormData();
        formData.append('jsonData', JSON.stringify(params));

        if (files) {
            files.forEach((value, key) => {
                formData.append(key, value);
            });
        }
        return this.client.post(`${resource}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    multipartFormData(resource, formData) {
        return this.client.post(`${resource}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    formData(resource, formData) {
        const urlSearchParams = new URLSearchParams(formData);
        return this.client.post(`${resource}`, urlSearchParams.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
    }

    // response 전체를 리턴하는 요청
    fetchFullResponse(resource, params = null, method = 'GET') {
        const fullResponseClient = axios.create({
            baseURL: this.client.defaults.baseURL,
            timeout: this.client.defaults.timeout,
            headers: this.getHeader(),
            withCredentials: true,
            responseType: 'blob',
        });

        fullResponseClient.interceptors.response.use(
            (res) => {
                console.log('## response ##');
                console.log(res);

                if ([200, 201, 204].includes(res.status)) {
                    return res;
                } else {
                    alert(res.data?.message || 'Unknown error occurred');
                    return Promise.reject(res);
                }
            },
            (error) => {
                const status = error.response?.status;
                if (status === 401) {
                    router.push('/Login');
                    return Promise.reject('Unauthorized');
                } else {
                    console.error('Response Error: ', error);
                    return Promise.reject(error);
                }
            }
        );

        fullResponseClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('_cnu_token');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                console.error('Request Error: ', error);
                return Promise.reject(error);
            }
        );

        return fullResponseClient({
            method: method,
            url: resource,
            data: params,
        });
    }

    useMockResponse() {
        return true;
    }
}
