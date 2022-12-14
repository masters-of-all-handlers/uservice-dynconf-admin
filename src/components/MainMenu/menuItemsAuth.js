import {DASHBOARD_CONFIGS_URL, DASHBOARD_USERS_URL} from "../../constants";

export const menuItemsAuth = [
  {
    label: "Конфиги",
    key: "configs",
    prefix: DASHBOARD_CONFIGS_URL,
  },
  {
    label: "Пользователи",
    key: "users",
    prefix: DASHBOARD_USERS_URL,
  },
  {
    label: "Выход",
    key: "logout",
    style: {
      marginLeft: "auto",
    },
  },
];
