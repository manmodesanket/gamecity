import axios from "axios";

async function makeApiCall({ type, url, data }) {
  switch (type) {
    case "get":
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          const { data } = response;
          return { success: true, response: data };
        }
      } catch (error) {
        return { success: false, error, response: null };
      }

    default:
      return { success: false, error: false, response: null };
  }
}

export default makeApiCall;
