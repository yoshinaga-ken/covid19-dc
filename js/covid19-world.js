const IS_SP = ('ontouchstart' in window) || window.innerWidth <= 768;

const D2_PL1 = 0; // 日本
const D2_YMD = 1; // 2020-01-30
const D2_P = 2;   // 感染者数
const D2_D = 3;   // 死亡者数
const D2_REG = 4; // 地域

const WT_CD = 0;  // JP
const WT_NM = 1;  // JAPAN
const WT_P = 2;   // 感染者数
const WT_D = 3;   // 死亡者数
const WT_PD = 4;  // 感染者数(前回比)
const WT_DD = 5;  // 死亡者数(前回比)
const WT_AC = 6;  // エリアコード

const CND_LV_A = '無症,退院';
const CND_LV_B = '感染';
const CND_LV_C = '肺炎,入院';
const CND_LV_D = '酸投,重症';
const CND_LV_E = '死亡';
const COND_COL = ["#2ca02c", "#1f77b4", "#ff7f0e", "#d62728", '#9467bd'];
const COND_COL_A = COND_COL[0];
const COND_COL_B = COND_COL[1];
const COND_COL_C = COND_COL[2];
const COND_COL_D = COND_COL[3];
const COND_COL_E = COND_COL[4];

const IMG_NO = 'img/noimage.png';

//緊急事態宣言
const YMD_ED_F = [["2020-04-07", "【緊急事態宣言】\n発令。７都府県\n対象：東京・埼玉・千葉・神奈川・大阪・兵庫・福岡"], ["2020-04-16", "【緊急事態宣言】\n対象を｢全国｣に拡大"], ["2020-05-14", "【緊急事態宣言】\n39県で解除\n継続：北海道・東京・埼玉・千葉・神奈川・大阪・京都・兵庫"], ["2020-05-21", "【緊急事態宣言】\n大阪・京都・兵庫を解除\n継続：北海道・東京・埼玉・千葉・神奈川"], ["2020-05-25", "【緊急事態宣言】\n全都道府県で解除"]];

const WORLD_REGIONS = { "0": ["アフリカ", "Africa"], "2": ["東地中海", "Eastern Mediterranean"], "3": ["ヨーロッパ", "Europe"], "4": ["東南アジア", "South-East Asia"], "5": ["西太平洋", "Western Pacific"], "11": ["北アメリカ", "North Americas"], "12": ["中央アメリカ", "Central Americas"], "13": ["南アメリカ", "South Americas"] };

const CHART_YM_STACK1_N = 2 + _.size(WORLD_REGIONS); const CHART_YM_STACK2_N = 8 + 1;
const SPARK_SX = IS_SP ? 60 : 25;
const MAP_COL_TBL = [["1000人以上", "#8c0a00"], ["500人以上", "#ea5432"], ["100人以上", "#ff781d"], ["50人以上", "#ff9d57"], ["10人以上", "#ffceab"], ["1人以上", "#f5deb3"], ["0人", "#dadada"], ["選択中", "#ffffff"]];

colorbrewer.Set3[12][8] = colorbrewer.Set2[8][6];//gray-> light gold
colorbrewer.Set2[8][7] = colorbrewer.Set1[8][6];//gray-> light gold

