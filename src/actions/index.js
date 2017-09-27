import axios from 'axios';

export const API_KEY = 'f8303380-a3f1-4af3-8751-ddd5f0df7610';
export const BASE_URL = 'https://content.guardianapis.com/'

export const FETCH_NEWS = 'FETCH_NEWS'

export function fetchNews (currentPage) {
    const request = axios.get(`${BASE_URL}search?api-key=${API_KEY}&page-size=30&page=${currentPage}&show-fields=thumbnail`)
        return {
            type: FETCH_NEWS,
            payload: request
        }



}