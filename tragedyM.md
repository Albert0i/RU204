### Tragedy M ─── A story on heterogeneous movements

### Prologue
Hark, it is not *possible*, if there is no two-way data flowing mechanism, to do step by step database migration on production system with minimal downtime. 

### Trilemma
- No practical and feasible planning was done beforehand, especially on inter-project entanglements; 
- Under estimated project difficulties, especially on diversity of database access methods, no central data access layer exists and let alone API Gateway; 
- No prior experience, suitable utilities and whatsoever; 

Should ask consultant agency for help on:
- What is the migration strategy? 
    1. Big Bang Migration: All data is migrated at once during a scheduled downtime.
    2. Trickle Migration: Data is migrated in phases to minimize downtime and risk.
- What are tools and Utilities employed? 
- How long does it takes and manpower involved? 

Post-Migration Monitoring after cutover: 
- Data Validation: Verify that the migrated data matches the source data in terms of accuracy and completeness.
- Functional Testing: Test the applications that rely on the database to ensure they function correctly with Oracle.
- Performance Testing: Assess the performance of queries and transactions in the new environment.

### Out of focus
It started as a migration from DB2/400 to Oracle 12c. The very weigh should focus on Web Applications not on database itself. Moving data from one base to another without unworkable applications is meaningless and valueless. Data ,per se, is valuable, it is the applications visualize and utilize them and renders computer systems. 

More time and money should be spent on studying the structure of legacy Web Applications. Whether to retrofit and consolidate a consistent central data access layer or through API Gateway is more appropriate or both. 

Legacy Web Applications, typically written in era of [ASP.NET](https://en.wikipedia.org/wiki/ASP.NET) 2.0, exclusively and extensively use [Data Control](https://learn.microsoft.com/en-us/previous-versions/aspnet/ms228214(v=vs.100)) which capture both front-end and back-end logics. Access to database is scattered along the way through ASPX pages. 

### Temptation
On crafting new programs, it is highly desirous to perform read/write directly on Oracle. As one might think better and there's no point to do it on DB2/400 which is doomed to be obsoleted. It's true but there is a catch, provided that new program do not make any write operations on DB2/400, read operations is profitted by one direction data sychronizing utility, ie. OGG. 

In this case, a Web Service or API Gateway is setup to facilitate the situation lest dual update incurred. Even on the same platform, it's not good practice to tread on properties of other projects. An API Gateway slows down project development at the beginning but will catch up at last. 

Applications call on API Gateway don't need to know which by which database. In addition, API Gateway can opt which database to CRUD and perform dual update for a limited time. 

### Tragedy
Writing a tirade of my thought which deviateed from reality has no use. 

### Epilogue


### EOF (2024/10/11)