const m_ = {
  config: {
    cDateYm: {
      is_elasticY: 1 //m_.chartDate yAxisの高さを動的に変化させる
    },
    cJob: {
      TD: 750,       //transitionDuration
      barWidth: 45   //
    }
  },
  get: php_location_get_query(),
  url_data: 'data/covid19-world.json',
  url_name: 'https://ja.wikipedia.org/wiki',

  composite: null,
  chartDate: null,
  chartLine: null,
  chartRegion: null,
  chartWorld: null,
  chartCondSel: null,

  lv_type: 0, // 0b00:感染 0b01:1:死亡 0b11::3:感染|死亡
  ndx2: {},
  world: [],
  world_tbl: {},
  //gpRegion_all:{},
  gpWorld_all: {},
  ac_data: [],
  chartRegionColors: colorbrewer.Paired[9],
  chartWorldColors: d3.schemeTableau10,

  domainDate: [],
  dateCnt: {},
  datePick: null,
  dateCntMax: 0,
  dateCntTo: 'YYYYMMDD',
  sel_tab: 'tabs_c',

  tip: null,
  tipRow: null,

  //gpDateYMMax:{},
  names: {},

  keyboard: null,
  keyboard_target: 'name', //'name',
  keyboard_selector: '#name_flt', //=='#'+keyboard_target+'_flt'

  chartAllFilterByKW_render: 0,
  is_drawJapanMap: 1,
  is_drawWorldMap: 1,
  is_filter_region_sel: 0,
  line: d3.line().curve(d3.curveLinear),
  last_fth: '',

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
  initSearchKeybord: function() {
    //キーボードカスタムボタン
    $.extend($.keyboard.keyaction, {
      cmd_search: function(base) {
        var o = $(m_.keyboard_selector);
        var e = $.Event("change");
        e.keyCode = $.ui.keyCode.ENTER;
        o.trigger(e);
      }
      , cmd_clear: function(base) {
        $(m_.keyboard_selector).val('').trigger('change');
      }
      , cmd_close: function(base) {
        base.close(true); // same as base.accept();
        $('#' + m_.keyboard_target + '_flt_div').hide();
        return false; // return false prevents further processing
      }
    });

    $(m_.keyboard_selector).on('change keyup', function(e) {
      //WORDで表示をフィルタ
      let w = $(this).val().trim();
      let div_sel = '#div_' + m_.keyboard_target;
      let items = $(div_sel + ' g.row');
      let n = 0;
      for (var i = 0; i < items.length; i++) {
        let it = items.eq(i)
        let name = it.find('text:eq(0)').text(); //よし(男)D
        let nm = name.split('(')[0];
        if (nm.indexOf(w) !== -1) {//部分一致
          it.show(); n++;
        } else {
          it.hide();
        }
      }
      if (w == '') {
        m_.chartScroll(div_sel, '');
        return;
      }
      //if(e.keyCode==$.ui.keyCode.ENTER) m_.chartScroll(div_sel, w,150);
      m_.chartScroll(div_sel, w, 150);//realtime
    });

    m_.keyboard = $(m_.keyboard_selector).keyboard({
      // layout: 'qwerty'
      layout: 'custom'
      , display: {
        'cmd_search': '　<span class="ui-icon ui-icon-search"></span>検索　'
        , 'cmd_clear': '　<span class="ui-icon ui-icon-closethick"></span>クリア　'
        , 'cmd_close': '　　　　　　<span class="ui-icon ui-icon-circle-close"></span>閉じる　　　　　　'
        , 'shift': 'かな英数'
        , 'accept': '　閉じる　'
      }
      , customLayout: {
        'normal': [
          'ア カ ガ サ ザ タ ナ ハ バ マ ヤ ラ ワ {b}',
          'イ キ ギ シ ジ チ ニ ヒ ビ ミ イ リ ン {b}',
          'ウ ク グ ス ズ ツ ヌ フ ブ ム ユ ル & {b}',
          'エ ケ ゲ セ ゼ テ ネ ヘ ベ メ エ レ | {b}',
          'オ コ ゴ ソ ゾ ト ノ ホ ボ モ ヨ ロ ー {b}',
          '{shift} {space} {cmd_clear}',
          '{cmd_close}'

        ]
        , 'shift': [
          'あ か が さ ざ た な は ば ま や ら わ {b}',
          'い き ぎ し じ ち に ひ び み い り ん {b}',
          'う く ぐ す ず つ ぬ ふ ぶ む ゆ る & {b}',
          'え け げ せ ぜ て ね へ べ め え れ | {b}',
          'お こ ご そ ぞ と の ほ ぼ も よ ろ ー {b}',
          '{shift} {space} {cmd_clear} {cmd_search}',

          '1 2 3 4 5 6 7 8 9 0 = {bksp}',
          '~ ! @ # $ % ^ & * ( ) _ +',
          'Q W E R T Y U I O P { } |',
          'A S D F G H J K L : " {cmd_search}',
          '{shift} Z X C V B N M < > ? {shift}',
          '{cmd_close}'
        ]
      }

      //,language: 'ja'
      //,initialFocus : true　//フォーカスでOPEN
      , openOn: null    //null:イベントクリックで開かない
      , stayOpen: true  //開いたまま
      , noFocus: true

      //,appendLocally: true
      , usePreview: false //INPUTの表示
      , change: function(e, keyboard, el) {
        // switch(e.action){
        // case '福岡':
        //     var val = $(keyboard.preview).val();
        //     $(keyboard.preview).val( val+'県出身のプレイヤー' );
        //     break;
        // }
        $(m_.keyboard_selector).trigger('change');
      }

      , position: !IS_SP ? {
        of: $('#div_' + m_.keyboard_target)
        , my: 'left top'
        , at: 'left bottom+30'
        , at2: 'left bottom+20'
        , collision: 'fit fit'
      } : { //左
          of: $(window)
          , my: "left bottom"
          , at: "left bottom-20"
          , at2: 'left bottom-20'
          , collision: 'fit fit'
        }

      , visible: function(a, b) {
        // if(IS_SP){
        // $(m_.keyboard_selector).attr('readonly',true).blur();
        // }
        $('.ui-keyboard')
          .css({
            // 'position':'fixed'
            // ,'top': window.innerHeight-$('.ui-keyboard').height()
            'cursor': 'move'
            , 'padding': '4px'
            , 'padding-top': '32px'
          })
          .draggable();
      }
      , beforeClose: function(a, b) {
        // if(IS_SP){
        // $(m_.keyboard_selector).attr('readonly',false).blur();
        // }
      }
    });

    //キーボード表示ボタン
    $('.flt_open_btn').button().on('click', function() {
      let o = $(this);
      m_.keyboardTargetChange(o.attr('keyboard_target'));
      let kb = m_.keyboard.getkeyboard();
      let div_sel = '#' + m_.keyboard_target + '_flt_div';
      if (kb.isOpen) {
        kb.close();
        $(div_sel).hide();
      } else {
        kb.reveal();
        $(div_sel).show();
        if (!IS_SP) $('#' + m_.keyboard_target + '_flt').focus();
      }
    });

  },
  keyboardTargetChange: function(target) {
    m_.keyboard_target = target;
    m_.keyboard_selector = '#' + target + '_flt';
  },
  getFilterTxt: function() {
    let region = $('#panel_region .filter_txt').text();
    let name = $('#panel_world .filter_txt').text();
    let date = $('#panel_date .filter_txt').text();
    let week = $('#chart_week .filter').text();
    let txt = _.fill(Array(8), '');
    const PL = 'と';

    if (region !== '') {
      let t = '', sp = region.split(',');
      for (i of sp) {
        t += i.trim() + PL;
      }
      txt[1] = (sp.length == 1 ? '' : '地域:【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
    }

    if (name !== '') {
      let t = '', sp = name.split(',');
      for (i of sp) {
        t += i.trim() + PL;
      }
      txt[2] = (sp.length == 1 ? '' : '国名:【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
    }

    if (date != '') {
      if (m_.chartDate.filters().length) {
        if (m_.chartDate.brushOn()) {
          txt.push(date);
        } else {
          let t = '', sp = date.split(',');
          for (i of sp) {
            t += i + PL;
            //t += moment(new Date(i)).format('MM/DD(ddd)')+PL;
          }
          txt[0] = (sp.length == 1 ? '' : '【') + php_trim(t, PL) + (sp.length == 1 ? '' : '】');
        }
      }
    }
    if (week != '') {
      let is = week.indexOf(',') !== -1;
      txt[3] = '曜日:' + (is ? '【' : '') + week + (is ? '】' : '');
    }

    return txt;
  },
  chartWorldFilters: function(flts, sel_cd, is_on) {
    if (flts.length === 0) {
      m_.chartWorld.filterAll().render();
      document.querySelector('#div_world').scrollTop = 0;
      return;
    }

    let sels = [], sel_name;
    _.forEach(m_.world_tbl, (d, k) => { if ($.inArray(d[0], flts) !== -1) sels.push(k); if (d[0] == sel_cd) sel_name = k });
    m_.chartWorld.filterAll().filter([sels]);
    m_.chartScroll('#div_world', is_on ? sel_name : _.last(sels), 150);

    dc.renderAll("chartGroup2");
  },
  chartWorldFilterReset: function() {
    m_.is_filter_region_sel = 1;
    mapw.clearSelectedRegions();
    m_.is_filter_region_sel = 0;
    mapw.setFocus({
      x: 0.45, y: 0.48,
      scale: 1,
      animate: false
    });
    document.querySelector('#div_world').scrollTop = 0;
    m_.chartWorld.filterAll();
    dc.redrawAll('chartGroup2');
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
        //m_.chartDate.filterAll().filter(d.toDate());
        m_.renderAllChart();
        m_.barChartRedrawGroup(m_.chartDate);
        return 1;
      }
    }

    //chartNameにない物は除外 前方一致
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
    if (is_pre_find) {
      m_.chartWorld.filterAll().filter(names.length === 1 ? names[0] : [names]);
      m_.renderAllChart();
      m_.chartScroll('#div_world', names[0], 300);
      return 1;
    }
    return 0;
  },
  parseURLParams: function() {
    let is_trigger_search;
    //国名指定
    //例:
    // name=日本
    // name=日本+英国
    if (m_.get.name) {
      let names = m_.get.name.split(' ');
      let flt = names.length === 1 ? names[0] : [names];
      m_.chartWorld.filterAll().filter(flt);
      $('#btn_search').val(names.join(' '));
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
          case 3: ret = moment(s2[0] + '-' + php_printf02d(s2[1]) + '-' + php_printf02d(s[2])); break;
          case 2: ret = moment(moment().format('YYYY') + '-' + php_printf02d(s2[0]) + '-' + php_printf02d(s2[1])); break;
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
        pnl.find('.filter_txt').show().text(t).attr('title', t);
        pnl.find('.filter_txt_diff').text((moment(flt[0][1]).diff(flt[0][0], 'days') + 1) + '日間');
      } else {
        let flt2 = [];
        for (f of flt) {
          if (func) f = func(f);
          flt2.push(f);
        }
        let t = flt2.join(',');
        pnl.find('.filter_txt').show().text(t).attr('title', t);
        pnl.find('.filter_txt_diff').text('');
      }
      pnl.find('.reset_btn').show();
    } else {
      pnl.find('.filter_txt').text('').hide();
      pnl.find('.reset_btn').hide();
    }
  },
  on_chart_filtered: function(chart, v) {
    let ci = chart.chartID();
    //console.log('on_chart_filtered() id:'+ci);

    if (chart.filters().length && $('#ui-datepicker-div').is(':visible')) {
      //m_.datePick.datepicker('hide');
      m_.datePick.datepicker('show');
    }
  },
  on_chart_postRedraw: function(chart) {
    chart.transitionDuration(m_.config.cJob.TD);
    chart.render();
  },
  render_v_line: function(chart, hz) {
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
      b.each(function(val, a, b) {
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

    let o = $('#chart_date g.dc-legend-item');

    let flt = m_.chartWorld.filters();
    let fltr = m_.chartRegion.filters();
    let is_lv_mode = flt.length < 2 && fltr.length === 0;
    let is_reg_mode = flt.length === 0 && fltr.length;;

    if (is_lv_mode) {
      o.filter(':contains("' + CND_LV_B + '")').show();
      o.filter(':contains("' + CND_LV_E + '")').show();
    } else if (is_reg_mode) {
      for (var i = 0; i < fltr.length; i++) {
        o.filter(':contains("' + WORLD_REGIONS[fltr[i]][0] + '")').show();
      }
    } else {
      for (var i = 0; i < flt.length; i++) {
        o.filter(':contains("' + flt[i] + '")').show();
      }
    }
    o.filter(':contains("週間")').show().attr('transform', 'translate(-100,0)');

    //
    //宣言vertical line
    //
    m_.render_v_line(chart, [
      { cls: ['s1'], x: new Date(YMD_ED_F[0][0]) },
      { cls: ['s2'], x: new Date(YMD_ED_F[1][0]) },
      { cls: ['s2'], x: new Date(YMD_ED_F[2][0]) },
      { cls: ['s2'], x: new Date(YMD_ED_F[3][0]) },
      { cls: ['s3'], x: new Date(YMD_ED_F[4][0]) }
    ]);

    if (m_.is_drawWorldMap) drawWorldMap();
    m_.is_drawWorldMap = 1;

    let ft = m_.getFilterTxt();

    let fth = ft.join(' ').trim();
    $('.hdr_flt').text((fth === '' ? '世界' : fth) + 'の状況');

    if (m_.sel_tab === 'tabs_w' || m_.sel_tab === 'tabs_c') {
      fth = ft.join(' ').trim();
      $('.hdr_flt_map').text(fth === '' ? '' : fth + 'の状況');
    }

    //$('#chart_date g.dc-legend-item:contains("クラス")').hide();

    chart.selectAll("rect.bar").on("click", function(d) {
      //base-mixin:1160
      //chart.filter(null).filter(d.data.key).redrawGroup();//単一選択
      chart.filter(d.data.key).redrawGroup();//追加選択
      //chart.filter(multikey(d.x, d.layer));//子供項目選択
      m_.barChartRedrawGroup(chart);
    });

    //$('#cnt_all').text(php_number_format(m_.ndx.groupAll().reduceCount().value()));
    $('#cnt_all').text(php_number_format(m_.ndx2.groupAll().reduceSum(d => m_.lv_type ? d[D2_D] : d[D2_P]).value()));

    let all = m_.lv_type ? m_.gpDateD.all() : m_.gpDate.all();
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
        $('#cnt_day').text(moment(d.key).format('YYYY/M/D(ddd)') + '時点');
        //$('#cnt_one').text(d.value);//前日比：累計
        h = d.value - d1.value;
        $('#cnt_one').text((h >= 0 ? '+' : '') + php_number_format(h));//前日比：日別
      }
    } else {
      $('#cnt_one').text('');
      $('#cnt_day').text('');
    }
    //m_.gpDateYMMax=_.maxBy(all, function(o) { return o.value; });
  },
  chartDateLegendUpdate: function() {
    let flt = m_.chartWorld.filters();
    let fltr = m_.chartRegion.filters();
    let is_lv_mode = flt.length < 2 && fltr.length === 0;
    let is_reg_mode = flt.length === 0 && fltr.length;;
    if (!is_lv_mode) {
      m_.composite.legend().y(is_reg_mode ? -30 : -170);
    }
  },
  renderAllChart: function() {
    if (!m_.config.cDateYm.is_elasticY) {
      let all = m_.lv_type ? m_.gpDateD.all() : m_.gpDate.all();
      let max = _.max(_.map(all, 'value'))
      //let max=_.maxBy(m_.chartDate.group().all(),d=>d.value.total[m_.lv_type]).value.total[m_.lv_type];
      m_.chartDate.y(d3.scaleLinear().domain([0, max + 10])); //高さ範囲再計算
    }


    dc.renderAll("chartGroup2");

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
  panelResize: function() {
    const w = $('#container2_dc').width()
      - ($('#ch_pnl_map').prop('checked') ? $('#chart_map').width() + 5 : 0)
      - ($('#ch_pnl_cond').prop('checked') ? $('#panel_region').width() + 5 : 0)
      - ($('#ch_pnl_world').prop('checked') ? $('#panel_world').width() + 5 : 0)
      - 5;
    $('#panel_date').width(w);
  },
  remove_empty: function(source_group) {
    return {
      all: function() {
        return source_group.all().filter(function(d) {
          return d.value != 0;
        });
      }
    };
  },
  loadData: function() {
    const is_local_html = location.protocol === 'file:';

    m_.composite = new dc.CompositeChart("#chart_date", "chartGroup2");
    m_.chartDate = new dc.BarChart(m_.composite);
    m_.chartLine = new dc.LineChart(m_.composite);
    m_.chartRegion = new dc.RowChart("#chart_region", "chartGroup2");
    m_.chartWorld = new dc.RowChart("#chart_world", "chartGroup2");
    m_.chartCondSel = new dc.RowChart("#chart_condsel", "chartGroup2");

    function load(d) {
      m_.world = d.world;
      m_.world_tbl = d.world_tbl;

      m_.ac_data = d.ac_data;

      m_.init();

      initDc();
    }

    if (is_local_html) {
      load(g_covid19_world);
    } else {
      d3.json(m_.url_data).then(load);
    }
  },
  init: function() {
    if (IS_SP) {
      m_.tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function() {
          return $(this).find('title').text().replace(/\n/g, '<br />');
        });

      // m_.tipRow = d3.tip()
      //       .attr('class', 'd3-tip')
      //       .offset([-200, 10])
      //       .html(function () {
      //         return $(this).find('title').text().replace(/\n/g,'<br />');
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
              o.val(ui.item[1] + ' ');
            }
            o.trigger('btn_search_update');
          }
        }
      }
    });
  }
};

