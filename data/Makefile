#===========================================================================
# covid19 Data make Utility
# USAGE:
# 	make <tareget_file>
# EXSAMPLE:
# 	#covid19-data.csv より covid19-data.js を作る
# 	make covid19-data.js
#===========================================================================

PHP=/usr/bin/php
PYTHON=/usr/bin/python3.6
NODE=node
RUBY=/usr/bin/ruby

DBHOST=127.0.0.1
DBSCHM=covid19
dbhttpd=`cut -f1 -d: ${HOME}/../dbauth/httpd`
dbhttpdpass=`cut -f2 -d: ${HOME}/../dbauth/httpd`
MYSQL=mysql --default-character-set=utf8 --auto-rehash -u$(dbhttpd) -p$(dbhttpdpass) -h $(DBHOST) $(DBSCHM)
MYSQLD=mysqldump --default-character-set=utf8 --skip-opt --create-options --add-drop-table --complete-insert -u$(dbadm) -p$(dbadmpass) -h $(DBHOST) $(DBSCHM)

XLS2CSV=/usr/bin/xlsx2csv
XMLLINT=xmllint --html --format --encode SJIS
WGET=wget

DWN_DATA_DIR=./
DWN_PRE=jpn-

SRC= \
	csv2json.php \
	dom_parse.js \
	pdf2csv.py

usage:
	@echo "covid19 Data make Utility"
	@echo "USAGE:"
	@echo "	make <tareget_file>"
	@echo "EXSAMPLE:"
	@echo "	# covid19-data.csv より covid19-data.js を作る"
	@echo "	make covid19-data.js"
	@echo "	# レコード数過去のデータと比較"
	@echo "	make covid19-assets.json.obj-vimdiff PATH_DATA_OLD=2021-10-31"
	@echo "TARGETS:"
	@grep "^\w*:" Makefile | awk -F : '{printf("\t%-24s:%s\n",$$1,$$2)}'
	@egrep "^%\." Makefile | awk -F : '{printf("\t%-24s:%s\n",$$1,$$2)}'

# USAGE: make covid19-assets.json.obj-vimdiff PATH_DATA_OLD=

#全ての自治体のよりデータをダウンロード
dwn_all: \
		dwn_hokkaido \
		dwn_aomori \
		dwn_iwate \
		dwn_miyagi \
		dwn_akita \
		dwn_yamagata \
		dwn_fukushima \
		dwn_ibaraki \
		dwn_tochigi \
		dwn_gunma \
		dwn_tokyo \
		dwn_kanagawa \
		dwn_niigata \
		dwn_toyama \
		dwn_ishikawa \
		dwn_fukui \
		dwn_yamanashi \
		dwn_nagano \
		dwn_gifu \
		dwn_shizuoka \
		dwn_mie \
		dwn_shiga \
		dwn_kyoto \
		dwn_osaka \
		dwn_hyogo \
		dwn_nara \
		dwn_wakayama \
		dwn_tottori \
		dwn_shimane \
		dwn_okayama \
		dwn_hiroshima \
		dwn_yamaguchi \
		dwn_tokushima \
		dwn_kagawa \
		dwn_ehime \
		dwn_kochi \
		dwn_fukuoka \
		dwn_saga \
		dwn_nagasaki \
		dwn_kumamoto \
		dwn_oita \
		dwn_miyazaki \
		dwn_kagoshima

dwn_pdf: \
		dwn_chiba \
		dwn_saitama \
		dwn_aichi \
		dwn_okinawa

clean:
	-rm $(DWN_PRE)*
	-rm tmp


#北海道
#TAG:data_csv
#http://www.pref.hokkaido.lg.jp/hf/kth/kak/hasseijoukyou.htm
dwn_hokkaido:
	@echo "■hokkaido"
	-mv -b "$(DWN_DATA_DIR)/$(DWN_PRE)北海道.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)北海道-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)北海道.csv" "https://www.harp.lg.jp/opendata/dataset/1369/resource/2828/patients.csv"

#青森県
#TAG:data_csv,url_change
#https://opendata.pref.aomori.lg.jp/dataset/1531.html
dwn_aomori:
	@echo "■aomori"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)青森県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)青森県-bak.csv"
	-$(WGET) -O$(DWN_DATA_DIR)/tmp "https://opendata.pref.aomori.lg.jp/dataset/1531/resource/11777/02_20200814_%E9%99%BD%E6%80%A7%E6%82%A3%E8%80%85%E9%96%A2%E4%BF%82.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)青森県.csv"

