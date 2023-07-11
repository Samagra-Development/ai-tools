import API from "../../../api";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from "md5";

export default class SubmitBenchmark extends API {
  constructor(modelId, benchmarks, timeout = 2000) {
    super("POST", timeout, false);
    this.modelId = modelId;
    this.benchmarks = benchmarks;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.submitBenchmark}`;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${
      this.token
    } expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  apiEndPoint() {
    return this.endpoint;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.reportValue = res;
    }
  }

  getBody() {
    return { modelId: this.modelId, benchmarkId: this.benchmarks[0].benchmarkId };
  }

  getHeaders() {
    let urlSha = md5(JSON.stringify(this.getBody()));
    let hash = md5(this.userDetails.privateKey + "|" + urlSha);
    this.headers = {
      headers: {
        "Content-Type": "application/json",
        key: this.userDetails.publicKey,
        sig: hash,
        "payload":urlSha
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.reportValue;
  }
}
