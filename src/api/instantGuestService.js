import axios from "axios";
import { API_URL } from "../config/urls";

// Guest requests deliberately carry no site cookie or access token. The
// signed pass only authorizes one instant collaboration request.
const guestApi = axios.create({ baseURL: API_URL, withCredentials: false });
const path = "/sessions/group-sessions";

export const guestPassKey = (sessionId) => `instant-guest:${sessionId}`;

const instantGuestService = {
  async request(code, name) {
    const { data } = await guestApi.post(`${path}/guest/request/`, { code, name });
    return data;
  },
  async status(sessionId, credential) {
    const { data } = await guestApi.post(`${path}/${sessionId}/guest/status/`, { credential });
    return data;
  },
  async join(sessionId, credential) {
    const { data } = await guestApi.post(`${path}/${sessionId}/guest/join/`, { credential });
    return data;
  },
};

export default instantGuestService;
