/**
 * 自治体のWebサイトのDOMをパースしてCSVを生成
 * 
 */

const request = require('request')
const cheerio = require('cheerio')
// const moment  = require("moment");
// const _       = require('lodash');

const OK = 0, NG = -1;
const pref = process.argv[2];
let url;

switch (pref) {
	case 'niigata':
		url = 'https://www.pref.niigata.lg.jp/site/shingata-corona/256362836.html';
		break;
	case 'osaka':
		url = 'https://covid19-osaka.info/'; //阪府の最新感染動
		break;
	case 'kyoto':
		//ホーム > 健康・福祉・人権 > 健康・医療 > 京都府の健康対策 > 感染症緊急情報 > 新型コロナウイルス感染症に関連する情報について > 府内の感染状況
		url = 'https://www.pref.kyoto.jp/kentai/corona/hassei1-50.html';
		break;
}


request(url, (err, response, body) => {
	if (err) {
		console.error(err);
		return NG;
	}
	try {
		const $ = cheerio.load(body);
		let ret = NG;

		switch (pref) {
			case 'niigata':
				//TODO:
				break;
			case 'kyoto':
				//<table> 入院・療養中
				//<head>No,発表日,年代,性別,居住地等,
				//<tr>655例目,令和2年7月26日,10,女性,京都市
				//<table>退院等（死亡退院・転院を含む）
				//<head>No,発表日,年代,性別,居住地等,
				console.log('No,発表日,年代,性別,居住地等,状態');
				$('table').each((i, tbl) => {
					$('tr', tbl).each((j, tr) => {
						if (j === 0) return; //header

						let t = '';
						$('td', tr).each((k, td) => {
							if (k > 4) return;
							t += (k === 0 ? '' : ',') + $(td).text().replace(/\r?\n/g, '').trim();
						});
						t += ',' + ((i === 0) ? '入院・療養中' : '退院・死亡');
						console.log(t);
					});
				});
				ret = OK;
				break;
		}

		return ret;
	} catch (err) {
		console.error(err)
		return NG;
	}
})

return NG;