#岩手県
#TAG:data_none
dwn_iwate:
	@echo "■iwate"

#宮城県
#TAG:data_xls,url_change
#https://www.pref.miyagi.jp/site/covid-19/02.html
dwn_miyagi:
	@echo "■miyagi"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)宮城県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)宮城県-bak.xlsx"
	-$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)宮城県.xlsx" "https://www.pref.miyagi.jp/uploaded/attachment/808206.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)宮城県.csv"

#秋田県
#TAG:data_none
dwn_akita:
	@echo "■akita"

#山形県
#TAG:data_csv
#https://www.pref.yamagata.jp/ou/kenkofukushi/090001/20130425/shingata_corona.html
dwn_yamagata:
	@echo "■yamagata"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)山形県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)山形県-bak.csv"
	-$(WGET) -O$(DWN_DATA_DIR)/tmp "https://www.pref.yamagata.jp/ou/kenkofukushi/090001/20130425/siryou/060003_yamagata_covid19_patients_0821.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)山形県.csv"

YYMMDD=$(shell date +20%m%d)
#福島県
#TAG:data_csv,url_change
#https://www.pref.fukushima.lg.jp/sec/21045c/covid19-opendata.html
dwn_fukushima:
	@echo "■fukushima"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)福島県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)福島県-bak.csv"
	#$(WGET) -O$(DWN_DATA_DIR)/tmp "http://www.pref.fukushima.lg.jp/w4/covid19/patients/070009_fukushima_covid19_patients_$(YYMMDD).csv"
	$(WGET) -O$(DWN_DATA_DIR)/tmp "http://www.pref.fukushima.lg.jp/w4/covid19/patients/070009_fukushima_covid19_patients_200831.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)福島県.csv"

#茨城県
#TAG:data_none
dwn_ibaraki:
	@echo "■ibaraki"

YYYYMMDD=$(shell date +%Y%m%d)
#栃木県
#TAG:data_xls,url_change
#http://www.pref.tochigi.lg.jp/e04/welfare/hoken-eisei/kansen/hp/coronakensahasseijyoukyou.html
dwn_tochigi:
	@echo "■tochigi"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)栃木県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)栃木県-bak.xlsx"
	#-$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)栃木県.xlsx" "http://www.pref.tochigi.lg.jp/e04/welfare/hoken-eisei/kansen/hp/documents/${YYYYMMDD}hasseijoukyou.xlsx"
	-$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)栃木県.xlsx" "http://www.pref.tochigi.lg.jp/e04/welfare/hoken-eisei/kansen/hp/documents/20200816hasseijoukyou.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)栃木県.csv"


#群馬県
#TAG:data_none
dwn_gunma:
	@echo "■gunma"

#埼玉県
##TAG:data_pdf,url_change
#https://www.pref.saitama.lg.jp/a0701/covid19/jokyo.html
dwn_saitama:
	@echo "■saitama"
	-mv -b "$(DWN_PRE)saitama-埼玉県.csv" "$(DWN_PRE)saitama-埼玉県-bak.csv"
	$(WGET) -O "$(DWN_PRE)saitama-埼玉県.pdf" "https://www.pref.saitama.lg.jp/a0701/covid19/documents/itiran822.pdf"
	$(PYTHON) pdf2csv.py chiba "$(DWN_PRE)saitama-埼玉県.pdf" "$(DWN_PRE)saitama-埼玉県.csv"

#千葉県
#TAG:data_pdf,url_change
#https://www.pref.chiba.lg.jp/shippei/press/2019/ncov-index.html
#https://covid19.civictech.chiba.jp/
dwn_chiba:
	@echo "■chiba"
	-mv -b "$(DWN_PRE)chiba-千葉県.csv" "$(DWN_PRE)chiba-千葉県-bak.csv"
	$(WGET) -O "$(DWN_PRE)chiba-千葉県.pdf" "https://www.pref.chiba.lg.jp/shippei/press/2019/documents/0822kansensya.pdf"
	$(PYTHON) pdf2csv.py chiba "$(DWN_PRE)chiba-千葉県.pdf" "$(DWN_PRE)chiba-千葉県.csv"