const initDc = (data) => {

  m_.domainDate = [moment(m_.world[0][D2_YMD]).add(5, 'days').toDate(), moment(_.last(m_.world)[D2_YMD]).add(3, 'days').toDate()];

  const pl1 = _.map(m_.world, D2_PL1);
  const names_length = _.uniq(pl1).length
  m_.names = _.countBy(pl1);

  let ndx2 = crossfilter(m_.world);
  m_.ndx2 = ndx2;
  //===========================================================================
  // CHART 市区町村 rowChart chartRegion_init
  //===========================================================================
  let dimRegion = ndx2.dimension(function(d) {
    return d[D2_REG];
  });
  m_.gpRegion = dimRegion.group().reduceSum(function(d) {
    return d[D2_P];
  });
  m_.gpRegionD = dimRegion.group().reduceSum(function(d) {
    return d[D2_D];
  });
  let gpRegion = m_.lv_type ? m_.gpRegionD : m_.gpRegion;
  //gpRegion.all().forEach( v=>m_.gpRegion_all[v.key]=v.value );

  m_.chartRegion
    .width(IS_SP ? parseInt(window.innerWidth / 2) - 30 : 200)
    .height(24 + (Object.keys(gpRegion.all()).length * 29))
    .fixedBarHeight(24)
    .margins({ top: 0, left: 10, right: 10, bottom: 20 })
    .transitionDuration(750)
    .dimension(dimRegion)
    .group(gpRegion)
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .ordinalColors(m_.chartRegionColors)
    .filterPrinter(function(filters) {
      return filters.map(function(f) { return WORLD_REGIONS[f]; }).join(', ');
    })
    .renderLabel(true) //LeftLabel
    .label(function(d) {//tooltip
      return WORLD_REGIONS[d.key][0];
      // let is_filtered = m_.gpRegion_all[d.key]!==d.value;
      // const n=is_filtered?8:6;
      // let s=d.key.substr(0,n);
      // for (var i = s.length; i < n+1; i++) s+='　';
      // return s+d.value + (is_filtered ? '' : (m_.data_city_last[d.key] ? '▲'+m_.data_city_last[d.key] : '' ));
    })
    .renderTitleLabel(true) //RightLabel & tooltip
    //.titleLabelOffsetX( 0 )
    .title(function(d) {
      return php_number_format(d.value);
      // let s = WORLD_REGIONS[d.key][0];
      // for (var i = 0; i < 8-d.key.length; i++) s+='　';          
      // return  s+php_number_format(d.value);
      //TODO:
      // let is_filtered = m_.gpRegion_all[d.key]!==d.value;
      // return d.value + (is_filtered ? '' : (m_.data_city_last[d.key] ? '▲'+m_.data_city_last[d.key] : '' ));
    })
    .elasticX(true)
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_region', chart, (f) => WORLD_REGIONS[f][0]);//,(f)=>moment(f).format('M/D(ddd)'));
      //m_.dateCntCreate();

      m_.dateCntCreate();
      m_.on_chart_filtered(chart, v);
    })
    ;
  m_.chartRegion.xAxis().ticks(0);

  //===========================================================================
  // CHART 国 rowChart chartWorld_init
  //===========================================================================
  let dimWorld = ndx2.dimension(function(d) {
    return d[D2_PL1];
  });
  let gpWorld = dimWorld.group().reduce(
    (p, v) => {//add
      p[0] += v[D2_P];
      p[1] += v[D2_D];
      return p;
    },
    (p, v) => {//remove
      p[0] -= v[D2_P];
      p[1] -= v[D2_D];
      return p;
    },
    (p, v) => {//init
      return [0, 0];
    })
  //.order(function(d) {return d.total;});
  gpWorld.all().forEach(v => m_.gpWorld_all[v.key] = v.value[0]);
  function remove_empty(source_group) {
    return {
      all: function() {
        return source_group.all().filter(function(d) {
          return d.value[0] != 0;
        });
      }
    };
  }
  gpWorld = remove_empty(gpWorld);//xAxis0件は表示しない

  let chartWorldW = 320;;
  if (IS_SP) chartWorldW = window.innerWidth + 60;

  m_.chartWorld
    .width(chartWorldW)
    .height(24 + (Object.keys(gpWorld.all()).length * 29))
    .fixedBarHeight(24)
    .margins({ top: 0, left: 10, right: 10, bottom: 20 })
    .transitionDuration(750)
    .dimension(dimWorld)
    .group(gpWorld)
    .addFilterHandler(m_.addFilterHandlerSingleR)
    .ordering(function(t) { return -t.value[m_.lv_type]; })
    .valueAccessor(function(d) { return d.value[m_.lv_type]; })
    .titleLabelOffsetX(0)
    .ordinalColors(m_.chartWorldColors)
    .renderTitleLabel(false)
    .title(function(d) {//tooltip
      let v = m_.world_tbl[d.key];
      //TODO:v===undefined
      ret = d.key + '\n' +
        '感染者数: ' + php_number_format(d.value[0]) + '名' + (v === undefined || v[WT_PD] === 0 ? '' : ' ▲' + php_number_format(v[WT_PD])) + '\n' +
        '死亡者数: ' + php_number_format(d.value[1]) + '名' + (v === undefined || v[WT_DD] === 0 ? '' : ' ▲' + php_number_format(v[WT_DD])) + '\n' +
        '死亡率: ' + _.round(d.value[1] / d.value[0], 2) + '%\n';
      return ret;
    })
    .renderLabel(true)
    .label(function(d) {
      let v = m_.world_tbl[d.key];
      const NAME_N = 7; // %07s 化
      //if(d.key.length>NAME_N)d.key=d.key.substr(d.key,NAME_N-1)+'…';
      let s = d.key;
      for (var i = 0; i < NAME_N - d.key.length; i++) s += '　';

      let is_filtered = m_.gpWorld_all[d.key] !== d.value[0];
      let flt = m_.chartCondSel.filter(), car = '', det = '';
      if (flt === '感染') {
        car = php_sprintf("%' 9s", php_number_format(d.value[0])) + ((v === undefined || v[4] === 0 || is_filtered) ? '         ' : php_sprintf(" %' 7s", '▲' + v[4])) + ' ';
      }
      if (flt === '死亡') {
        let is_death_zero = v === undefined || v[5] === 0 || is_filtered;
        det = php_sprintf("%' 7s", php_number_format(d.value[1])) + ((is_death_zero) ? '       ' : php_sprintf(" %' 5s", '▲' + v[5]))
          + (is_death_zero ? '' : php_sprintf(" %' 5s", '(' + _.round(d.value[1] / d.value[0], 2).toString().substr(1) + '%)'));
      }
      return s + car + det;
    })
    .elasticX(true)
    .on('pretransition', function(chart) {
      chart.selectAll("text.row").attr('x', 32);
      chart.selectAll("rect").attr('x', 28);
      chart.selectAll("g.row")
        .append('svg:image')
        .attr('width', '26')
        .attr('class', 'pl')
        .attr('xlink:href', function(d, i) {
          return m_.world_tbl[d.key] ? 'img/world/' + m_.world_tbl[d.key][1] + '.png' : IMG_NO;
        })
        .on('click', function(d) {
          next = m_.url_name + '/' + d.key;
          window.open(next);
        });
    })
    .on('filtered', function(chart, v) {
      m_.showFilterUi('#panel_world', chart);
      $('#detail_div1,#detail_div2,#detail_div3,#detail_div4,#detail_div5').hide();
      let flts = chart.filters();
      if (flts.length === 0) return;

      //MAPの選択Nameのエリア枠を描画
      m_.is_filter_region_sel = 1;
      mapw.clearSelectedRegions();
      let sels = [];
      _.forEach(m_.world_tbl, (d, k) => { if ($.inArray(k, flts) !== -1) sels.push(d[0]); });
      mapw.setSelectedRegions(sels);
      m_.is_drawWorldMap = 0;
      m_.is_filter_region_sel = 0;

      for (var i = 0; i < flts.length; i++) {
        let no = i + 1;
        let name = flts[i];
        let p = m_.world_tbl[name];
        let icon = p ? '<img src="img/world/' + p[1] + '.png">' : '';
        let ret = '<B>' + icon + '<a target="_blank" title="' + name + 'の wikipediaへ" href="' + m_.url_name + '/' + name + '">' + name + '</a></B><br />';
        if (p) {
          ret +=
            '総人口　: <br />' +
            '地域　　: ' + WORLD_REGIONS[p[WT_AC]][0] + '<br />' +
            // 'PCR検査: <br />'+
            '感染者数: ' + php_number_format(p[WT_P]) + ' ▲' + php_number_format(p[WT_PD]) + '<br />' +
            '死亡者数: ' + php_number_format(p[WT_D]) + ' ▲' + php_number_format(p[WT_DD]) + '<br />' +
            '<a title="感染者数に対する死亡者率。死亡者数 ÷ 感染者数">死亡率</a>　: ' + _.round(p[WT_DD] / p[WT_PD], 2) + '%'
            // '退院者数: <br />'+
            // '実患者数: <br />'+
            // '対策病床数: <br />'
            ;
        }
        $('#detail_div' + no).html(ret).hide().show();
      }

      //$('#world-map').vectorMap('get','mapObject').setFocus({region: _.last(sels)});//ZOOM
      $('#world-map').vectorMap('get', 'mapObject').setFocus({ regions: sels, animate: 1 });//include ZOOM

      if (m_.sel_tab !== 'tabs_w') $('[href="#tabs_w"]').trigger('click');// tabs_w_show

      $('.jvectormap-tip').hide();
      m_.dateCntCreate();
    })
    ;
  m_.chartWorld.xAxis().ticks(4);

  let chartDateW;
  if (IS_SP) {
    chartDateW = window.innerWidth + 350;
    gap_val = -2;
  } else {
    let panel_date_w = window.innerWidth - ($('#chart_map').width() + $('#panel_region').width() + $('#panel_world').width()) - 120;
    $('#panel_date').width(panel_date_w);
    chartDateW = panel_date_w;
    while (1) {
      if (chartDateW > 1300) { gap_val = -4; break; }
      if (chartDateW > 1250) { gap_val = -3; break; }
      if (chartDateW > 1150) { gap_val = -3; break; }
      if (chartDateW > 900) { gap_val = -3; break; }
      if (chartDateW > 700) { gap_val = -2; break; }
      gap_val = -2; break;
    }
  }
  //===========================================================================
  // CHART 感染者数(YYYY-MM-DD) barChart chartDate_init
  //===========================================================================
  let dimDate = ndx2.dimension(function(d) {
    return d3.timeDay(new Date(d[D2_YMD]));
  });
  m_.gpDate = dimDate.group().reduceSum(function(d) { return d[D2_P]; });
  m_.gpDateD = dimDate.group().reduceSum(function(d) { return d[D2_D]; });

  m_.dateCntCreate();
  let gpDateStk = dimDate.group().reduce(
    (p, v) => {//add
      p.lv_b += v[D2_P];//感染者
      p.lv_e += v[D2_D];//死亡
      let pl1 = v[D2_PL1];
      let reg = v[D2_REG]
      if (p.ncnt[pl1] === undefined) p.ncnt[pl1] = [0, 0];
      p.ncnt[pl1][0] += v[D2_P];
      p.ncnt[pl1][1] += v[D2_D];
      if (p.rcnt[reg] === undefined) p.rcnt[reg] = [0, 0];
      p.rcnt[reg][0] += v[D2_P];
      p.rcnt[reg][1] += v[D2_D];
      p.total[0] += v[D2_P];
      p.total[1] += v[D2_D];
      return p;
    },
    (p, v) => {//remove
      p.lv_b -= v[D2_P];//感染者
      p.lv_e -= v[D2_D];//死亡
      let pl1 = v[D2_PL1];
      let reg = v[D2_REG]
      if (p.ncnt[pl1] === undefined) p.ncnt[pl1] = [0, 0];
      p.ncnt[pl1][0] -= v[D2_P];
      p.ncnt[pl1][1] -= v[D2_D];
      if (p.rcnt[reg] === undefined) p.rcnt[reg] = [0, 0];
      p.rcnt[reg][0] -= v[D2_P];
      p.rcnt[reg][1] -= v[D2_D];
      p.total[0] -= v[D2_P];
      p.total[1] -= v[D2_D];
      return p;
    },
    (p, v) => {//init
      return { ncnt: {}, rcnt: {}, ncntd: {}, rcntd: {}, lv_b: 0, lv_e: 0, total: [0, 0] };
    }
  );
  //.order(function(d) {return d.total;});

  m_.chartDate
    .centerBar(true)
    .transitionDuration(750)
    .dimension(dimDate)
    .elasticY(true)
    .group(gpDateStk, CND_LV_E, function(d) {
      let is_lv_mode = m_.chartWorld.filters().length < 2 && m_.chartRegion.filters().length === 0
      return is_lv_mode ? (m_.lv_type ? d.value.lv_e : 0) : 0;
    })
    .stack(gpDateStk, CND_LV_B, function(d) {
      let is_lv_mode = m_.chartWorld.filters().length < 2 && m_.chartRegion.filters().length === 0
      return is_lv_mode ? (m_.lv_type ? 0 : d.value.lv_b) : 0;
    })
    .hidableStacks(false)
    .yAxisPadding('12%')
    .renderLabel(true)
    .label(function(d, i) {
      let ymd = moment(d.x).format('YYYYMMDD');
      let total = d.data.value.total[m_.lv_type];
      return (total === m_.dateCntMax //最大
        || ymd === m_.dateCntTo //最新日付
        //  ||ymd===moment(m_.dateCntTo).subtract(1, 'days').format('YYYYMMDD') //最新日付-1days
      ) ? (total === 0 ? '' : php_number_format(total)) : '';
    })
    .ordinalColors([COND_COL_E, COND_COL_B].concat(m_.chartRegionColors).concat(m_.chartWorldColors))
    .gap(gap_val).on('filtered', function(chart, v) {
      //m_.showFilterUi('#panel_date',chart,(f)=>moment(f).format('M/D(ddd)'));
      m_.on_chart_filtered(chart, v);
    })
    ;
  //m_.chartDate.yAxis().ticks(5); //tickFormat(d3.format("s"));

  //
  //region stack    
  //
  if (1) {
    function sel_stack_region(chart, ri) {
      return function(d, i) {
        let flt = m_.chartRegion.filters();
        if (flt.length && m_.chartWorld.filters().length === 0) {
          ret = $.inArray(ri, flt) !== -1 ? (d.value.rcnt[ri] && d.value.rcnt[ri][m_.lv_type] || 0) : 0;
          return ret;
        } else {
          return 0;
        }
      }
    }

    let regions = _.sortBy(m_.chartRegion.group().all(), d => -d.value);
    for (var i = 0; i < regions.length; i++) {
      let code = regions[i].key;
      let name = WORLD_REGIONS[code][0];
      m_.chartDate.stack(gpDateStk, name, sel_stack_region(m_.chartDate, code));
    }
  }

  //
  //world stack
  //
  if (1) {
    function sel_stack(chart, no) {
      return function(d, i) {
        let flt = m_.chartWorld.filters();
        let pref_mode = flt.length > 1 && m_.chartRegion.filters().length === 0;
        if (pref_mode) {
          chart.stack()[CHART_YM_STACK1_N + no - 1].name = flt[no - 1];
          return d.value.ncnt[flt[no - 1]] === undefined ? 0 : d.value.ncnt[flt[no - 1]][m_.lv_type];
        } else {
          chart.stack()[CHART_YM_STACK1_N + no - 1].name = '(選択' + no + ')';
          return 0;
        }
      }
    }
    for (var no = 1; no < CHART_YM_STACK2_N; no++) {
      m_.chartDate.stack(gpDateStk, '(選択' + no + ')', sel_stack(m_.chartDate, no));
    }
  }

  //===========================================================================
  // lineChart chartDate_init
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
        let all = m_.lv_type ? m_.gpDateD.all() : m_.gpDate.all();
        m_.work = _.values(_.mapValues(all, d => d.value));
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
  // lineChart composite_init
  //===========================================================================
  m_.composite
    .width(chartDateW)
    .height(!IS_SP ? 250 : 200)
    //左
    .margins({ top: 0, right: 0, bottom: 20, left: 35 })
    .legend(dc.legend().x(IS_SP ? (chartDateW - 150) : 200).y(0))         //右
    // .margins({top: 0, right: 0, bottom: 20, left: 35})
    // .legend(dc.legend().x(chartDateW-500).y(0))
    .x(d3.scaleTime().domain(m_.domainDate))
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
        //N日 移動平均
        return date_str + '\n週間移動平均: ' + php_number_format(d.value) + '名';
      }

      let flt = m_.chartWorld.filters();
      let fltr = m_.chartRegion.filters();
      let is_lv_mode = flt.length < 2 && fltr.length === 0;
      let is_reg_mode = flt.length === 0 && fltr.length;;

      if (is_lv_mode) {
        return date_str + '\n────────\n' +
          (d.value.lv_b === 0 ? '' : CND_LV_B + ': ' + php_number_format(d.value.lv_b) + '名\n') +
          (d.value.lv_e === 0 ? '' : CND_LV_E + ': ' + php_number_format(d.value.lv_e) + '名\n') +
          '────────\n計: ' + php_number_format(d.value.lv_b + d.value.lv_e) + '名' + '\n'
          + s_suf
          ;
      }

      let cnt = is_reg_mode ? d.value.rcnt : d.value.ncnt;
      let s = '', total = 0, n = 0;
      _.forEach(cnt, (d, f) => {
        let num = d[m_.lv_type];
        if (num === 0) return;
        fname = is_reg_mode ? WORLD_REGIONS[f][0] : f;
        s += d ? (fname + ': ' + php_number_format(num) + '名\n') : '';
        total += num;
        n++;
      });
      return date_str + '\n────────\n' + s + (n > 1 ? '────────\n計: ' + php_number_format(total) + '名' : '') + '\n' + s_suf;
    })
    //.on('renderlet', function(chart, filter){})
    .on('pretransition', m_.on_chartDate_pretransition)
    .addFilterHandler(m_.addFilterHandlerSingle)
    .on('preRedraw', function(chart) {
      m_.chartDateLegendUpdate();
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
  });
  m_.composite.yAxis().ticks(5).tickFormat(d3.format("~s"));//1.5k

  if (!IS_SP) {
    m_.panelResize();
    m_.composite.useViewBoxResizing(true);
  }

  //===========================================================================
  // CHART rowChart chartCondSel_init 選択の為のチャート
  //===========================================================================
  let max_p = _.sum(_.map(m_.gpDate.all(), 'value'));
  let max_d = _.sum(_.map(m_.gpDateD.all(), 'value'));
  let ndx3 = crossfilter([['感染', max_p], ['死亡', max_d]]);
  var dimCondSel = ndx3.dimension(function(d) {
    return d[0];
  });
  var gpCondSel = dimCondSel.group().reduceSum(function(d) { return d[1] });
  m_.chartCondSel
    .width(IS_SP ? parseInt(window.innerWidth / 2) - 30 : 200)
    .height(24 + (Object.keys(gpCondSel.all()).length * 29))
    .fixedBarHeight(24)
    .margins({ top: 0, left: 10, right: 10, bottom: 20 })
    .transitionDuration(750)
    .dimension(dimCondSel)
    .group(gpCondSel)
    .renderLabel(true)
    .titleLabelOffsetX(0)
    .ordinalColors([COND_COL_B, COND_COL_E])
    .renderTitleLabel(true)
    .title(function(d) { return php_number_format(d.value); })
    .elasticX(true)
    .addFilterHandler(function(filters, filter) {
      // if(window.event && (window.event.ctrlKey||window.event.shiftKey)){
      //     //filters.push(filter);return filters; //add select
      // }else{
      return [filter]; //single select
      // }
    })
    .on('filtered', function(chart, v) {
      //m_.showFilterUi('#panel_condsel',chart,(f)=>moment(f).format('M/D(ddd)'));
      //LV表示モードを切り替える
      let flt = chart.filters();
      while (flt.length) {
        let t = $('#panel_date .chart-title');
        if ($.inArray('感染', flt) !== -1) { m_.lv_type = 0; t.html('<i class="fa fa-procedures"></i>感染者数'); break; }
        if ($.inArray('死亡', flt) !== -1) { m_.lv_type = 1; t.html('死亡者数'); break; }
        break;
      }

      m_.chartRegion.group(m_.lv_type ? m_.gpRegionD : m_.gpRegion).render();
      m_.chartWorld.render();
      if (m_.config.cDateYm.is_elasticY) {
        let all = m_.lv_type ? m_.gpDateD.all() : m_.gpDate.all();
        let max = _.max(_.map(all, 'value'))
        //let max=_.maxBy(m_.chartDate.group().all(),d=>d.value.total[m_.lv_type]).value.total[m_.lv_type];
        m_.chartDate.y(d3.scaleLinear().domain([0, max + 10])); //高さ範囲再計算
        m_.composite.render();
      }
    })
    ;
  m_.chartCondSel.xAxis().ticks(0).tickFormat(d3.format("d"));
  m_.chartCondSel.filter(m_.is_lv_mode ? '死亡' : '感染');

  if (IS_SP) {
    $('#btn_search')
      .attr({ placeholder: 'フィルタ', title: '国名や日付の入力でグラフのフィルタリングが行えます。' })
      .on('focus', function(event) {
        event.preventDefault();
        $(this).css('width', '10em');
      })
      .on('blur', function(event) {
        event.preventDefault();
        $(this).css('width', '6em');
      });

  } else {
    $('#btn_search').attr({ placeholder: '国名や日付でフィルタ', title: '国名や日付の入力でグラフのフィルタリングが行えます。\nショートカットキー\n　フォーカス : Ctrl+Shift+F\n　全クリア : Ctrl+Shift+L' });
  }

  m_.parseURLParams();

  if (!m_.chartAllFilterByKW_render) m_.renderAllChart();


  $('#btn_search').on('focus', function(e) {
    _.delay(() => $(this).select(), 7);
  });

  $('#div_date').scrollLeft(800);

  //drawWorldMap();

  if (!IS_SP) { $('#btn_search').focus(); $('.ui-tooltip').hide(); }

  $('#btn_download_csv').button().on('click', function(event) {
    event.preventDefault();

    //let dt=m_.ndx2.allFiltered();//order by pref
    let dt = _.sortBy(m_.ndx2.allFiltered(), d => d[D2_PL1]);//order by world
    let csv = '地域,国名,日付,感染者数,死亡者数\n';
    for (var i = 0; i < dt.length; i++) {
      //     0    1            2   3   4:WORLD_REGIONS
      //["中国", "2020-01-22", 440, 9, 5]
      csv += `${WORLD_REGIONS[dt[i][4]][0]},${dt[i][0]},${dt[i][1]},${dt[i][2]},${dt[i][3]}\n`;
    }
    //let csv = 'あいうえお,かきくけこ,さしすせそ\nあいうえお,かきくけこ,さしすせそ';

    let flt_name = $('.hdr_flt').text().replace('の状況', '');
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const filename = "covid19 - [" + flt_name + "].csv";
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


}

const initTabs = () => {
  $('#chart_map_title').show();
  m_.tab = $('#chart_map').tabs({
    active: 0,
    activate: function(event, ui) {
      m_.sel_tab = ui.newPanel.attr('id');
      if (m_.sel_tab !== 'tabs_w') {
        location.href = 'covid19.html?tab=' + m_.sel_tab.replace('tabs_', '');
      }
      if (!IS_SP) $('#btn_search').focus().select();
    },
    create: function(event, ui) {
      $('#chart_map .ui-widget-header').append($('<span class="ui-icon ui-icon-circle-close sp_icon btn_close" ch_id="ch_pnl_map" style="float:right;top: 8px;"></span>'));
    }
  });
}

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
        kw = kw.toLocaleLowerCase();

        response(_.filter(_this.options.user_opt.data, (d) => {
          let al = kw[0].match(/[a-z]/i) ? 1 : 0;
          return al ? d[2].toLocaleLowerCase().indexOf(kw) !== -1 : (WORLD_REGIONS[d[0]][0].indexOf(kw) !== -1 || d[1].indexOf(kw) !== -1);
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
          ul.append("<li class='ac_ex-cate'>" + icon + WORLD_REGIONS[item[0]][0] + "</li>");
          currentType = item[0];
        }
        li = that._renderItemData(ul, item);
        //if (item[0]) {li.attr("aria-label", item[0] + " : " + item.label);}
      });
    },
    _renderItem: function(ul, row) {
      let v = this.element.val().trim();
      if (this.options.user_opt.multiple) v = _.last(v.split(this.options._usr.AC_SPLIT_WD));
      //let is_cate_none = row[0]==='';
      let html = row[1];
      let bv = '<span class="ac_ex-kwd">' + v.toUpperCase() + '</span>';
      html = html.replace(new RegExp(v, 'gi'), bv);
      let src = row[2] !== '' ? 'img/world/' + row[2] + '.png' : '';
      icon = '<img width="30" src="' + src + '" onerror="this.src=\'/' + IMG_NO + '\'" />';
      html = icon + html;
      return $("<li class='ac_ex-item'>").append($('<div>').html(html + '(' + php_number_format(row[3]) + ')')).appendTo(ul);
    }
  });
}

