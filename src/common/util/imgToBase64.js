/*
*
* 图片转base64
* */

function imgToBolb(url) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = (status) => {
    console.log(xhr.response)
  }
  xhr.send()
}

export default imgToBolb
