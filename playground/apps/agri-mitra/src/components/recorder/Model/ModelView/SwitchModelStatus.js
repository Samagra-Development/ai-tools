import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from "md5";
export default class MyContribution extends API {
  constructor(modelId, status, reason, timeout = 200000) {
    super("POST", timeout, false);
    this.user_id = JSON.parse(localStorage.getItem("userDetails")).userID;
    this.modelId = modelId;
    this.status = status;
    this.type = C.TOGGLE_MODEL_STATUS;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.toggleModelStatus}`;
    this.reason = reason;
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
    let url = `${this.endpoint}`;
    return url;
  }

  getBody() {
    return {
      userId: this.user_id,
      modelId: this.modelId,
      status: this.status,
      unpublishReason: this.reason,
    };
  }

  getHeaders() {
    let res = this.apiEndPoint();
    let urlSha = md5(res);
    let hash = md5(this.userDetails.privateKey + "|" + urlSha);
    this.headers = {
      headers: {
        "Content-Type": "application/json",
        key: this.userDetails.publicKey,
        sig: hash,
        payload: urlSha,
      },
    };
    return this.headers;
  }

  getPayload() {
    return this.report;
  }
}
