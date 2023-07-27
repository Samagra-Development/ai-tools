/**
 * Model Search API
 */
import API from "../../api";
// import C from "../../../constants";
// import CONFIGS from "../../../../../configs/configs";
import ENDPOINTS from "../../configs/apiendpoints";
// import md5 from "md5";

export default class HostedInference extends API {
  constructor(
    modelId,
    input,
    task,
    record,
    source,
    inferenceEndPoint,
    gender,
    timeout = 2000
  ) {
    super("POST", timeout, false);
    this.modelId = modelId;
    this.input = input;
    this.task = task;
    this.record = record;
    this.source = source;
    this.inferenceEndPoint = inferenceEndPoint;
    this.gender = gender;
    this.endpoint = `${super.apiEndPointAuto()}${
      this.task === "asr" ? ENDPOINTS.hostedVoice : ENDPOINTS.hostedInference
    }`;
    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
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
    let bodyData = {
      modelId: this.modelId,
      task: this.task,
    };
    if (this.task === "translation") {
      bodyData.input = [{ source: this.input }];
    } else if (this.task === "asr") {
      if (this.record) {
        console.log("fgh:",{input:this.input})
        bodyData.audioContent = this.input.split("base64,")[1];
      } else {
        bodyData.audioUri = this.input;
      }
      bodyData.source = this.source;
      // bodyData.inferenceEndPoint = this.inferenceEndPoint;
    } else if (this.task === "ocr") {
      bodyData.imageUri = this.input;
      bodyData.source = this.source;
      bodyData.inferenceEndPoint = this.inferenceEndPoint;
    } else if (this.task === "tts") {
      bodyData.input = [{ source: this.input }];
      bodyData.gender = this.gender;
    }else if (this.task === "ner") {
      bodyData.input = [{ source: this.input }];
    }else if (this.task === "transliteration") {
      bodyData.input = [{ source: this.input }];
    } else if (this.task === "txt-lang-detection") {
      bodyData.input = [{ source: this.input }];
    }
    bodyData.userId =
      localStorage.getItem("userDetails") &&
      JSON.parse(localStorage.getItem("userDetails")).userID;
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
