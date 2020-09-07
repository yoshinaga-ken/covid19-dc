const IS_SP = ('ontouchstart' in window) || window.innerWidth <= 768;

const D_YMD = 0;    // 日付。 例:2020-01-30
const D_SEX = 1;    // 性別ID。INT。
const D_AGE = 2;    // 年齢。INT。
const D_LV = 3;     // 状態。 例:無症,退院,感染
const D_PL1 = 4;    // 都道府県。 例:福岡県
const D_PL2 = 5;    // 市区町村。 例:福岡市
const D_JOB = 6;    // 職業。 例:会社員
const D_JOBCAT = 7; // ジョブカテゴリID。 INT。例:'教職員'=>['教職員','大学職員','小学校教諭','専門学校職員...]
const D_CNT = 8;    // カウント。INT。(未必須:ない場合:1)
const D_OPT = 9;    // CSVデータタイプオプション(未必須,ヘッダのみ,ユーザー定義)

const D3_YMD = 0;
const D3_PL1 = 1;
const D3_CNT = 2;
const D3_TYP = 3;
const DT_PCR = 0;
const DT_DEA = 1;
const DT_PAT = 2;

const DN_SEX = 0; const DN_SEX_STR = '不明';
const DN_AGE = -1; const DN_AGE_STR = '不明';
const DN_LV = ''; const DN_LV_STR = '調査中';
//const DN_PL1='';  const DN_PL1_STR='';
const DN_PL2 = ''; const DN_PL2_STR = '不明';
const DN_JOB = ''; const DN_JOB_STR = '不明';
const DN_JOBCAT = 0;

const DI_AGE_INFA = 0;//1 :幼児 (0歳,1歳未満,男児,女児,幼児,未就学児)
const DI_AGE_LT10 = 1; //0 :10歳未満(小学生、園児)
//const DI_AGE_10  =2; //10 :10代 ※以後1ずらす
//const DI_AGE_20  =3; //20 :20代
//const DI_AGE_100 =11;//100 :100歳
const DI_AGE_NONE = 12;//-1:不明
const DI_AGE_MAX = 13;//EOD

const CND_LV_A = '無症,退院';
const CND_LV_B = '感染';
const CND_LV_C = '肺炎,入院';
const CND_LV_D = '酸投,重症';
const CND_LV_E = '死亡';

const COL_CND = ["#2ca02c", "#1f77b4", "#ff7f0e", "#d62728", '#9467bd'];
const COL_CND_A = COL_CND[0];
const COL_CND_B = COL_CND[1];
const COL_CND_C = COL_CND[2];
const COL_CND_D = COL_CND[3];
const COL_CND_E = COL_CND[4];
const COL_NAME = colorbrewer.Set2[5];
// 0        1         2     3       4      5     6       7     8     9      10     11   12
// '幼児','10歳未満','10代','20代','30代','40代','50代','60代','70代','80代','90代','100代',DN_AGE_STR
// green                  |  blue                     | yellow-orange
const COL_AGE = d3.schemeGreens[4].slice(1).concat(d3.schemeBlues[4].slice(1)).concat(d3.schemeYlOrRd[7].slice(1)).concat(['#B0B0B0']);

const CHART_DATE_STACK_GRP = [
    [CND_LV_A, CND_LV_B, CND_LV_C, CND_LV_D, CND_LV_E],
    ['S:0', 'S:1', 'S:2', 'S:3', 'S:4'],
    ['幼児', '10歳未満', '10代', '20代', '30代', '40代', '50代', '60代', '70代', '80代', '90代', '100代', DN_AGE_STR]
];
const CHART_DATE_STACK1_N = CHART_DATE_STACK_GRP[0].length; const CHART_DATE_STACK2_N = CHART_DATE_STACK_GRP[1].length; const CHART_DATE_STACK3_N = CHART_DATE_STACK_GRP[2].length;
const DT_COL = ['#20b2aa', COL_CND_E, COL_CND_B];
const CHART_DATE2_STACK1_N = 3; const CHART_DATE2_STACK2_N = 5 + 1;
const COL_SEX = ["#B0B0B0", "#8dd3c7", "pink"];
const SEX_LABEL = ["不明", "男性", "女性"];
const WEEK_LABEL = moment.weekdaysMin();
const IMG_NO = 'img/noimage.png';

const YMD_ED_F = [["2020-04-07", "【緊急事態宣言】\n発令。７都府県\n対象：東京・埼玉・千葉・神奈川・大阪・兵庫・福岡"], ["2020-04-16", "【緊急事態宣言】\n対象を｢全国｣に拡大"], ["2020-05-14", "【緊急事態宣言】\n39県で解除\n継続：北海道・東京・埼玉・千葉・神奈川・大阪・京都・兵庫"], ["2020-05-21", "【緊急事態宣言】\n大阪・京都・兵庫を解除\n継続：北海道・東京・埼玉・千葉・神奈川"], ["2020-05-25", "【緊急事態宣言】\n全都道府県で解除"]];

const PREF_EN = { "北海道": "hokkaido", "青森県": "aomori", "岩手県": "iwate", "宮城県": "miyagi", "秋田県": "akita", "山形県": "yamagata", "福島県": "fukushima", "茨城県": "ibaraki", "栃木県": "tochigi", "群馬県": "gunma", "埼玉県": "saitama", "千葉県": "chiba", "東京都": "tokyo", "神奈川県": "kanagawa", "新潟県": "niigata", "富山県": "toyama", "石川県": "ishikawa", "福井県": "fukui", "山梨県": "yamanashi", "長野県": "nagano", "岐阜県": "gifu", "静岡県": "shizuoka", "愛知県": "aichi", "三重県": "mie", "滋賀県": "shiga", "京都府": "kyoto", "大阪府": "osaka", "兵庫県": "hyogo", "奈良県": "nara", "和歌山県": "wakayama", "鳥取県": "tottori", "島根県": "shimane", "岡山県": "okayama", "広島県": "hiroshima", "山口県": "yamaguchi", "徳島県": "tokushima", "香川県": "kagawa", "愛媛県": "ehime", "高知県": "kochi", "福岡県": "fukuoka", "佐賀県": "saga", "長崎県": "nagasaki", "熊本県": "kumamoto", "大分県": "oita", "宮崎県": "miyazaki", "鹿児島県": "kagoshima", "沖縄県": "okinawa" };
const PREF_HIRA = { "北海道": "ほっかいどう", "青森県": "あおもり", "岩手県": "いわて", "宮城県": "みやぎ", "秋田県": "あきた", "山形県": "やまがた", "福島県": "ふくしま", "茨城県": "いばらき", "栃木県": "とちぎ", "群馬県": "ぐんま", "埼玉県": "さいたま", "千葉県": "ちば", "東京都": "とうきょうと", "神奈川県": "かながわ", "新潟県": "にいがた", "富山県": "とやま", "石川県": "いしかわ", "福井県": "ふくい", "山梨県": "やまなし", "長野県": "ながの", "岐阜県": "ぎふ", "静岡県": "しずおか", "愛知県": "あいち", "三重県": "みえ", "滋賀県": "しが", "京都府": "きょうとふ", "大阪府": "おおさかふ", "兵庫県": "ひょうご", "奈良県": "なら", "和歌山県": "わかやま", "鳥取県": "とっとり", "島根県": "しまね", "岡山県": "おかやま", "広島県": "ひろしま", "山口県": "やまぐち", "徳島県": "とくしま", "香川県": "かがわ", "愛媛県": "えひめ", "高知県": "こうち", "福岡県": "ふくおか", "佐賀県": "さが", "長崎県": "ながさき", "熊本県": "くまもと", "大分県": "おおいた", "宮崎県": "みやざき", "鹿児島県": "かごしま", "沖縄県": "おきなわ" };
const PREF_IMG = { "北海道": "commons\/thumb\/6\/66\/Tokachi_plain_01.jpg\/560px-Tokachi_plain_01.jpg", "青森県": "commons\/thumb\/3\/3d\/OiraseValley2.JPG\/560px-OiraseValley2.JPG", "岩手県": "commons\/thumb\/2\/2e\/Konjikido-Ooido.jpg\/560px-Konjikido-Ooido.jpg", "宮城県": "commons\/thumb\/f\/fc\/MatsushimaYondaikanOotakamori2.JPG\/560px-MatsushimaYondaikanOotakamori2.JPG", "秋田県": "ja\/thumb\/d\/d5\/Hiru_kanto_1.jpg\/560px-Hiru_kanto_1.jpg", "山形県": "commons\/thumb\/f\/f8\/Precincts_of_Gassan_jinja.JPG\/560px-Precincts_of_Gassan_jinja.JPG", "福島県": "ja\/thumb\/2\/2a\/Miharu_Miharu-Takizakura_Front_1.JPG\/306px-Miharu_Miharu-Takizakura_Front_1.JPG", "茨城県": "commons\/thumb\/d\/da\/Fukuroda_Falls_38.jpg\/560px-Fukuroda_Falls_38.jpg", "栃木県": "commons\/thumb\/8\/88\/20100727_Nikko_Tosho-gu_Yomeimon_5889.jpg\/560px-20100727_Nikko_Tosho-gu_Yomeimon_5889.jpg", "群馬県": "commons\/thumb\/8\/85\/Kusatsu_Yubatake_04.JPG\/560px-Kusatsu_Yubatake_04.JPG", "埼玉県": "ja\/9\/9a\/Saitamanogazou.jpg", "千葉県": "commons\/thumb\/e\/e1\/Photo_montage_of_Chiba.png\/560px-Photo_montage_of_Chiba.png", "東京都": "commons\/thumb\/b\/bf\/Tokyo_Montage_2015.jpg\/560px-Tokyo_Montage_2015.jpg", "神奈川県": "commons\/thumb\/0\/06\/Yokohama_MinatoMirai21.jpg\/274px-Yokohama_MinatoMirai21.jpg", "新潟県": "commons\/thumb\/a\/a6\/Myokousan_from_hiutiyama_1996_6_29.jpg\/600px-Myokousan_from_hiutiyama_1996_6_29.jpg", "富山県": "commons\/thumb\/b\/bd\/Montage_toyama_2019.png\/560px-Montage_toyama_2019.png", "石川県": "commons\/thumb\/e\/ed\/Montages_of_Ishikawa_prefecture.jpg\/600px-Montages_of_Ishikawa_prefecture.jpg", "福井県": "commons\/thumb\/b\/bd\/Japan_Tojinbo02n4592.jpg\/560px-Japan_Tojinbo02n4592.jpg", "山梨県": "commons\/thumb\/9\/95\/Lake_Kawaguchiko_Sakura_Mount_Fuji_3.JPG\/560px-Lake_Kawaguchiko_Sakura_Mount_Fuji_3.JPG", "長野県": "commons\/thumb\/4\/4c\/Mount_Shirouma_from_Mount_Korenge_2000-7-31.jpg\/600px-Mount_Shirouma_from_Mount_Korenge_2000-7-31.jpg", "岐阜県": "commons\/thumb\/e\/e6\/Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg\/560px-Ogi_Shirakawa-g%C5%8D%2C_Gifu%2C_Japan.jpg", "静岡県": "ja\/thumb\/3\/3e\/MtFuji_FujiCity.jpg\/560px-MtFuji_FujiCity.jpg", "愛知県": "commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg", "三重県": "commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg", "滋賀県": "commons\/thumb\/1\/18\/Tenshuhonmaru.jpg\/560px-Tenshuhonmaru.jpg", "京都府": "commons\/thumb\/7\/7c\/Amanohashidate_view_from_Mt_Moju02s3s4592.jpg\/300px-Amanohashidate_view_from_Mt_Moju02s3s4592.jpg", "大阪府": "commons\/thumb\/c\/ca\/Osaka_Castle_03bs3200.jpg\/318px-Osaka_Castle_03bs3200.jpg", "兵庫県": "commons\/thumb\/a\/a7\/Kobe_Port_Tower03bs3200.jpg\/480px-Kobe_Port_Tower03bs3200.jpg", "奈良県": "commons\/thumb\/2\/2f\/T%C5%8Ddai-ji_Kon-d%C5%8D.jpg\/560px-T%C5%8Ddai-ji_Kon-d%C5%8D.jpg", "和歌山県": "commons\/thumb\/1\/17\/Danjogaran_Koyasan12n3200.jpg\/560px-Danjogaran_Koyasan12n3200.jpg", "鳥取県": "commons\/thumb\/e\/e1\/Tottori-Sakyu_Tottori_Japan.JPG\/560px-Tottori-Sakyu_Tottori_Japan.JPG", "島根県": "commons\/thumb\/7\/73\/Izumo-taisha16nt3200.jpg\/560px-Izumo-taisha16nt3200.jpg", "岡山県": "commons\/thumb\/4\/4b\/Okayama_Korakuen_Garden01.jpg\/560px-Okayama_Korakuen_Garden01.jpg", "広島県": "commons\/thumb\/d\/da\/Montages_of_Hiroshima_prefecture.jpg\/560px-Montages_of_Hiroshima_prefecture.jpg", "山口県": "ja\/thumb\/7\/7e\/%E7%A7%8B%E5%90%89%E5%8F%B0%E9%A2%A8%E6%99%AF.JPG\/560px-%E7%A7%8B%E5%90%89%E5%8F%B0%E9%A2%A8%E6%99%AF.JPG", "徳島県": "commons\/thumb\/2\/29\/Onaruto-bridge_and_Naruto_Channel%2CNaruto-city%2CJapan.JPG\/560px-Onaruto-bridge_and_Naruto_Channel%2CNaruto-city%2CJapan.JPG", "香川県": "commons\/thumb\/8\/8b\/%E9%A6%99%E5%B7%9D%E7%9C%8C%E3%81%AE%E9%A2%A8%E6%99%AF.jpg\/560px-%E9%A6%99%E5%B7%9D%E7%9C%8C%E3%81%AE%E9%A2%A8%E6%99%AF.jpg", "愛媛県": "commons\/thumb\/8\/83\/D%C5%8Dgo_Onsen.jpg\/560px-D%C5%8Dgo_Onsen.jpg", "高知県": "ja\/thumb\/c\/c1\/Shimanto_River_And_Iwama_Bridge_1.JPG\/560px-Shimanto_River_And_Iwama_Bridge_1.JPG", "福岡県": "commons\/thumb\/8\/8b\/20100719_Dazaifu_Tenmangu_Shrine_3328.jpg\/560px-20100719_Dazaifu_Tenmangu_Shrine_3328.jpg", "佐賀県": "commons\/thumb\/3\/38\/Yoshinogari-iseki_zenkei.JPG\/560px-Yoshinogari-iseki_zenkei.JPG", "長崎県": "commons\/thumb\/a\/a4\/Nagasaki-Glover-Garden-5415.jpg\/560px-Nagasaki-Glover-Garden-5415.jpg", "熊本県": "ja\/thumb\/a\/a1\/20140516%E9%98%BF%E8%98%87%E5%B1%B1%E5%BA%83%E5%9F%9F.jpg\/560px-20140516%E9%98%BF%E8%98%87%E5%B1%B1%E5%BA%83%E5%9F%9F.jpg", "大分県": "commons\/thumb\/a\/af\/Beppu_Umi-jigoku04n4272.jpg\/560px-Beppu_Umi-jigoku04n4272.jpg", "宮崎県": "commons\/thumb\/5\/51\/Takachihokyou55.jpg\/560px-Takachihokyou55.jpg", "鹿児島県": "ja\/thumb\/a\/ac\/Kagoshima_and_Sakurajima.jpg\/560px-Kagoshima_and_Sakurajima.jpg", "沖縄県": "commons\/thumb\/9\/99\/Naha_Shuri_Castle16s5s3200.jpg\/560px-Naha_Shuri_Castle16s5s3200.jpg" };
const PREF_IMG_PATH = 'https://upload.wikimedia.org/wikipedia/';
const JOB_HIRA = { "無職": "むしょく", "教職員": "きょうしょくいん", "学生": "がくせい", "保育園児": "ほいくえんじ", "入所者": "にゅうしょしゃ", "医師": "いし", "看護師": "かんごし", "看護職員": "かんごしょくいん", "医療従事者": "いりょうじゅうじしゃ", "介護職員": "かいごしょくいん", "福祉事業従事者": "ふくしじぎょうじゅうじしゃ", "保育園職員": "ほいくえんしょくいん", "歯医者勤務": "はいしゃきんむ", "公務員": "こうむいん", "団体職員": "だんたいしょくいん", "自衛・消防官": "じえいしょうぼうかん", "経営者・役員": "けいえいしゃやくいん", "会社員": "かいしゃいん", "事務職員": "じむしょくいん", "運転手": "うんてんしゅ", "運送業": "うんそうぎょう", "接客業": "せっきゃくぎょう", "飲食業": "いんしょくぎょう", "飲食店従業員": "いんしょくてんじゅうぎょういん", "自営業": "じえいぎょう", "パート・アルバイト": "パートアルバイト", "サービス業": "さーびすぎょう", "製造業": "せいぞうぎょう", "土木建築業": "どぼくけんちくぎょう", "スポーツ選手": "スポーツせんしゅ" };
const LV_HIRA = { "退院": "たいいん", "無症状": "むしょうじょう", "重症": "じゅうしょう", "死亡": "しぼう", "軽症": "けいしょう", "中等度": "ちゅうとうど", "肺炎入院": "はいえんにゅういん", "入院予定": "にゅういんよてい", "入院": "にゅういん", "肺炎": "はいえん", "自宅待機": "じたくたいき", "酸投": "さんとう", "肺炎入院予定": "はいえんにゅういんよてい", "再発入院": "さいはつにゅういん" };
const SPARK_SX = IS_SP ? 60 : 25;
const MAP_COL_TBL = [["1000人以上", "#8c0a00"], ["500人以上", "#ea5432"], ["100人以上", "#ff781d"], ["50人以上", "#ff9d57"], ["10人以上", "#ffceab"], ["1人以上", "#f5deb3"], ["0人", "#dadada"], ["選択中", "#ffffff"]];

colorbrewer.Set3[12][8] = colorbrewer.Set2[8][6];//Set3[12][8]:gray-> light gold
colorbrewer.Set2[8][7] = colorbrewer.Set1[8][6];//Set3[12][8]:gray-> light gold

