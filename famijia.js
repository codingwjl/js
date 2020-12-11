const cookieName = 'Fa米家'
const chavy = init()
const token = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNo0jUFOAzEQBP8y57UU74zHa_-ACwfOvozXY7EIpFWcSIgoL4iUe17BD3gOiF9gQrh1V3erD_C0WyCCm7xoYTKcdTakUzZSqZp59oUIbc05wABtn3v5kGDfdHsvL5ogJvg6nz4v798flwTDX3RXrgEHRGS0JOi8uJHZiUdneXQWNyx-6oxopMoeC5brXtb1Nu_K5OUtwbFfL6316xv69bKDaHnjOUzIfgB9XSGSDeEfLO1B61bbI8Qqz02PPwAAAP__.VgTO1-nuF1akxcQMWTlcegkmzhxPsCKI8P-Nn2POxTDN_BwNaZhZxoct32c4ZmNIYpan5AM4CHKfDKW3z-ZVGQ'
// const cookieVal = 'sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221765295e1159b5-0ef06679b5b485-754c1551-304500-1765295e116db6%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%221765295e1159b5-0ef06679b5b485-754c1551-304500-1765295e116db6%22%7D; sajssdk_2015_cross_new_user=1'

sign()

function sign() {
  let url = {
    url: `https://fmapp.chinafamilymart.com.cn/api/app/market/member/signin/sign`,
    headers: {
      token: token
    }
  }
  url.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01'
  url.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.4 Safari/605.1.15'

  chavy.get(url, (error, response, data) => {
    let result = JSON.parse(data)
    let title = `${cookieName}`
    // 签到成功
    if (result && result.code == 200) {
      let subTitle = `签到结果: 成功`
      let detail = `恭喜获得 ${result.data.currentNumber}个发米粒,  再坚持${result.data.nextDay}天可获得${result.data.nextNumber}个`
      chavy.msg(title, subTitle, detail)
    }
    // 签到失败
    else {
      let subTitle = `签到结果: 失败`
      let detail = `说明: ${result.message}`
      chavy.msg(title, subTitle, detail)
    }
    chavy.log(`${cookieName}, data: ${data}`)
    chavy.done()
  })
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
