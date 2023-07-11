// GetTransliterationModelID

/**
 * Transliteration text API
 */
import API from "../../../api";
import C from "../../../constants";
import ENDPOINTS from "../../../../../configs/apiendpoints";

export default class GetTransliterationModelID extends API {
  constructor(sourceLang = "", targLang = "", timeout = 2000) {
    super("GET", timeout, false);
    this.queryStr =
      sourceLang && targLang
        ? `sourceLanguage=${sourceLang}&targetLanguage=${targLang}`
        : `sourceLanguage=${sourceLang}`;
    this.endpoint = `${super.apiEndPointAuto()}${
      ENDPOINTS.getTransliterationModelId
    }?${this.queryStr}`;

    this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
    console.log(this.userDetails, "this is text");
    this.type = C.GET_TRANSLITERATION_MODEL_ID;
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

  getBody() {}

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
