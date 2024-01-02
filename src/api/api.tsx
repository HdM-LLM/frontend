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

  // Get applicants by vacancy ID or all applicants
  fetchApplicantsURL = () => `${this.URL}/applicants`;

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

  // Get cv of applicant
  fetchCvURL = (applicantId: string, vacancyId: string) =>
    `${this.URL}/applicant${`/${applicantId}`}/cv/${vacancyId}/cv.pdf`;

  static getAPI() {
    if (this.api == null) {
      this.api = new API();
    }
    return this.api;
  }

  //Resume
  addPdfsURL = () => `${this.URL}/upload`;

  // Vacancy URLs
  vacanciesURL = () => `${this.URL}/vacancies`;
  generateVacancyURL = () => `${this.vacanciesURL()}/generateVacancy`;
  addVacancyURL = () => `${this.vacanciesURL()}/addVacancy`;
  getVacancyURL = (vacancyId: string) => `${this.vacanciesURL()}/${vacancyId}`;

  // Category URLs
  getCategoryGuidelinesURL = (categoryName: string) =>
    `${this.URL}/getCategoryGuidelines/${categoryName}`;
  getChipForCategoryURL = (categoryName: string) =>
    `${this.URL}/getChipForCategory/${categoryName}`;
  addCategoryURL = () => `${this.URL}/addCategory`;
  allCategoriesURL = () => `${this.URL}/allCategories`;

  // Common fetch method for handling advanced requests
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

  addPdfs(cv: File, vacancyId: string) {
    const pdfs = new FormData();
    pdfs.append('cv', cv);
    pdfs.append('vacancy', vacancyId);
    return this.fetchAdvanced(this.addPdfURL(), { method: 'POST', body: pdfs });
  }

  // Applicant-related methods
  fetchApplicants() {
    return this.fetchAdvanced(this.fetchApplicantsURL(), {});
  }

  fetchApplicant(applicantId: string) {
    return this.fetchAdvanced(this.fetchApplicantURL(applicantId), {});
  }

  fetchApplicantsByVacancyId(vacancyId: string) {
    return this.fetchAdvanced(this.fetchApplicantsByVacancyURL(vacancyId), {});
  }

  fetchApplicantRatings(vacancyId: string, applicantId: string) {
    return this.fetchAdvanced(this.fetchApplicantRatingURL(vacancyId, applicantId), {});
  }

  // Vacancy-related methods
  fetchVacancies() {
    return this.fetchAdvanced(this.vacanciesURL(), {});
  }

  fetchVacancy(vacancyId: string) {
    return this.fetchAdvanced(this.getVacancyURL(vacancyId), {});
  }

  generateVacancy(
    basicInformation: Record<string, any>,
    selectedCategories: any[],
    adjustPrompt: string
  ) {
    const url = `${this.vacanciesURL()}/generateVacancy`;
    const body = JSON.stringify({ basicInformation, selectedCategories, adjustPrompt });

    return this.fetchAdvanced(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  addVacancy(data: {
    basicInformation: Record<string, any>;
    selectedCategories: any[];
    generatedVacancy: string;
  }) {
    const url = this.addVacancyURL();
    const body = JSON.stringify(data);

    return this.fetchAdvanced(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  // Category-related methods
  getCategoryGuidelines(categoryName: string) {
    return this.fetchAdvanced(this.getCategoryGuidelinesURL(categoryName), {
      method: 'GET',
    });
  }

  getChipForCategory(categoryName: string) {
    return this.fetchAdvanced(this.getChipForCategoryURL(categoryName), {
      method: 'GET',
    });
  }

  getAllCategories() {
    return this.fetchAdvanced(this.allCategoriesURL(), {
      method: 'GET',
    });
  }

  addCategory(category: { Name: string; Chip: string; Guideline_0: string; Guideline_1: string }) {
    return this.fetchAdvanced(this.addCategoryURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
  }

  // Fetch category data by category ID
  fetchCategoryData(categoryId: string) {
    return this.fetchAdvanced(this.fetchCategoryDataURL(categoryId), {});
  }

  // Fetch cv of applicant
  fetchCvByApplicant(applicantId: string, vacancyId: string) {
    return this.fetchAdvanced(this.fetchCvURL(applicantId, vacancyId), {});
  }
}
