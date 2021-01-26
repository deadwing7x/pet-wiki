import { Context } from "aws-lambda";
import axios from "axios";

exports.handler = async function (event: any, context: Context) {
  try {
    const baseUrl = "https://api.thedogapi.com/v1";
    const apiUrl = `${baseUrl}/images/search`;
    const apiKey = "2e1e6243-e33c-4bf1-a4ca-f99a3d14e2b4";

    const response = await axios(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
      params: {
        size: event.queryStringParameters.size,
        limit: 8,
        page: parseInt(event.queryStringParameters.page),
        breed_id: event.queryStringParameters.breed_id,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ images: response.data }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
