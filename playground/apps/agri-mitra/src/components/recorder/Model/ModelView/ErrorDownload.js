import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';

export default class LoginAPI extends API {
  constructor(serviceRequestNumber, timeout = 2000) {
    super("POST", timeout, false);
   this.serviceRequestNumber = serviceRequestNumber;
   this.type = C.GET_ERROR_REPORT;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.errorReport}`;
    this.userDetails = JSON.parse(localStorage.getItem('userInfo'))
  }

  toString() {
    return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
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
    return {"serviceRequestNumber":this.serviceRequestNumber}
  }



  getHeaders() {
    let urlSha = md5(JSON.stringify(this.getBody()))
    let hash = md5(this.userDetails.privateKey+"|"+urlSha)
    this.headers = {
      headers: {
        "Content-Type": "application/json",
        "key" :this.userDetails.publicKey,
        "sig"  : hash,
        "payload":urlSha
      }
    };
    return this.headers;
  }

  getPayload() {
    return this.reportValue;
  }
}
