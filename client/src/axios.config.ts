import axios from "axios";

// development
export default axios.defaults.baseURL = `http://localhost:8000/api`;

// production
// export default axios.defaults.baseURL = `${window.location.origin}/api`;
