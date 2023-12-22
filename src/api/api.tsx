import { Applicant, createApplicant } from '../types/applicant';
import { Vacancy, createVacancy } from '../types/vacancy';

export default class API {
  // Singelton instance
  static api: null | API;
  api = null;

  // Local Python backend
  URL = 'http://127.0.0.1:5000/';

  //URLs
  addPdfURL = () => `${this.URL}/upload`;
  getApplicantsURL = () => `${this.URL}/applicants`;
  getApplicantURL = (id: string) => `${this.URL}/applicant/${id}`;

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

  addPdfs(pdf: FormData) {
    return this.fetchAdvanced(this.addPdfURL(), {
      method: 'POST',
      body: pdf,
    });
  }

  // getApplicants() {
  //   return this.fetchAdvanced(this.getApplicantsURL(), {
  //     method: 'GET',
  //   }).then((res) => {
  //     let applicants = createApplicant(res);
  //     return new Promise((resolve) => {
  //       resolve(applicants);
  //     });
  //   });
  // }

  // getApplicant(id: string) {
  //   return this.fetchAdvanced(this.getApplicantURL(id), { method: 'GET' }).then((res) => {
  //     let applicant = createApplicant(res);
  //     return new Promise((resolve) => {
  //       resolve(applicant);
  //     });
  //   });
  // }

  // getVacancies() {
  //   return this.fetchAdvanced(this.getVacanciesURL(), { method: 'GET' }).then((res) => {
  //     let vacancy = createVacancy(res);
  //     return new Promise((resolve) => {
  //       resolve(vacancy);
  //     });
  //   });
  // }

  // getVacancy(id: string) {
  //   return this.fetchAdvanced(this.getVacancyURL(id), { method: 'GET' }).then((res) => {
  //     let vacancy = createVacancy(res);
  //     return new Promise((resolve) => {
  //       resolve(vacancy);
  //     });
  //   });
  // }

  // Fetch vacancies
  fetchVacancies() {
    return this.fetchAdvanced(this.vacanciesURL(), {});  
  }

  // Get vacancy by ID
  getVacancy(vacancyId: string) {
    return this.fetchAdvanced(this.getVacancyURL(vacancyId), {});  
  }

  // Fetch applicants by vacancy ID
  fetchApplicants(vacancyId: string) {
    return this.fetchAdvanced(this.fetchApplicantsURL(vacancyId), {});
  }
  

}
