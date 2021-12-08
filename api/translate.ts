

import { VercelRequest, VercelResponse } from '@vercel/node';
import jieba from 'nodejieba'

const transService = function (x, y, nastyDegree) {
  if (Math.random() > nastyDegree) return x
  if (x === ',' || x === '。' || x === '，') return '……'
  if (x === '!' || x === '！') return '❤'
  if (x.length > 1 && Math.random() < 0.5) {
    return`${x[0]}……${x}`
  } else if (y === 'n' && Math.random() < 0.5) {
    return '……' + x.split("").map(_item => '〇').join('')
  } else {
    return x
  }
}

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  let url = require('url');
  let params = url.parse(req.url, true).query;
  const wordArr = jieba.tag(params.res)
  const nastyDegree = params.level
  const translated = wordArr.map((item) => {
    return transService(item.word, item.tag, nastyDegree)
  }).join('')
  const data = {
    msg: translated + ''
  };
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json(data);
}