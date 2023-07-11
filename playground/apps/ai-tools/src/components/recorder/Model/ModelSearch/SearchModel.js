/**
 * Model Search API
 */
import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";

export default class SearchModel extends API {
  constructor(
    task = "translation",
    sourceLanguage = null,
    targetLanguage = [],
    sts = false,
    domain = "All",
    submitter = "All",
    timeout = 2000
  ) {
    super("POST", timeout, false);
    this.task = task;
    this.sourceLanguage = sourceLanguage;
    this.targetLanguage = targetLanguage;
    this.domain = domain;
    this.submitter = submitter;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.modelSearch}`;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
    this.type = sts ? C.GET_BULK_MODEL_SEARCH : C.SUBMIT_MODEL_SEARCH;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${
      this.token
    } expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.report = res.data;
    }
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getBody() {
    let bodyData;
    if (this.task !== "txt-lang-detection") {
      bodyData = {
        task: this.task,
        sourceLanguage: this.sourceLanguage,
        targetLanguage: this.targetLanguage,
        domain: this.domain,
        submitter: this.submitter,
      };
      bodyData.userId =
        localStorage.getItem("userDetails") &&
        JSON.parse(localStorage.getItem("userDetails")).userID;
    } else if (this.task === "txt-lang-detection") {
      bodyData = {
        task: this.task,
      };
    }
    return bodyData;
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
