/**
 * BenchmarkDetails API
 */
import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";

export default class BenchmarkDetails extends API {
  constructor(benchmarkId, timeout = 2000) {
    super("GET", timeout, false);
    this.endpoint = `${super.apiEndPointAuto()}${
      ENDPOINTS.benchmarkDetails
    }?benchmarkId=${benchmarkId}`;
    this.type = C.GET_BENCHMARK_DETAILS;
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
    return this.endpoint;
  }

  getBody() {
    return {}
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
