import { Context } from "aws-lambda";
import axios from 'axios';

exports.handler =  async function(event: any, context: Context) {
  try {
    const baseUrl = "https://api.thecatapi.com/v1";
    const apiUrl = `${baseUrl}/breeds`;
    const apiKey = "fee5f4b7-b780-4a47-8ce9-2b491704350f";

    const response = await axios(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ breeds: response.data }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
