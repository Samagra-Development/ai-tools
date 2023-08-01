import toast from 'react-hot-toast';

export const textToSpeech = async (obj: any) => {
  const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  try {
    const ttsResp = await fetch(obj.apiEndPoint(), {
      method: 'post',
      headers: obj.getHeaders().headers,
      body: JSON.stringify(obj.getBody()),
    });

    if (ttsResp.ok) {
      const rsp_data = await ttsResp.json();
      if (rsp_data.audio[0].audioContent) {
        const blob = b64toBlob(rsp_data.audio[0].audioContent, 'audio/wav');
        const urlBlob = window?.URL.createObjectURL(blob);
        return urlBlob;
      } else {
        return rsp_data.audio[0].audioUri;
      }
    } else {
      const errorData = await ttsResp.json();
      toast.error(errorData.message);
    }
  } catch (error) {
    console.error(error);
    toast.error('Unable to process your request at the moment. Please try again later.');
  }
};