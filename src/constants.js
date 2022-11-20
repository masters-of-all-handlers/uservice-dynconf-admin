// API
export const API_BASE_URL = "http://10.21.0.234:8083";
export const API_BASE_ADMIN_URL = `${API_BASE_URL}/admin/v1`;
export const API_CONFIGS_ENDPOINT = "/variables";

// Routes
export const DASHBOARD_URL = "/dashboard";
export const DASHBOARD_CONFIGS_URL = `${DASHBOARD_URL}/configs`;
export const DASHBOARD_CONFIGS_CREATE_URL = `${DASHBOARD_URL}/configs/create`;
export const DASHBOARD_CONFIGS_EDIT_URL = (uuid) => `${DASHBOARD_URL}/configs/${uuid}/edit`;
export const DASHBOARD_CONFIGS_CLONE_URL = (uuid) => `${DASHBOARD_URL}/configs/${uuid}/clone`;
