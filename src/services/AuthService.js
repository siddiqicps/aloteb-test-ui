import { EventEmitter } from 'events'
import { isTokenExpired } from 'utils/jwtHelper'
import { browserHistory } from 'react-router'
import jwtDecode from 'jwt-decode'
import axios from 'axios';

import { API_URL } from 'utils/constants'

export default class AuthService extends EventEmitter {
  constructor() {
    super()

    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(endpoint, values) {
    // const loginPayload = values
    // return axios({method: 'post', url:`${API_URL}/${endpoint}`,  data: loginPayload })
    return this.fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  login(user, password) {
    return this._doAuthentication('users/login', { "username":user, "password":password })
  }

  isAuthenticated() {
    // Checks if there is a saved token and it's still valid
    const token = localStorage.getItem('token')
    if (token) {
      return !isTokenExpired(token)
    } else {
      return false
    }
  }


  finishAuthentication(result) {
    localStorage.setItem('token', result.access_token)
    localStorage.setItem('name', result.name)
    localStorage.setItem('role', result.role_id)
    localStorage.setItem('last_login_time', result.last_login_time)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.clear();   //.removeItem('token')
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      return error
    }
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    if (this.isAuthenticated()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(response => response.json())
  }
}
