### Article


#### Section 1 
Table, being the unique data structure in RDBMS, is composed of rows of cells of rigid type and size. Table, per se, is compact and efficient way to store structured data, provided that shape and topology doesn't subjected to constant change. 

Rows can be retrofitted by adding, removing and type-changing cells not without much effort. This is because all rows share the same table definition (aka schema in terms of RDBMS). It is believed that small table facilitate schema migration, however highly normalized table also means highly fragmented table. Care should be taken to prevent data lost during schema migration, especially when foreign key constraints are involved. 

RDBMS is well known for it's unparalleled search and aggregation capability but is awkwardly imbecilic in handling unstructured data although JSON and XML support, full-text search capabilities are bestowed of late. Typically speaking: 

1. **Text Documents**
   - Word documents, PDFs, and other text files that contain paragraphs of text without a specific structure.

2. **Emails**
   - Email content, including the body, attachments, and metadata, varies widely in format.

3. **Social Media Posts**
   - Content from platforms like Twitter, Facebook, or Instagram, which can include text, images, videos, and hashtags.

4. **Multimedia Files**
   - Images, audio files, and video files that do not have a consistent structure but can contain valuable information.

5. **Web Pages**
   - HTML content from websites that includes text, images, and multimedia elements, often without a uniform layout.

6. **Logs and Sensor Data**
   - System logs, application logs, and data from IoT devices that contain unstructured entries without a fixed format.

7. **Chat and Messaging Data**
   - Conversations from messaging apps or chat platforms, which can vary in length and content.

8. **Survey Responses**
   - Open-ended answers in surveys where respondents can provide free-text responses.

This type of data does not fall into traditional realm of business data processing and not even exists when RDBMS was invented on late 70's of last century. It is the new application scenarios which bring about new forms of data... 


#### Section 2 

Storage Model, in a restricted and confined sense, focuses on storage of user data which strips off all unrelated meta data. Storage Model directly maps to table space, segment, extend and blocks on disk. Storage strictly means disk storage and disk space not regarding any accompanying overhead on specific reading or writing operations. 


#### Section 3 

Access Model ...


### EOF (2024/09/27)