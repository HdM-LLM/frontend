export default class API {
  // Singelton instance
  static api: null | API;
  api = null;

  // Local Python backend
  URL = 'http://127.0.0.1:5000/';

  //Resume
  addPdfsURL = () => `${this.URL}/upload`;

  // Vacancy
  vacanciesURL = () => `${this.URL}/vacancies`;

  // Get Vacancy
  getVacancyURL = (vacancyId: string) => `${this.vacanciesURL()}/${vacancyId}`;

  // Get applicants by vacancy ID or all applicants
  fetchApplicantsURL = (vacancyId?: string) =>
    `${this.URL}/applicants${vacancyId ? `/${vacancyId}` : ''}`;


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

  addPdfs(pdf: File, vacancy: string) {
    const pdfs = new FormData();
    pdfs.append('cv', pdf);
    pdfs.append('vacancy', vacancy);
  
    return this.fetchAdvanced(this.addPdfsURL(), {
      method: 'POST',
      body: pdfs,
    });
  }

  // Fetch vacancies
  fetchVacancies() {
    return this.fetchAdvanced(this.vacanciesURL(), {});  
  }

  // Get vacancy by ID
  getVacancy(vacancyId: string) {
    return this.fetchAdvanced(this.getVacancyURL(vacancyId), {});  
  }

  // Fetch applicants by vacancy ID
  fetchApplicants(vacancyId?: string) {
    return this.fetchAdvanced(this.fetchApplicantsURL(vacancyId), {});
  }
  

}
