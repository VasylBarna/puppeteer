const puppeteer = require('puppeteer')
const fs = require("fs")

const URL = 'https://www.amazon.com/Equivalent-Daylight-Non-Dimmable-Standard-Lifetime/dp/B086C37632?th=1/'

const scrape = async () => {

  const dir = './screens'
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'] })
  const page = await browser.newPage()
   
  page.setViewport({
    width:1920,
    height: 1080
  })

  // const context = browser.defaultBrowserContext();
  // await context.overridePermissions(URL, ['geolocation']);

  await page.goto(URL,
     { waitUntil: ['networkidle2', 'domcontentloaded' ]}
  )
  
  // await page.setGeolocation({latitude: 90, longitude: 0});

  await page.waitForSelector('body')

  await page.screenshot({
    path: 'screens/fullpage.png',
    fullPage: true,
  })

  const result = await page.evaluate(() => {

    let title = document.body.querySelector('#productTitle').innerText
    let price = document.body.querySelector('.a-price .a-offscreen').innerText
    let storeName = document.body.querySelector('#bylineInfo').innerText
    let storeLink = document.body.querySelector('#bylineInfo').href
    let rate = document.body.querySelector('span .a-declarative .a-icon-star').innerText
    let ratings = document.body.querySelector('span #acrCustomerReviewText').innerText
    let colors = document.body.querySelector('.selection').innerText
    let description = document.body.querySelector('.a-normal tbody').innerText
    let sellerLink = document.body.querySelector('.tabular-buybox-text span a').href
    let sellerName = document.body.querySelector('.tabular-buybox-text span a').innerText
    let bulletsList = document.body.querySelector('#feature-bullets').innerText
    let availability = document.body.querySelector('#availability > span').innerText
    let technicalDetails = document.body.querySelector('#productDetails_techSpec_section_1').innerText
    let additionalIinfo = document.body.querySelector('#productDetails_db_sections').innerText
    let imageList = document.body.querySelector('.image img').getAttribute('src')

    return({
      title,
      price,
      storeName,
      storeLink,
      rate,
      ratings,
      colors,
      description,
      availability,
      sellerLink,
      sellerName,
      bulletsList,
      technicalDetails,
      additionalIinfo,
      imageList
    })
  })

  const jsonData = JSON.stringify([result], null, 2);
  fs.writeFileSync('data.json', jsonData) 

  
  await browser.close()
  return result
}

scrape().then((value) => {
  console.log(value)
})

