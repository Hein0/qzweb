import md5 from './md5';
export default function setSessionKey(obj) {
  const keys = 'key=123';
  // obj.token = JSON.parse(localStorage.getItem("personInfo")).token;
  // obj.user_id = JSON.parse(localStorage.getItem("personInfo")).user_id;
  if (JSON.stringify(obj) == "{}") {
      return obj.sessionKey = md5(keys);
  } else {
  let tempArr = [];
  if (obj.sessionKey) {
    delete obj.sessionKey;
    if (JSON.stringify(obj) == "{}") {
      return obj.sessionKey = md5(keys);
    }
  }
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let tempItem = key + "=" + obj[key];
      tempArr.push(tempItem);
    }
  }
  //let sortArr = tempArr.sort();
  let encryption = tempArr.join('&');
  encryption = encryption + "&" + keys;
  return obj.sessionKey = md5(encryption);
    }
  }

