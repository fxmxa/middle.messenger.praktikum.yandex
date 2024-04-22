function resourceUrl(path: string) {
  return path ? `https://ya-praktikum.tech/api/v2/resources${path}` : '/avatar-default.png';
}

export default resourceUrl;