var mapw;
const drawWorldMap = () => {
  $("#world-map").empty();

  let series_scale = { "100万人以上": "#8c0a00", "50万人以上": "#ea5432", "10万人以上": "#ff781d", "5万人以上": "#ff9d57", "1万人以上": "#ffceab", "1000人以上": "#f5deb3", "選択中": "#ffffff" };

  let colors = {};
  m_.chartWorld.group().all().forEach(function(d) {
    let v = d.value[m_.lv_type];
    while (1) {
      if (v > 999999) { col = MAP_COL_TBL[0][1]; break; }
      if (v > 499999) { col = MAP_COL_TBL[1][1]; break; }
      if (v > 99999) { col = MAP_COL_TBL[2][1]; break; }
      if (v > 49999) { col = MAP_COL_TBL[3][1]; break; }
      if (v > 9999) { col = MAP_COL_TBL[4][1]; break; }
      if (v > 0) { col = MAP_COL_TBL[5][1]; break; }
      col = MAP_COL_TBL[6][1];
      break;
    }
    if (m_.world_tbl[d.key] !== undefined) {
      colors[m_.world_tbl[d.key][0]] = col;
    }
  });

  //param: https://jvectormap.com/documentation/javascript-api/jvm-dataseries/
  mapw = $('#world-map').vectorMap({
    map: 'world_mill',
    panOnDrag: !IS_SP,
    focusOn: {
      x: 0.5,
      y: 0.5,
      scale: 1,
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
        'stroke-width': 2
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
    onRegionTipShow: (e, el, code) => { //hover
      let nm = '';
      _.forEach(m_.world_tbl, (d, k) => { if (d[0] === code) nm = k; });
      let ft = m_.world_tbl[nm];
      if (nm === '') return;
      let f = _.findLast(m_.world, d => d[0] === nm);
      if (!f) return;
      let html = nm + '<br />' +
        '感染者数: ' + php_number_format(ft[2]) + '名' + (!ft || ft[4] === 0 ? '' : ' ▲' + php_number_format(ft[4])) + '<br />' +
        '死亡者数: ' + php_number_format(ft[3]) + '名' + (!ft || ft[5] === 0 ? '' : ' ▲' + php_number_format(ft[5])) + '<br />' +
        '死亡率(死亡/感染): ' + _.round(ft[3] / ft[2], 2) + '%';
      el.html(html);
    },
    onRegionSelected: (e, name, is_on) => {
      if (m_.is_filter_region_sel) return;
      $('#ch_pnl_world').prop('checked', false).trigger('click');
      let flts = mapw.getSelectedRegions();//RU
      let a = flts.map(x => mapw.mapData.paths[x].name);//Russia
      //国チャートフィルタ
      m_.chartWorldFilters(flts, name, is_on);
      m_.is_drawWorldMap = 0;
    }
    //onMarkerTipShow:(e, el, code) =>{},
    //onMarkerClick: (e, code) => {}
  })
    .vectorMap('get', 'mapObject');

  mapw.series.regions[0].setValues(colors);
  $('.jvectormap-legend-tick-sample:last').css({ 'border': '3px solid #1a75ff' });

}


$(document).ready(function() {

  if (IS_SP) {
    $('#toolbar_togwin').insertAfter('#panels');
  }

  initTabs();

  $('.btn_clear_all').on('click', function(e) {
    e.preventDefault();
    $('#btn_search').val('');
    $('.filter_txt').text('');
    $('.btn_brush').trigger('my_update', 1);//off

    m_.is_drawWorldMap = 1;

    if ($('#ui-datepicker-div').is(':visible')) m_.datePick.datepicker('show');

    //chartGroup2
    dc.filterAll('chartGroup2');
    m_.chartCondSel.filter(m_.lv_type ? '死亡' : '感染');
    dc.renderAll("chartGroup2");
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
    //duration: 200,
    //showOptions: {effect: "show",duration:3000,easing:'easeOutQuart'},
    showOtherMonths: true,
    numberOfMonths: IS_SP ? [1, 3] : [2, 4],
    showCurrentAtPos: IS_SP ? 2 : 4 + 3,
    stepMonths: IS_SP ? 3 : 4,
    position: { //左
      of: $(window)
      , my: "center"
      , at: "center"
      //,at2: 'left bottom-20' // used when "usePreview" is false
      , collision: 'fit fit'
    },
    onSelect: function(dateText, inst) {
      $('#btn_search').val(dateText).trigger('btn_search_update');
    },
    beforeShowDay: function(date) {
      let ret = [];
      let y = date.getFullYear();
      let m = php_printf02d(date.getMonth() + 1);
      let d = php_printf02d(date.getDate());
      let ymd = y + m + d;

      ret[0] = 1;//is_selectable

      //休日であれば休日のスタイルにする
      ret[1] = ($.datepicker.regional['ja'] && $.datepicker.regional["ja"].holidays[ymd] !== undefined) ? 'holiday' : '';
      let n = m_.dateCnt[ymd] || 0;
      while (1) {
        if (n > 999999) { ret[1] += ' c1000'; break; }
        if (n > 499999) { ret[1] += ' c500'; break; }
        if (n > 99999) { ret[1] += ' c100'; break; }
        if (n > 49999) { ret[1] += ' c50'; break; }
        if (n > 9999) { ret[1] += ' c10'; break; }
        if (n > 0) { ret[1] += ' c1'; break; }
        break;
      }
      if (n !== 0) { ret[2] = php_number_format(m_.dateCnt[ymd]) + '名'; } //tooltip
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

  $('.btn_close').button().on('click', function(event) {
    event.preventDefault();
    $('#' + $(this).attr('ch_id')).trigger('click');
  });

  $('.btn_close2').button().on('click', function(event) {
    event.preventDefault();
    $(this).closest('tr').hide();
  });

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

  if (!IS_SP) {
    $('.drag').draggable({
      snap: true
      , snapTolerance: IS_SP ? 80 : 20
      , cursor: "move"
      , handle: ".chart-title"
    });
  }

  if (!IS_SP) {
    window.onresize = function() {
      m_.panelResize();
    }
  }

  //$('#chart_map').resizable();


  m_.keyboardTargetChange('world');

  m_.initSearchKeybord();


});


$(document).ready(function() {
  //チェックボックスにより、関連するパネルをtoggleする
  const panel_chboxes = [
    { ch: '#ch_pnl_world', div: '#panel_world' }
    , { ch: '#ch_pnl_cond', div: '#panel_region' }
    , { ch: '#ch_pnl_date', div: '#panel_date' }
    , { ch: '#ch_pnl_map', div: '#chart_map' }
    , { ch: '#ch_pnl_detail', div: '#panel_detail' }
  ];
  function ch_pnl_set_event(d) {
    let ch = $(d['ch']);
    let div_sel = d['div'];
    ch
      .on('update', function() {
        let o = $(div_sel);
        if ($(this).is(':checked')) {
          o.show();
        } else {
          o.hide();
        }
        if (!IS_SP) m_.panelResize();
      })
      .on('change', function() {
        $(this).trigger('update');
      })
    if (!ch.is(':checked')) ch.trigger('update');
  }
  for (var i = 0; i < panel_chboxes.length; i++) {
    ch_pnl_set_event(panel_chboxes[i]);
  }
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
  })
  //titleをHTMLでpopupさせたい時はこれを使用
  .tooltip({
    items: "[tt_title]",
    show: { effect: "show", delay: 500 },
    hide: 0,
    content: function() {
      return $(this).attr('tt_title');
    }
  });


$(document).ready(function() {
  m_.loadData();
});

