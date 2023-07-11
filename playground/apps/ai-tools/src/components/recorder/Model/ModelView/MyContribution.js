import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';
export default class MyContribution extends API {
    constructor(file_name, user_id, startPage, endPage, timeout = 200000) {
        super("GET", timeout, false);
        this.user_id = JSON.parse(localStorage.getItem('userDetails')).userID
        this.type = C.GET_MODEL_CONTRIBUTION_LIST;
        this.userDetails = JSON.parse(localStorage.getItem('userInfo'))
        this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.getModelContributionList}`;
        this.startPage = startPage;
        this.endPage = endPage;
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
        let url = `${this.endpoint}?userId=${this.user_id}&startPage=${this.startPage}&endPage=${this.endPage}` 
        return url;
    }

    getBody() {
        return {};
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