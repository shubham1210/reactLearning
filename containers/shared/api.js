import * as constant  from './constant'

export function getRules() {
  return fetch('http://facebook.github.io/react-native/movies.json')
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson.movies;
  })
  .catch((error) => {
    console.error(error);
  });
  
}