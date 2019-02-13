const phantom = require('phantom');

/**
* 将web网转pdf并保存
* @param {String} domain url
*/
async function download(domain) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  // await page.property('viewportSize', {width: 1024, height: 600});
  await page.on('onResourceRequested', function (requestData) {
    console.info('Requesting', requestData.url);
  });
  const status = await page.open(`https://${domain}`);
  console.log(`Page opened with status [${status}].`);
  const content = await page.property('content');
  console.log(content);
  await sleep(1000 * 3)
  await page.render(`./download/${domain}.pdf`);
  console.log(`File created at [./${domain}.pdf]`);
  await instance.exit();
}

/**
* 模拟线程休眠
* @param {Number} ms 毫秒
*/
async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, parseFloat(ms)))
}

/**
* 调用 download
*/
download('baidu.com')