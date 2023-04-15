// API key
const API_KEY = "KEY HERE";
export const url = "https://api.openai.com/v1/chat/completions";
// fetch options ... headers, body ...
export const options = {
  method: "POST",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
  body: {},
};
