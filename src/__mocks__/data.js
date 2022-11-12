const data = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  name: `HTTP_CLIENT_CONNECT_THROTTLE_${index}`,
  service: '__default__',
}));

export default data;
