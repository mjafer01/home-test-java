import axios, { AxiosRequestHeaders } from "axios";
import RestResponse from "./RestResponse";

const RestPost = async (
  url: string,
  body: object,
  headers: AxiosRequestHeaders
): Promise<RestResponse> => {
  try {
    let data = await axios.post(url, JSON.stringify(body), {
      headers: headers,
    });
    if (data["status"] > 199 && data["status"] < 300) {
      return { status: data["status"], body: data.data };
    }

    throw Error(data["status"] + "");
  } catch (ex: any) {
    console.log(ex);
    if (ex.toString().includes("500"))
      return { status: 500, message: ex.response.data.message };
    else if (ex.toString().includes("400"))
      return { status: 400, message: ex.response.data.message };
    else if (ex.toString().includes("401"))
      return { status: 401, message: ex.response.data.message };
    else if (ex.toString().includes("401"))
      return { status: 401, message: ex.response.data.message };
    else if (ex.toString().includes("403"))
      return { status: 403, message: ex.response.data.message };
    else if (ex.toString().includes("404"))
      return { status: 404, message: ex.response.data.message };
    else if (ex.toString().includes("406"))
      return { status: 406, message: ex.response.data.message };
  }

  return { status: 0 };
};

export default RestPost;
