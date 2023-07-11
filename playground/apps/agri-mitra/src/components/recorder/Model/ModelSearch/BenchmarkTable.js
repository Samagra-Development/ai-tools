/**
 * Model Search API
 */
import API from "../../../api";
import C from "../../../constants";
import CONFIGS from "../../../../../configs/configs";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';

export default class SearchModel extends API {
    constructor(modelId, timeout = 2000) {
        super("GET", timeout, false);
        this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.benchmarkTable}?modelId=${modelId}`;
        this.type = C.BENCHMARK_TABLE;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }



    processResponse(res) {
        super.processResponse(res);
        if (res) {
            this.report = res;
        }
    }

    apiEndPoint() {
        return this.endpoint;
    }

    getBody() {
        return {};
    }


    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json",

            }
        };
        return this.headers;
    }


    getPayload() {
        return this.report;

    }
}