#東京都
#TAG:data_csv
#https://stopcovid19.metro.tokyo.lg.jp/
dwn_tokyo:
	@echo "■tokyo"
	-mv -b "$(DWN_DATA_DIR)/$(DWN_PRE)東京都.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)東京都-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)東京都.csv" "https://stopcovid19.metro.tokyo.lg.jp/data/130001_tokyo_covid19_patients.csv"


#神奈川県
#TAG:data_csv
#http://www.pref.kanagawa.jp/docs/ga4/bukanshi/occurrence.html
dwn_kanagawa:
	@echo "■kanagawa"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)神奈川県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)神奈川県-bak.csv"
	$(WGET) -O$(DWN_DATA_DIR)/tmp "http://www.pref.kanagawa.jp/osirase/1369/data/csv/patient.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)神奈川県.csv"


#新潟県
#TAG:data_html
#https://www.pref.niigata.lg.jp/site/shingata-corona/256362836.html
dwn_niigata:
	@echo "■niigata"
	$(NODE) dom_parse.js niigata | tee $@


#富山県
#TAG:data_xls,url_change
#http://www.pref.toyama.jp/cms_sec/1205/kj00021798.html
dwn_toyama:
	@echo "■toyama"
	-mv -b "$(DWN_DATA_DIR)/$(DWN_PRE)富山県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)富山県-bak.xlsx"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)富山県.xlsx" "http://www.pref.toyama.jp/cms_pfile/00021798/01451364.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)富山県.csv"


#石川県
#TAG:data_csv
#https://stopcovid19.pref.ishikawa.jp/
dwn_ishikawa:
	@echo "■ishikawa"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)石川県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)石川県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/tmp" "https://www.pref.ishikawa.lg.jp/kansen/documents/170003_ishikawa_covid19_patients.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp | perl -pe "s/10歳\x0a/10歳/g"> "$(DWN_DATA_DIR)/$(DWN_PRE)石川県.csv"

#福井県
#TAG:data_csv
#https://covid19-fukui.com/
dwn_fukui:
	@echo "■fukui"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)福井県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)福井県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)福井県.csv" "https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19_d/fil/covid19_patients.csv"

#山梨県
#TAG:data_none
#https://stopcovid19.yamanashi.dev/
dwn_yamanashi:
	@echo "■yamanashi"

#長野県
#TAG:data_csv,url_change
#https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/corona-doko.html
dwn_nagano:
	@echo "■nagano"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)長野県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)長野県-bak.csv"
	$(WGET) -O$(DWN_DATA_DIR)/tmp "https://www.pref.nagano.lg.jp/hoken-shippei/kenko/kenko/kansensho/joho/documents/200000_nagano_covid19_patients.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)長野県.csv"

#岐阜県
#TAG:data_csv
#https://gifu-opendata.pref.gifu.lg.jp/dataset/c11223-001
dwn_gifu:
	@echo "■gifu"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)岐阜県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)岐阜県-bak.csv"
	$(WGET) -O$(DWN_DATA_DIR)/patient.csv "https://gifu-opendata.pref.gifu.lg.jp/dataset/4661bf9d-6f75-43fb-9d59-f02eb84bb6e3/resource/9c35ee55-a140-4cd8-a266-a74edf60aa80/download/210005_gifu_covid19_patients.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)岐阜県.csv"

#静岡県
#TAG:data_csv
#https://stopcovid19.code4numazu.org/
dwn_shizuoka:
	@echo "■shizuoka"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)静岡県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)静岡県-bak.csv"
	$(WGET) -O$(DWN_DATA_DIR)/patient.csv "https://opendata.pref.shizuoka.jp/dataset/8167/resource/46279/220001_shizuoka_covid19_patients.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/patient.csv > "$(DWN_DATA_DIR)/$(DWN_PRE)静岡県.csv"

