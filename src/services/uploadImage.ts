import axios from "axios";

export const BASE_URL_UPLOAD = "https://3t5qygoujf.execute-api.ap-southeast-2.amazonaws.com/production/s3url";

export const uploadImage = async (payload: any) => {

  const imageFile = payload ? payload[0] : ''

  const req = imageFile ? await axios.get(BASE_URL_UPLOAD) : undefined
  const res = await req?.data
  const uploadURL = res?.url || ''
  
  axios.put(
    uploadURL,
    imageFile,
    {
      headers: {
        "Content-Type": 'multipart/form-data',
      }
    })

  return imageFile ? uploadURL.split('?')[0] : null
};