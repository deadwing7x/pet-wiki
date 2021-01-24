import fetch from "node-fetch";
import { Context } from "aws-lambda";

export async function handler(event: any, context: Context) {
  try {
    const baseUrl = "https://api.thecatapi.com/v1";
    const apiUrl = `${baseUrl}/breeds`;
    const apiKey = "fee5f4b7-b780-4a47-8ce9-2b491704350f";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ breeds: data }),
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
