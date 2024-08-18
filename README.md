# 新型コロナウイルス 感染者状況 多次元チャート

[ENGLISH](README.en.md)

新型コロナウイルスの、国内・海外の感染者の状況を[Dimensional chart(dc.js)](http://dc-js.github.io/dc.js/)で可視化。

都道府県、感染者数、年齢、症状、職業といったグラフの項目のクリックやキーワード入力によって、任意の項目でのチャートのフィルタリングが行えます。

ワンクリックでチャートの切り替えと比較が可能な為多次元での分析がしやすくなっています。

![image](img/hlp/covid19-dc-demo-v1.gif)

 
### デモページ
- [📊新型コロナウイルス 日本国内 感染状況](https://sakanaclub.xsrv.jp/dc/covid19/data=covid19-data-2021-02-28.json)
- [📊新型コロナウイルス 🌎世界 感染状況](https://sakanaclub.xsrv.jp/dc/covid19_wld/data=default)

### データソース
- データは各自治体が公開する感染情報や厚生労働省の発表資料より取得しています
- 取得先のURL一覧は[こちら](data/covid19_pref_url.csv)


### 起動方法
- 以下のファイルをブラウザで開いてください
  - `📊新型コロナウイルス 日本国内 感染状況`は[covid19.html](covid19.html)
  - `📊新型コロナウイルス 🌎世界 感染状況`は[covid19-world.html](covid19-world.html)

### URLパラメタについて
URLに以下のパラメタを指定して起動するとチャートがフィルタリングされた状態で表示されます。

主なパラメタは以下になります。

|カテゴリ|名前||例||
|:---|:---|:--|:--|:--|
|フィルタ|name|都道府県名|name=福岡県||
||||name=福岡県+佐賀県  |複数形式|
||date|日付|date=4-11　　 |単一日形式。4月11日|
|||　　　　|date=4-4+5-8  |範囲日形式。4月4日~5月8日
|||　　　　|date=4-4+14   |範囲日形式2。4月4日 + 14days
||q|検索キーワード|q=北九州市 |市区町村|
|||               |q=看護師　 |職業|
|||               |q=入院　　 |状態|
|データ|data ※1|感染者情報ファイル名|data=covid19-usa.json| JSON形式
|||                        |data=covid19-usa.csv| CSV形式

※1 WEBサーバー上で動かしている場合のみ使用可能なパラメタ

|例||
|:---|:---|
|福岡県 の状況の場合|
|https://sakanaclub.xsrv.jp/dc/covid19/name=福岡県|
|【東京都と神奈川県と埼玉県と千葉県】の状況の場合|
|https://sakanaclub.xsrv.jp/dc/covid19/name=東京都+神奈川県+埼玉県+千葉県|
|福岡県 4/4(月)～5/2(土) 職業:看護師 の状況の場合|
|https://sakanaclub.xsrv.jp/dc/covid19/name=福岡県&date=4-4+5-2&q=看護師|
　

### 表示されているチャートのデータを変更する方法は？
感染者の属性関しての元データは[CSVファイル(covid19-data.csv)](data/covid19-data.csv)です。
このファイルの内容を変更すれば他のタイプのデータの視覚化にも利用できます。
おおよそ以下のようなフォーマットになっています。

![image](https://sakanaclub.xsrv.jp/img/hlp/csv_format.gif)

このファイルの内容を変更した後は、

- **WEBサーバー上で動かしている場合**

URLパラメタのdataを以下のように変更して下さい。

[https://sakanaclub.xsrv.jp/dc/covid19/**data=covid19-data.csv**](https://sakanaclub.xsrv.jp/dc/covid19/data=covid19-data.csv)

- **ローカルで動かしている場合**

以下のコマンドで使用されるデータを更新して下さい。
```
$ cd data
$ make covid19-data.js
```
　
### 各自治体の感染者情報のデータを取得する方法は？
dataディレクトリの[Makefile](data/Makefile)には、各自治体が公開している感染者情報(CSVやHTMLやPDF形式)を、ダウンロードやパースしてCSVを生成する機能がいくつか含まれています。
これを利用して取得する事もできます。

**例:**
```
$ cd data

# 北海道のデータをダウンロード
$ make dwn_hokkaido

# 全ての自治体のデータをダウンロード
$ make dwn_all

# ダウンロードデータをクリーン
$ make clean
```

## 関連プロジェクトやサイト
- 📊DCチャートデモ
  - [能登半島地震安否不明者一覧 @2024/1/1](https://sakanaclub.xsrv.jp/dc/covid19/data=quake-noto-safety.csv)
  - [東京都知事選挙　候補者別得票数 @2024/7/7](https://sakanaclub.xsrv.jp/dc/covid19/data=tokyo-gubernatorial-election.csv)
  - ゲームソフト
     - [第4世代](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gen3.csv) :  [ファミコン](https://sakanaclub.xsrv.jp/dc/covid19/data=game-fc.csv) | [スーパーファミコン](https://sakanaclub.xsrv.jp/dc/covid19/data=game-smc.csv) | [メガドライブ](https://sakanaclub.xsrv.jp/dc/covid19/data=game-smd.csv) | [PCエンジン](https://sakanaclub.xsrv.jp/dc/covid19/data=game-pce.csv)
     - [ゲームボーイ](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gb.csv) | [ゲームボーイアドバンス](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gba.csv)
     - [NINTENDO64](https://sakanaclub.xsrv.jp/dc/covid19/data=game-n64.csv) 
  - [「品目別農業産出額」期間：2016年～2021年](https://sakanaclub.xsrv.jp/dc/covid19/data=resas-agriculture.csv)
  - [日本の人口構成 (表示方式検証中)](https://sakanaclub.xsrv.jp/prefecture-population-dc/?data=population.csv)
- [covid19-dc-vue-admin](https://github.com/yoshinaga-ken/covid19-dc-vue-admin)
