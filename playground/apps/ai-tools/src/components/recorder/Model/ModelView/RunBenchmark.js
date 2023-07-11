import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
export default class RunBenchmark extends API {
  constructor(task, domain, modelId, timeout = 200000) {
    super("POST", timeout, false);
    this.user_id = JSON.parse(localStorage.getItem("userDetails")).userID;
    this.type = C.RUN_BENCHMARK;
    this.task = task;
    this.domain = domain;
    this.modelId = modelId;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
    this.endpoint = `${super.apiEndPointAuto()}${
      ENDPOINTS.getBenchmarkDetails
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
    let url = `${this.endpoint}?userId=${this.user_id}`;

    return url;
  }

  getBody() {
    return {
      // task: this.task.toLowerCase(),
      // domain: this.domain,
      modelId: this.modelId,
    };
  }

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
