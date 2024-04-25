export default <T>(string: string) => {
  try {
    return JSON.parse(string) as T;
  } catch {
    return undefined;
  }
};
