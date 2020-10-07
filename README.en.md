# New coronavirus Infected person multidimensional chart

[JAPANESE](README.md)

Visualize the situation of domestic and overseas infected people of the new coronavirus with [Dimensional chart(dc.js)](http://dc-js.github.io/dc.js/).

You can filter the chart by any item by clicking the item in the graph such as prefecture, number of infected people, age, symptom, occupation, or by inputting the keyword.

The charts can be switched and compared with one click, making it easy to analyze in multiple dimensions.

![image](img/hlp/covid19-dc-demo-v1.gif)

 
### Demo page
- New coronavirus infection status
- https://sakanaclub.xsrv.jp/dc/covid19

### Data source
- Data is obtained from infection information published by each local government and materials released by the Ministry of Health, Labor and Welfare
- List of source URLs [here](data/covid19_pref_url.csv)


### starting method
- Open the [covid19.html](covid19.html) file in your browser


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
## Related projects and sites

- [covid19-dc-vue-admin](https://github.com/yoshinaga-ken/covid19-dc-vue-admin)
- [Japan's population multidimensional chart](https://sakanaclub.xsrv.jp/prefecture-population-dc/?data=population.csv)
