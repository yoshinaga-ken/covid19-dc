/**
 * 自治体のWebサイトのDOMをパースしてCSVを生成
 * 
 */

const request = require('request')
const cheerio = require('cheerio')
const moment = require("moment");
// const _       = require('lodash');
// const DataFrame = require('dataframe-js').DataFrame;

const OK = 0, NG = -1;
const pref = process.argv[2];
const arg1 = process.argv[3]!==undefined ? parseInt(process.argv[3]) : 0;
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
		switch(arg1){
		case 0: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei1-50.html';break;
		case 1: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei9.html';break;//府内の感染状況（3501から4000例目）
		case 2: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei8.html';break;//府内の感染状況（3001から3500例目）
		case 3: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei7.html';break;//府内の感染状況（2501から3000例目）
		case 4: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei6.html';break;//府内の感染状況（2001から2500例目）
		case 5: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei5.html';break;//府内の感染状況（1501から2000例目）
		case 6: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei4.html';break;//府内の感染状況（1001から1500例目）
		case 7: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei3.html';break;//府内の感染状況（501から1000例目）
		case 8: url = 'https://www.pref.kyoto.jp/kentai/corona/hassei2.html';break;//府内の感染状況（1から500例目）
		}
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
				const TOK = '\t';
				//console.log('No,発表日,年代,性別,居住地等,状態');
				$('table').each((i, tbl) => {
					$('tr', tbl).each((j, tr) => {
						if (j === 0) return; //header
						let t = '';
						$('td', tr).each((k, td) => {
							if (k > 4) return;

							let tt = $(td).text();
							switch (k) {
								case 0: tt = tt.replace('例目', ''); break;
								//令和2年7月21日 -> 2020-07-21
								case 1: tt = moment(tt.replace('令和2年', '2020/').replace('月', '/').replace('日', '')).format('YYYY-MM-DD'); break;
							}
							t += (k === 0 ? '' : TOK) + tt.replace(/\r?\n/g, '').trim();
						});
						t += TOK + ((i === 0) ? '入院' : '退院');
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
