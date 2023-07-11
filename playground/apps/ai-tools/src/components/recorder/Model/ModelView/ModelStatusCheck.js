import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from "md5";

export default class ModelStatusCheck extends API {
  constructor(taskType, timeout = 200000) {
    super("GET", timeout, false);
    this.taskType = taskType;
    this.type = C.GET_MODEL_HEALTH_STATUS;
    this.endpoint = `${super.apiEndPointAuto()}${
      ENDPOINTS.getModelHealthStatus
    }`;
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
    let url = this.endpoint;
    return url;
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
