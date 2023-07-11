import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';

export default class MyCOntribution extends API {
    constructor(id, timeout = 200000) {
        super("GET", timeout, false);
        this.id = id
        this.type = C.GET_DETAILED_REPORT;
        this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.getDetailReport}`;
        this.userDetails = JSON.parse(localStorage.getItem('userInfo'))
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
    }

    processResponse(res) {
        super.processResponse(res);
        if (res) {

            this.report = res.data;
        }
    }

    apiEndPoint() {
        let url = `${this.endpoint}?serviceRequestNumber=${this.id}` 
         return url;
    }
    getHeaders() {
        let res = this.apiEndPoint()
        let urlSha = md5(res)
        let hash = md5(this.userDetails.privateKey+"|"+urlSha)
        this.headers = {
            headers: {
                "key" :this.userDetails.publicKey,
                "sig"  : hash,
                "payload":urlSha
            }
        };
        return this.headers;
    }

    getPayload() {
        return this.report;
    }
}