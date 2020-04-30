
import axios from 'axios';

export const FETCH_NEWS = 'fetch-news';

export const fetchNews = () => async dispatch => {
    const res = await axios.get('https://hn.algolia.com/api/v1/search?tags=front_page&page=1')
    dispatch({
        type: FETCH_NEWS,
        payload: res
    })
}