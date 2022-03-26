/* eslint-disable class-methods-use-this */
import { AxiosError, AxiosResponse } from 'axios';
import CustomError from './Error';

class Api {
  baseUrl: string = `https://cdn.cur.su/api/latest.json`;

  _getResponseData(res: AxiosResponse) {
    if (res.data) {
      return res.data;
    }

    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  _handleError(error: AxiosError): ErrorConstructor | void {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Вы не авторизованы или авторизация истекла');
      }

      throw new CustomError(error.response.data.message || '', error.response.data.status);
    } else if (error.request) {
      throw new Error(
        'Удаленный сервер не отвечает, возможно, у Вас проблема с подключением к интернету. Пожалуйста, исправьте неполадку и перезагрузите страницу.'
      );
    } else {
      throw new Error('Ошибка в коде. Обратитесь в поддержку.');
    }
  }
}

export default Api;
