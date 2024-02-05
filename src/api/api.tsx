/**
 * Represents a singleton API class for managing interactions with a local Python backend server.
 * This class includes methods for handling file uploads, fetching applicant and vacancy data, and managing categories.
 */
export default class API {
  /** Singleton instance of the API class. */
  static api: null | API;
  api = null;

  /** Base URL pointing to the local Python backend server. */
  URL = 'http://127.0.0.1:5000/';

  /**
   * Retrieves the singleton instance of the API class, creating it if it does not already exist.
   * @returns {API} The singleton instance of the API class.
   */
  static getAPI() {
    if (this.api == null) {
      this.api = new API();
    }
    return this.api;
  }

  /**
   * Constructs the URL for adding PDF files.
   * @returns {string} The URL to upload PDF files.
   */
  addPdfURL = () => `${this.URL}/upload`;

  /**
   * Constructs the URL for retrieving applicants.
   * @returns {string} The URL to fetch applicants.
   */
  getApplicantsURL = () => `${this.URL}/applicants`;

  /**
   * Constructs the URL for retrieving a specific applicant's details.
   * @param applicantId The unique identifier for the applicant.
   * @param vacancyId The unique identifier for the vacancy.
   * @returns {string} The URL to fetch a specific applicant's details.
   */
  getApplicantURL = (applicantId: string, vacancyId: string) =>
    `${this.URL}/applicants/${applicantId}/${vacancyId}`;

  /**
   * Constructs the URL for retrieving all applicants for a specific vacancy.
   * @returns {string} The URL to fetch all applicants for a specific vacancy.
   */
  fetchApplicantsURL = () => `${this.URL}/applicants`;

  /**
   * Constructs the URL for fetching a specific applicant.
   * @param applicantId The unique identifier for the applicant.
   * @param vacancyId The unique identifier for the vacancy.
   * @returns {string} The URL to fetch a specific applicant.
   */
  fetchApplicantURL = (applicantId: string, vacancyId: string) =>
    `${this.URL}/applicants/${applicantId}/${vacancyId}`;

  /**
   * Constructs the URL for fetching applicants by a specific vacancy ID.
   * @param vacancyId The unique identifier for the vacancy.
   * @returns {string} The URL to fetch applicants for a specific vacancy.
   */
  fetchApplicantsByVacancyURL = (vacancyId: string) =>
    `${this.URL}/applicantsVacancy${`/${vacancyId}`}`;

  /**
   * Constructs the URL for fetching the rating of an applicant for a specific vacancy.
   * @param vacancyId The unique identifier for the vacancy.
   * @param applicantId The unique identifier for the applicant.
   * @returns {string} The URL to fetch the applicant's rating for a specific vacancy.
   */
  fetchApplicantRatingURL = (vacancyId: string, applicantId: string) =>
    `${this.URL}/applicantsRating${`/${vacancyId}/${applicantId}`}`;

  /**
   * Constructs the URL for fetching category data by category ID.
   * @param categoryId The unique identifier for the category.
   * @returns {string} The URL to fetch category data.
   */
  fetchCategoryDataURL = (categoryId: string) => `${this.URL}/category${`/${categoryId}`}`;

  /**
   * Constructs the URL for fetching the CV of an applicant.
   * @param applicantId The unique identifier for the applicant.
   * @param vacancyId The unique identifier for the vacancy.
   * @returns {string} The URL to fetch the CV of a specific applicant.
   */
  fetchCvURL = (applicantId: string, vacancyId: string) =>
    `${this.URL}/applicant${`/${applicantId}`}/cv/${vacancyId}/cv.pdf`;

  /**
   * Constructs the URL for uploading PDFs.
   * @returns {string} The URL to upload PDF files.
   */
  addPdfsURL = () => `${this.URL}/upload`;

  /**
   * Constructs the base URL for vacancy operations.
   * @returns {string} The base URL for interacting with vacancies.
   */
  vacanciesURL = () => `${this.URL}/vacancies`;

  /**
   * Constructs the URL for generating a new vacancy.
   * @returns {string} The URL to initiate the generation of a new vacancy.
   */
  generateVacancyURL = () => `${this.vacanciesURL()}/generateVacancy`;

  /**
   * Constructs the URL for adding a new vacancy.
   * @returns {string} The URL to add a new vacancy.
   */
  addVacancyURL = () => `${this.vacanciesURL()}/addVacancy`;

  /**
   * Constructs the URL for fetching a specific vacancy's details.
   * @param vacancyId The unique identifier for the vacancy.
   * @returns {string} The URL to fetch details of a specific vacancy.
   */
  getVacancyURL = (vacancyId: string) => `${this.vacanciesURL()}/${vacancyId}`;

  /**
   * Constructs the URL for fetching category guidelines by category name.
   * @param categoryName The name of the category.
   * @returns {string} The URL to fetch guidelines for a specific category.
   */
  getCategoryGuidelinesURL = (categoryName: string) =>
    `${this.URL}/getCategoryGuidelines/${categoryName}`;

  /**
   * Constructs the URL for fetching the chip for a category by its name.
   * @param categoryName The name of the category.
   * @returns {string} The URL to fetch the chip for a specific category.
   */
  getChipForCategoryURL = (categoryName: string) =>
    `${this.URL}/getChipForCategory/${categoryName}`;

  /**
   * Constructs the URL for adding a new category.
   * @returns {string} The URL to add a new category.
   */
  addCategoryURL = () => `${this.URL}/addCategory`;

  /**
   * Constructs the URL for fetching all categories.
   * @returns {string} The URL to fetch all categories.
   */
  allCategoriesURL = () => `${this.URL}/allCategories`;

