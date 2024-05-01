### Combo index 


### I. [FT.CREATE](https://redis.io/docs/latest/commands/ft.create/)

```
FT.CREATE index [ON HASH | JSON] [PREFIX count prefix [prefix ...]]  [FILTER {filter}] [LANGUAGE default_lang] [LANGUAGE_FIELD lang_attribute]  [SCORE default_score] [SCORE_FIELD score_attribute] [PAYLOAD_FIELD payload_attribute] [MAXTEXTFIELDS] [TEMPORARY seconds] [NOOFFSETS]  [NOHL] [NOFIELDS] [NOFREQS] [STOPWORDS count [stopword ...]]   [SKIPINITIALSCAN] SCHEMA field_name [AS alias] TEXT | TAG | NUMERIC | GEO | VECTOR | GEOSHAPE [ SORTABLE [UNF]] [NOINDEX] [ field_name [AS alias] TEXT | TAG | NUMERIC | GEO | VECTOR | GEOSHAPE [ SORTABLE [UNF]] [NOINDEX] ...] 
```

FT.CREATE combo:index 
  ON HASH PREFIX 2 moviedb: bookdb: 
  SCHEMA
  title     TEXT 
  country   TAG
  language  TAG 
  director  TEXT
  author    TEXT
  runtime   NUMERIC
  pages     NUMERIC
  released  NUMERIC
  year      NUMERIC


### II. [FT.SEARCH](https://redis.io/docs/latest/commands/ft.search/)

```
FT.SEARCH index query [NOCONTENT] [VERBATIM] [NOSTOPWORDS] [WITHSCORES]  [WITHPAYLOADS] [WITHSORTKEYS] [FILTER numeric_field min max [ FILTER numeric_field min max ...]] [GEOFILTER geo_field lon lat radius m | km | mi | ft [ GEOFILTER geo_field lon lat radius m | km | mi | ft ...]] [INKEYS count key [key ...]] [ INFIELDS count field [field ...]] [RETURN count identifier [AS property] [ identifier [AS property] ...]] [SUMMARIZE [ FIELDS count field [field ...]] [FRAGS num] [LEN fragsize] [SEPARATOR separator]] [HIGHLIGHT [ FIELDS count field [field ...]] [ TAGS open close]] [SLOP slop] [TIMEOUT timeout] [INORDER] [LANGUAGE language] [EXPANDER expander] [SCORER scorer] [EXPLAINSCORE] [PAYLOAD payload] [SORTBY sortby [ ASC | DESC] [WITHCOUNT]] [LIMIT offset num] [PARAMS nargs name value [ name value ...]] [DIALECT dialect] 
```

ft.search combo:index "king" return 1 title

ft.search combo:index "@country:{United States}" nocontent limit 0 99

ft.search combo:index "@language:{English}" nocontent limit 0 99

ft.search combo:index "@released:[1999 2010] | @year:[1900 1945]" return 2 released year limit 0 99 

ft.search combo:index "@runtime:[120 +inf] | @pages:[600 +inf]" return 2 runtime pages limit 0 99 

### EOF (2024/05/01)
