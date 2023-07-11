/**
 * Model Search API
 */
import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";

export default class GetModelDetail extends API {
  constructor(modelId, timeout = 2000) {
    super("GET", timeout, false);
    this.modelId = modelId;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.getModel}`;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
    this.type = C.GET_MODEL_DETAIL;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${
      this.token
    } expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.report = res;
    }
  }

  apiEndPoint() {
    return `${this.endpoint}?modelId=${this.modelId}`;
  }

  getBody() {}

  getHeaders() {
    this.headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.report;
  }
}
