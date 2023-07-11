/**
 * File Upload API
 */
import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";

export default class DocumentUpload extends API {
  constructor(configFile, modelId, timeout = 2000) {
    super("POST", timeout, false, "MULTIPART");
    this.type = C.DOCUMENTUPLOAD;
    this.file = configFile;
    this.modelId = modelId;
    this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.ocrDocumentUpload}`;
    this.userDetails = JSON.parse(localStorage.getItem("userDetails"));
  }

  toString() {
    return `${super.toString()} , type: ${this.type}`;
  }

  processResponse(res) {
    super.processResponse(res);
  }

  apiEndPoint() {
    return this.endpoint;
  }

  getFormData() {
    const formData = new FormData();
    formData.append("file", this.file[0]);
    if(this.userDetails) {
      formData.append("userId", this.userDetails["userID"]);
    }
    formData.append("modelId", this.modelId);

    return formData;
  }

  getHeaders() {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
  }

  getPayload() {
    return this.config;
  }
}
