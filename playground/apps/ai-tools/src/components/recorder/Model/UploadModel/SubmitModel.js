/**
 * Login API
 */
import API from "../../../api";
import C from "../../../constants";
import CONFIGS from "../../../../../configs/configs";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';

export default class LoginAPI extends API {
  constructor(fileDetails, timeout = 2000) {
    super("POST", timeout, false, "MULTIPART");
    this.type = C.SUBMIT_MODEL;
    this.fileDetails = fileDetails;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.modelSubmit}`;
    this.userDetails = JSON.parse(localStorage.getItem('userInfo'))
  }


  apiEndPoint() {
    return this.endpoint;
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
  }


  getFormData() {
    const formData = new FormData();
    formData.append('file', this.fileDetails.file);
    formData.append('userId', JSON.parse(localStorage.getItem('userDetails')).userID);

    return formData;
  }

  processResponse(res) {
    super.processResponse(res);
    if (res) {
      this.report = res.data;
    }
  }




  getHeaders() {
    let urlSha = md5(JSON.stringify(this.getFormData()))
    let hash = md5(this.userDetails.privateKey +"|"+urlSha)
    this.headers = {
      headers: {
        "key": this.userDetails.publicKey,
        "sig": hash,
        "payload":urlSha
      }
    };
    return this.headers;
  }


  getPayload() {
    return this.report;
  }
}