#愛知県
#TAG:data_pdf,url_change
#https://www.pref.aichi.jp/site/covid19-aichi/kansensya-kensa.html
dwn_aichi:
	@echo "■aichi"
	-mv -b  "$(DWN_PRE)aichi-愛知県-2020-08.pdf" "$(DWN_PRE)aichi-愛知県-2020-07-bak.pdf"
	$(WGET) -O "$(DWN_PRE)aichi-愛知県-gt-2020-08.pdf" "https://www.pref.aichi.jp/uploaded/attachment/343699.pdf"
	$(PYTHON) pdf2csv.py aichi "$(DWN_PRE)aichi-愛知県-gt-2020-08.pdf" "$(DWN_PRE)aichi-愛知県-gt-2020-08.csv"
	-mv -b  "$(DWN_PRE)aichi-愛知県-lt-2020-07.pdf" "$(DWN_PRE)aichi-愛知県-lt-2020-07.pdf-bak.pdf"
	$(WGET) -O "$(DWN_PRE)aichi-愛知県-lt-2020-07.pdf" "https://www.pref.aichi.jp/uploaded/attachment/343361.pdf"
	$(PYTHON) pdf2csv.py aichi "$(DWN_PRE)aichi-愛知県-lt-2020-07.pdf" "$(DWN_PRE)aichi-愛知県-lt-2020-07.csv"

#三重県
#TAG:data_csv,url_change
#https://www.pref.mie.lg.jp/YAKUMUS/HP/m0068000066_00002.htm
dwn_mie:
	@echo "■mie"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)三重県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)三重県-bak.csv"
	$(WGET) -O$(DWN_DATA_DIR)/tmp "https://www.pref.mie.lg.jp/common/content/000896797.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)三重県.csv"

#滋賀県
#TAG:data_none
#https://www.pref.shiga.lg.jp/ippan/kenkouiryouhukushi/yakuzi/309252.html
dwn_shiga:
	@echo "■shiga"

#京都府
#TAG:data_html,data_pdf
#https://www.pref.kyoto.jp/kentai/corona/hassei1-50.html
dwn_kyoto:
	@echo "■kyoto"
	@echo "府内感染状況 - 入院(入院・療養中) or 退院(死亡退院・転院を含む) at HTML"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)京都府.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)京都府-bak.csv"
	$(NODE) dom_parse.js kyoto | sort -t $$'\t' -k1 -n | tee "$(DWN_DATA_DIR)/$(DWN_PRE)京都府.csv"

dwn_kyoto_pdf:
	@echo "府内感染状況　退院等（死亡退院・転院を含む）　1例目から580例目まで（PDF：588KB）"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)kyoto-京都府.pdf" "https://www.pref.kyoto.jp/kentai/corona/documents/jyoukyo001-580.pdf"
	$(PYTHON) pdf2csv.py kyoto "$(DWN_DATA_DIR)/$(DWN_PRE)京都府.pdf" "$(DWN_DATA_DIR)/$(DWN_PRE)京都府-001-XXX.csv"


#大阪府
#TAG:data_xls
#http://www.pref.osaka.lg.jp/iryo/osakakansensho/corona.html
#https://covid19-osaka.info/
dwn_osaka:
	@echo "■osaka"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)大阪府.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)大阪府-bak.xlsx"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)大阪府.xlsx" "http://www.pref.osaka.lg.jp/attach/23711/00346644/youseisyajyouhou.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)大阪府.csv"


#兵庫県
#TAG:data_xls,url_change
#https://web.pref.hyogo.lg.jp/kk03/corona_kanjyajyokyo.html
dwn_hyogo:
	@echo "■hyogo"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)兵庫県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)兵庫県-bak.xlsx"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)兵庫県.xlsx" "https://web.pref.hyogo.lg.jp/kk03/documents/corona_kanjyajyokyo.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)兵庫県.csv"


#奈良県
#TAG:data_xls
#http://www.pref.nara.jp/55168.htm
dwn_nara:
	@echo "■nara"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)奈良県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)奈良県-bak.xlsx"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)奈良県.xlsx" "http://www.pref.nara.jp/secure/227193/%E5%A5%88%E8%89%AF%E7%9C%8C_01%E6%96%B0%E5%9E%8B%E3%82%B3%E3%83%AD%E3%83%8A%E3%82%A6%E3%82%A4%E3%83%AB%E3%82%B9%E6%84%9F%E6%9F%93%E8%80%85_%E6%82%A3%E8%80%85%E3%83%AA%E3%82%B9%E3%83%88.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)奈良県.csv"

#和歌山県
#TAG:data_xls
#https://www.pref.wakayama.lg.jp/prefg/041200/d00203387.html
dwn_wakayama:
	@echo "■wakayama"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)和歌山県.xlsx" "$(DWN_DATA_DIR)/$(DWN_PRE)和歌山県-bak.xlsx"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)和歌山県.xlsx" "https://www.pref.wakayama.lg.jp/prefg/000200/covid19_d/fil/kansensuii.xlsx"
	make "$(DWN_DATA_DIR)/$(DWN_PRE)和歌山県.csv"

