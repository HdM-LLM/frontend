import { UUID } from "crypto";

export default class API {
  // Singelton instance
  static api: null | API;
  api = null;

  // Local Python backend
  URL = "http://127.0.0.1:5000/skillsync/api";

  //Resume
  getResumesURL = () => `${this.URL}/resumes`;
  getResumeURL = (id: UUID) => `${this.URL}/resumes/${id}`;
  getResumeByPersonURL = (id: UUID) => `${this.URL}/resumes/person/${id}`;
  addResumeURL = () => `${this.URL}/resumes`;
  updateResumeURL = (id: UUID) => `${this.URL}/resumes/${id}`;
  deleteResumeURL = (id: UUID) => `${this.URL}/resumes/${id}`;

  //Cover Letter
  getCoverLettersURL = () => `${this.URL}/cover_letters`;
  getCoverLetterURL = (id: UUID) => `${this.URL}/cover_letters/${id}`;
  getCoverLetterByPersonURL = (id: UUID) =>
    `${this.URL}/cover_letters/person/${id}`;
  updateCoverLetterURL = (id: UUID) => `${this.URL}/cover_letters/${id}`;
  deleteCoverLetterURL = (id: UUID) => `${this.URL}/cover_letters/${id}`;

  static getAPI() {
    if (this.api == null) {
      this.api = new API();
    }
    return this.api;
  }

  fetchAdvanced(url: string, init: RequestInit) {
    // If no init parameter is used, create empty init
    if (typeof init === "undefined") {
      init = { headers: {} };
    }

    // If no headers parameter is used, create empty header
    if (typeof init.headers === "undefined") {
      init["headers"] = {};
    }

    // let token = document.cookie
    //   .split("; ")
    //   .map((cookie) => {
    //     let c = cookie.split("=");
    //     return {
    //       name: c[0],

    //       value: c[1],
    //     };
    //   })
    //   .find((cookie) => cookie.name === "token");

    // Add the token to every request, so that we can use it in the backend.
    //init.headers.Token = token.value;

    return fetch(url, init).then((res) => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    });
  }

  addResume(resume: File) {
    return this.fetchAdvanced(this.addResumeURL(), {
      method: "POST",
      body: resume,
    });
  }
  addCoverLetter(cover_letter: File) {
    return this.fetchAdvanced(this.addResumeURL(), {
      method: "POST",
      body: cover_letter,
    });
  }
}
