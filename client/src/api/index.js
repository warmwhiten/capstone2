import axios from "axios";

export const postAPI = async (document, keyword, zipNum) => {
  try {
    console.log("data", document, keyword, zipNum);
    const data = {
      document: document,
      keyword: keyword,
      zip_num: zipNum,
    };
    const response = await axios.post(
      "http://127.0.0.1:80/result",
      JSON.stringify(data),
      {
        headers: { "Content-Type": `application/json` },
      }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    console.log("post error", error);
  }
};