#鳥取県
#TAG:data_none
dwn_tottori:
	@echo "■tottori"

#島根県
#TAG:data_none
dwn_shimane:
	@echo "■shimane"

#岡山県
#TAG:data_csv
#http://www.okayama-opendata.jp/opendata/ga120PreAction.action?keyTitle=d9c4776db7f09fff161953a2aaf03b80a9abad48&datasetId=e6b3c1d2-2f1f-4735-b36e-e45d36d94761
dwn_okayama:
	@echo "■okayama"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)岡山県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)岡山県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/tmp" "http://www.okayama-opendata.jp/ckan/dataset/e6b3c1d2-2f1f-4735-b36e-e45d36d94761/resource/c6503ebc-b2e9-414c-aae7-7374f4801e21/download/kansenshashousaijouhou0420.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)岡山県.csv"


#広島県
#TAG:data_html
#https://www.pref.hiroshima.lg.jp/site/hcdc/covid19-kanjya.html
dwn_hiroshima:
	@echo "■hiroshima"

#山口県
#TAG:data_csv
#https://yamaguchi-opendata.jp/ckan/dataset/f6e5cff9-ae43-4cd9-a398-085187277edf
dwn_yamaguchi:
	@echo "■yamaguchi"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)山口県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)山口県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)山口県.csv" "https://yamaguchi-opendata.jp/ckan/dataset/f6e5cff9-ae43-4cd9-a398-085187277edf/resource/f56e6552-4c5d-4ec6-91c0-090f553e0aea/download/350001_yamaguchi_covid19_patients.csv"


#徳島県
#TAG:data_csv
#https://ouropendata.jp/dataset/2192.html
dwn_tokushima:
	@echo "■tokushima"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)徳島県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)徳島県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)徳島県.csv" "https://ouropendata.jp/dataset/2192/resource/6170/%E9%99%BD%E6%80%A7%E6%82%A3%E8%80%85%E5%B1%9E%E6%80%A7.csv"


#香川県
#TAG:data_none
#https://opendata.pref.kagawa.lg.jp/dataset/359.html
dwn_kagawa:
	@echo "■kagawa"

#愛媛県
#TAG:data_csv
#https://www.pref.ehime.jp/h25500/kansen/covid19.html#kansensha
#https://ehime-covid19.com/
dwn_ehime:
	@echo "■ehime"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)愛媛県.csv" "https://www.pref.ehime.jp/opendata-catalog/dataset/2174/resource/7057/380008_ehime_covid19_patients.csv"


#高知県
#TAG:data_csv
#http://www.pref.kochi.lg.jp/soshiki/111301/2020041300141.html
dwn_kochi:
	@echo "■kochi"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)高知県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)高知県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/tmp" "http://www.pref.kochi.lg.jp/soshiki/111301/files/2020041300141/390003_kochi_covid19_patients.csv"
	iconv -f SJIS -t UTF-8 $(DWN_DATA_DIR)/tmp > "$(DWN_DATA_DIR)/$(DWN_PRE)高知県.csv"

#福岡県
#TAG:data_csv
# https//www.pref.fukuoka.lg.jp/contents/covid19-hassei.html
# 福岡市
# https://www.city.fukuoka.lg.jp/hofuku/hokenyobo/health/kansen/cohs.html
# 福岡市オープンデータCSV
# https://ckan.open-governmentdata.org/dataset/401000_pref_fukuoka_covid19_patients
dwn_fukuoka:
	@echo "■fukuoka"
	-mv "$(DWN_DATA_DIR)/$(DWN_PRE)福岡県.csv" "$(DWN_DATA_DIR)/$(DWN_PRE)福岡県-bak.csv"
	$(WGET) -O "$(DWN_DATA_DIR)/$(DWN_PRE)福岡県.csv" "https://ckan.open-governmentdata.org/dataset/8a9688c2-7b9f-4347-ad6e-de3b339ef740/resource/c27769a2-8634-47aa-9714-7e21c4038dd4/download/400009_pref_fukuoka_covid19_patients.csv"

#佐賀県
#TAG:data_html
#https//www.pref.saga.lg.jp/kiji00373220/index.html
dwn_saga:
	@echo "■saga"

