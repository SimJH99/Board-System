/**
 * api 통신 공통
 */

import axios from 'axios';
import router from '@/router';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default class NetworkService {
    constructor(url) {
        if (url === '') url = import.meta.env.VITE_APP_APIURL;

        console.log('baseUrl :===========: %s', url);
        //axios 인스턴스 생성
        this.client = axios.create({
            baseURL: url,
            timeout: 60000 * 60, //60분
            headers: this.getHeader(),
            withCredentials: true,
        });

        // request 인터셉터
        this.client.interceptors.request.use(
            function (config) {
                let token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                console.log('Request', config);
                return config;
            },
            function (error) {
                console.log('req error => %s', error);
                return Promise.reject(error);
            }
        );

        // response 인터셉터
        this.client.interceptors.response.use(
            (res) => {
                if (
                    !(
                        res.status === 200 ||
                        res.status === 201 ||
                        res.status === 204
                    )
                ) {
                    alert(res.data.message);
                }

                if (res.status === 401 || errorJson.status == 403) {
                    // 로그인 페이지로 이동
                    router.push('/Login');
                }
                return res;
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
        return this.client.post(`${resource}`, params, {headers});
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
}
