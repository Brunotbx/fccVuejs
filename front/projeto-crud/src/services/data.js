import axios from "axios";

const externalApi = axios.create({
  baseURL: "https://extranet.fcc.org.br/webapi/testecandidato/v1",
  headers: {
    "Content-type": "application/json",
  },
});

export default externalApi;
