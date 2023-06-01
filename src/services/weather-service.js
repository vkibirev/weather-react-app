export default class WeatherService {
  _apiBase = 'http://api.openweathermap.org/data/2.5/'
  _apiID = '2951f773a417f657feea05413e3933b8'

  getResource = async (query) => {
    const res = await fetch(`${this._apiBase}${query}&units=metric&appid=${this._apiID}`)

    if (!res.ok) {
      throw new Error(`${res.statusText}`)
    }
    return await res.json()
  }

  getCityData = async (name) => {
    const city = await this.getResource(`weather?q=${name}`)
    return city
  }

  getCitiesList = async (ids) => {
    const citiesList = await this.getResource(`group?id=${ids.join()}`)
    return citiesList
  }
}
