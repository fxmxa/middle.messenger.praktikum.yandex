// export default abstract class BaseApi<dataT, requestDataT = unknown, responseT = unknown> {
//   create(data: dataT) {
//     throw new Error(`метод create не реализован, data -  ${data}`);
//   }
//
//   request(data: requestDataT): responseT | ErrorResponse {
//     throw new Error(`метод create не реализован, data -  ${data}`);
//   }
//
//   update(data: dataT) {
//     throw new Error(`метод update не реализован, data -  ${data}`);
//   }
//
//   delete() {
//     throw new Error('метод не реализован');
//   }
// }

export default abstract class BaseApi<
  CreateData = unknown,
  RequestData = unknown,
  UpdateData = unknown,
  DeleteData = unknown > {
  create(data: CreateData) {
    throw new Error(`метод create не реализован, data -  ${data}`);
  }

  request(data: RequestData) {
    throw new Error(`метод create не реализован, data -  ${data}`);
  }

  update(data: UpdateData) {
    throw new Error(`метод update не реализован, data -  ${data}`);
  }

  delete(data: DeleteData) {
    throw new Error(`метод delete не реализован, data - ${data}`);
  }
}
