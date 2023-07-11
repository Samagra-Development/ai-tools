/**
 * Submit Feedback API
 */
import API from "../../../api";
import C from "../../../constants";
import CONFIGS from "../../../../../configs/configs";
import ENDPOINTS from "../../../../../configs/apiendpoints";
import md5 from 'md5';

export default class SbmitFeedback extends API {
    constructor(taskType = 'sts', inputBase64 = "", outputBase64 = "", feedback = [], detailedFeedback = [], modelId, timeout = 2000) {
        super("POST", timeout, false);
        this.taskType = taskType;
        this.input = inputBase64;
        this.output = outputBase64;
        this.feedback = feedback;
        this.detailedFeedback = detailedFeedback;
        this.modelId = modelId;
        this.endpoint = `${super.apiEndPointAuto()}${ENDPOINTS.submitFeedback}`;
        this.type = C.SUBMIT_FEEDBACK;
    }

    toString() {
        return `${super.toString()} email: ${this.email} token: ${this.token} expires: ${this.expires} userid: ${this.userid}, type: ${this.type}`;
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
        const { taskType, input, output, feedback, detailedFeedback, modelId } = this;
        return {
            taskType,
            input,
            output,
            feedback,
            detailedFeedback,
            userId: localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")).userID : "",
            modelId,
        };
    }


    getHeaders() {
        this.headers = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        return this.headers;
    }


    getPayload() {
        return this.report;

    }
}
