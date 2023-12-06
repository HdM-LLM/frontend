export default class API {
  // Singelton instance
  static api: null | API;
  api = null;

  // Local Python backend
  URL = 'http://127.0.0.1:5000/';

  //Resume
  addPdfsURL = () => `${this.URL}/upload`;

  static getAPI() {
    if (this.api == null) {
      this.api = new API();
    }
    return this.api;
  }

  fetchAdvanced(url: string, init: RequestInit) {
    // If no init parameter is used, create empty init
    if (typeof init === 'undefined') {
      init = { headers: {} };
    }

    // If no headers parameter is used, create empty header
    if (typeof init.headers === 'undefined') {
      init['headers'] = {};
    }
    return fetch(url, init).then((res) => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }

  addPdfs(pdfs: FormData) {
    return this.fetchAdvanced(this.addPdfsURL(), {
      method: 'POST',
      body: pdfs,
    });
  }
}
