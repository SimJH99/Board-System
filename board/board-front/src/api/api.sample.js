import NetworkService from "./net.service.js";

const NetApiServer = new NetworkService("");

const apiCallWrapper = (apiMethod, path, params) => {
    console.log(`req ${path}:${JSON.stringify(params)}`);
    pendingStore.start();
    return apiMethod(path, params)
        .then((res) => {
            pendingStore.finish();
            return res;
        })
        .catch((error) => {
            pendingStore.finish();
            console.error(`Error in ${path}:`, error);
            throw error;
        });
};

//GET 요청 API
const getApiWrapper = (path) => {
    return apiCallWrapper(
        NetApiServer.get.bind(NetApiServer),
        path
    );
};

//POST 요청 API
const postApiWrapper = (path, params) => {
    return apiCallWrapper(
        NetApiServer.post.bind(NetApiServer),
        path,
        params
    );
};

//MultipartFormData 요청 API
const multipartFormDataApiWrapper = (path, formData) => {
    return apiCallWrapper(
        NetApiServer.multipartFormData.bind(NetApiServer),
        path,
        formData
    );
};

export const ApiSampleApiWrapper = {
    /**
     * 테스트 및 참고용 POST Api Call. 추후 삭제예정[TS]
     * @param {*} params
     * @returns {Promise<AxiosResponse<any>>}
     */
    testGet(params) {
        const path = '/api/test/get';
        return getApiWrapper(path, params);
    },

    testPost(params) {
        const path = '/api/test/post';
        return postApiWrapper(path, params);
    },

    testMultipartFormData(params) {
        const path = '/api/test/multipart';
        return multipartFormDataApiWrapper(path, params);
    },
};