#長崎県
#TAG:data_html
#https://www.pref.nagasaki.jp/bunrui/hukushi-hoken/kansensho/corona_nagasaki/corona_nagasaki_shousai/#hassei
dwn_nagasaki:
	@echo "■nagasaki"

#熊本県
#TAG:data_html
#https//www.pref.kumamoto.jp/kiji_32300.html
dwn_kumamoto:
	@echo "■kumamoto"

#大分県
#TAG:data_none
#http://www.pref.oita.jp/site/covid19-oita/covid19-pcr.html
dwn_oita:
	@echo "■oita"

#宮崎県
#TAG:data_html
#https://www.pref.miyazaki.lg.jp/kansensho-taisaku/covid-19/hassei_list.html
dwn_miyazaki:
	@echo "■miyazaki"

#鹿児島県
#TAG:data_html
#https://www.pref.kagoshima.jp/ae06/kenko-fukushi/kenko-iryo/kansen/kansensho/coronavirus.html#kokunai
dwn_kagoshima:
	@echo "■kagoshima"

#沖縄県
#TAG:data_pdf,url_change
#https://www.pref.okinawa.lg.jp/site/hoken/chiikihoken/kekkaku/press/20200214_covid19_pr1.html
dwn_okinawa:
	@echo "■okinawa"
	-mv -b "$(DWN_PRE)okinawa-沖縄県.csv" "$(DWN_PRE)okinawa-沖縄県-bak.csv"
	-mv -b "$(DWN_PRE)okinawa-沖縄県.pdf" "$(DWN_PRE)okinawa-沖縄県-bak.pdf"
	$(WGET) -O "$(DWN_PRE)okinawa-沖縄県.pdf" "https://www.pref.okinawa.lg.jp/site/hoken/chiikihoken/kekkaku/press/documents/74hou1690.pdf"
	$(PYTHON) pdf2csv.py okinawa "$(DWN_PRE)okinawa-沖縄県.pdf" "$(DWN_PRE)okinawa-沖縄県.csv"

#covid19.csv: dwn_all dwn_pdf
covid19.csv:
	@echo "TODO: make $@"

.SUFFIXES: .xlsx .csv .json

#XLSXをCSVに変換
%.csv : %.xlsx
	$(XLS2CSV) $^ | tee $@

#CSVをJSONに変換
%.json: %.csv
	$(PHP) csv2json.php "$<" "$@"

covid19-assets.js: covid19-assets.json
	echo "const g_covid19_assets = " > $@
	cat $< >> $@

covid19-data.js: covid19-data.json
	echo "const g_covid19_data = " > $@
	cat $< >> $@

covid19-world.js: covid19-world.json
	echo "const g_covid19_world = " > $@
	cat $< >> $@

data_all:covid19-assets.js covid19-data.js covid19-world.js


start:
	@echo "Open 'http://localhost:8080/covid19.html' in your browser."
	php -S localhost:8080 -t ../



# ===========================================================================
# データ比較
# ===========================================================================
diff_old_new: \
	covid19-data.json.vimdiff \
	covid19-assets.json.obj-vimdiff \
	covid19-world.json.obj-vimdiff

# JAPAN 第5波 までのデータ
PATH_DATA_OLD=2021-10-31

clean_diff:
	-rm *.length.txt
	-rm $(PATH_DATA_OLD)/*.length.txt

%.json.vimdiff: # diff JSON array data
	@cat $(PATH_DATA_OLD)/$*.json | jq 'length' > $(PATH_DATA_OLD)/$*.json.length.txt
	@cat $*.json | jq 'length' > $*.json.length.txt
	-diff $(PATH_DATA_OLD)/$*.json.length.txt $*.json.length.txt
	vimdiff $(PATH_DATA_OLD)/$*.json.length.txt $*.json.length.txt

%.json.obj-vimdiff: # diff JSON object data
	@cat $(PATH_DATA_OLD)/$*.json | jq 'map_values(length)' > $(PATH_DATA_OLD)/$*.json.length.txt
	@cat $*.json | jq 'map_values(length)' > $*.json.length.txt
	-diff $(PATH_DATA_OLD)/$*.json.length.txt $*.json.length.txt
	vimdiff $(PATH_DATA_OLD)/$*.json.length.txt $*.json.length.txt
