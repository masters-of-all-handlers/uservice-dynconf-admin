// API
export const API_BASE_URL = "http://83.222.9.227:8083";
export const API_BASE_AUTH_URL = "http://83.222.9.227:8080";
export const API_BASE_ADMIN_URL = `${API_BASE_URL}/admin/v2`;
export const API_CONFIGS_ENDPOINT = "/configs";
export const API_SERVICES_ENDPOINT = "/services";

// Routes
export const DASHBOARD_URL = "/dashboard";
export const DASHBOARD_CONFIGS_URL = `${DASHBOARD_URL}/configs`;
export const DASHBOARD_CONFIGS_CREATE_URL = `${DASHBOARD_URL}/configs/create`;
export const DASHBOARD_CONFIGS_EDIT_URL = (uuid) => `${DASHBOARD_URL}/configs/${uuid}/edit`;
export const DASHBOARD_CONFIGS_CLONE_URL = (uuid) => `${DASHBOARD_URL}/configs/${uuid}/clone`;

export const DASHBOARD_USERS_URL = `${DASHBOARD_URL}/users/create`;

export const LOGIN_URL = "/login";

// Auth
export const AUTH_DISABLED = false;

// Common
export const SITE_NAME = "Динамические конфиги userver";
export const SITE_COPYRIGHT = "Сделано с любовью ❤️ 2022";
