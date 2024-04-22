export default abstract class BaseApi<dataT, requestDataT = unknown> {
  create(data: dataT) {
    throw new Error(`метод create не реализован, data -  ${data}`);
  }

  request(data: requestDataT) {
    throw new Error(`метод create не реализован, data -  ${data}`);
  }

  update(data: dataT) {
    throw new Error(`метод update не реализован, data -  ${data}`);
  }

  delete() {
    throw new Error('метод не реализован');
  }
}
