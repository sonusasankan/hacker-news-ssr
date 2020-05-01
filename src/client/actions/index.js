
import axios from 'axios';

export const FETCH_NEWS = 'fetch-news';

export const fetchNews = (page) => async dispatch => {
    const res = await axios({
        method: 'get',
        url: 'http://hn.algolia.com/api/v1/search',
        params: {
        //   tags: 'front_page',
          page: page,
        },
      })
    dispatch({
        type: FETCH_NEWS,
        payload: res,
        pages: res.nbPages
    })
}