﻿# New coronavirus Infected person multidimensional chart

[JAPANESE](README.md)

Visualize the situation of domestic and overseas infected people of the new coronavirus with [Dimensional chart(dc.js)](http://dc-js.github.io/dc.js/).

You can filter the chart by any item by clicking the item in the graph such as prefecture, number of infected people, age, symptom, occupation, or by inputting the keyword.

The charts can be switched and compared with one click, making it easy to analyze in multiple dimensions.

![image](img/hlp/covid19-dc-demo-v1.gif)

 
### Demo page
- [📊Covid19 Infection Status in Japan](https://sakanaclub.xsrv.jp/dc/covid19/data=covid19-data-2021-02-28.json)
- [📊Covid19 Infection Status in 🌎World](https://sakanaclub.xsrv.jp/dc/covid19_wld/data=default)
  
### Data source
- Data is obtained from infection information published by each local government and materials released by the Ministry of Health, Labor and Welfare
- List of source URLs [here](data/covid19_pref_url.csv)


### starting method
- Open the [covid19.html](covid19.html) file in your browser
- open the following file in your browser:
  - `📊Covid19 Infection Status in Japan` [covid19.html](covid19.html)
  - `📊Covid19 Infection Status in 🌎World` [covid19-world.html](covid19-world.html)

### About URL parameters
If you specify the following parameters in the URL and start up, the chart will be displayed in a filtered state.

The main parameters are as follows.

|Category|Name||Example||
|:---|:---|:--|:--|:--|
|Filter|name|Prefecture name|name=福岡県||
||||name=福岡県+佐賀県  |Multiple formats|
||date|date|date=4-11　　 |single day format. April 11|
|||　　　　|date=4-4+5-8  |range date format. April 4th to May 8th
|||　　　　|date=4-4+14   |range date format 2. April 4 + 14days
||q|Search keyword|q=北九州市 |City|
|||               |q=看護師　 |Occupation|
|||               |q=入院　　 |state|
|Data|data *1|Infector information file name|data=covid19-usa.json|JSON Format
|||                                      |data=covid19-usa.csv|CSV Format

*1 Parameters that can be used only when running on a WEB server

| Example ||
|:---|:---|
| In the case of Fukuoka Prefecture |
|https://sakanaclub.xsrv.jp/dc/covid19/name=福岡県|
| In the case of [Tokyo, Kanagawa, Saitama and Chiba] |
|https://sakanaclub.xsrv.jp/dc/covid19/name=東京都+神奈川県+埼玉県+千葉県|
| Fukuoka Prefecture 4/4 (Mon)-5/2 (Sat) Occupation: In case of nurse situation |
|https://sakanaclub.xsrv.jp/dc/covid19/name=福岡県&date=4-4+5-2&q=看護師|

　

### How to change the data of the displayed chart?
Regarding the attributes of the infected person, the original data is [CSV file (covid19-data.csv)](data/covid19-data.csv).
You can modify the contents of this file to visualize other types of data.
The format is roughly as follows.

![image](https://sakanaclub.xsrv.jp/img/hlp/csv_format.gif)

After changing the contents of this file,

-**If running on a web server**

Change the data of URL parameter as follows.

[https://sakanaclub.xsrv.jp/dc/covid19/**data=covid19-data.csv**](https://sakanaclub.xsrv.jp/dc/covid19/data=covid19-data.csv)

-**If running locally**

Update the data used in the commands below.
```
$ cd data
$ make covid19-data.js
```
　
### How to get data of infected person information of each local government?
 [Makefile](data/Makefile) in the data directory contains some functions to download or parse the infected person information (CSV, HTML or PDF format) published by each local government and generate CSV. I will.
You can also get it by using this.

**Example**
```
$ cd data

# Download Hokkaido data
$ make dwn_hokkaido

# Download data for all municipalities
$ make dwn_all

#Clean download data
$ make clean
```
## 📊Multidimensional chart demo for other fields
- [List of missing persons due to Noto Peninsula earthquake @2024/1/1](https://sakanaclub.xsrv.jp/dc/covid19/data=quake-noto-safety.csv)
- [Tokyo gubernatorial election votes by candidate @2024/7/7](https://sakanaclub.xsrv.jp/dc/covid19/data=tokyo-gubernatorial-election.csv)
- 📺🎮Tv Game
  - [home video game consoles - 4th generation](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gen4.csv)
    - [NES](https://sakanaclub.xsrv.jp/dc/covid19/data=game-fc.csv) | [SNES](https://sakanaclub.xsrv.jp/dc/covid19/data=game-smc.csv) | [Genesis](https://sakanaclub.xsrv.jp/dc/covid19/data=game-smd.csv) | [TurboGrafx-16](https://sakanaclub.xsrv.jp/dc/covid19/data=game-pce.csv)
  - Handheld game consoles: [Game Boy](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gb.csv) | [Game Boy Advance](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gba.csv) | Nintendo DS | PSP | Nintendo Switch
  - home video game consoles - 5th generation
    - [NINTENDO64](https://sakanaclub.xsrv.jp/dc/covid19/data=game-n64.csv) | [Playstation1](https://sakanaclub.xsrv.jp/dc/covid19/data=game-ps1.csv) | SEGA SATURN | [NEOGEO](https://sakanaclub.xsrv.jp/dc/covid19/data=game-ac.csv&name=SNK&date=1990-01-01+2005-01-01)
  - [home video game consoles - 3~5th generatio](https://sakanaclub.xsrv.jp/dc/covid19/data=game-gen3.csv)
  - [Arcade Video games 1974～2024](https://sakanaclub.xsrv.jp/dc/covid19/data=game-ac.csv)
  - [MSX](https://sakanaclub.xsrv.jp/dc/covid19/data=game-msx.csv)
- Sports
  - [⚾List of High School Baseball Championship in Japan](https://sakanaclub.xsrv.jp/dc/covid19/data=sports-hsb.csv)
- Food
  - [🍜List of Ramen in Japan](https://sakanaclub.xsrv.jp/dc/covid19/data=food-ramen.csv)
- Regional Economic Analysis
  - [「Agricultural output by product」2016～2021 @japan](https://sakanaclub.xsrv.jp/dc/covid19/data=resas-agriculture.csv)
  - [「Number of visitors by nationality to designated regions」1994～2021](https://sakanaclub.xsrv.jp/dc/covid19/data=resas-tourism-foreigners.csv)
  - [「Annual product sales」1994～2021 @japan](https://sakanaclub.xsrv.jp/dc/covid19/data=resas-product-sales.csv)
  - [「Number of companies (by city, town, village, industry classification, and industry)」2009～2016 @japan](https://sakanaclub.xsrv.jp/dc/covid19/data=resas-municipality-company.csv)
  - [population composition @japan](https://sakanaclub.xsrv.jp/prefecture-population-dc/?data=population.csv)
  
## Related projects and sites
- [covid19-dc-vue-admin](https://github.com/yoshinaga-ken/covid19-dc-vue-admin)