var app;
const m_ = {
    config: {
        url_param_data_replace: !IS_SP, cDateYm: {
            is_elasticY: 1
        },
        cJob: {
            TD: 750,       //transitionDuration
            barWidth: 40
        }
    },
    get: location_get_query(),
    url_data: { "path": "data\/", "assets": "covid19-assets.json", "data": "covid19-data.json" },
    url_name: 'https://ja.wikipedia.org/wiki',

    //
    //charts
    //
    composite: null,
    chartDate: null,
    chartLine: null,

    composite2: null,
    chartDate2: null,
    chartLine2: null,

    chartName: null,
    chartCity: null,
    chartSex: null,
    chartWeek: null,
    chartAge: null,
    chartCond: null,
    chartJob: null,

    ndx: {},
    data_type: 1,     //感染者情報のデータタイプ。1:感染者情報 0:それ以外
    data_hdr: [],
    data: [],         //感染者情報のデータ
    names: {},
    citys: [],
    conds: [],
    jobcates: [],
    data3: [],         //(感染・PCR・死亡・病床)のデータ

    pref_tbl_last_m1: [], pref_tbl_last_m2: [], pref_tbl_last_cnt: {},       //pref_tbl_city_cnt:{},  
    spk: {},
    ac_data: [],
    ac_data_tbl: [],

    dimJob: null,
    dimJobCat: null,

    dimName: null,
    gpName: null,
    gpName_all: {},

    dimName2: null,

    //gpCity_all:{},     
    domainDate: null,
    gpDate: null,
    gpDate2: null,

    chartDate2Mode: DT_PCR,
    gpJob: null,
    is_job_cate: 1,
    gpJobCat: null,

    dateCnt: {},
    datePick: null,
    dateCntMax: 0,
    dateCntTo: 'YYYYMMDD',

    dateCntMax2: 0,
    dateCntTo2: 'YYYYMMDD',

    tab: null,
    sel_tab: 'tabs_c',
    sel_stack: 'con',

    tip: null,
    tipRow: null,

    tbl_pref: null,
    tbl_pref_isearch: null,
    //gpDateYMMax:{},

    chartAllFilterByKW_render: 0,
    line: d3.line().curve(d3.curveLinear),
    last_fth: '',
    is_drawJapanMap: 1,
    is_filter_region_sel: 0,
    group_reduce: {
        add: function(p, v, dir) {
            const c = dir * (v[D_CNT] || 1);
            p = m_.group_reduce_lv_set(p, v[D_LV], c);

            let nm = v[D_PL1]
            if (p.nmcnt[nm] === undefined) p.nmcnt[nm] = 0; p.nmcnt[nm] += c;

            p = m_.group_reduce_age_set(p, v[D_AGE], c);

            p.total += c;
            return p;
        },
        append: (p, v) => m_.group_reduce.add(p, v, 1),
        remove: (p, v) => m_.group_reduce.add(p, v, -1),
        init: (p, v) => {
            return { lv_a: 0, lv_b: 0, lv_c: 0, lv_d: 0, lv_e: 0, nmcnt: {}, agcnt: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], total: 0 };
        }
    },
    group_reduce_light: {
        add: function(p, v, dir) {
            const c = dir * (v[D_CNT] || 1);
            const l = v[D_LV];
            p = m_.group_reduce_lv_set(p, l, c);
            p.total += c;
            return p;
        },
        append: (p, v) => m_.group_reduce_light.add(p, v, 1),
        remove: (p, v) => m_.group_reduce_light.add(p, v, -1),
        init: function(p, v) {
            return { lv_a: 0, lv_b: 0, lv_c: 0, lv_d: 0, lv_e: 0, total: 0 };
        }
    },
    date_stk_nm: [],

    dateCntCreate: function() {
        m_.dateCnt = {};
        m_.dateCntMax = -1;
        m_.dateCntTo = '00000000';
        _.forEach(m_.gpDate.all(), (d) => {
            let ymd = moment(d.key).format('YYYYMMDD');
            m_.dateCnt[ymd] = d.value;
            if (d.value > m_.dateCntMax) m_.dateCntMax = d.value;
            if (d.value > 0 && ymd > m_.dateCntTo) m_.dateCntTo = ymd;
        });
    },
    ageTickFormat: function(s) {
        if (s === 1) return '幼児';
        return s === DN_AGE ? DN_AGE_STR : (s === 0 ? '10歳未満' : s + "代");
    },
    getChartnameTitle: function(pre_name, br) {
        let p = m_.pref_tbl_last_m1[pre_name];
        if (p === undefined) return '';
        let n = m_.names[pre_name] ? m_.names[pre_name] : 0;
        let patient = n - p.discharged - p.deaths;//現患者数=感染者数-退院者数-死亡者数
        ret = pre_name + br +
            '総人口　: ' + php_number_format(p.n) + '名' + br +
            '感染者数: ' + php_number_format(n) + '名 (' + (_.round(100 * n / p.n, 3)) + '%)' + br +
            '患者数　: ' + php_number_format(patient) + '名' + br +
            'PCR検査: ' + php_number_format(p.pcrtested) + '名 (' + p.pcrtested_p + '%)' + br +
            '死亡者数: ' + p.deaths + '名' + br +
            '退院者数: ' + php_number_format(p.discharged) + '名' + br +
            '対策病床数: ' + php_number_format(p.bed) + '床 (' + (_.round(100 * patient / p.bed, 2)) + '%)' + br;
        return ret;
    },
    getFilterTxt: function() {
        let name = $('#panel_name .filter_txt').val();
        let city = $('#panel_city .filter_txt').val();
        let date = $('#panel_date .filter_txt').val();
        let week = $('#chart_week .filter').text();
        let age = $('#chart_age .filter').text();
        let sex = $('#chart_sex .filter').text();
        let cond = m_.chartCond.filters().join(',');
        let job = m_.chartJob.filters().join(',');
        let txt = _.fill(Array(8), '');
        const PL = 'と';

        if (name !== '') {
            let t = '', sp = name.split(',');
            for (i of sp) {
                t += i.trim() + PL;
            }
            txt[1] = (sp.length == 1 ? '' : '【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
        }

        if (city !== '') {
            let is = city.indexOf(',') !== -1;
            txt[2] = (is ? '【' : '') + city + (is ? '】' : '');
        }

        if (date != '') {
            if (m_.chartDate.filters().length) {
                if (m_.chartDate.brushOn()) {
                    txt.push(date);
                } else {
                    let t = '', sp = date.split(',');
                    for (i of sp) {
                        t += i + PL;
                    }
                    txt[0] = (sp.length == 1 ? '' : '【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
                }
            }
        }
        if (week != '') {
            let is = week.indexOf(',') !== -1;
            txt[3] = '曜日:' + (is ? '【' : '') + week + (is ? '】' : '');
        }
        if (age != '') {
            let t = '', sp = age.split(',');
            for (i of sp) t += m_.ageTickFormat(+i) + PL;
            txt[4] = '年齢:' + (sp.length == 1 ? '' : '【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
        }
        if (sex != '') {
            let t = '', sp = sex.split(',');
            if (sp.length !== 3) {
                for (i of sp) {
                    t += i.trim() + PL;
                }
                txt[5] = '性別:' + (sp.length == 1 ? '' : '【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
            }
        }
        if (cond != '') {
            let is = cond.indexOf(',') !== -1;
            txt[6] = '状態:' + (is ? '【' : '') + cond + (is ? '】' : '');
        }
        if (job != '') {
            let is = job.indexOf(',') !== -1;
            txt[7] = '職業:' + (is ? '【' : '') + job + (is ? '】' : '');
        }
        return txt;
    },
    chartNameFilters: function(pre0) {
        //m_.chartNameにない物は除外
        let pre_names = _.keys(m_.names);
        let pre = [];
        for (i of pre0) {
            if (_.indexOf(pre_names, i) !== -1) pre.push(i);
        }
        if (pre.length === 0) {
            m_.chartName.filterAll();
            m_.renderAllChart();
            return;
        };

        let f = m_.chartName.filters();
        diff = pre.length > f.length ? _.difference(pre, f) : _.difference(f, pre);
        m_.chartName.filter(diff[0]);//差分をadd

        m_.renderAllChart();
    },
    chartAllFilterByKW: function(pre0) {
        //日付
        if (!isNaN(pre0[0])) {
            let d = moment(pre0);
            if (d.isValid()) {
                let a = d.format('YYYY-MM-DD');
                if (a.indexOf('2001') !== -1) {
                    let s = a.split('-');
                    d = moment('2020-' + s[1] + '-' + s[2]);
                }
                m_.composite.filterAll().filter(d.toDate());
                m_.renderAllChart();
                m_.barChartRedrawGroup(m_.chartDate); return 1;
            }
        }
        //職業
        if (_.indexOf(m_.jobcates, pre0) !== -1) {
            m_.chartJob.filterAll().filter(pre0);
            m_.renderAllChart();
            return 1;
        }
        //状態
        if (_.indexOf(m_.conds, pre0) !== -1) {
            m_.chartCond.filterAll().filter(pre0);
            m_.renderAllChart();
            return 1;
        }

        //m_.chartNameにない物は除外 前方一致
        let pre_names = _.keys(m_.names), city = '', is_pre_find = 0;
        const AC_SPLIT_WD = /\s+/;
        let names = [];
        for (pre1 of pre0.split(AC_SPLIT_WD)) {
            for (nm of pre_names) {
                if (pre1 === nm) {
                    if (names.length === 0) city = pre1.replace(nm, '');
                    names.push(nm);
                    is_pre_find = 1;
                }
            }
        }

        //都道府県
        if (is_pre_find) {
            m_.chartName.filterAll().filter(names.length === 1 ? names[0] : [names]);
            m_.chartCity.filterAll();
            m_.renderAllChart();
            m_.chartScroll('#div_name', names[0], 300);
            return 1;
        }

        city = pre0;
        for (nm of pre_names) {
            if (pre0.indexOf(nm) === 0) {
                city = pre0.replace(nm, '');
            }
        }
        if (city === '') return 0;

        //市区町村
        //m_.chartCity.filterAll().filter(city);//single
        let citys = _.filter(m_.citys, (d) => { return d.indexOf(city) === 0; });//multi
        if (citys.length) {
            m_.chartName.filterAll();
            m_.chartCity.filterAll().filter([citys]);
            m_.renderAllChart();
            $('#ch_pnl_city').prop('checked', true).trigger('ch_pnl_update');
            m_.chartScroll('#div_city', city, 300);
            return 1;
        }
        return 0;
    },
    parseURLParams: function() {
        let is_trigger_search;
        //都道府県指定
        //例:
        // name=福岡県
        // name=福岡県+佐賀県
        if (m_.get.name) {
            let names = m_.get.name.split(' ');
            let flt = names.length === 1 ? names[0] : [names];
            m_.chartName.filterAll().filter(flt);
            $('#btn_search').val(names.join(' '));
            drawJapanMap();
            is_trigger_search = 0;
        }
        //Keyword指定
        if (m_.get.q) {
            $('#btn_search').val(m_.get.q.trim());
            is_trigger_search = 1;
        }
        //日付指定
        // date=3-4      //単一日 4月4日
        // date=3-4+3-8  //範囲日 4月4日~4月8日
        // date=3-4+3    //範囲日 4月4日 + 3day
        if (m_.get.date) {
            const date_get = (s) => {//[YYYY]-MM-DD
                let ret;
                let s2 = s.split('-');
                switch (s2.length) {
                    case 3: ret = moment(s2[0] + '-' + printf02d(s2[1]) + '-' + printf02d(s[2])); break;
                    case 2: ret = moment(moment().format('YYYY') + '-' + printf02d(s2[0]) + '-' + printf02d(s2[1])); break;
                    case 1: ret = s; break;
                }
                return ret;
            }
            let from_to = m_.get.date.split(' '), from, to;
            let fsel = 0;
            switch (from_to.length) {
                case 1://4-4 => 単一日 4月4日
                    from = date_get(from_to[0]);
                    if (isNaN(parseInt(from))) {
                        fsel = dc.filters.RangedFilter(from.toDate(), from.add(1, 'days').toDate());
                    }
                    break;
                case 2:
                    from = date_get(from_to[0]);
                    to = date_get(from_to[1]);
                    if (isNaN(parseInt(to))) {//4-4+4-8 => 範囲日 4月4日~4月8日
                        fsel = dc.filters.RangedFilter(from.toDate(), to.toDate());
                    } else {//4-4+3 => 範囲日 4月4日 + 3day
                        fsel = dc.filters.RangedFilter(from.toDate(), from.add(to, 'days').toDate());
                    }
                    break;
            }
            if (fsel) {
                m_.composite.brushOn(true).render();
                m_.composite.filter(fsel);
                $('.btn_brush').trigger('my_update', 0);//on
            }
        }

        if (is_trigger_search) {
            $('#btn_search').trigger('btn_search_update');
        }
    },
    showFilterUi: function(panel_sel, chart, func) {
        let flt = chart.filters();
        let pnl = $(panel_sel);
        if (flt.length) {
            let is_range = $.isArray(flt[0]);
            if (is_range) {
                let t = func(flt[0][0]) + '～' + func(flt[0][1]);
                pnl.find('.filter_txt').show().val(t).attr('title', t);
                pnl.find('.filter_txt_diff').text((moment(flt[0][1]).diff(flt[0][0], 'days') + 1) + '日間');
            } else {
                let flt2 = [];
                for (f of flt) {
                    if (func) f = func(f);
                    flt2.push(f);
                }
                let t = flt2.join(',');
                pnl.find('.filter_txt').show().val(t).attr('title', t);
                pnl.find('.filter_txt_diff').text('');
            }
            pnl.find('.reset_btn').show();
        } else {
            pnl.find('.filter_txt').hide();
            pnl.find('.reset_btn').hide();
        }
    },
    //MAPの選択Nameのエリア枠を描画
    mapSetSelectedRegions: function() {
        let f = m_.chartName.filters();
        if (f.length && map) {
            m_.is_filter_region_sel = 1;
            map.clearSelectedRegions();
            sels = [];
            for (var i = 0; i < f.length; i++) {
                sels[i] = _.capitalize(PREF_EN[f[i]])
            }
            map.setSelectedRegions(sels);
            m_.is_filter_region_sel = 0;
        }
    },
    renderVLine: function(chart, hz) {
        chart.g().select('g.chart-body')
            .selectAll('path.line').data(hz).enter()
            .append('path').attr('class', function(d) { return d.cls.concat(['line']).join(' '); })
            .attr('d', function(d) {
                let x = chart.x()(d.x);
                return m_.line([[x, chart.y().range()[0]], [x, chart.y().range()[1]]]);
            });
    },
    barChartRedrawGroup: function(_chart) {

        let b = _chart.selectAll("rect.bar");
        if (b.size() == 0) return;
        let filters = _chart.filters();
        if (filters.length == 0) {
            b.classed('deselected', false).classed('selected', true);
        } else {
            b.classed('deselected', true).classed('selected', false);
            b.each(function(val) {
                for (var j = 0; j < filters.length; j++) {
                    if (moment(val.x).isSame(filters[j])) {
                        $(this).removeClass('deselected').addClass('selected');
                    }
                }
            });
        }
    },
    addFilterHandlerSingle: function(filters, filter) {
        if (window.event && (window.event.ctrlKey || window.event.shiftKey)) {
            filters.push(filter); return filters; //add select
        } else {
            return [filter]; //single select
        }
    },
    addFilterHandlerSingleR: function(filters, filter) {
        if (window.event && (window.event.ctrlKey || window.event.shiftKey)) {
            return [filter]; //single select
        } else {
            filters.push(filter); return filters; //add select
        }
    },
    on_chartDate_pretransition: function(chart) {
        let ci = chart.chartID();
        //console.log('on_chartDate_pretransition() id:'+ci);

        let is_comp = m_.composite.chartID() === ci;
        let flt = m_.chartName.filters();
        let pref_mode = flt.length > 1;
        if (is_comp) {
            m_.chartLegendUpdate(chart);
            let o = $('#chart_date g.dc-legend-item');
            o.filter(':contains("週間")').show().attr('transform', 'translate(90,0)');
        } else {
            let o2 = $('#chart_date2 g.dc-legend-item');
            if (pref_mode) {
                for (var i = 0; i < flt.length; i++) {
                    o2.filter(':contains("' + flt[i] + '")').show();
                }
            } else {
                //chart_date2 の県名表示
                for (var i = 0; i < flt.length; i++) {
                    o2.filter(':contains("' + flt[i] + '")').show();
                }
            }
        }

        if (m_.data_type) {
            m_.renderVLine(chart, [
                { cls: ['s1'], x: new Date(YMD_ED_F[0][0]) },
                { cls: ['s2'], x: new Date(YMD_ED_F[1][0]) },
                { cls: ['s2'], x: new Date(YMD_ED_F[2][0]) },
                { cls: ['s2'], x: new Date(YMD_ED_F[3][0]) },
                { cls: ['s3'], x: new Date(YMD_ED_F[4][0]) }
            ]);
        }

        if (!is_comp) return;

        chart.selectAll("rect.bar").on("click", function(d) {
            //chart.filter(null).filter(d.data.key).redrawGroup();//単一選択
            chart.filter(d.data.key).redrawGroup();//追加選択
            //chart.filter(multikey(d.x, d.layer));//子供項目選択
            m_.barChartRedrawGroup(chart);
        });

        if (m_.is_drawJapanMap) drawJapanMap();
        m_.is_drawJapanMap = 1;

        let ft = m_.getFilterTxt();

        fth = ft.join(' ').trim();
        $('.hdr_flt').text((fth === '' ? '全国' : fth) + 'の状況');
        if (m_.get.light !== undefined) {
            $('head title').text((fth === '' ? '全国' : fth) + 'の状況 - 新型コロナウイルス感染状況');
        }
        if (m_.sel_tab === 'tabs_c') {
            ft[1] = ''; fth = ft.join(' ').trim();
            $('.hdr_flt_map').text(fth === '' ? '' : fth + 'の状況');
        }

        ft[2] = ''; ft[0] = ''; fth = ft.join(' ').trim();
        if (fth !== '') {
            if (m_.last_fth !== fth) {
                $('#chk_tbl_spkflt')
                    .checkboxradio({ label: '<i class="fa fa-filter"></i>[' + fth + ' ]' + (IS_SP ? '<BR>' : '') + 'でフィルタ' })
                    //.checkboxradio('refresh')
                    .prop('checked', true).trigger('click') //off
                    ;
            }
            $('#chk_tbl_spkflt_l').show();
        } else {
            $('#chk_tbl_spkflt_l').hide();
        }
        m_.last_fth = fth;

        app.pnl.date.cnt = php_number_format(m_.ndx.groupAll().reduceSum(d => { return d[D_CNT] || 1; }).value());

        let all = m_.gpDate.all();
        if (all.length >= 1) {
            let d, d1;
            if (1) {
                for (i = all.length - 1; i >= 0; i--) if (all[i].value !== 0) break; //最終更新日付の場合
                d = all[i];
                d1 = all[i - 1];
            } else {
                d = all[all.length - 1];//最終日
                d1 = all[all.length - 2];//最終日-1
            }
            if (d) {
                app.pnl.date.cnt_day = moment(d.key).format('YYYY/M/D(ddd)') + '時点';
                h = d.value - d1.value;
                app.pnl.date.cnt_one = (h >= 0 ? '+' : '') + php_number_format(h);//前日比：日別
            }
        } else {
            app.pnl.date.cnt_one = '';
            app.pnl.date.cnt_day = '';
        }
        //m_.gpDateYMMax=_.maxBy(all, function(o) { return o.value; });
    },
    on_chart_filtered: function(chart, v) {
        let ci = chart.chartID();
        //console.log('on_chart_filtered() id:'+ci);

        if (chart.filters().length && $('#ui-datepicker-div').is(':visible')) {
            m_.datePick.datepicker('show');
        }

        if (ci === m_.chartName.chartID() || ci === m_.chartCity.chartID() || ci === m_.chartDate.chartID()) {//m_.chartName||m_.chartCity|m_.chartDate
            if (m_.is_job_cate) {
                let fn = m_.chartName.filters();
                let fc = m_.chartCity.filters();
                let fd = m_.chartDate.filters();
                if (fn.length || fc.length || fd.length) {
                    let o = $('#chart_job_title_sub');
                    if (o.text() === '') {
                        $('#chart_job_title_sub').text('(詳細)');
                        m_.chartJob.dimension(m_.dimJob).group(m_.gpJob).render();
                    }
                } else {
                    let o = $('#chart_job_title_sub');
                    if (o.text() === '(詳細)') {
                        $('#chart_job_title_sub').text('');
                        m_.chartJob.dimension(m_.dimJobCat).group(m_.gpJobCat).render();
                    }
                }
            }
        }

        if (ci === m_.chartName.chartID()) {
            m_.chartCity.filterAll();
            m_.mapSetSelectedRegions();
        }
        $('.jvectormap-tip').hide();

    },
    on_chart_postRedraw: function(chart) {
        chart.transitionDuration(m_.config.cJob.TD);
        chart.render();
    },
    chartDateLegendUpdate2: function() {
        let flt_len = m_.chartName.filters().length;
        let pref_mode = flt_len !== 0;
        m_.composite2.legend().y(pref_mode ? -30 : 0);
    },
    renderAllChart: function() {
        if (!m_.config.cDateYm.is_elasticY) {
            m_.chartDate.y(d3.scaleLinear().domain([0, _.max(_.map(m_.gpDate.all(), 'value')) + 10])); //高さ範囲再計算
        }

        dc.renderAll("chartGroup");

        m_.on_chart_postRedraw(m_.chartJob);

        //クリック時のツールチップの表示
        if (IS_SP) {
            //rowChartTip
            // d3.selectAll("g.row").call(m_.tipRow);
            // d3.selectAll("g.row").on('mouseover', m_.tipRow.show).on('mouseout', m_.tipRow.hide);

            //pieChartTip
            d3.selectAll(".pie-slice").call(m_.tip);
            d3.selectAll(".pie-slice").on('mouseover', m_.tip.show).on('mouseout', m_.tip.hide);

            //barChartTip
            d3.selectAll(".bar").call(m_.tip);
            d3.selectAll(".bar").on('mouseover', m_.tip.show).on('mouseout', m_.tip.hide);
        }
    },
    groupRemoveEmpty: function(group) {
        return {
            all: function() {
                return group.all().filter(function(d) {
                    return d.value != 0;
                });
            }
        };
    },
    group_reduce_age_set(p, age, c) {
        switch (age) {
            case DN_AGE: p.agcnt[DI_AGE_NONE] += c; break;
            case 1: p.agcnt[DI_AGE_INFA] += c; break;
            case 0: p.agcnt[DI_AGE_LT10] += c; break;
            default: p.agcnt[(age / 10) + 1] += c; break;
        }
        return p;
    },
    group_reduce_lv_set(p, l, c) {
        while (1) {
            if (l.indexOf('死亡') !== -1) { p.lv_e += c; break; }
            if (l.indexOf('酸投') !== -1 || l.indexOf('重症') !== -1) { p.lv_d += c; break; }
            if (l.indexOf('入院') !== -1 || l.indexOf('肺炎') !== -1 || l.indexOf('中等') !== -1) { p.lv_c += c; break; }
            if (l.indexOf('無症状') !== -1 || l.indexOf('退院') !== -1) { p.lv_a += c; break; }
            p.lv_b += c; break;
        }
        return p;
    },
    chartLegendUpdate: function(chart) {
        let item = chart.legendables();
        let h = chart.legend()._legendItemHeight();
        let o2 = $(chart.anchor()).find('g.dc-legend-item'), k = 0;
        //o2=o2.filter(':not(:contains("週間"))')
        const LEGEND_HIDE_Y = -100;
        item.forEach((d, i) => {
            o2.eq(i).attr('transform', `translate(${d.hidden ? -100 : 0},${d.hidden ? LEGEND_HIDE_Y : k * h})`);
            k += d.hidden ? 0 : 1;
        });
    },
    dateStakShow: function(no) {
        for (var i = 0; i < CHART_DATE_STACK_GRP.length; i++) {
            for (var j = 0; j < CHART_DATE_STACK_GRP[i].length; j++) {
                if (i === no) m_.chartDate.showStack(CHART_DATE_STACK_GRP[i][j]);
                else m_.chartDate.hideStack(CHART_DATE_STACK_GRP[i][j]);
            }
        }
    },
    dateStack2Accessor: function(chart, no) {
        return function(d, i) {
            let flt = m_.chartName.filters();
            let pref_mode = flt.length > 1 && flt.length <= CHART_DATE_STACK2_N
            if (pref_mode) {
                m_.date_stk_nm[no] = flt[no];
                return d.value.nmcnt[flt[no]] === undefined ? 0 : d.value.nmcnt[flt[no]];
            } else {
                m_.date_stk_nm[no] = '(選択' + (no + 1) + ')';
                return 0;
            }
        }
    },
    dateStack3Accessor: function(no) {
        return function(d, i) {
            return d.value.agcnt[no];
        }
    },
    chartScroll: function(sel, name, duration) {
        name = name || '';
        duration = duration === undefined ? 300 : duration;
        let o = $(sel);
        if (name == '') {
            o.scrollTop(0); return;
        }
        let pl = o.find('g.row:contains("' + name + '")');
        if (pl.length) {
            let top;
            if (IS_SP) {
                top = pl.attr('transform').replace(')', '').split(',')[1] - 40;
            } else {
                //not work iOS Safari
                let p0 = o.find('g.row:eq(0)').position();
                let p1 = pl.position();
                top = p1.top - p0.top - 40;
            }
            if (duration === 0) o.scrollTop(top);
            else o.animate({ scrollTop: top }, duration, 'swing');
        }
    },
    createFilteredBarStacksData: function() {
        let prefs = _.keys(PREF_EN);
        let dimName = m_.chartName.dimension()
        m_.chartDate.x(d3.scaleTime().domain([moment(m_.spk.min_ymd).toDate(), moment(m_.spk.max_ymd).toDate()]));
        let stacks = [];//stacks[pref][ymd]
        let grp = m_.chartDate.group();
        for (var i = 0; i < prefs.length; i++) {
            dimName.filter(prefs[i]);
            stacks[i] = [];
            _.forEach(grp.all(), (d) => {
                let ymd = moment(d.key).format('YYMD');
                stacks[i][ymd] = [d.value.lv_a, d.value.lv_b, d.value.lv_c, d.value.lv_d, d.value.lv_e];
            });
        }

        let stacks2 = [];
        let from = moment(m_.spk.min_ymd), to = moment(m_.spk.max_ymd);
        let nday = to.diff(from, 'days')
        for (var i = 0; i < prefs.length; i++) {
            stacks2[i] = [];
            from = moment(m_.spk.min_ymd);
            for (var j = 0; j <= nday; j++) {
                let ymd = j == 0 ? from.format('YYMD') : from.add(1, 'days').format('YYMD');
                if (stacks[i][ymd] !== undefined) {
                    stacks2[i][j] = stacks[i][ymd];
                } else {
                    stacks2[i][j] = [0, 0, 0, 0, 0];
                }
            }
            stacks2[i] = stacks2[i].slice(SPARK_SX);
        }

        //rollback
        dimName.filterAll();
        if (m_.domainDate) m_.chartDate.x(d3.scaleTime().domain(m_.domainDate));

        return stacks2;
    },
    getPrefCntTbl: function() {
        let pref_cnt_tbl = {};
        switch (m_.sel_tab) {
            case 'tabs_c'://感染者数(crossfilterの影響受ける)
                let pref_cnt = m_.gpName.all();
                for (var i = 0; i < pref_cnt.length; i++) {
                    pref_cnt_tbl[pref_cnt[i].key] = pref_cnt[i].value;
                }
                break;
            case 'tabs_p'://現患者数
                _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => {
                    let n = m_.names[pre_name] ? m_.names[pre_name] : 0;//感染者数
                    let patient = n - p.discharged - p.deaths;//患者数=感染者数-退院者数-死亡者数
                    pref_cnt_tbl[pre_name] = patient;
                });
                break;
            case 'tabs_pc': //PCR検査
                _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => {
                    pref_cnt_tbl[pre_name] = p.pcrtested;
                    //PCR検査% (PCR検査数/総人口)
                    pref_cnt_tbl[pre_name] = 2500 * p.pcrtested_p;// ave:_.sum(_.map(m_.pref_tbl_last_m1,'pcrtested_p'))/47=0.2002127659574468% like 500 ;0.2*x=500
                });
                break;
            case 'tabs_d': _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => { pref_cnt_tbl[pre_name] = p.deaths; }); break;//死亡者数
            case 'tabs_b': _.forEach(m_.pref_tbl_last_m1, (p, pre_name) => { pref_cnt_tbl[pre_name] = p.bed; }); break;//対策病床数
        }
        return pref_cnt_tbl;
    },
    loadDcData: (name) => {
        m_.get.data = name

        const get_ext = (s) => { s = s.replace(/\?.*$/, ''); return s.substr(s.lastIndexOf('.') + 1); }
        const url_query_replace = () => {
            let copy = Object.assign({}, m_.get);
            delete copy.data;
            if (copy.date) copy.date = copy.date.replace(' ', '+');
            let query = 'data=' + m_.get.data.replace(/\?.*$/, '') + (_.size(m_.get) > 1 ? '&' + php_http_build_query(copy) : '');

            if (location.href.indexOf('?') !== -1 || location.href.toLowerCase().indexOf('.html') !== -1) {
                query = location.pathname + '?' + query;
            } else {
                const get_ci_pathname = (pathname) => {
                    if (location.pathname.indexOf('=') === -1) {
                        pathname = pathname + (_.last(pathname) === '/' ? '' : '/');
                    } else {
                        pathname = pathname.substr(0, pathname.lastIndexOf('/') + 1);
                    }
                    return pathname;
                }
                query = get_ci_pathname(location.pathname) + query;
            }
            history.replaceState(null, null, query);
        }
        let is_csv = get_ext(m_.get.data).toLowerCase() === 'csv';
        let is_http = m_.get.data.indexOf('http') !== -1; let path = is_http ? m_.get.data : m_.url_data.path + m_.get.data

        path += '';
        let def;
        if (is_csv) {
            def = d3.csv(path, (data) => {
                let row = Object.values(data);
                row[D_SEX] = parseInt(row[D_SEX]);
                row[D_AGE] = parseInt(row[D_AGE]);
                row[D_JOBCAT] = parseInt(row[D_JOBCAT]);
                row[D_CNT] = parseInt(row[D_CNT]);
                return row;
            })
                .then((data) => {
                    data.unshift(data.columns);
                    initDc(data);
                })
                .then(() => {
                    if (m_.config.url_param_data_replace) url_query_replace();
                });
        } else {//json
            def = d3.json(path)
                .then(initDc)
                .then(() => {
                    if (m_.config.url_param_data_replace) url_query_replace();
                });
        }
        return def;
    },
    loadAllData: () => {
        const is_local_html = location.protocol === 'file:';

        m_.composite = new dc.CompositeChart("#chart_date", "chartGroup");
        m_.chartDate = new dc.BarChart(m_.composite);
        m_.chartLine = new dc.LineChart(m_.composite);
        m_.composite2 = new dc.CompositeChart("#chart_date2", "chartGroup");
        m_.chartDate2 = new dc.BarChart(m_.composite2);
        m_.chartLine2 = new dc.LineChart(m_.composite2);

        m_.chartName = new dc.RowChart("#chart_name", "chartGroup");
        m_.chartCity = new dc.RowChart("#chart_city", "chartGroup");
        m_.chartSex = new dc.PieChart('#chart_sex', 'chartGroup');
        m_.chartWeek = new dc.BarChart("#chart_week", "chartGroup");
        m_.chartAge = new dc.BarChart("#chart_age", "chartGroup");
        m_.chartCond = new dc.BarChart('#chart_cond', 'chartGroup');
        m_.chartJob = new dc.BarChart('#chart_job', 'chartGroup');

        const load = (d) => {
            m_.data3 = d.data3;
            m_.jobcates = d.jobcates;
            m_.pref_tbl_last_m1 = d.pref_tbl_last_m1;
            m_.pref_tbl_last_m2 = d.pref_tbl_last_m2;

            m_.spk = d.spk;

            m_.ac_data = d.ac_data;
            m_.ac_data_tbl = d.ac_data_tbl;

            m_.init();

            if (!is_local_html) {
                let name = m_.get.data || m_.url_data.data; m_.loadDcData(name);
            }
        }

        if (is_local_html) {
            load(g_covid19_assets);
            initDc(g_covid19_data);
        } else {
            d3.json(m_.url_data.path + m_.url_data.assets).then(load);
        }
    },
    reLoadDcData: function(name) {
        //Free memory
        m_.ndx.remove();
        m_.ndx = null;

        m_.get = {};

        m_.loadDcData(name).then(() => {
            $('.btn_clear_all').trigger('click');
        });
    },
    init: function() {
        if (IS_SP) {
            m_.tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html(function() {
                    return $(this).find('title').text().replace(/\n/g, '<BR>');
                });

            // m_.tipRow = d3.tip()
            //       .attr('class', 'd3-tip')
            //       .offset([-200, 10])
            //       .html(function () {
            //         return $(this).find('title').text().replace(/\n/g,'<BR>');
            //       });
        }

        initAutoComplete();

        $('#btn_search').autocomplete_ex({
            user_opt: {
                data: m_.ac_data,
                multiple: 1,
                select: function(event, ui) {
                    if (ui.item[0] === '職業' || ui.item[0] === '状態') {
                        $('#btn_search').val(ui.item[1]).trigger('btn_search_update');
                    } else {
                        let o = $('#btn_search');
                        const AC_SPLIT_WD = /\s+/;
                        let wd = o.val().trim().split(AC_SPLIT_WD);
                        if (wd.length === 1) {
                            let is_pref = ui.item[0] === ui.item[1];
                            o.val((is_pref ? ui.item[0] : ui.item[0] + ui.item[1]) + ' ');
                        }
                        o.trigger('btn_search_update');
                    }
                }
            }
        });

        if (m_.get.light === undefined) {
            initPrefTable();
        }
    }
};

