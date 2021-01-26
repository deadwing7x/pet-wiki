import { Context } from "aws-lambda";
import axios from "axios";

exports.handler = async function (event: any, context: Context) {
  try {
    const baseUrl = "https://api.giphy.com/v1/gifs";
    const apiUrl = `${baseUrl}/random`;
    const apiKey = "ySE9LOb8yh85VoNIoYGvcGtK8z4ZFSaY";

    const response = await axios(apiUrl, {
      method: "GET",
      headers: {
        data: "application/json",
      },
      params: {
        api_key: apiKey,
        tag: "cats",
        rating: "r"
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ data: response.data }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
