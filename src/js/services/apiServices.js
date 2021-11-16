export default class ApiService {
    #API_KEY = '24314191-3406a2e95029d0b69c083d53a';
    #BASE_API_URL = 'https://pixabay.com/api/';
  
    constructor(not_fnd_img_url) {
      this.query = '';
      this.page = 1;
      this.per_page = 12;
      this.orientation = 'horizontal';
      this.image_type = 'photo';
      this.resultsCounter = null;
      this._imageNotFoundLink = not_fnd_img_url;
    }
  
    fetchPictures = async searchQuery => {
      try {
        this.query = searchQuery;
  
        const urlParams = new URLSearchParams({
          image_type: this.image_type,
          orientation: this.orientation,
          q: this.query,
          page: this.page,
          per_page: this.per_page,
          key: this.#API_KEY,
        });
  
        const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({
          title: res.status,
          message: res.statusText,
        });
      } catch (error) {
        return Promise.reject({
          title: error.message,
        });
      }
    };
  
    fetchByID = async id => {
      const urlParams = new URLSearchParams({
        id,
        key: this.#API_KEY,
      });
      try {
        const res = await fetch(`${this.#BASE_API_URL}?${urlParams}`); // await
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({
          title: res.status,
          message: res.statusText,
        });
      } catch (error) {}
      return Promise.reject({
        title: error.message,
      });
    };
  
    incrementPage = () => {
      this.page += 1;
    };
  
    resetPage = () => {
      this.page = 1;
    };
  
    countTotalResults = () => {
      this.resultsCounter = this.page * this.per_page;
    };
  
    getNormalizeData = data => {
      const results = data.hits;
  
      const normalizeHits = results.map(result => {
        const imageUrl = result.webformatURL ? result.webformatURL : this._imageNotFoundLink;
        return {
          ...result,
          page: this.page,
          webformatURL: imageUrl,
        };
      });
      return {
        ...data,
        hits: normalizeHits,
      };
    };
  }