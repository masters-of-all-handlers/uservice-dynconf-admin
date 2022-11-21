import {AUTH_DISABLED} from "../constants";

export const getStoredTicket = () => window.localStorage.getItem("uda_ticket");

export const prepareAuthHeaders = headers => {
  const ticket = getStoredTicket();
  if (!AUTH_DISABLED && ticket) {
    headers.set("Ticket", ticket);
  }
  return headers;
}
