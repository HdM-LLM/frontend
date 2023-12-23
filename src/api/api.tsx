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
  fetchApplicantsURL = () => `${this.URL}/applicants/`;

  // Get applicants by vacancy ID or all applicants
  fetchApplicantURL = (applicantId: string) => `${this.URL}/applicants${`/${applicantId}`}`;

  // Get all applicants by vacancy ID
  fetchApplicantsByVacancyURL = (vacancyId: string) =>
    `${this.URL}/applicantsVacancy${`/${vacancyId}`}`;

  // Get applicant rating by applicant ID and vacancy ID
  fetchApplicantRatingURL = (vacancyId: string, applicantId: string) =>
    `${this.URL}/applicantsRating${`/${vacancyId}/${applicantId}`}`;

  // Get category data by category ID
  fetchCategoryDataURL = (categoryId: string) => `${this.URL}/category${`/${categoryId}`}`;

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

  // Fetch vacancies
  fetchVacancies() {
    return this.fetchAdvanced(this.vacanciesURL(), {});
  }

  // Get vacancy by ID
  fetchVacancy(vacancyId: string) {
    return this.fetchAdvanced(this.getVacancyURL(vacancyId), {});
  }

  // Fetch all applicants
  fetchApplicants() {
    return this.fetchAdvanced(this.fetchApplicantsURL(), {});
  }

  // Fetch one applicant by ID
  fetchApplicant(applicantId: string) {
    return this.fetchAdvanced(this.fetchApplicantURL(applicantId), {});
  }

  // Fetch all applicants by vacancy ID
  fetchApplicantsByVacancyId(vacancyId: string) {
    return this.fetchAdvanced(this.fetchApplicantsByVacancyURL(vacancyId), {});
  }

  // Fetch applicant ratings by applicant ID and vacancy ID
  fetchApplicantRatings(vacancyId: string, applicantId: string) {
    return this.fetchAdvanced(this.fetchApplicantRatingURL(vacancyId, applicantId), {});
  }

  // Fetch category data by category ID
  fetchCategoryData(categoryId: string) {
    return this.fetchAdvanced(this.fetchCategoryDataURL(categoryId), {});
  }
}
