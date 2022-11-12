const data = Array.from({ length: 100 }, (_, index) => ({
  key: index,
  name: `HTTP_CLIENT_CONNECT_THROTTLE_${index}`,
  service: index < 50 ? '__default__' : 'otherService',
}));

export default data;
