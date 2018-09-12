import * as constant from './constant.jsx'

export function getRules() {
  return fetch(constant.APPLICATION_DOMAIN+'/admin/getAllRecoActionsEnum')
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}

export function getLoggedUser() {
  return fetch(constant.APPLICATION_DOMAIN+'/admin/getLoggedInDetail')
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}

export function getTodayAeDetails() {
  return fetch(constant.APPLICATION_DOMAIN+'/allAeForToday')
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}


export function updateEnum(enumPostJson) {
  return fetch(constant.APPLICATION_DOMAIN+'/admin/updateRecoActionsEnum',{
    method:'put',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(enumPostJson)
  }
)
  .then((response) => {
    
    if(!response.ok)
      throw Error(response.statusText);
    else
      return response.json()
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}


export function markActionCompleted(action) {
  return fetch(constant.APPLICATION_DOMAIN+'/markActionCompleted',{
    method:'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  }
)
  .then((response) => {
    
    if(!response.ok)
      throw Error(response.statusText);
    else
      return response.json()
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}


export function markActionViewed(action) {
  return fetch(constant.APPLICATION_DOMAIN+'/markActionViewed',{
    method:'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  }
)
  .then((response) => {
    
    if(!response.ok)
      throw Error(response.statusText);
    else
      return response.json()
  })
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}

export function getRuleByAE(aeNum) {
  return fetch('http://iapps.gartner.com/recoactions/allAeRecommendedActions?aenum='+aeNum)
  .then((response) => response.json())
  .then((responseJson) => {
    return responseJson;
  })
  .catch((error) => {
    console.error(error);
  });
  
}