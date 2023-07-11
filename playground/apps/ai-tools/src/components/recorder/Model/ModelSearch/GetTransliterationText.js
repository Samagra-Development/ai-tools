/**
 * Transliteration text API
 */
 import API from "../../../api";
 import C from "../../../constants";
 
 export default class GetTransliterationText extends API {
   
   constructor(
     languageCode,
     text,
     timeout = 2000
   ) {
     super("GET", timeout, false);
     this.text = text;
     this.languageCode = languageCode;
     this.endpoint = `https://xlit-api.ai4bharat.org/tl/${languageCode}/${text}`;
     
     this.userDetails = JSON.parse(localStorage.getItem("userInfo"));
     console.log(this.userDetails,"this is text")
     this.type = C.GET_TRANSLITERATION_TEXT;
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
 