### Tragedy M ─── A story on heterogeneous movements


### Prologue
Hark! Without a two-way data flowing facility, it is *not* possible to do a step by step database migration on production system. 


### I. Trilemma
In the year of two thousands and seventeen, we were requested to move our database back end from DB2/400, on which we had used for more than two decades and had several hundreds of terminal programs and web pages, to Oracle 12c. Everybody was dumbfounded and had not the least idea how to cope with. After all, we found out that: 

- No practical and feasible planning was done beforehand, especially on inter-project entanglements; 
- Under estimated difficulties, especially on diversity of database access methods, no central data access layer exists and let alone API Gateway; 
- No prior experience, suitable utilities and whatsoever; 

Obviously, we should ask consultant agency for help at that time:
- What is the migration strategy? 
    1. Big Bang Migration: All data is migrated at once during a scheduled downtime.
    2. Trickle Migration: Data is migrated in phases to minimize downtime and risk.
- What are tools and utilities employed? 
- How to implement the migration plan? 
- How long does it takes and manpower involved? 

And post-migration checking before cutover: 
- Data Validation: Verify that the migrated data matches the source data in terms of accuracy and completeness.
- Functional Testing: Test the applications that rely on the database to ensure they function correctly with Oracle.
- Performance Testing: Assess the performance of queries and transactions in the new environment.

But no consultancy was made, *not* surprisingly...


### II. Out of focus
Regarding to the migration, one should focus on applications, *not* the databases themselves. Moving back end database, even heterogeneous ones, can be done with tools or manually. Moving the back in online system is quite another thing. 

More time and money should be spent on studying the structural dependency between legacy systems, whether it was necessary to consolidate/retrofit into a consistent central data access layer or by dint of an API Gateway. Or else everybody did in one's own way. 

Terminal programs were intrinsically easy to be converted to new web pages. Legacy Web Applications, typically written in era of [ASP.NET](https://en.wikipedia.org/wiki/ASP.NET) 2.0, exclusively and extensively use [Data Control](https://learn.microsoft.com/en-us/previous-versions/aspnet/ms228214(v=vs.100)) which capture both front-end and back-end logic. Access to database is scattered along the way throughout ASPX pages. 

In addition, ASPX pages run on IIS which instead run on Windows only. Besides licensing fee, the server was not fit for horizontal scaling, making humungous web pages hosting on the same server, and thus hazardous to performance and stability. However, prohibiting the use of Data Control involves significant code rewrite which involves more [regression testing](https://en.wikipedia.org/wiki/Regression_testing) and longer time span. Last but not least, I don't think it's possible to change even older [ASP](https://en.wikipedia.org/wiki/Active_Server_Pages) web page to call API Gateway. 

Years and years of attending various Oracle courses only had minimal help on migration. It's just not addressing the main point. 


### III. Temptation
On crafting any new systems, it is more desirous to do on Oracle. As one might expect there's no point to do it on DB2/400 which is doomed to dead. It's true but there is a catch, provided that new systems do not write to files on legacy systems, read operations are enabled by one direction data sychronizing utility, ie. [OGG](https://www.oracle.com/uk/integration/goldengate/). 

In this case, Web Service or API Gateway will be created to facilitate this awkward situation lest dual write incurred. It's not good a practice to tread on files of other system even residing on the same database. An API Gateway slows project development at the beginning but will catch up soon. 

Applications call API Gateway and don't need to know which by which database used. In addition, API Gateway can opt database to read from or write to or perform a dual write. 


### IV. Tragedy
Writing a tirade of my thought which deviateed from reality has no use. 


### Epilogue


### EOF (2024/10/11)
