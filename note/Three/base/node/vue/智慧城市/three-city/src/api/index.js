
import axios from 'axios'

export function getCityInfo() {
  return axios.get('http://127.0.0.1:4523/m1/3603285-0-default/api/smartcity/info')
}
export function getCityList() {
  return axios.get('http://127.0.0.1:4523/m1/3603285-0-default/api/smartcity/list')
}