  /**
   * Common method for performing advanced fetch operations with custom configurations.
   * @param url The URL to fetch from.
   * @param init The RequestInit configuration object for the fetch request.
   * @returns {Promise<any>} A promise resolving to the fetched data.
   */
  fetchAdvanced(url: string, init: RequestInit) {
    // Default initialization if not provided
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

  /**
   * Uploads a PDF file for a specific vacancy.
   * @param cv The CV file to be uploaded.
   * @param vacancyId The ID of the vacancy to which the CV is related.
   * @returns A Promise resolving to the response from the server after attempting to upload the PDF.
   */
  addPdfs(cv: File, vacancyId: string) {
    const pdfs = new FormData();
    pdfs.append('cv', cv);
    pdfs.append('vacancy', vacancyId);
    return this.fetchAdvanced(this.addPdfURL(), { method: 'POST', body: pdfs });
  }

  /**
   * Fetches a list of all applicants.
   * @returns A Promise resolving to the list of applicants.
   */
  fetchApplicants() {
    return this.fetchAdvanced(this.fetchApplicantsURL(), {});
  }

  /**
   * Fetches details for a specific applicant.
   * @param applicantId The ID of the applicant to fetch.
   * @param vacancyId The ID of the vacancy the applicant applied for.
   * @returns A Promise resolving to the details of the specified applicant.
   */
  fetchApplicant(applicantId: string, vacancyId: string) {
    return this.fetchAdvanced(this.fetchApplicantURL(applicantId, vacancyId), {});
  }

  /**
   * Fetches applicants for a specific vacancy ID.
   * @param vacancyId The ID of the vacancy to fetch applicants for.
   * @returns A Promise resolving to the list of applicants for the specified vacancy.
   */
  fetchApplicantsByVacancyId(vacancyId: string) {
    return this.fetchAdvanced(this.fetchApplicantsByVacancyURL(vacancyId), {});
  }

  /**
   * Fetches the ratings of an applicant for a specific vacancy.
   * @param vacancyId The ID of the vacancy.
   * @param applicantId The ID of the applicant.
   * @returns A Promise resolving to the rating of the specified applicant for the specified vacancy.
   */
  fetchApplicantRatings(vacancyId: string, applicantId: string) {
    return this.fetchAdvanced(this.fetchApplicantRatingURL(vacancyId, applicantId), {});
  }

  /**
   * Fetches a list of all vacancies.
   * @returns A Promise resolving to the list of vacancies.
   */
  fetchVacancies() {
    return this.fetchAdvanced(this.vacanciesURL(), {});
  }

  /**
   * Fetches details for a specific vacancy.
   * @param vacancyId The ID of the vacancy to fetch.
   * @returns A Promise resolving to the details of the specified vacancy.
   */
  fetchVacancy(vacancyId: string) {
    return this.fetchAdvanced(this.getVacancyURL(vacancyId), {});
  }

  /**
   * Generates a new vacancy based on provided information.
   * @param basicInformation The basic information for the vacancy.
   * @param selectedCategories The categories selected for the vacancy.
   * @param adjustPrompt Any adjustment or prompt necessary for generating the vacancy.
   * @returns A Promise resolving to the response from the server after attempting to generate the vacancy.
   */
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

  /**
   * Adds a new vacancy with the provided data.
   * @param data The data for the new vacancy including basic information, selected categories, and generated vacancy details.
   * @returns A Promise resolving to the response from the server after attempting to add the vacancy.
   */
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

  /**
   * Fetches category guidelines for a specific category name.
   * @param categoryName The name of the category to fetch guidelines for.
   * @returns A Promise resolving to the guidelines of the specified category.
   */
  getCategoryGuidelines(categoryName: string) {
    return this.fetchAdvanced(this.getCategoryGuidelinesURL(categoryName), {
      method: 'GET',
    });
  }

  /**
   * Fetches the chip information for a specific category name.
   * @param categoryName The name of the category to fetch the chip for.
   * @returns A Promise resolving to the chip information of the specified category.
   */
  getChipForCategory(categoryName: string) {
    return this.fetchAdvanced(this.getChipForCategoryURL(categoryName), {
      method: 'GET',
    });
  }

  /**
   * Fetches a list of all categories.
   * @returns A Promise resolving to the list of all categories.
   */
  getAllCategories() {
    return this.fetchAdvanced(this.allCategoriesURL(), {
      method: 'GET',
    });
  }

  /**
   * Adds a new category with the provided data.
   * @param category The data for the new category including name, chip, and guidelines.
   * @returns A Promise resolving to the response from the server after attempting to add the category.
   */
  addCategory(category: { Name: string; Chip: string; Guideline_0: string; Guideline_1: string }) {
    return this.fetchAdvanced(this.addCategoryURL(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
  }

  /**
   * Fetches data for a specific category by ID.
   * @param categoryId The ID of the category to fetch data for.
   * @returns A Promise resolving to the data of the specified category.
   */
  fetchCategoryData(categoryId: string) {
    return this.fetchAdvanced(this.fetchCategoryDataURL(categoryId), {});
  }

  /**
   * Fetches the CV of a specific applicant for a specific vacancy.
   * @param applicantId The ID of the applicant.
   * @param vacancyId The ID of the vacancy.
   * @returns A Promise resolving to the CV of the specified applicant.
   */
  fetchCvByApplicant(applicantId: string, vacancyId: string) {
    return this.fetchAdvanced(this.fetchCvURL(applicantId, vacancyId), {});
  }
}
