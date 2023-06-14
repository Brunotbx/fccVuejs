import externalApi from "../data";

export function postClient(body) {
  return externalApi.post("/Cliente/Adicionar", body);
}

export function putClient(body) {
  return externalApi.put("/Cliente/Alterar", body);
}