const initDc = (data) => {
    m_.data_hdr = data.shift();
    m_.data = data;

    if (m_.data_hdr[D_OPT]) {
        let opt = {};
        php_parse_str(m_.data_hdr[D_OPT], opt);
        m_.data_type = parseInt(opt.data_type);
    } else {
        m_.data_type = 0;
    }

    if (m_.data_type) {
        m_.domainDate = [moment('2020-03-20').subtract(1, 'days').toDate(), moment(m_.spk.max_ymd).add(3, 'days').toDate()];
    } else {
        let ymds = _.uniq(_.map(m_.data, D_YMD));
        m_.domainDate = [moment(_.min(ymds)).subtract(1, 'days').toDate(), moment(_.max(ymds)).add(3, 'days').toDate()];
    }

    const pl1 = _.map(data, D_PL1);
    const names_length = _.uniq(pl1).length
    m_.names = _.countBy(pl1);
    m_.citys = _.uniq(_.map(data, D_PL2));
    m_.conds = _.uniq(_.map(data, D_LV));

    let ndx = crossfilter(m_.data);
    m_.ndx = ndx;
    let ndx3 = crossfilter(m_.data3);

    //===========================================================================
    // CHART 都道府県 rowChart chartName_init
    //===========================================================================
    m_.dimName = ndx.dimension(function(d) {
        return d[D_PL1];
    });
    m_.gpName = m_.dimName.group().reduceSum(function(d) { return d[D_CNT] || 1; });
    m_.gpName.all().forEach(v => m_.gpName_all[v.key] = v.value);

    m_.dimName2 = ndx3.dimension(function(d) {
        return d[D3_PL1];
    });

    m_.chartName
        .width(IS_SP ? parseInt(window.innerWidth / 2) + 15 : 205)
        .titleLabelOffsetX(50)
        .height(24 + (names_length * 29))
        .fixedBarHeight(24)
        .margins({ top: 0, left: 10, right: 10, bottom: 20 })
        .transitionDuration(750)
        .dimension(m_.dimName)
        //.group(m_.gpName)
        .group(m_.groupRemoveEmpty(m_.gpName)) //yAxis0件は表示しない            
        .addFilterHandler(m_.addFilterHandlerSingleR)
        .on('filtered', function(chart, v) {
            let filters = chart.filters();

            //表示スタックを切り替える
            if (m_.sel_stack !== 'age') {
                let pref_mode = filters.length > 1 && filters.length <= CHART_DATE_STACK2_N;
                if (pref_mode) {
                    m_.dateStakShow(1);
                    $('#stack_type_pre').prop('checked', true);
                } else {
                    m_.dateStakShow(0);
                    $('#stack_type_con').prop('checked', true);
                }
            }

            //詳細パネル
            $('#detail_div1,#detail_div2,#detail_div3,#detail_div4,#detail_div5').hide();
            const p_max = m_.names['東京都']; //== _.max(_.values(m_.names));
            for (var i = 0; i < filters.length; i++) {
                let no = i + 1;
                let name = filters[i];
                let p = m_.pref_tbl_last_m1[name];
                if (p === undefined) continue;

                let n = m_.names[name] ? m_.names[name] : 0;
                let patient = n - p.discharged - p.deaths;//患者数=感染者数-退院者数-死亡者数
                let icon = '<img src="img/japan/' + PREF_EN[name] + '.gif">';
                let per = parseInt(100 * n / p_max);
                let bar_style = "background: linear-gradient(to right, rgb(31, 119, 180, 0.3) " + per + "%, #fffacd " + per + "%, #fffacd " + (100 - per) + "%) center center / 100% 100% no-repeat;";
                let ret = '<B>' + icon + '<a target="_blank" title="' + name + 'の wikipediaへ" href="' + m_.url_name + '/' + name + '">' + name + '</a></B><BR>' +
                    '<img style="width:180px;height:120px;object-fit: cover;object-position:0% 0%;" src="' + PREF_IMG_PATH + PREF_IMG[name] + '"><BR>' +
                    (p === undefined ? 'なし<BR>' : (
                        '<table><tbody>' +
                        '<tr><td>総人口　:</td><td>' + php_number_format(p.n) + '名</tr>' +
                        '<tr><td>感染者数:</td><td style="' + bar_style + '"> ' + php_number_format(n) + '名 <a title="人口に対する感染者率。感染者数 ÷ 総人口。">(' + (_.round(100 * n / p.n, 3)) + '%)</a></td></tr>' +
                        '<tr><td>患者数　:</td><td> ' + php_number_format(patient) + '名</td></tr>' +
                        '<tr><td>PCR検査:</td><td> ' + php_number_format(p.pcrtested) + '名 <a title="人口に対するPCR検査率。PCR検査数 ÷ 総人口。">(' + p.pcrtested_p + '%)</a></td></tr>' +
                        '<tr><td>死亡者数:</td><td> ' + p.deaths + '名</td></tr>' +
                        '<tr><td>退院者数:</td><td> ' + php_number_format(p.discharged) + '名<BR>' +
                        '<tr><td>対策病床数:</td><td> ' + php_number_format(p.bed) + '床 <a title="対策病床使用率。患者数/対策病床数。">(' + (_.round(100 * patient / p.bed, 2)) + '%)</a></td></tr>' +
                        '</tbody></table>'
                    )) +
                    '<a target="_blank" href="https://hazard.yahoo.co.jp/article/covid19' + PREF_EN[name] + '">' + name + 'コロナまとめサイト</a>'
                    ;
                $('#detail_div' + no).html(ret).hide().show();
            }

            //都道府県を一覧テーブルにもフィルタを適応
            $('#tbl_flt').val(filters.join(' ')).trigger('change');

            m_.showFilterUi('#panel_name', chart);
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        .on('pretransition', function(chart) {
            chart.selectAll("text.row").attr('x', 32);
            chart.selectAll("rect").attr('x', 28);
            chart.selectAll("g.row")
                .append('svg:image')
                .attr('width', '26')
                .attr('class', 'pl')
                .attr('xlink:href', function(d, i) {
                    return PREF_EN[d.key] ? 'img/japan/' + PREF_EN[d.key] + '.gif' : IMG_NO;
                })
                .on('click', function(d) {
                    next = m_.url_name + '/' + d.key;
                    window.open(next);
                });
        })
        .ordinalColors(colorbrewer.Set2[8])
        //.gap(10) //default:5
        .renderLabel(true) //LeftLabel & tooltip
        .label(function(d) {
            s = d.key;
            for (var i = 0; i < 4 - d.key.length; i++) s += '　';
            s += ' ';
            let is_filtered = m_.gpName_all[d.key] !== d.value;
            // let p=m_.pref_tbl_last_m1[d.key];
            //       'PCR検査: '+php_number_format(p.pcrtested)+'名 ('+p.pcrtested_p+'%)<BR>'+
            //       '死亡者数: '+p.deaths+'名<BR>'+
            //       '退院者数: '+php_number_format(p.discharged)+'名<BR>'+
            //       '対策病床数: '+php_number_format(p.bed)+'床 ('+(_.round(100*patient/p.bed,2)) + '%)<BR>'

            return s + php_number_format(d.value) + (is_filtered ? '' : (m_.pref_tbl_last_cnt[d.key] ? '▲' + m_.pref_tbl_last_cnt[d.key] : ''));
        })
        .renderTitleLabel(false) //RightLabel & tooltip 
        .title(function(d) {
            let ret = m_.getChartnameTitle(d.key, '\n');
            return ret === '' ? d.value : ret;
        })
        .elasticX(true)
        ;
    m_.chartName.xAxis().ticks(0);//.tickFormat(d3.format("s"));

    //===========================================================================
    // CHART 市区町村 rowChart chartCity_init
    //===========================================================================
    let dimCity = ndx.dimension(function(d) {
        return d[D_PL2];
    });
    let gpCity = dimCity.group().reduceSum(function(d) {
        return d[D_PL2] === DN_PL2 ? 0 : d[D_CNT] || 1;
    });
    //gpCity.all().forEach( v=>m_.gpCity_all[v.key]=v.value );

    m_.chartCity
        .width(IS_SP ? parseInt(window.innerWidth / 2) - 30 : 190)
        .height(24 + (Object.keys(gpCity.all()).length * 29))
        .fixedBarHeight(24)
        .margins({ top: 0, left: 10, right: 10, bottom: 20 })
        .transitionDuration(750)
        .dimension(dimCity)
        .group(m_.groupRemoveEmpty(gpCity)) //yAxis0件は表示しない
        //.group(gpCity) //yAxisすべて表示
        .addFilterHandler(m_.addFilterHandlerSingleR)
        .ordinalColors(colorbrewer.Paired[9]) //Set3[12] //Set2[8] //Set1[9] 
        .renderLabel(true) //LeftLabel
        // .label(function(d) {
        //     let is_filtered = m_.gpCity_all[d.key]!==d.value;
        //     const n=is_filtered?8:6;
        //     let s=d.key.substr(0,n);
        //     for (var i = s.length; i < n+1; i++) s+='　';
        //     return s+d.value + (is_filtered ? '' : (m_.pref_tbl_city_cnt[d.key] ? '▲'+m_.pref_tbl_city_cnt[d.key] : '' ));
        // })
        .renderTitleLabel(true) //RightLabel & tooltip
        .titleLabelOffsetX(20)
        .title(function(d) {
            return d.value;
        })
        .elasticX(true)
        .on('filtered', function(chart, v) {
            m_.showFilterUi('#panel_city', chart);//,(f)=>moment(f).format('M/D(ddd)'));
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        ;
    m_.chartCity.xAxis().ticks(0); //.tickFormat(d3.format("d"))

    //===========================================================================
    // CHART 感染者数(YYYY-MM-DD) barChart chartDate_init
    //===========================================================================
    let dimDate = ndx.dimension(function(d) {
        return d3.timeDay(new Date(d[D_YMD]));
    });
    m_.gpDate = dimDate.group().reduceSum(function(d) { return d[D_CNT] || 1; });
    m_.dateCntCreate();

    let gpDateStk = dimDate.group().reduce(m_.group_reduce.append, m_.group_reduce.remove, m_.group_reduce.init);
    //.order(function(d) {return d.total;});

    m_.chartDate
        .centerBar(false)
        .transitionDuration(750)
        .dimension(dimDate)
        .group(gpDateStk, CND_LV_A, (d) => d.value.lv_a)
        .stack(gpDateStk, CND_LV_B, (d) => d.value.lv_b)
        .stack(gpDateStk, CND_LV_C, (d) => d.value.lv_c)
        .stack(gpDateStk, CND_LV_D, (d) => d.value.lv_d)
        .stack(gpDateStk, CND_LV_E, (d) => d.value.lv_e)
        .hidableStacks(false) // stackNameLegend click でタックを非表示または表示
        .yAxisPadding('12%')
        //.useRightYAxis(IS_SP)         // .elasticX(true)
        // .xAxisPadding(2)
        // .xAxisPaddingUnit()
        .renderLabel(true)
        .label(function(d, i) {
            let ymd = moment(d.x).format('YYYYMMDD');

            return (d.data.value.total === m_.dateCntMax //最大
                || ymd === m_.dateCntTo //最新日付
                //  ||ymd===moment(m_.dateCntTo).subtract(1, 'days').format('YYYYMMDD') //最新日付-1days
            ) ? (d.data.value.total === 0 ? '' : php_number_format(d.data.value.total)) : '';
            //return m_.gpDateYMMax.value===d.data.value.total ? d.data.value.total : '';
        })
        // .title(function(d) {//mouseホバーしたときの表示される文字
        //     return moment(d.key).format('YYYY/MM/DD')+' : '+d.value+'名';
        // })
        //.y(d3.scaleLinear().domain([0, 50]))
        .ordinalColors(COL_CND.concat(COL_NAME).concat(COL_AGE))
        .gap(!IS_SP ? -7 : -4).on('filtered', function(chart, v) {
            //m_.showFilterUi('#panel_date',chart,(f)=>moment(f).format('M/D(ddd)'));
            m_.on_chart_filtered(chart, v);
        })
        ;
    //m_.chartDate.yAxis().ticks(5); //tickFormat(d3.format("s"));

    for (var no = 0; no < CHART_DATE_STACK2_N; no++) {
        m_.date_stk_nm[no] = '(選択' + (no + 1) + ')';
        m_.chartDate.stack(gpDateStk, CHART_DATE_STACK_GRP[1][no], m_.dateStack2Accessor(m_.chartDate, no));
    }
    for (var no = 0; no < DI_AGE_MAX; no++) {
        m_.chartDate.stack(gpDateStk, CHART_DATE_STACK_GRP[2][no], m_.dateStack3Accessor(no));
    }

    m_.dateStakShow(0);
    m_.pref_tbl_last_cnt = _.last(m_.chartDate.group().all()).value.nmcnt;
    //===========================================================================
    // CHART lineChart chartLine_init
    //===========================================================================
    m_.chartLine
        .dimension(dimDate)
        .colors('red')
        .group(m_.gpDate, "週間移動平均")
        //.useRightYAxis(IS_SP)
        //.yAxisPadding('40%')
        .valueAccessor(function(d, no) {
            const N = 7;// N日 移動平均
            if (no === 0) {
                m_.work = _.values(_.mapValues(m_.gpDate.all(), d => d.value));
            }
            i = no - N + 1;
            let v = m_.work.slice(i < 0 ? 0 : i, i + N);
            let ave = Math.round(_.sum(v) / N);
            return ave;
        })
        //.dashStyle([2,2])
        ;
    //m_.chartLine.yAxis().ticks(5);        

    //===========================================================================
    // CHART composite_init
    //===========================================================================
    let chartDateW = 1290;
    if (IS_SP) chartDateW = window.innerWidth + 500;

    m_.composite
        .width(chartDateW)
        .height(250)
        //左
        // .margins({top: 0, right: 0, bottom: 20, left: 30})
        // .legend(dc.legend().x(40).y(0))
        //右
        .margins({ top: 0, right: 0, bottom: 20, left: 35 })
        .legend(dc.legend().x(IS_SP ? chartDateW - 350 : 60).y(0).legendText((d) => {
            let sel_no = d.name.split(':');
            return sel_no.length === 2 ? m_.date_stk_nm[sel_no[1]] : d.name;
        }))
        .x(m_.domainDate ? d3.scaleTime().domain(m_.domainDate) : d3.scaleTime())
        .elasticX(false)
        //.round(d3.timeDay.round)        
        .mouseZoomable(false)
        .xUnits(d3.timeDay)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .elasticY(m_.config.cDateYm.is_elasticY) //yAxisの高さを動的に変化させる
        .title(function(d) {
            let is_bar = isNaN(d.value);
            let s_suf = '';
            //let ymd2=moment(d.key).format('YYYYMMDD');
            //s='累計: '+m_.dateCnt[ymd2]+'名\n'; //TODO:
            while (1) {
                let ymd = moment(d.key).format('YYYY-MM-DD');
                if (ymd === YMD_ED_F[0][0]) { s_suf = YMD_ED_F[0][1]; break; }
                if (ymd === YMD_ED_F[1][0]) { s_suf = YMD_ED_F[1][1]; break; }
                if (ymd === YMD_ED_F[2][0]) { s_suf = YMD_ED_F[2][1]; break; }
                if (ymd === YMD_ED_F[3][0]) { s_suf = YMD_ED_F[3][1]; break; }
                if (ymd === YMD_ED_F[4][0]) { s_suf = YMD_ED_F[4][1]; break; }
                break;
            }
            let date_str = typeof (d.key) === "object" ? moment(d.key).format('YYYY/M/D(ddd)') : d.key;
            if (!is_bar) {
                //N日 移動平均
                return date_str + '\n週間移動平均: ' + php_number_format(d.value) + '名';
            }

            let flt = m_.chartName.filters();
            let pref_mode = flt.length > 1 && flt.length <= CHART_DATE_STACK2_N;
            if (pref_mode) {
                let s = '';
                for (f of flt) {
                    s += d.value.nmcnt[f] ? (f + ': ' + d.value.nmcnt[f] + '名\n') : '';
                }
                return date_str + '\n────────\n' + s + (flt.length > 1 ? '────────\n計: ' + d.value.total + '名' : '') + '\n' + s_suf;
            } else if (m_.sel_stack === 'age') {
                let s = '';
                for (var i = 0; i < d.value.agcnt.length; i++) {
                    let per = _.round(100 * d.value.agcnt[i] / d.value.total, 1) + '%';
                    let nm = CHART_DATE_STACK_GRP[2][i];
                    s += php_sprintf("%' -8s", nm) + ': ' + php_sprintf("%' 3s", d.value.agcnt[i]) + '名 (' + per + ')\n';
                }
                return date_str + '\n──────────\n' + s + '──────────\n計: ' + php_number_format(d.value.total) + '名' + '\n' + s_suf;
            } else {
                return date_str + '\n────────\n' +
                    (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                    (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                    (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                    (d.value.lv_d === 0 ? '' : CND_LV_D + ': ' + d.value.lv_d + '名\n') +
                    (d.value.lv_e === 0 ? '' : CND_LV_E + ': ' + d.value.lv_e + '名\n') +
                    '────────\n計: ' + php_number_format(d.value.total) + '名' + '\n' + s_suf;
            }
        })
        .on('renderlet', function(chart, filter) { })
        .on('pretransition', m_.on_chartDate_pretransition)
        .addFilterHandler(m_.addFilterHandlerSingle)
        .on('preRedraw', function(chart) {
            m_.chartDate.filterAll().filter([m_.composite.filters()]);
        })
        .on('filtered', function(chart, v) {
            m_.showFilterUi('#panel_date', chart, (f) => moment(f).format('M/D(ddd)'));
            m_.on_chart_filtered(chart, v);
        })
        .compose([m_.chartDate, m_.chartLine])
        ;

    m_.composite.xAxis().ticks(7).tickFormat(function(s) {
        return moment(s).format('M/Dddd');
    });//d3.timeFormat('%m/%d')
    m_.composite.yAxis().ticks(5); //.tickFormat(d3.format("d"));


    //===========================================================================
    // CHART 感染者数(YYYY-MM-DD) barChart chartDate2_init
    //===========================================================================
    let dimDate2 = ndx3.dimension(function(d) {
        return d3.timeDay(new Date(d[D3_YMD]));
    });
    m_.gpDate2 = dimDate2.group().reduceSum(function(d) { return d[D3_CNT]; });
    //m_.dateCntCreate();

    let gpDateStk2 = dimDate2.group().reduce(
        function date2_grp_add(p, v) {
            let pl = v[D3_PL1], cnt = v[D3_CNT], type = v[D3_TYP];
            p.all[type] += cnt;
            p.pre[type][pl] = (p.pre[type][pl] || 0) + cnt;
            return p;
        },
        function date2_grp_remove(p, v) {
            let pl = v[D3_PL1], cnt = v[D3_CNT], type = v[D3_TYP];
            p.all[type] -= cnt;
            p.pre[type][pl] = (p.pre[type][pl] || 0) - cnt;
            return p;
        },
        function date2_grp_init(p, v) { return { all: [0, 0, 0], pre: [{}, {}, {}] }; }
    );

    m_.chartDate2
        .centerBar(false)
        .transitionDuration(750)
        .dimension(dimDate2)
        .elasticY(true)
        .group(gpDateStk2, 'PCR', function(d) {
            let flt_len = m_.chartName.filters().length;
            return (flt_len == 0 && m_.chartDate2Mode === DT_PCR) ? d.value.all[DT_PCR] : 0;
        })
        .stack(gpDateStk2, '死亡', function(d) {
            let flt_len = m_.chartName.filters().length;
            return (flt_len === 0 && m_.chartDate2Mode === DT_DEA) ? d.value.all[DT_DEA] : 0;
        })
        .stack(gpDateStk2, '患者', function(d) {
            let flt_len = m_.chartName.filters().length;
            return (flt_len === 0 && m_.chartDate2Mode === DT_PAT) ? d.value.all[DT_PAT] : 0;
        })
        .hidableStacks(false) // stackNameLegend click でタックを非表示または表示
        .yAxisPadding('12%')
        .renderLabel(true)
        .label(function(d, i) {
            let ymd = moment(d.x).format('YYYYMMDD');
            let flt = m_.chartName.filters();
            let total;
            if (flt.length) {
                let f = _.filter(d.data.value.pre[m_.chartDate2Mode], (k, v) => flt.includes(v));//m_.chartNameフィルタでされた物だけ抽出
                total = _.sum(f);
            } else {
                total = d.data.value.all[m_.chartDate2Mode];
            }
            if (total === 0) return '';
            //最大                     最新日付
            return (m_.dateCntMax2Ymd.includes(ymd) || ymd === m_.dateCntTo2) ? php_number_format(total) : '';

        })
        .ordinalColors(_.concat(DT_COL, _.concat(colorbrewer.Set1[3], colorbrewer.Set1[6])))
        .gap(!IS_SP ? -7 : -4).on('filtered', function(chart, v) {
            //m_.showFilterUi('#panel_date',chart,(f)=>moment(f).format('M/D(ddd)'));
            m_.on_chart_filtered(chart, v);
        })
        ;
    //m_.chartDate.yAxis().ticks(5); //tickFormat(d3.format("s"));
    function date2_sel_stack(chart, no) {
        return function(d, i) {
            let flt = m_.chartName.filters();
            let pref_mode = flt.length > 0;
            if (pref_mode) {
                let flt_name = flt[no - 1];
                chart.stack()[CHART_DATE2_STACK1_N + no - 1].name = flt_name;
                return (d.value.pre[m_.chartDate2Mode][flt_name] || 0);
            } else {
                chart.stack()[CHART_DATE2_STACK1_N + no - 1].name = '(選択' + no + ')';
                return 0;
            }
        }
    }

    for (var no = 1; no < CHART_DATE2_STACK2_N; no++) {
        m_.chartDate2.stack(gpDateStk2, '(選択' + no + ')', date2_sel_stack(m_.chartDate2, no));
    }

    //===========================================================================
    // CHART lineChart chartLine2_init
    //===========================================================================
    m_.chartLine2
        .dimension(dimDate2)
        .colors('red')
        .group(m_.gpDate2, "週間移動平均")
        //.useRightYAxis(IS_SP)
        //.yAxisPadding('40%')
        .valueAccessor(function(d, no) {
            const N = 7;// N日 移動平均
            if (no === 0) {
                let flt = m_.chartName.filters();
                m_.work = [];
                m_.dateCntTo2 = '00000000';
                m_.dateCntMax2Ymd = [];

                if (flt.length) {
                    m_.chartDate2.group().all().forEach((v) => {
                        let f = _.filter(v.value.pre[m_.chartDate2Mode], (k, v) => flt.includes(v));//m_.chartNameフィルタでされた物だけ抽出
                        let s = _.sum(f);
                        m_.work.push(s);

                        let ymd = moment(v.key).format('YYYYMMDD');
                        if (s > 0 && ymd > m_.dateCntTo2) m_.dateCntTo2 = ymd;

                        if (s === m_.dateCntMax2) {
                            m_.dateCntMax2Ymd.push(ymd);
                        }
                    });
                } else {
                    m_.chartDate2.group().all().forEach((v) => {
                        let s = v.value.all[m_.chartDate2Mode];
                        m_.work.push(s);
                        let ymd = moment(v.key).format('YYYYMMDD');
                        if (s > 0 && ymd > m_.dateCntTo2) m_.dateCntTo2 = ymd;
                    });
                }
                if (m_.chartDate2Mode === DT_PAT) {
                    app.pnl.date.chart2.cnt = php_number_format(_.last(m_.work));
                } else {
                    app.pnl.date.chart2.cnt = php_number_format(_.sum(m_.work));
                }
                m_.dateCntMax2 = _.max(m_.work);
            }
            i = no - N + 1;
            let v = m_.work.slice(i < 0 ? 0 : i, i + N);
            let ave = Math.round(_.sum(v) / N);
            return ave;
        })
        //.dashStyle([2,2])
        ;
    //m_.chartLine.yAxis().ticks(5);        

    //===========================================================================
    // CHART composite2_init
    //===========================================================================
    m_.composite2
        .width(chartDateW)
        .height(160)
        //左
        // .margins({top: 0, right: 0, bottom: 20, left: 30})
        // .legend(dc.legend().x(40).y(0))
        //右
        .margins({ top: 0, right: 0, bottom: 20, left: 30 })
        .legend(dc.legend().x(IS_SP ? chartDateW - 350 : 60).y(0))
        .x(m_.domainDate ? d3.scaleTime().domain(m_.domainDate) : d3.scaleTime())
        .elasticX(false)
        //.round(d3.timeDay.round)        
        .mouseZoomable(false)
        .xUnits(d3.timeDay)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .elasticY(m_.config.cDateYm.is_elasticY) //yAxisの高さを動的に変化させる
        .title(function(d) {
            let is_bar = isNaN(d.value);
            let s_suf = '';
            while (1) {
                let ymd = moment(d.key).format('YYYY-MM-DD');
                if (ymd === YMD_ED_F[0][0]) { s_suf = YMD_ED_F[0][1]; break; }
                if (ymd === YMD_ED_F[1][0]) { s_suf = YMD_ED_F[1][1]; break; }
                if (ymd === YMD_ED_F[2][0]) { s_suf = YMD_ED_F[2][1]; break; }
                if (ymd === YMD_ED_F[3][0]) { s_suf = YMD_ED_F[3][1]; break; }
                if (ymd === YMD_ED_F[4][0]) { s_suf = YMD_ED_F[4][1]; break; }
                break;
            }
            let date_str = typeof (d.key) === "object" ? moment(d.key).format('YYYY/M/D(ddd)') : d.key;
            if (!is_bar) {
                return date_str + '\n週間移動平均: ' + php_number_format(d.value) + '名';
            }

            let flt = m_.chartName.filters();
            if (flt.length > 0) {
                let s = ''
                let nmcnt = d.value.pre[m_.chartDate2Mode];
                let total = 0;
                for (f of flt) {
                    s += nmcnt[f] ? (f + ': ' + php_number_format(nmcnt[f]) + '名\n') : '';
                    total += nmcnt[f];
                }
                return date_str + '\n────────\n' + s + (flt.length > 1 ? '────────\n計: ' + php_number_format(total) + '名' : '') + '\n' + s_suf;
                // }else if(flt.length==0){
                //     return date_str+'\n:'+d.value.total+'名 (全国)'+'\n'+s;
            } else {
                return date_str + '\n────────\n' +
                    '全国 計: ' + (d.value.all[m_.chartDate2Mode] === 0 ? '' : php_number_format(d.value.all[m_.chartDate2Mode]) + '名\n') + s_suf;
            }
        })
        .on('renderlet', function(chart, filter) { })
        .on('pretransition', m_.on_chartDate_pretransition)
        .addFilterHandler(m_.addFilterHandlerSingle)
        .on('preRedraw', function(chart) {
            m_.chartDateLegendUpdate2();
            m_.chartDate2.filterAll().filter([m_.composite2.filters()]);
        })
        .on('filtered', function(chart, v) {
            m_.showFilterUi('#panel_date', chart, (f) => moment(f).format('M/D(ddd)'));
            m_.on_chart_filtered(chart, v);
        })
        .compose([m_.chartDate2, m_.chartLine2])
        ;

    m_.composite2.xAxis().ticks(7).tickFormat(function(s) {
        return moment(s).format('M/Dddd');
    });
    m_.composite2.yAxis().ticks(5).tickFormat(d3.format("~s"));//1.5k


    //===========================================================================
    // CHART 性別 pie chartSex_init
    //===========================================================================
    let dimSex = ndx.dimension(function(d) {
        return d[D_SEX];
    });
    let gpSex = dimSex.group().reduceSum(function(d) { return 1; /*d.cnt*;*/ });


    let chartSexW = 148;
    let chartSexH = 158;

    m_.chartSex
        .width(chartSexW)
        .height(chartSexH)
        .cx(parseInt(chartSexW / 2))
        .externalRadiusPadding(18)
        .innerRadius(15)
        .slicesCap(3) //分割数
        .dimension(dimSex)
        .group(gpSex)
        .addFilterHandler(m_.addFilterHandlerSingle)
        .filterPrinter(function(filters) {
            return filters.map(function(f) { return SEX_LABEL[f]; }).join(', ');
        })
        .on('filtered', function(chart, v) {
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        .ordering(function(t) {
            return -t.value; //昇順
        })
        .colors(function(d) { return COL_SEX[d]; })
        .renderLabel(true)
        .label(function(d) {
            if (d.key === 'empty') return '';
            return SEX_LABEL[d.key] + ':' + php_number_format(d.value);
        })
        .title(function(d) {
            if (d.key === 'empty') return '';
            return SEX_LABEL[d.key] + ': ' + php_number_format(d.value) + '名';
        })
        //.legend(dc.legend())
        ;

    //===========================================================================
    // CHART 曜日 chartWeek_init
    //===========================================================================
    let dimWeek = ndx.dimension(function(d) {
        return new Date(d[D_YMD]).getDay(); //0~6 日~
    });
    let gpWeek = dimWeek.group().reduce(m_.group_reduce_light.append, m_.group_reduce_light.remove, m_.group_reduce_light.init).order(function(d) {
        return d.total;
    });
    //gpWeek=m_.groupRemoveEmpty(gpWeek);//xAxis0件は表示しない

    let chartWeekW = 350;
    if (IS_SP) {
        chartWeekW = window.innerWidth - $('#chart_sex').width() - 40;
        $('#chart_week').css('width', (chartWeekW + 5) + 'px');
    }
    let chartWeekH = 148;

    m_.chartWeek
        .width(chartWeekW)
        .height(chartWeekH)
        .margins({ top: 0, right: 0, bottom: 20, left: 40 })
        .gap(6)
        .transitionDuration(750)
        .dimension(dimWeek)
        .group(gpWeek, CND_LV_A, d => d.value.lv_a)
        .stack(gpWeek, CND_LV_B, d => d.value.lv_b)
        .stack(gpWeek, CND_LV_C, d => d.value.lv_c)
        .stack(gpWeek, CND_LV_D, d => d.value.lv_d)
        .stack(gpWeek, CND_LV_E, d => d.value.lv_e)
        .xUnits(dc.units.ordinal)
        .elasticX(true)
        .filterPrinter(function(filters) {
            return filters.map(function(f) { return WEEK_LABEL[f]; }).join(', ');
        })
        .x(d3.scaleOrdinal())
        .y(d3.scaleLinear().domain([0, 100000]))
        .elasticY(true)
        .yAxisPadding('25%')
        .on('filtered', function(chart, v) {
            //m_.showFilterUi('#panel_job',chart);
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        //.mouseZoomable(true)
        //.ordering(function(t){return -t.value.count;})//desc
        .renderHorizontalGridLines(true)
        .ordinalColors(COL_CND)
        .renderLabel(true)
        .label(function(d) {
            return d.data.value.total;
        })
        .title(function(d) {//mouseホバーしたときの表示される文字
            return WEEK_LABEL[d.key] + '\n────────\n' +
                (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                (d.value.lv_d === 0 ? '' : (CND_LV_D + ': ' + d.value.lv_d + '名\n')) +
                (d.value.lv_e === 0 ? '' : (CND_LV_E + ': ' + d.value.lv_e + '名\n')) +
                '────────\n計: ' + d.value.total + '名';
        })
        //.legend(dc.legend())
        ;
    m_.chartWeek.xAxis().tickFormat((d) => WEEK_LABEL[d]);
    m_.chartWeek.yAxis().ticks(4);

    //===========================================================================
    // CHART 年齢 barChart chartAge_init
    //===========================================================================
    let dimAge = ndx.dimension(function(d) {
        return d[D_AGE];
    });

    let gpAge = dimAge.group().reduce(m_.group_reduce_light.append, m_.group_reduce_light.remove, m_.group_reduce_light.init).order(function(d) {
        return d.total;
    });

    let chartAgeW = 504;
    if (IS_SP) chartAgeW = window.innerWidth - 20;

    m_.chartAge
        .width(chartAgeW)
        .height(chartSexH)
        .transitionDuration(750)
        .margins({ top: 0, right: 0, bottom: 20, left: 40 })
        .dimension(dimAge)
        .on('filtered', function(chart, v) {
            m_.dateCntCreate();

            //表示スタックを切り替える
            //if(m_.chartName.filters().length === 0)
            {
                if (m_.chartAge.filters().length === 0) {
                    $('#stack_type_con').prop('checked', true).trigger('change')
                } else {
                    $('#stack_type_age').prop('checked', true).trigger('change')
                }
            }
            m_.on_chart_filtered(chart, v);
        })
        .group(gpAge, CND_LV_A, (d) => d.value.lv_a)
        .addFilterHandler(m_.addFilterHandlerSingleR)
        .stack(gpAge, CND_LV_B, (d) => d.value.lv_b)
        .stack(gpAge, CND_LV_C, (d) => d.value.lv_c)
        .stack(gpAge, CND_LV_D, (d) => d.value.lv_d)
        .stack(gpAge, CND_LV_E, (d) => d.value.lv_e)
        .renderLabel(true)
        //.label(function(d) {return php_number_format(d.data.value.total);})
        .legend(dc.legend().x(60).y(0)) //左
        .title(function(d) {
            return m_.ageTickFormat(d.key) + '\n────────\n' +
                (d.value.lv_a === 0 ? '' : CND_LV_A + ': ' + d.value.lv_a + '名\n') +
                (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + d.value.lv_b + '名\n') +
                (d.value.lv_c === 0 ? '' : CND_LV_C + ': ' + d.value.lv_c + '名\n') +
                (d.value.lv_d === 0 ? '' : (CND_LV_D + ': ' + d.value.lv_d + '名\n')) +
                (d.value.lv_e === 0 ? '' : (CND_LV_E + ': ' + d.value.lv_e + '名\n')) +
                '────────\n計: ' + d.value.total + '名';
        })
        //.centerBar(true)
        .brushOn(false)
        .gap(6)
        .ordinalColors(COL_CND)
        .xUnits(dc.units.ordinal)
        .x(d3.scaleOrdinal()) //.domain(m_.places))
        .y(d3.scaleLinear().domain([0, 100000]))
        .elasticY(true)
        .yAxisPadding('20%')
        .renderHorizontalGridLines(true)
        .addFilterHandler(m_.addFilterHandlerSingleR)
        ;
    m_.chartAge.xAxis().tickFormat(m_.ageTickFormat);
    m_.chartAge.yAxis().ticks(5); //tickFormat(d3.format("s")) //Y軸の単位表記


    //===========================================================================
    // CHART 状態 barChart chartCond_init
    //===========================================================================
    let dimCond = ndx.dimension(function(d) {
        return d[D_LV];
    });
    let gpCond = dimCond.group().reduceSum(function(d) {
        return (d[D_LV] === DN_LV || d[D_LV] === '調査中') ? 0 : d[D_CNT] || 1;
    });

    let chartCondW = 620;
    if (IS_SP) chartCondW = window.innerWidth + 200;

    m_.chartCond
        .width(chartCondW)
        .height(chartSexH)
        .gap(6)
        .transitionDuration(750)
        .dimension(dimCond)
        .group(m_.groupRemoveEmpty(gpCond)) //xAxis0件は表示しない
        .addFilterHandler(m_.addFilterHandlerSingleR)
        .margins({ top: 0, right: 0, bottom: 70, left: 45 })
        .xUnits(dc.units.ordinal)
        .elasticX(true)
        .x(d3.scaleOrdinal())
        .y(d3.scaleLinear().domain([0, 100000]))
        .elasticY(true)
        .yAxisPadding('18%')
        .on('postRedraw', function(chart) {
            //m_.on_chart_postRedraw(chart);
        })
        // .on('preRender', function(chart){console.log('preRender')})
        // .on('pretransition', function(chart){
        //     //chart.width(chart.xUnitCount()*40);//chartCondMinWidth
        // })
        .on('renderlet', function(chart, filter) {
            _.delay(() => {
                $('#chart_cond rect.selected title').each((i, v) => {
                    let a = v.textContent.split(':');
                    let job = a[0].trim();
                    $("#chart_cond g.axis.x text").filter(function() { return $(this).text() === job }).addClass('sel');
                });
            }, 10);
        })
        // .on('postRender', function(chart, filter){console.log('postRender');})
        // .on('preRedraw', function(chart){console.log('postRender')})
        // .on('postRedraw', function(chart){console.log('postRedraw');})
        .on('filtered', function(chart, v) {
            m_.showFilterUi('#panel_cond', chart);
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        // .on('zoomed', function(chart, filter){console.log('zoomed');})
        //.mouseZoomable(true)
        .ordering(function(t) {
            return -t.value;
        })
        .renderHorizontalGridLines(true)
        .renderLabel(true)
        //.label(function(d) { return php_number_format(d.data.value);})
        .title(function(d) {//mouseホバーしたときの表示される文字
            return d.key + ' : ' + d.value + '名';
        })
        //.legend(dc.legend())
        ;
    if (m_.data_type) {
        m_.chartCond
            .colorAccessor(function(d) {
                let is1 = d.key.indexOf('無症状') !== -1;
                let is2 = d.key.indexOf('退院') !== -1;
                let is3 = d.key.indexOf('入院') !== -1;
                let is4 = d.key.indexOf('肺炎') !== -1;
                let is41 = d.key.indexOf('中等') !== -1;
                let is5 = d.key.indexOf('酸投') !== -1;
                let is6 = d.key.indexOf('重症') !== -1;
                let is7 = d.key.indexOf('死亡') !== -1;
                let lv;
                while (1) {
                    if (is7) { lv = 4; break; }
                    if (is5 || is6) { lv = 3; break; }
                    if (is4 || is3 || is41) { lv = 2; break; }
                    if (is2 || is1) { lv = 0; break; }
                    lv = 1; break;
                    break;
                }
                return lv;
            })
            .colors(function(i) {
                return COL_CND[i];
            });
    } else {
        m_.chartCond
            .colorAccessor(function(d, i) { return i; })
            .colors(function(d) {
                return colorbrewer.Set3[9][d % 9];
            });
    }

    m_.chartCond.xAxis().tickFormat((d) => { return d === DN_LV ? DN_LV_STR : d });
    m_.chartCond.yAxis().ticks(4);

    //===========================================================================
    // CHART 職業 barChart chartJob_init
    //===========================================================================
    m_.dimJob = ndx.dimension(function(d) {
        return d[D_JOB];
    });
    m_.gpJob = m_.dimJob.group().reduceSum(function(d) {
        return d[D_JOB] === DN_JOB ? 0 : d[D_CNT] || 1;
    });
    m_.gpJob = m_.groupRemoveEmpty(m_.gpJob);//xAxis0件は表示しない

    let j = _.uniq(_.map(m_.data, D_JOBCAT));
    m_.is_job_cate = !(j.length === 1 && j[0] === DN_JOBCAT);

    let chartJobW
    if (m_.is_job_cate) {
        m_.dimJobCat = ndx.dimension(function(d) {
            return m_.jobcates[d[D_JOBCAT]];
        });
        m_.gpJobCat = m_.dimJobCat.group().reduceSum(function(d) {
            return d[D_JOBCAT] === DN_JOBCAT ? 0 : d[D_CNT] || 1;
        });
        m_.gpJobCat = m_.groupRemoveEmpty(m_.gpJobCat);//xAxis0件は表示しない
        chartJobW = m_.gpJobCat.all().length * m_.config.cJob.barWidth;
    } else {
        chartJobW = m_.gpJob.all().length * m_.config.cJob.barWidth;
    }

    m_.chartJob
        .width(chartJobW)
        .height(200)
        .gap(4)
        .transitionDuration(m_.config.cJob.TD)
        .dimension(m_.is_job_cate ? m_.dimJobCat : m_.dimJob)
        .group(m_.is_job_cate ? m_.gpJobCat : m_.gpJob)
        .margins({ top: 0, right: 0, bottom: 100, left: 40 })
        .xUnits(dc.units.ordinal)
        .elasticX(true)
        .x(d3.scaleOrdinal())
        .y(d3.scaleLinear().domain([0, 100000]))
        .elasticY(true)
        .yAxisPadding('15%')
        .controlsUseVisibility(false)
        .on('postRedraw', function(chart) {
            m_.on_chart_postRedraw(chart);
        })
        .on('renderlet', function(chart) {
            _.delay(() => {
                $('#chart_job rect.selected title').each((i, v) => {
                    let a = v.textContent.split(':');//会社員: 2207名
                    let job = a[0].trim();
                    $("#chart_job g.axis.x text").filter(function() { return $(this).text() === job }).addClass('sel');
                });
            }, 10);
        })
        .on('pretransition', function(chart) {
            chart.transitionDuration(0);
            chart.width((chart.xUnitCount() + 1) * m_.config.cJob.barWidth);
        })
        .on('filtered', function(chart, v) {


            m_.showFilterUi('#panel_job', chart);
            m_.dateCntCreate();
            m_.on_chart_filtered(chart, v);
        })
        //.mouseZoomable(true)
        .ordering(function(t) {
            return -t.value;
        })
        .renderHorizontalGridLines(true)
        .renderLabel(true)
        .colorAccessor(function(d, i) { return i; })
        .colors(function(d) {
            return colorbrewer.Set3[9][d % 9];
        })
        .title(function(d) {//mouseホバーしたときの表示される文字
            return d.key + ': ' + d.value + '名';
        })
        .addFilterHandler(m_.addFilterHandlerSingle);
    ;
    m_.chartJob.xAxis().tickFormat((d) => { return d === DN_JOB ? DN_JOB_STR : d });
    m_.chartJob.yAxis().ticks(3);

    if (IS_SP) {
        $('#btn_search')
            .attr({ placeholder: 'フィルタ', title: '都道府県や市区町村、職業、状態、日付等の入力でグラフのフィルタリングが行えます。' })
            .on('focus', function(event) {
                event.preventDefault();
                $(this).css('width', '10em');
            })
            .on('blur', function(event) {
                event.preventDefault();
                $(this).css('width', '6em');
            });

    } else {
        $('#btn_search').attr({ placeholder: '都道府県や市区町村、職業、状態、日付でフィルタ', title: '都道府県や市区町村、職業、状態、日付等の入力でグラフのフィルタリングが行えます。\nショートカットキー\n　フォーカス : Ctrl+Shift+F\n　全クリア : Ctrl+Shift+L' });
    }

    m_.parseURLParams();

    if (!m_.chartAllFilterByKW_render) m_.renderAllChart();

    $('#btn_search').on('focus', function(e) {
        _.delay(() => $(this).select(), 7);
    });

    $('#div_date').scrollLeft(800);


    if (m_.data_type) {
        $('#chart_map_title').show();
        m_.chartCity.addFilterHandler(m_.addFilterHandlerSingleR);
        m_.chartCond.addFilterHandler(m_.addFilterHandlerSingleR)

        if (m_.get['tab']) {
            m_.tab.tabs("option", "activate").call(null, null, null, 'tabs_' + m_.get['tab']);
        }
    } else {
        m_.sel_tab = 'tabs_c';
        app.pnl.date.chart2.is_show = 0;
        app.pnl.city.is_show = 1;
        app.pnl.week.is_show = 1;

        $('#chart_map_title').hide();
        m_.chartCity.addFilterHandler(m_.addFilterHandlerSingle);
        m_.chartCond.addFilterHandler(m_.addFilterHandlerSingle);
    }
    //タイトル変更
    app.pnl.name.title = m_.data_hdr[D_PL1];
    app.pnl.city.title = m_.data_hdr[D_PL2];
    app.pnl.date.title = m_.data_type ? '<i class="fa fa-procedures"></i>感染者数' : m_.data_hdr[D_YMD];
    //$('#chart_sex .chart-title').text(m_.data_hdr[D_LV]);
    //$('#chart_age .chart-title').text(m_.data_hdr[D_LV]);
    $('#panel_cond .chart-title').text(m_.data_hdr[D_LV]);
    $('#panel_job .chart-title').text(m_.data_hdr[D_JOB]);
    if (m_.data_type) {
        $('#stack_type_con').prop('checked', true).trigger('change');
    } else {
        $('#stack_type_age').prop('checked', true).trigger('change');
    }

    if (!IS_SP) $('#btn_search').focus(); //.select();
}//initDc

const initTabs = () => {
    const TAB_NO = { 'c': 1, 'p': 2, 'pc': 3, 'd': 4, 'b': 5 };
    $('#chart_map_title').show();
    m_.tab = $('#chart_map').tabs({
        active: m_.get['tab'] ? TAB_NO[m_.get['tab']] : 1,
        activate: function(event, ui, sel_tab/*<=user_opt*/) {
            m_.sel_tab = sel_tab ? sel_tab : ui.newPanel.attr('id');
            switch (m_.sel_tab) {
                case 'tabs_c':
                    app.pnlShowsLoadStore(1);

                    m_.chartName.group(m_.gpName).render();
                    app.pnl.name.title = '都道府県';
                    app.pnl.date.chart2.is_show = 0;
                    app.pnl.date.chart2.title2 = '';
                    $('#world-map').hide();
                    $('#japan-map').show();
                    drawJapanMap();
                    let ft = m_.getFilterTxt();
                    ft[1] = ''; fth = ft.join(' ').trim();
                    $('.hdr_flt_map').text(fth === '' ? '' : fth + 'の状況');
                    $('#legend_n').show();
                    $('#legend_p').hide();
                    break;

                default:
                    // case 'tabs_p':
                    // case 'tabs_pc':
                    // case 'tabs_d':

                    app.pnlShowsLoadStore(0);
                    app.pnl.name.is_show = 1;
                    app.pnl.city.is_show = 0;
                    app.pnl.sex.is_show = 0;
                    app.pnl.week.is_show = 0;
                    app.pnl.age.is_show = 0;
                    app.pnl.cond.is_show = 0;
                    app.pnl.job.is_show = 0;

                    if (m_.sel_tab === 'tabs_b') {//病床
                        app.pnl.date.is_show = 0;
                        app.pnl.date.chart2.is_show = 0;

                        gpName2 = m_.dimName2.group().reduce((p, v) => m_.pref_tbl_last_m1[v[D3_PL1]].bed, (p, v) => m_.pref_tbl_last_m1[v[D3_PL1]].bed, (p, v) => 0);
                        m_.chartName.group(gpName2).render();
                    } else {
                        app.pnl.date.is_show = 1;
                        let gpName2;
                        switch (m_.sel_tab) {
                            case 'tabs_p':
                                m_.chartDate2Mode = DT_PAT;
                                gpName2 = m_.dimName2.group().reduce((p, v) => v[D3_CNT], (p, v) => v[D3_CNT], (p, v) => 0);
                                app.pnl.name.title = '都道府県(患者)';
                                app.pnl.date.chart2.title = '<i class="fa fa-procedures"></i>患者数(累計)';
                                app.pnl.date.chart2.title2 = '※入院治療等を要する患者数。(感染者数から無症状、退院、死亡者数を引いた値)';
                                break;
                            case 'tabs_pc':
                                m_.chartDate2Mode = DT_PCR;
                                gpName2 = m_.dimName2.group().reduceSum(function(d) { return d[D3_TYP] === DT_PCR ? d[D3_CNT] : 0; })
                                app.pnl.name.title = '都道府県(PCR)';
                                app.pnl.date.chart2.title = '<i class="fa fa-vials"></i>PCR検査人数';
                                app.pnl.date.chart2.title2 = '';
                                break;
                            case 'tabs_d':
                                m_.chartDate2Mode = DT_DEA;
                                gpName2 = m_.dimName2.group().reduceSum(function(d) { return d[D3_TYP] === DT_DEA ? d[D3_CNT] : 0; })
                                app.pnl.name.title = '都道府県(死亡)';
                                app.pnl.date.chart2.title = '死亡者数';
                                app.pnl.date.chart2.title2 = '';
                                break;
                        }
                        app.pnl.date.chart2.is_show = 1;
                        $('#div_date2').scrollLeft($('#div_date').scrollLeft());

                        m_.chartName.group(gpName2);

                        //市区町村フィルタのみの場合,都道府県フィルタないので表示より取得し設定
                        let flt = m_.chartName.filters();
                        let flta = m_.chartCity.filters();
                        if (flt.length === 0 && flta.length) {
                            let flt_from_city = [];
                            $('#chart_name g.row text').each(function(index, el) {
                                let ken_cnt = this.textContent.replace(/[　\s]+/, ',').split(','); //["福島県", "0"]
                                if (ken_cnt[1] != 0) flt_from_city.push(ken_cnt[0]);
                            });
                            m_.chartName.filter([flt_from_city]);
                        }

                        m_.chartName.render();
                        m_.composite2.render();
                    }

                    $('#world-map').hide();
                    $('#japan-map').show();
                    drawJapanMap();
                    $('.hdr_flt_map').text('～' + moment(m_.chartDate.xAxisMax()).format('MM/DD(ddd)') + 'の状況');
                    if (m_.sel_tab === 'tabs_pc') {
                        $('#legend_n').hide();
                        $('#legend_p').show();
                    } else {
                        $('#legend_n').show();
                        $('#legend_p').hide();
                    }
                    break;
                case 'tabs_w':
                    location.href = 'covid19-world.html';
                    break;
            }
            if (!IS_SP) $('#btn_search').focus().select();
        }
    });
}//initTabs

const initAutoComplete = () => {
    /**
     * class $.ui.autocomplete_ex extends $.ui.autocomplete
     */
    $.widget("ui.autocomplete_ex", $.ui.autocomplete, {
        //デフォルトオプション
        options: {
            itemMax: 16,
            minLength: 1,
            delay: 500,
            position: { my: "left top", at: "left bottom+12", collision: "none" },

            _usr: {
                AC_SPLIT_WD: /\s+/
            }
        },

        _create: function() {
            this._super();
            this.widget().menu("option", "items", "> :not(.ac_ex-cate)");
        },
        _init: function() {
            //var o=$(this.element);
            var _this = this;
            //一覧取得
            _this.source = _this.options.source = function(request, response) {
                let itemMax = this.option('itemMax');

                let kw;
                if (_this.options.user_opt.multiple) {
                    kw = request.term.split(_this.options._usr.AC_SPLIT_WD).pop();
                } else {
                    kw = request.term;
                }

                ////$.post('/api/get_pref_auto_src', request, function (d){response(d);},'json');
                //全部表示されるのでここでfilter&slice roma考慮
                if (!kw.length) return;

                response(_.filter(_this.options.user_opt.data, (d) => {
                    let al = kw[0].match(/[a-z]/i) ? 1 : 0;
                    let hira = ''
                    switch (d[0]) {
                        case '職業': hira = JOB_HIRA[d[1]] || ''; break;
                        case '状態': hira = LV_HIRA[d[1]] || ''; break;
                        default: hira = PREF_HIRA[d[0] === '' ? d[1] : d[0]] || ''; break;
                    }
                    return al ? (PREF_EN[d[0]] !== undefined && PREF_EN[d[0]].indexOf(kw) !== -1) || d[2].indexOf(kw) !== -1 : (d[0] + hira).indexOf(kw) !== -1 || d[1].indexOf(kw) !== -1;
                }).slice(0, itemMax));

            }

            _this.options.focus = function(event, ui) {
                if (_this.options.user_opt.multiple) {
                    let terms = this.value.trim().split(_this.options._usr.AC_SPLIT_WD)
                    terms.pop();
                    terms.push(ui.item[1]);
                    terms.push("");
                    this.value = terms.join(" ");
                } else {
                    this.value = ui.item[1];
                }
                return false;
            }

            //選択
            _this.options.select = function(event, ui) {
                event.preventDefault();
                if (_this.options.user_opt.select) ret = _this.options.user_opt.select(event, ui);
                //$('.ui-menu').hide();
                return ret;
            };

        },
        _renderMenu: function(ul, items) {
            let that = this, currentType = "";
            $.each(items, function(index, item) {
                let li;
                if (item[0] != currentType) {
                    let icon = '';
                    switch (item[0]) {
                        case '職業': icon = '<i class="fa fa-id-card-o" style="padding:4px"></i>'; break;
                        case '状態': icon = '<i class="fa fa-medkit" style="padding:4px"></i>'; break;
                        default:
                            let src = 'img/japan/' + PREF_EN[item[0]] + '.gif';
                            icon = '<img width="40" height="40" src="' + src + '" onerror="this.src=\'/' + IMG_NO + '\'" />';
                            break;
                    }
                    ul.append("<li class='ac_ex-cate'>" + icon + item[0] + "</li>");
                    currentType = item[0];
                }
                li = that._renderItemData(ul, item);
                //if (item[0]) {li.attr("aria-label", item[0] + " : " + item.label);}
            });
        },
        _renderItem: function(ul, row) {
            //var o = $(this.element);
            let v = this.element.val().trim();
            if (this.options.user_opt.multiple) v = _.last(v.split(this.options._usr.AC_SPLIT_WD));
            let is_cate_none = row[0] === '';
            let html = row[1];
            let bv = '<span class="ac_ex-kwd">' + v.toUpperCase() + '</span>';
            html = html.replace(new RegExp(v, 'gi'), bv);
            if (is_cate_none) {
                let src = 'img/japan/' + PREF_EN[row[1]] + '.gif';
                icon = '<img width="40" height="40" src="' + src + '" onerror="this.src=\'/' + IMG_NO + '\'" />';
                html = icon + html;
            }
            return $("<li class='ac_ex-item'>").append($('<div>').html(html + '(' + row[3] + ')')).appendTo(ul);
        }
    });
}

var map;

//vectorMap
const drawJapanMap = () => {
    $("#japan-map").empty();

    let series_scale = m_.sel_tab === 'tabs_pc' ? { "0.4%以上": "#8c0a00", "0.2%以上": "#ea5432", "0.1%以上": "#ff781d", "0.05%以上": "#ff9d57", "0.01%以上": "#ffceab", "0%以上": "#ffffe0", "0%": "#dadada", "選択中": "#ffffff" } : { "1000人以上": "#8c0a00", "500人以上": "#ea5432", "100人以上": "#ff781d", "50人以上": "#ff9d57", "10人以上": "#ffceab", "1人以上": "#f5deb3", "0人": "#dadada", "選択中": "#ffffff" };

    let pref_cnt_tbl = m_.getPrefCntTbl();
    let colors = {};
    _.keys(m_.pref_tbl_last_m1).forEach(function(pre) {
        let col, v = pref_cnt_tbl[pre];
        while (1) {
            if (v > 999) { col = MAP_COL_TBL[0][1]; break; }
            if (v > 499) { col = MAP_COL_TBL[1][1]; break; }
            if (v > 99) { col = MAP_COL_TBL[2][1]; break; }
            if (v > 49) { col = MAP_COL_TBL[3][1]; break; }
            if (v > 9) { col = MAP_COL_TBL[4][1]; break; }
            if (v > 0) { col = MAP_COL_TBL[5][1]; break; }
            col = MAP_COL_TBL[6][1];
            break;
        }
        colors[_.capitalize(PREF_EN[pre])] = col;
    });

    //param: https://jvectormap.com/documentation/javascript-api/jvm-dataseries/
    map = new jvm.Map({
        container: $('#japan-map'),
        map: 'jp_merc',
        panOnDrag: !IS_SP,
        focusOn: {
            x: 0.45, y: 0.48,
            scale: !IS_SP ? 1.7 : 1,
            animate: false
        },
        backgroundColor: null,
        zoomOnScroll: true,
        zoomOnScrollSpeed: 1, //def:3
        zoomStep: 1.4,
        regionsSelectable: true,
        //markersSelectable: true,
        hoverOpacity: 0.7,
        regionStyle: {

            selected: {
                //fill: '#0000FF',
                //'fill-opacity':0,
                //'fill-rule':'evenodd',
                stroke: '#1a75ff',
                'stroke-width': 3
            }
        },
        series: {
            //case linearColor
            // regions: [{
            //   values: sample_dataJ,
            //   scale: ["#c8eeff", "#0071a4"],//blue
            //   //normalizeFunction: "polynomial" //linear|polynomial
            // }],
            //case OriginalColor
            regions: [{
                //values: sample_dataJ,
                attribute: 'fill'
            }
                //legend
                , {
                scale: series_scale,
                attribute: 'fill',
                //values: {},
                legend: {
                    //horizontal: true,
                    vertical: true
                    //title: 'Color'
                }
            }

            ]

        },

        onRegionTipShow:
            !IS_SP ? (e, el, code) => { //hover
                let pre_name = map.mapData.paths[code].name;
                let html = m_.getChartnameTitle(pre_name, '<BR>');
                el.html(html);
            } : false,

        onRegionSelected: (/*e,name,is_on*/) => {
            if (m_.is_filter_region_sel) return;
            //選択を取得
            let xs = map.getSelectedRegions();
            let a = xs.map(x => map.mapData.paths[x].name);
            //名前チャートフィルタ
            m_.chartNameFilters(a);
            m_.is_drawJapanMap = 0;

            if (m_.chartName.filters().length && $('#ui-datepicker-div').is(':visible')) {
                m_.datePick.datepicker('hide');
                m_.datePick.datepicker('show');
            }
        }
        //onMarkerTipShow:(e, el, code) =>{},
        //onMarkerClick: (e, code) => {}
    });
    map.series.regions[0].setValues(colors);
    $('.jvectormap-legend-tick-sample:last').css({ 'border': '3px solid #1a75ff' });
    // d3.selectAll("path").call(mapTip);
    // d3.selectAll("path").on('mouseover', mapTip.show).on('mouseout', mapTip.hide);

    m_.mapSetSelectedRegions();
}


$(document).ready(function() {

    initTabs();

    $('.btn_clear_all').on('click', function(e) {
        e.preventDefault();

        $('#btn_search').val('');
        $('.filter_txt').val('');
        $('.btn_brush').trigger('my_update', 1);//off

        m_.dimJob.filterAll();
        dc.filterAll('chartGroup');

        m_.is_drawJapanMap = 1;
        m_.renderAllChart();

        document.querySelector('#div_name').scrollTop = 0;
        document.querySelector('#div_city').scrollTop = 0;

        if ($('#ui-datepicker-div').is(':visible')) m_.datePick.datepicker('show');
        if (!IS_SP) $('#btn_search').focus();
    });

    $('#btn_search')
        .on('keyup btn_search_update', function(e) {
            e.preventDefault();
            if (e.type === 'btn_search_update' || e.keyCode === $.ui.keyCode.ENTER) {
                //TODO:multiple
                let t = this.value.trim();
                if (t !== '') {
                    m_.chartAllFilterByKW_render = m_.chartAllFilterByKW(t);
                    _.delay(() => $('.ui-menu').hide(), 200);
                }
            }
        });

    m_.datePick = $("#btn_date").val(moment().format('YYYY/MM/DD')).datepicker({
        showOn: "button",
        buttonText: '<i class="ui-icon ui-icon-calendar-day ui-icon-big"></i>',
        //showAnim:'fadeIn',
        //showOptions: {effect: "show",duration:3000,easing:'easeOutQuart'},
        //duration: 200,
        showOtherMonths: true,
        numberOfMonths: IS_SP ? [1, 3] : [2, 4],
        showCurrentAtPos: IS_SP ? 2 : 4 + 3,
        stepMonths: IS_SP ? 3 : 4,
        position: { //左
            of: $(window)
            , my: "center"
            , at: "center"
            , collision: 'fit fit'
        },
        onSelect: function(dateText, inst) {
            $('#btn_search').val(dateText).trigger('btn_search_update');
        },
        beforeShowDay: function(date) {
            let ret = [];
            let y = date.getFullYear();
            let m = printf02d(date.getMonth() + 1);
            let d = printf02d(date.getDate());
            let ymd = y + m + d;

            ret[0] = 1;//is_selectable

            //休日であれば休日のスタイルにする
            ret[1] = ($.datepicker.regional['ja'] && $.datepicker.regional["ja"].holidays[ymd] !== undefined) ? 'holiday' : '';
            let n = m_.dateCnt[ymd] || 0;
            while (1) {
                if (n > 999) { ret[1] += ' c1000'; break; }
                if (n > 499) { ret[1] += ' c500'; break; }
                if (n > 99) { ret[1] += ' c100'; break; }
                if (n > 49) { ret[1] += ' c50'; break; }
                if (n > 9) { ret[1] += ' c10'; break; }
                if (n > 0) { ret[1] += ' c1'; break; }
                break;
            }
            if (n !== 0) { ret[2] = m_.dateCnt[ymd] + '名'; } //tooltip
            return ret;
        },
        beforeShow: function(input, inst) {
            m_.dateCntCreate();
            //if(!IS_SP)
            {
                var calendar = inst.dpDiv;
                setTimeout(function() {
                    calendar.position(
                        IS_SP ?
                            { my: 'left top', at: 'left bottom', collision: 'fit none', of: $('#btn_search') } :
                            { my: 'left bottom', at: 'right+280 bottom', collision: 'fit fit', of: input }
                    );
                }, !IS_SP ? 5 : 100);
            }
        }
    });
    $('.ui-datepicker-trigger').addClass('ui-button ui-corner-all ui-widget');

    $('#reset_btn_date').on('click', function(event) {
        event.preventDefault();
        m_.composite.filterAll();
        m_.chartDate.filterAll();
        m_.renderAllChart();
    });

    $('.btn_close').button();

    $('.btn_brush').button().on('click', function(event) {
        event.preventDefault();
        let b = m_.composite.brushOn();
        if (b) {
            $('#reset_btn_date').trigger('click');
            $('#panel_date .filter_txt_diff').text('');
        } else {
            let f = m_.composite.filters();
            if (f.length) {//選択がある場合,最初~最後+1を選択
                let fsel = [[[f[0], moment(_.last(f)).add(1, 'days').toDate()]]];
                m_.composite.filter(fsel);
                m_.chartDate.filter(fsel);
            }
        }
        $(this).trigger('my_update', b);
    })
        .on('my_update', function(event, is_off) {
            $(this).removeClass('btn_off btn_on').addClass(is_off ? 'btn_off' : 'btn_on');
            m_.composite.brushOn(!is_off).render();
        });

    $('[name="stack_type"]').on('change', function(event) {
        m_.sel_stack = $(this).val();
        switch (m_.sel_stack) {
            case 'con': m_.dateStakShow(0); break;
            case 'pre': m_.dateStakShow(1); break;
            case 'age': m_.dateStakShow(2); break;
        }
        m_.composite.render();
    });

    if (!IS_SP) {
        $('.drag').draggable({
            snap: true
            , snapTolerance: IS_SP ? 80 : 20
            , cursor: "move"
            , handle: ".chart-title"
        });
    }
    //$('#chart_map').resizable();

    $('#btn_download_csv').button().on('click', function(event) {
        event.preventDefault();

        let dt = m_.ndx.allFiltered();//order by pref
        //let dt=_.sortBy(m_.ndx.allFiltered(),d=>d[D_YMD]);//order by date
        let csv = m_.data_hdr.join(',') + '\n';
        let ni = m_.data_hdr.findIndex(d => d === '年齢')
        let si = m_.data_hdr.findIndex(d => d === '性別')

        for (var i = 0; i < dt.length; i++) {
            //          0    1   2   3         4       5     6        7:jobcates 8:cnt(optional)
            //["2020-03-27", 2, 60, "退院", "東京都", "都内", "会社員", 0, 10]
            for (var j = 0; j < dt[i].length; j++) {
                csv += (j === 0 ? '' : ',');
                while (1) {
                    if (j === ni) { csv += dt[i][j] === DN_AGE ? DN_AGE_STR : dt[i][1]; break; }
                    if (j === si) { csv += SEX_LABEL[dt[i][j]]; break; }
                    csv += dt[i][j];
                    break;
                }
            }
            if (dt[i].length === 8) csv += ',1';
            csv += '\n';
        }

        let flt_name = $('.hdr_flt').text().replace('の状況', '');
        const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
        const filename = (m_.data_type ? "covid19" : "data") + " - [" + flt_name + "].csv";
        const blob = new Blob([bom, csv], { type: "text/csv" });

        //IE10/11用
        if (window.navigator.msSaveBlob) {
            window.navigator.msSaveBlob(blob, filename);
            //その他ブラウザ
        } else {
            const url = (window.URL || window.webkitURL).createObjectURL(blob);
            const download = document.createElement("a");
            download.href = url;
            download.download = filename;
            download.click();
            (window.URL || window.webkitURL).revokeObjectURL(url);//開放
        }
    });

    //スクロール同期
    if (IS_SP) {
        let wL = '#div_date';
        let wR = '#div_date2';
        $(wL).on('scroll', function(event) {//wL wR sync scroll
            let wl = $(wL);
            $(wR).scrollLeft(wl.scrollLeft());
        });
        $(wR).on('scroll', function(event) {//wL wR sync scroll
            let wr = $(wR);
            $(wL).scrollLeft(wr.scrollLeft());
        });
    }

    $('.filter_txt').on('focus', function(event) {
        event.preventDefault();
        $(this).select();
    });
});


$(document).ready(function() {
    $('#btn_ana').on('click', function(event) {
        event.preventDefault();
        $('#ana_diff_ls').hide().fadeIn();
    });
    $('.wopen').button().on('click', function(event) {
        event.preventDefault();
        let o = $(this);
        let w2 = parseInt(screen.width / 2) - 20;
        const top = 50;//for parent title bar
        if (o.find('span').hasClass('ui-icon-arrow-2-e-w')) {
            let td = o.closest('td');
            let a = td.prev().find('a');
            let b = td.next().find('a');
            let wL = window.open(a.attr('href'), 1, 'top=' + top + ',left=0,height=' + (screen.height - top * 4) + ',width=' + w2);
            let wR = window.open(b.attr('href'), 2, 'top=' + top + ',left=' + (w2 + 20) + ',height=' + (screen.height - top * 4) + ',width=' + w2);
            $(wL).on('scroll', function(event) {//wL wR sync scroll
                let wl = $(wL);
                $(wR).scrollTop(wl.scrollTop()).scrollLeft(wl.scrollLeft());
            });
            $(wR).on('scroll', function(event) {//wL wR sync scroll
                let wr = $(wR);
                $(wL).scrollTop(wr.scrollTop()).scrollLeft(wr.scrollLeft());
            });
        } else if (o.find('span').hasClass('ui-icon-arrow-2-n-s')) {
            let idx = o.closest('td').index();
            let tr = o.closest('tr');
            let a = tr.prev().find('td').eq(idx).find('a');
            let b = tr.next().find('td').eq(idx).find('a');
            let wL = window.open(a.attr('href'), 1, 'top=' + top + ',left=0,height=' + (screen.height - top * 4) + ',width=' + w2);
            let wR = window.open(b.attr('href'), 2, 'top=' + top + ',left=' + (w2 + 20) + ',height=' + (screen.height - top * 4) + ',width=' + w2);
            $(wL).on('scroll', function(event) {//wL wR sync scroll
                let wl = $(wL);
                $(wR).scrollTop(wl.scrollTop()).scrollLeft(wl.scrollLeft());
            });
            $(wR).on('scroll', function(event) {//wL wR sync scroll
                let wr = $(wR);
                $(wL).scrollTop(wr.scrollTop()).scrollLeft(wr.scrollLeft());
            });
        } else {
            let idx = o.closest('td').index();
            window.open(o.attr('href'), (idx === 0 ? 1 : 2), 'left=' + (idx === 0 ? 0 : w2 + 20) + ',top=' + top + ',height=' + (screen.height - top * 4) + ',width=' + w2);
        }

    });


});

//ShortCutKey
$(document)
    .keyup(function(e) {
        switch (e.keyCode) {
            // case $.ui.keyCode.LEFT:
            // case $.ui.keyCode.RIGHT:
            //      break;
            case 76://Ctrl+Shift+L
                if (e.ctrlKey && e.shiftKey) {
                    if (document.activeElement && document.activeElement.id === 'tbl_flt') {
                        $(id).val('').trigger('change');
                    } else {
                        $('.btn_clear_all').trigger('click');
                    }
                }
                break;
            case 70://Ctrl+Shift+F
                if (e.ctrlKey && e.shiftKey) {
                    let id = document.activeElement && document.activeElement.id === 'tbl_flt' ? '#tbl_flt' : '#btn_search'
                    $(id).focus().select();
                }
                break;
        }
    });


$('body')
    //titleをHTMLでpopupさせたい時
    .tooltip({
        items: "[tt_title],.tt_img",
        show: { effect: "show", delay: 500 },
        hide: 0,
        content: function() {
            let o = $(this);
            if (o.is('.tt_img')) {
                return '<img src="' + o.attr('src') + '">';
            }
            return o.attr('tt_title');
        }
    });


//===========================================================================
//  [PREF_SPARKLINE CODE]
//===========================================================================
const PREF_DATA = [
    ['https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000121431_00086.html', 'ホーム > 政策について > 分野別の政策一覧 > 健康・医療 > 健康 > 感染症情報 > 新型コロナウイルス感染症について > 新型コロナウイルス感染症に関する報道発表資 - 厚生労働省'],//世界
    ['https://signate.jp/covid-19-challenge', '企業（SIGNATE COVID-19 Dataset）', ''],//日本
    [],//北海道・東北
    ['https://www.harp.lg.jp/opendata/dataset/1369.html', 'HOME›データカタログ›新型コロナウイルス感染症に関するデータ【北海道】 - 北海道'],//北海道
    ['https://opendata.pref.aomori.lg.jp/dataset/1531.html', ''],//青森県
    ['https://www.pref.iwate.jp/kurashikankyou/iryou/covid19/index.html', ''],//岩手県
    ['https://www.pref.miyagi.jp/site/covid-19/02.html', ''],//宮城県
    ['https://www.pref.akita.lg.jp/pages/archive/47957', ''],//秋田県
    ['https://www.pref.yamagata.jp/ou/kenkofukushi/090001/20130425/shingata_corona.html', 'ホーム > 組織で探す > 健康福祉部 > 健康福祉企画課（薬務・感染症対策室） > 感染症対策担当 > 新型コロナウイルス感染症（COVID-19）について'],//山形県
    ['https://www.pref.fukushima.lg.jp/sec/21045c/covid19-opendata.html', ''],//福島県
    [],//関東
    ['https://www.pref.ibaraki.jp/hokenfukushi/yobo/kiki/yobo/kansen/idwr/information/other/documents/20200130-corona.html', ''],//茨城県
    ['http://www.pref.tochigi.lg.jp/e04/welfare/hoken-eisei/kansen/hp/coronakensahasseijyoukyou.html', ''],//栃木県
    ['https://www.pref.gunma.jp/07/z87g_00016.html', 'トップページ 県政情報 広聴・広報 (新型コロナウイルス感染症) 新型コロナウイルス感染症患者の発生状況 - 群馬県'],//群馬県
    ['https://www.pref.saitama.lg.jp/a0701/covid19/jokyo.html', '総合トップ > 健康・福祉 > 医療 > 感染症対策 > 感染確認状況や関連情報 > 新型コロナウイルス感染症の県内の発生状況 - 埼玉県'],//埼玉県
    ['https://covid19.civictech.chiba.jp/', '新型コロナウイルス感染症対策サイト - 千葉県'],//千葉県
    ['https://stopcovid19.metro.tokyo.lg.jp/', '新型コロナウイルス感染症対策サイト - 東京都'],//東京都
    ['http://www.pref.kanagawa.jp/docs/t3u/dst/s0060925.html', 'ホーム > 健康・福祉・子育て > 医療 > 感染症・病気 > 感染症・病気の随時提供情報 > 新型コロナウイルス感染症について > 新型コロナウイルス感染症対策　陽性患者数及び陽性患者の属性データ - 神奈川県'],//神奈川県
    [],//中部
    ['https://www.pref.niigata.lg.jp/site/shingata-corona/256362836.html', 'トップページ > 分類でさがす > くらし・安全・環境 > 防災 > 新型コロナウイルス感染症 > 県内の発生状況'],//新潟県
    ['http://www.pref.toyama.jp/cms_sec/1205/kj00021798.html', 'ホーム > 組織別案内 > 厚生部 健康課 > 新型コロナウイルス感染症の県内の患者等発生状況 - 富山県'],//富山県
    ['https://stopcovid19.pref.ishikawa.jp/', '新型コロナウイルス感染症対策サイト - 石川県'],//石川県
    ['https://covid19-fukui.com/', '新型コロナウイルス感染症対策サイト - 福井県'],//福井県
    ['https://stopcovid19.yamanashi.dev/', '新型コロナウイルス感染症対策サイト - 山梨県'],//山梨県
    ['https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html', ''],//長野県
    ['https://www.pref.gifu.lg.jp/kinkyu-juyo-joho/shingata_corona_kansendoko.html#hassei', 'トップ >  緊急・重要情報 >  新型コロナウイルス感染症【県内の感染動向】について - 岐阜県'],//岐阜県
    ['https://opendata.pref.shizuoka.jp/dataset/8167.html', ''],//静岡県
    ['https://www.pref.aichi.jp/site/covid19-aichi/kansensya-kensa.html', 'ホーム > 健康・福祉 > 健康・医療 > 健康管理 > 愛知県新型コロナウイルス感染症対策サイト > 愛知県内の感染者・遺伝子検査件数 - 愛知県'],//愛知県
    [],//近畿
    ['https://www.pref.mie.lg.jp/YAKUMUS/HP/m0068000066_00002.htm', 'トップページ > 健康・福祉・子ども > 医療 > 感染症 > 三重県新型コロナウイルス感染症特設サイト > 新型コロナウイルス感染症の発生状況'],//三重県
    ['https://www.pref.shiga.lg.jp/ippan/kenkouiryouhukushi/yakuzi/309252.html', ''],//滋賀県
    ['https://www.pref.kyoto.jp/kentai/news/novelcoronavirus.html#F', 'ホーム > 健康・福祉・人権 > 健康・医療 > 京都府の健康対策 > 感染症緊急情報 > 新型コロナウイルス感染症に関連する情報について - 京都府'],//京都府
    ['http://www.pref.osaka.lg.jp/iryo/osakakansensho/corona.html', 'ホーム > 健康・医療 > 医療・医療費 > 大阪府感染症対策情報 > 新型コロナウイルス感染症について'],//大阪府
    ['https://web.pref.hyogo.lg.jp/kk03/corona_hasseijyokyo.html', 'ホーム > 暮らし・教育 > 健康・福祉 > 感染症 > 新型コロナウイルスに感染した患者の発生状況 - 兵庫県'],//兵庫県
    ['http://www.pref.nara.jp/55168.htm', ''],//奈良県
    ['https://www.pref.wakayama.lg.jp/prefg/000200/covid19.html', ''],//和歌山県
    [],//中国
    ['https://www.pref.tottori.lg.jp/item/1207285.htm#itemid1207285', ''],//鳥取県
    ['https://www.pref.shimane.lg.jp/medical/yakuji/kansensyo/other/topics/bukan2020.html', ''],//島根県
    ['http://www.okayama-opendata.jp/opendata/ga120PreAction.action?keyTitle=d9c4776db7f09fff161953a2aaf03b80a9abad48&datasetId=e6b3c1d2-2f1f-4735-b36e-e45d36d94761', ''],//岡山県
    ['https://www.pref.hiroshima.lg.jp/soshiki/57/bukan-coronavirus.html', 'トップページ 組織でさがす 健康福祉局 健康対策課 コロナウイルス感染症について - 広島県'],//広島県
    ['https://yamaguchi-opendata.jp/ckan/dataset/f6e5cff9-ae43-4cd9-a398-085187277edf', ''],//山口県
    [],//四国
    ['https://covid19-tokushima.netlify.app/', '徳島県新型コロナウイルス感染症 非公式対策サイト'],//徳島県
    ['https://www.mhlw.go.jp/stf/newpage_10264.html', ''],//香川県
    ['https://www.pref.ehime.jp/opendata-catalog/dataset/2174.html', ''],//愛媛県
    ['http://www.pref.kochi.lg.jp/soshiki/111301/2020041300141.html', ''],//高知県
    [],//九州・沖縄
    ['https://www.pref.fukuoka.lg.jp/life/3/21/79/', 'ホーム > 感染症情報 > 福岡県内での発生状況 - 福岡県庁'],//福岡県
    ['https://www.pref.saga.lg.jp/kiji00373220/index.html', 'ホーム > 分類から探す > 健康・福祉 > 健康づくり > 感染症・インフルエンザ予防 >新型コロナウイルス感染症について - 佐賀県'],//佐賀県
    ['https://www.pref.nagasaki.jp/bunrui/hukushi-hoken/kansensho/corona_nagasaki/corona_nagasaki_shousai/#hassei', 'ホーム > 分類で探す > 福祉・保健 > 感染症 > 新型コロナウイルス感染症について> 新型コロナウイルス感染症について（詳細情報）- 長崎県'],//長崎県
    ['https://www.pref.kumamoto.jp/kiji_32300.html', 'ホーム  ＞  分類から探す  ＞  健康・福祉  ＞  感染症・疾病対策  ＞  感染症情報  ＞  新型コロナウイルス感染症の県内の感染者発生状況 - 熊本県'],//熊本県
    ['http://www.pref.oita.jp/site/covid19-oita/covid19-pcr.html', 'トップページ > 新型コロナウイルスに関するお知らせ > 大分県におけるPCR検査実施人数及び患者状況 - 大分県'],//大分県
    ['https://www.pref.miyazaki.lg.jp/kenko/hoken/kansensho/covid19/hassei.html', 'トップ > 健康・福祉 > 保健・健康づくり > 感染症対策 > 新型コロナウイルス感染症患者の発生状況 - 宮崎県'],//宮崎県
    ['https://www.pref.kagoshima.jp/ae06/kenko-fukushi/kenko-iryo/kansen/kansensho/coronavirus.html#kokunai', 'ホーム > 健康・福祉 > 健康・医療 > 新型コロナウイルス感染症 > 新型コロナウイルス感染症に関する情報 - 鹿児島県'],//鹿児島県
    ['https://www.pref.okinawa.jp/site/hoken/chiikihoken/kekkaku/covid19_hasseijoukyou.html', 'ホーム > 組織で探す > 保健医療部 地域保健課 > 感染症対策業務について（結核感染症班） > 沖縄県における新型コロナウイルス感染症発生状況 - 沖縄県']//沖縄県
];
const JAPAN_REGIONS = { "北海道・東北": ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県"], "関東": ["茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県"], "中部": ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県"], "近畿": ["三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"], "中国": ["鳥取県", "島根県", "岡山県", "広島県", "山口県"], "四国": ["徳島県", "香川県", "愛媛県", "高知県"], "九州・沖縄": ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] };
const getJapanResionData = (reg_str, type) => {
    let n = null;
    switch (reg_str) {
        case '世界': n = ''; break;
        case '日本': n = _.sumBy(_.values(m_.pref_tbl_last_m1), type); break;
        default:
            let p = JAPAN_REGIONS[reg_str];
            if (p) {
                n = 0;
                _.map(m_.pref_tbl_last_m1, (v, k) => { if (p.includes(k)) n += v[type]; });
            }
            break;
    }
    return n;
}

const initPrefTableData = () => {
    let max = 0;
    for (var i = 0; i < m_.spk.bar_stacks.length; i++) {
        let last = _.last(m_.spk.line[0][i]);
        if (max < last) max = last;
    }
    const p_max = m_.pref_tbl_last_m1['東京都'].n + 100000;//_.max() ...

    let tbl = $('#tbl_pref');
    for (var i = 0; i < m_.spk.bar_stacks.length; i++) {
        let v = _.last(m_.spk.line[0][i]);//0:carriers
        let v_prev = m_.spk.line[0][i][m_.spk.line[0][i].length - 2];//0:carriers
        let new_patient = _.sum(_.last(m_.spk.bar_stacks[i]));
        let per = parseInt(100 * v / max)
        if (per === 0 && v !== 0) per = 1;

        let a = tbl.find('#spn' + i + ' td:eq(0)');
        let pref_name = a.text();
        let spn = tbl.find('#spn' + i);

        let pop = m_.pref_tbl_last_m1[pref_name].n;
        let p_per = parseInt(100 * pop / p_max);
        let c_per = _.round(100 * v / pop, 3); let c_per2 = parseInt((c_per * 10) * p_per);
        spn.find('td:eq(1)')//人口/感染率
            .text(pop)
            .attr('title', '感染率(感染者数/人口): ' + c_per + '%')
            .css({ 'color': '#202020', 'vertical-align': 'top' })
            .css({ 'background': 'linear-gradient(to right, ' + COL_CND_C + ' , ' + COL_CND_C + ' ' + c_per2 + '%,#008080 ' + c_per2 + '%, #008080 ' + p_per + '%,#FFFFFF ' + p_per + '%, #FFFFFF) center center / 100% 30% no-repeat' })
            ;

        spn.find('td:eq(2)')//感染者
            .text(v)
            .css({ 'color': '#202020', 'vertical-align': 'top' })
            .css({ 'background': 'linear-gradient(to right, #1f77b4 ' + per + '%, #FFFFFF ' + per + '% ' + (100 - per) + '%) center center / 100% 30% no-repeat' });

        let ymd = moment(m_.spk.max_ymd).subtract(1, 'days').format('YYYY/MM/DD(ddd)');
        spn.find('td:eq(3)').text(new_patient);//新規
        tbl.find('thead th:eq(3)').attr('title', '感染者数 前日比(' + ymd + '時点)');

        let p = m_.pref_tbl_last_m1[pref_name];
        let deaths = p ? p.deaths : 0;
        let discharged = p ? p.discharged : 0;
        let patient = v - discharged - deaths;//累計 患者数 = 感染者数-退院者数-死亡者数

        let p_prev = m_.pref_tbl_last_m2[pref_name];
        let deaths_prev = p_prev ? p_prev.deaths : 0;
        let discharged_prev = p_prev ? p_prev.discharged : 0;
        let patient_prev = v_prev - discharged_prev - deaths_prev;//累計 患者数 = 感染者数-退院者数-死亡者数

        spn.find('td:eq(4)').text(deaths);
        spn.find('td:eq(5)').text(discharged);
        spn.find('td:eq(6)').text(patient);
        spn.find('td:eq(7)').text(patient - patient_prev);
        tbl.find('thead th:eq(7)').attr('title', '患者数 前日比(' + ymd + '時点)');
    }
}

const drawPrefSparkline = (mode, bar_stacks) => {
    let tbl = $('#tbl_pref');
    //tbl.find('canvas').remove();

    let barWidth = IS_SP ? 3 : 7;
    let barHeight = IS_SP ? 50 : 80;
    let td_idx = $('#tbl_pref tr:eq(3) td').length - 1;//DataTableカラム非表示考慮

    for (var i = 0; i < bar_stacks.length; i++) {
        let spn = tbl.find('#spn' + i);

        let v = _.last(m_.spk.line[0][i]);//0:carriers
        let a = tbl.find('#spn' + i + ' td:eq(0)');
        let pref_name = a.text();
        let o = spn.find('td:eq(' + td_idx + ')');

        //Stacked_Bar
        o.sparkline(bar_stacks[i], {
            type: 'bar', barColor: '#1f77b4'
            , barWidth: barWidth
            , height: barHeight
            , stackedBarColor: COL_CND
            //,chartRangeMax:100 // Stacked bar charts ignoring `chartRangeMax` option . https://github.com/gwatts/jquery.sparkline/issues/185
            , useropt: [pref_name, i]
            , tooltipFormatter(sparkline, options, f) {
                let pref_name = options.userOptions.useropt[0];
                let ii = options.userOptions.useropt[1];
                let ymd = moment(m_.spk.max_ymd).subtract(bar_stacks[0].length - (f[0].offset + 1), 'days').format('M/D(ddd)');
                return ymd + ' - ' + pref_name + '<BR>─【新規】─────<BR>' +
                    (f[4].value == 0 ? '' : '<span class="square" style="background:' + f[4].color + '"></span>' + CND_LV_A + ': ' + f[4].value + '名<BR>') +
                    (f[3].value == 0 ? '' : '<span class="square" style="background:' + f[3].color + '"></span>' + CND_LV_B + ': ' + f[3].value + '名<BR>') +
                    (f[2].value == 0 ? '' : '<span class="square" style="background:' + f[2].color + '"></span>' + CND_LV_C + ': ' + f[2].value + '名<BR>') +
                    (f[1].value == 0 ? '' : '<span class="square" style="background:' + f[1].color + '"></span>' + CND_LV_D + ': ' + f[1].value + '名<BR>') +
                    (f[0].value == 0 ? '' : '<span class="square" style="background:' + f[0].color + '"></span>' + CND_LV_E + ': ' + f[0].value + '名<BR>') +
                    '計: ' + (f[4].value + f[3].value + f[2].value + f[1].value + f[0].value) + '名<BR>'
                    ;
            }
        });

        if (mode !== 1) {
            //Line:10万人中の新規感染者数
            o.sparkline(m_.spk.out_of_100k[i], {
                composite: true
                , lineColor: '#ffa07a', fillColor: false
                , maxSpotColor: ''
                // ,minSpotColor:'#FF0000'
                , spotRadius: IS_SP ? 1.5 : 2
                //,valueSpots:{':0.49': 'green', '0.5:': 'red'}
                , valueSpots: { '0.5:': 'red' }
                , chartRangeMax: 1
                , lineWidth: 1.5
                // ,normalRangeMin: 0
                // ,normalRangeMax: 0.5
                // ,normalRangeColor: 'rgba(0,0,0,0.1)'
                , tooltipFormatter(sparkline, options, f) {
                    let style = f.y >= 0.5 ? 'font-weight:bold;color:#FF0000;' : '';
                    return '<span class="ui-icon ui-icon-chart-line" style="background:#FFF;color:' + f.color + '"></span>10万人中 <span style="' + style + '">' + f.y + '</span>名<BR>─【累計】─────<BR>';
                }
            });
        }

        //0:Red_Line:感染累計
        o.sparkline(m_.spk.line[0][i], {
            composite: true
            , chartRangeMax: v + 5
            , lineColor: 'red'
            , fillColor: 'rgba(255,0,0,0.1)'
            , useropt: [i]
            , tooltipFormatter(sparkline, options, f) {
                let pref_no = options.userOptions.useropt[0];
                let carr = m_.spk.line[0][pref_no][f.x];// 感染累計
                let _1 = m_.spk.line[1][pref_no][f.x];   // 感染累計-死亡
                //let _2 =m_.spk.line[2][pref_no][f.x];  // 感染累計-(死亡＋退院)=患者数
                let death = carr - _1;
                //let population=m_.pref_tbl_last_m1[pref_name].n; 
                //let per=_.round(100*death/population,3)+'%'; //死亡/人口
                return '感染者: ' + php_number_format(f.y) + '名<BR>' +
                    '<span class="ui-icon ui-icon-chart-line" style="background:#FFF;color:' + f.color + '"></span>死亡: ' + php_number_format(death) + '名<BR>';

            }
        });

        //1:Green_Line:感染累計-死亡
        o.sparkline(m_.spk.line[1][i], {
            composite: true
            , chartRangeMax: v + 5
            , lineColor: COL_CND_A
            , fillColor: 'rgba(0,255,32,0.2)'
            , useropt: [i]
            , tooltipFormatter(sparkline, options, f) {
                let pref_no = options.userOptions.useropt[0];
                //let carr =m_.spk.line[0][pref_no][f.x];// 感染累計
                let _1 = m_.spk.line[1][pref_no][f.x];   // 感染累計-死亡
                let _2 = m_.spk.line[2][pref_no][f.x];  // 感染累計-(死亡＋退院)=患者数
                return '<span class="ui-icon ui-icon-chart-line" style="background:#FFF;color:' + f.color + '"></span>退院: ' + php_number_format(_1 - _2) + '名<BR>';
            }
        });

        //2:Blue_Line:感染累計-(死亡＋退院)=患者数
        o.sparkline(m_.spk.line[2][i], {
            composite: true
            , chartRangeMax: v + 5
            , lineColor: 'blue', fillColor: 'rgba(0,0,255,0.18)'
            , useropt: [i]
            , tooltipFormatter(sparkline, options, f) {
                return '<span class="ui-icon ui-icon-chart-line" style="background:#FFF;color:' + f.color + '"></span>患者: ' + php_number_format(f.y) + '名';
            }
        });

        //Vertical_Line
        o.sparkline(m_.spk.vline[i].slice(SPARK_SX), {
            composite: true
            , type: 'bar', barColor: 'rgba(255,0,0,1)'
            , barWidth: 1
            , barSpacing: barWidth
            , height: barHeight
            , chartRangeMax: 1000
            , colorMap: { 1000: 'rgba(255,0,0,0.9)', 999: 'rgba(0,0,255,0.9)' } //1000:start 999:end
            , tooltipFormatter(sparkline, options, f) {
                return '<BR>' + (f[0].value === 1000 ? '※緊急事態宣言 発令' : (f[0].value === 999 ? '※緊急事態宣言 解除' : ''));
            }
        });
    }
}

const initPrefTable = () => {
    initPrefTableData();

    for (var i = 0; i < m_.spk.bar_stacks.length; i++) {
        m_.spk.bar_stacks[i] = m_.spk.bar_stacks[i].slice(SPARK_SX);
        m_.spk.out_of_100k[i] = m_.spk.out_of_100k[i].slice(SPARK_SX);
        m_.spk.line[0][i] = m_.spk.line[0][i].slice(SPARK_SX)
        m_.spk.line[1][i] = m_.spk.line[1][i].slice(SPARK_SX);
        m_.spk.line[2][i] = m_.spk.line[2][i].slice(SPARK_SX);
    }

    $('#container2_tbl_pref').show();
    $('#tbl_pref').show();

    drawPrefSparkline('first', m_.spk.bar_stacks);


    m_.tbl_pref = $('#tbl_pref').DataTable({
        stateSave: true,
        order: [],
        searching: true,
        // search : {
        //   //search:'Fred'
        //   //"regex": true
        // },
        paging: false,
        scrollX: IS_SP,
        autoWidth: false,
        info: false,
        //order: [[ 0, 'asc' ], [ 1, 'desc' ],[ 2, 'desc' ]],
        //columDef:[
        //  { "targets": [ 1,2 ], "orderSequence": [ "desc","asc"]}
        // ]

        dom:
            '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-tl ui-corner-tr"lfrB>' +
            't' +
            '<"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br"ip>',
        buttons: [
            //, 'csv'
            {
                text: '<i class="ui-icon ui-icon-arrowstop-1-s"></i><img title="テーブルのデータをCSV形式でダウンロードします。" width="20" src="img/csv.png">'
                , extend: 'csvHtml5' //OPTION: https://datatables.net/reference/button/csvHtml5
                , exportOptions: { columns: ':visible' }
                , filename: 'covid19'
                //,className: "btn btn-green"
                , charset: "utf-8"
                , bom: true
                //,init: function(api, node, config) {}
                , exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6, 7]
                    , format: {
                        header: function(data, ci, n) {
                            if (n.textContent === '人口感染率') n.textContent = '人口';
                            return n.textContent;
                        }
                        , body: function(data, ri, ci) {
                            return m_.tbl_pref.data()[ri][ci];
                        }
                    }
                }
            }
        ],

        columns: [
            //自治体
            {
                render: function(data, type, row, meta) { //, row
                    let ret = data;
                    if (type === 'display') {
                        if (PREF_DATA[meta.row] && PREF_DATA[meta.row].length) {
                            let href = PREF_DATA[meta.row][0];
                            let title = PREF_DATA[meta.row][1];
                            let icon = PREF_EN[data] ? '<img src="img/japan/' + PREF_EN[data] + '.gif">' : '';
                            if (data === '日本') icon = '<img src="img/world/Japan.png">';
                            if (data === '世界') icon = '<i class="fa fa-globe" style="font-size:1.8em;"></i>';
                            ret = '<a target="_blank" href="' + href + '" title="' + title + '">' + icon + data + '</a>';
                        } else {
                            ret = data;
                        }
                    }
                    return ret;
                },
                orderable: false
            },
            //人口/感染率
            {
                visible: 0,
                orderSequence: ["desc", "asc"],
                render: function(data, type, row, meta) {
                    let ret = data;
                    if (type === 'display') {
                        let p = m_.pref_tbl_last_m1[row[0]];
                        if (p) {
                            let c_per = _.round(100 * p.carriers / p.n, 3);   //(感染者/人口)%
                            ret = php_number_format(data) + '<BR>' + c_per + '%';
                        } else {
                            let carriers = getJapanResionData(row[0], 'carriers');
                            if (carriers === '') {
                                ret = '';
                            } else {
                                let n = getJapanResionData(row[0], 'n');
                                let c_per = _.round(100 * carriers / n, 3);   //(感染者/人口)%
                                ret = php_number_format(n) + '<BR>' + c_per + '%';
                            }
                        }
                    } else {
                        ret = data;
                    }
                    return ret;
                }
            },
            //感染者
            {
                orderSequence: ["desc", "asc"],
                render: function(data, type, row, meta) {
                    let ret = data;
                    if (type === 'display') {
                        let n = getJapanResionData(row[0], 'carriers');
                        if (n === null) {
                            ret = php_number_format(data);
                        } else {
                            ret = n === '' ? '' : php_number_format(n);
                        }
                    } else {
                        ret = data;
                    }
                    return ret;
                }
            },
            //新規(▲)
            {
                render: function(data, type) { //, row
                    return type === 'display' ? ((data === '0' || data === '') ? '' : '▲' + data) : data;
                }
                , orderSequence: ["desc", "asc"]
            },
            { visible: 0, orderSequence: ["desc", "asc"] },//死亡
            { visible: 0, orderSequence: ["desc", "asc"] },//退院
            { visible: 0, orderSequence: ["desc", "asc"] },//患者
            //前日比
            {
                visible: 0,
                render: function(data, type) { //, row
                    return type === 'display' ? ((data === '0' || data === '') ? '' : (data > 0 ? '<span style="color:orange">▲' + Math.abs(data) + '</span>' : '<span style="color:green">▼' + Math.abs(data) + '</span>')) : (type === 'sort' && data === '' ? 10000 : data);
                }
                , orderSequence: ["asc", "desc"]
            },
            { orderable: false }
        ]
        , initComplete: function() {//(settings, json)
            let that = this.api();
            let dt = $(that.table().container());
            //let d=that.data();
            //
            let input = dt.find('[type=search]')
            m_.tbl_pref_isearch = input.clone();
            m_.tbl_pref_isearch
                .autocomplete_ex({
                    user_opt: {
                        data: m_.ac_data_tbl,
                        multiple: 1,
                        select: function(event, ui) {
                            m_.tbl_pref_isearch.val(m_.tbl_pref_isearch.val() + ' ');
                            m_.tbl_pref_isearch.trigger('keyup').focus();
                        }
                    }
                })
                //.attr('type','input')
                .attr({ 'id': 'tbl_flt', 'placeholder': '自治体名でフィルタリング' })
                //.before($('<i class="fa fa-filter" style="padding:4px"></i>'))
                .on('keyup change clear', function() {
                    let wd = m_.tbl_pref_isearch.val().replace(/　/g, ' ').trim().split(' ')
                    if (wd.length == 1) {
                        m_.tbl_pref.columns(0).search(wd[0]).draw();
                    } else if (wd.length > 1) {
                        reg_str = '(' + wd.join('|') + ')';
                        m_.tbl_pref.columns(0).search(reg_str, true).draw();
                    }
                })
                ;
            input.before(m_.tbl_pref_isearch).remove();
            m_.tbl_pref_isearch.addClass('btn_clear').btn_clear();

            if (that.column(4).visible()) {
                $("#chk_tbl_detail").prop('checked', true).checkboxradio('refresh');
            }
            let flt_txt = [];
            that.rows(':visible').every((rowIdx/*, tableLoop, rowLoop*/) => {
                flt_txt.push(that.row(rowIdx).data()[0]);
            });
            if (flt_txt.length && flt_txt.length !== PREF_DATA.length) $('#tbl_flt').val(flt_txt.join(' '));
        }
        , mark: {
            // https://github.com/julmot/datatables.mark.js/blob/master/README.md
            // "synonyms": {}
        }
    });


    if (!IS_SP) {
        $('#tbl_pref').sortable({
            axis: 'y'
            , placeholder: "ui-state-highlight"
            , items: 'tbody > tr'
            , cursor: 'move'
            , handle: '.uicm'
            , revert: 50
        });
    }

}

$(document).ready(function() {
    $("#chk_tbl_detail").checkboxradio().on('click', function() {
        let b = $(this).prop('checked');
        if (m_.tbl_pref) {
            m_.tbl_pref.column(1).visible(b);
            m_.tbl_pref.column(4).visible(b);
            m_.tbl_pref.column(5).visible(b);
            m_.tbl_pref.column(6).visible(b);
            m_.tbl_pref.column(7).visible(b);
        }
    });
    $("#chk_tbl_spkflt").checkboxradio().on('click', function() {
        let b = $(this).prop('checked');
        if (b) {
            drawPrefSparkline(1, m_.createFilteredBarStacksData());
        } else {
            drawPrefSparkline(2, m_.spk.bar_stacks);
        }
    });
});

new Vue({
    el: '#app',
    data: {
        pnl: {
            map: {
                is_show: IS_SP ? 1 : 1,
                title: '地図',
                // filter:''
            },
            name: {
                is_show: IS_SP ? 1 : 1,
                title: '都道府県',
                // filter:''
            },
            city: {
                is_show: IS_SP ? 1 : 1,
                title: '市区町村',
                // filter:''
            },
            date: {
                is_show: IS_SP ? 1 : 1,
                title: '<i class="fa fa-procedures"></i>感染者数',
                // filter:''
                cnt_day: '',
                cnt_one: '',
                cnt: '',
                chart2: {
                    is_show: 0,
                    title: '<i class="fa fa-vials"></i>PCR検査人数</span>',
                    title2: '',
                    cnt: ''
                }
            },
            sex: {
                is_show: IS_SP ? 0 : 1,
                title: '<i class="fa fa-venus-mars"></i>性別',
                // filter:''
            },
            week: {
                is_show: IS_SP ? 0 : 0,
                title: '曜日',
                // filter:''
            },
            age: {
                is_show: IS_SP ? 1 : 1,
                title: '年齢',
                // filter:''
            },
            cond: {
                is_show: IS_SP ? 1 : 1,
                title: '<i class="fa fa-medkit"></i>状態(現在)',
                // filter:''
            },
            job: {
                is_show: IS_SP ? 1 : 1,
                title: '<i class="fa fa-id-card-o"></i>職業',
                // filter:''
            },
            detail: {
                is_show: IS_SP ? 1 : 1,
                title: '詳細',
                // filter:''
            },
            ana: {
                is_show: IS_SP ? 0 : 0,
                is_chk_show: 1,
                title: '<i class="fa fa-eye"></i>分析',
                // filter:''
            }
        },
        pnl_shows: null,
    },
    computed: {
        settingsName: () => {
            const get_pathname_trimr = (pn) => {
                let a = pn.split('/');
                return a.slice(0, a.length - 1).join('/');
            }
            return 'covid19' + get_pathname_trimr(location.pathname);
        }
    },
    watch: {
        // pnl: {
        //   handler: function (v, old){
        //     this.settingsSave();
        //   },
        //   deep: true
        // },
        'pnl.map.is_show': function() { this.settingsSave(); },
        'pnl.name.is_show': function() { this.settingsSave(); },
        'pnl.city.is_show': function() { this.settingsSave(); },
        'pnl.date.is_show': function() { this.settingsSave(); },
        'pnl.sex.is_show': function() { this.settingsSave(); },
        'pnl.week.is_show': function() { this.settingsSave(); },
        'pnl.age.is_show': function() { this.settingsSave(); },
        'pnl.cond.is_show': function() { this.settingsSave(); },
        'pnl.job.is_show': function() { this.settingsSave(); },
        'pnl.detail.is_show': function() { this.settingsSave(); },
        'pnl.ana.is_show': function() { this.settingsSave(); }
    },
    mounted: function() {
        app = this;
        m_.loadAllData();
        this.settingsLoad();
    },
    methods: {
        getPanelShows: function() {
            let o = {};
            _.forEach(this.pnl, (v, k) => {
                o[k] = { is_show: v.is_show ? 1 : 0 };
            });
            return o;
        },
        settingsSave: function() {
            let shows = this.getPanelShows();
            localStorage.setItem(this.settingsName, JSON.stringify(shows));
        },
        settingsLoad: function() {
            //UI_Settings_Load
            let settings = JSON.parse(localStorage.getItem(this.settingsName));
            if (settings) {
                _.merge(this.pnl, settings);
            }
            if (m_.get.light !== undefined) {
                this.pnl.week.is_show = 1;
                this.pnl.ana.is_show = 0;
                this.pnl.ana.is_chk_show = 0;
            }
        },
        pnlShowsLoadStore: function(is_load) {
            if (is_load) {
                let o = {};
                _.forEach(this.pnl_shows, (v, k) => {
                    this.pnl[k].is_show = v.is_show;
                });
                this.pnl_shows = null;
            } else {
                if (this.pnl_shows === null) {
                    this.pnl_shows = this.getPanelShows();
                }
            }
        }
    }
});

