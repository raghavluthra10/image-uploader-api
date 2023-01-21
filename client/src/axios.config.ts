import axios from "axios";

// development
export default axios.defaults.baseURL = `${window.location.origin}/api`;
