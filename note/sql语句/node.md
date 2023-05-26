
[w3c](https://www.runoob.com/sql/sql-join-left.html)

1. SELECT 语句用于从数据库中选取数据。
*** SELECT column1 FROM table_name ****
> column1 查找的字段 table_name查找的表名

2. SELECT DISTINCT 语句用于返回唯一不同的值。
*** SELECT DISTINCT column1 FROM table_name ***
> column1 查找的字段 table_name查找的表名

3. WHERE 子句用于过滤记录。
*** SELECT column1 , column2 FROM table_name WHERE condition *** 
> column1 查找的字段 table_name查找的表名 condition过滤条件如（id<10） 

4. AND & OR 运算符用于基于一个以上的条件对记录进行过滤。
*** SELECT column1 FROM table_name WHERE condition AND  andStr ***
*** SELECT column1 FROM table_name WHERE condition OR   orStr *** 
*** SELECT column1 FROM table_name WHERE condition AND ( con1 OR con2 ) ***
> column1 查找的字段 table_name查找的表名 condition过滤条件 andStr orStr con1 con2 其它条件

5. ORDER BY 关键字用于对结果集进行排序。
*** SELECT column1 FROM table_name ORDER BY column1 ASC|DESC ***
> table_name查找的表名 column1查找的字段并按这个字段排序  ASC升序 DESC降序
*** SELECT * FROM table_name ORDER BY column *** 
> table_name查找的表名  column字段排序

6. INSERT INTO 语句用于向表中插入新记录。
*** INSERT INTO table_name (column1,column2...) VALUES (value1,value2...) *** 
> table_name插入表名  column1,column2插入的字段  value1,value2插入的字段值

7. UPDATE 语句用于更新表中的记录。
*** UPDATE table_name SET column1=value1 , column2=value2... WHERE condition ***
> table_name：要修改的表名称。
> column1, column2, ...：要修改的字段名称，可以为多个字段。
> value1, value2, ...：要修改的值，可以为多个值。
> condition：修改条件，用于指定哪些数据要修改。

8. DELETE 语句用于删除表中的记录。
*** DELETE FROM table_name WHERE condition *** 
> table_name：要删除的表名称。 condition：删除条件，用于指定哪些数据要删除。


9. SELECT TOP 子句用于规定要返回的记录的数目。
*** SELECT columns FROM table_name LIMIT number *** 
> cloumns 查找的字段 table_name 查找的表名  LIMIT 关键字 number 数量 number类型

10. LIKE 操作符用于在 WHERE 子句中搜索列中的指定模式。
*** SELECT column1,column2 FROM table_name WHERE column LIKE pattern *** 
> column1, column2, ...：要选择的字段名称，可以为多个字段。如果不指定字段名称，则会选择所有字段。
> table_name：要查询的表名称。
> column：要搜索的字段名称。
> pattern：搜索模式。
*** 下面的 SQL 语句选取 name 以字母 "G" 开始的所有客户：***
``` SELECT * FROM websites WHERE name LIKE 'g%' ```

11. 通配符可用于替代字符串中的任何其他字符。
*** % 替代 0 个或多个字符 ***
``` SELECT * FROM websites WHERE url LIKE 'G%' ```
*** _ 替代一个字符 ***
``` SELECT * FROM websites WHERE url LIKE '_oogle' ```
***  [charlist] 使用 REGEXP 或 NOT REGEXP 运算符 (或 RLIKE 和 NOT RLIKE) 来操作正则表达式***
``` javascript 
  SELECT * FROM websites WHERE name REGEXP '^[GFS]' 
  SELECT * FROM websites WHERE name REGEXP '[!GFS]'

```
12. IN 操作符允许您在 WHERE 子句中规定多个值
*** SELECT column1,column2 FROM table_name WHERE column IN (value1,value2) ***
> column1, column2, ...：要选择的字段名称，可以为多个字段。如果不指定字段名称，则会选择所有字段。
> table_name：要查询的表名称。
> column：要查询的字段名称。
> value1, value2, ...：要查询的值，可以为多个值。

``` SELECT * FROM Websites WHERE name IN ('Google','菜鸟') ```

13. BETWEEN 操作符用于选取介于两个值之间的数据范围内的值。
*** SELECT column1,column2 FROM table_name WHERE column BETWEEN value1 AND value2 *** 
> column1, column2, ...：要选择的字段名称，可以为多个字段。如果不指定字段名称，则会选择所有字段。
> table_name：要查询的表名称。
> column：要查询的字段名称。
> value1：范围的起始值。
> value2：范围的结束值
选取 alexa 介于 1 和 20 之间的所有网站
``` SELECT * FROM websites WHERE alexa BETWEEN 1 AND 20 ``` 
选取 alexa 介于 1 和 20 之外的所有网站
``` SELECT * FROM websites WHERE alexa NOT BETWEEN 1 AND 20 ``` 
语句选取 alexa 介于 1 和 20 之间但 country 不为 USA 和 IND 的所有网站
``` SELECT * FROM websites WHERE ( alexa BETWEEN 1 AND 20) AND country NOT IN ('USA') ```  

14. 通过使用 SQL，可以为表名称或列名称指定别名 
*** SELECT column_name AS alias_name FROM table_name *** 
> column_name 列名 alias_name 别名

15. SQL join 用于把来自两个或多个表的行结合起来。
*** SELECT column1,column2 FROM table1 JOIN table2 ON condition *** 
> column1, column2, ...：要选择的字段名称，可以为多个字段。如果不指定字段名称，则会选择所有字段。
> table1：要连接的第一个表。
> table2：要连接的第二个表。
> condition：连接条件，用于指定连接方式。

```SELECT websites.id , websites.name , access_log.count , access_log.date FROM websites INNER JOIN access_log ```
16. INNER JOIN 关键字在表中存在至少一个匹配时返回行
*** SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column *** 
> columns：要显示的列名。
> table1：表1的名称。
> table2：表2的名称。
> column_name：表中用于连接的列名。
``` SELECT websites.name , access_log.count, assess_log.date FROM websites INNER JOIN access_log ON websites.id = access_log.site_id ORDER BY access_log.count ```


17. SQL LEFT JOIN 关键字
*** SELECT columns FROM table1 LEFT JOIN table2 ON table1.name = table2.name ***
``` SELECT websites.name , access_log.count FROM websites LEFT JOIN access_log ON websites.id = access_log.id ORDER BY access_log.count DESC ``` 

18. SQL RIGHT JOIN 关键字

*** SELECT columns FROM table1 RIGHT JOIN table2 ON table1.name = table2.name ***
``` SELECT website.name , access_log.count FROM website RIGHT JOIN access_log ON website.id = access_log.id ORDER BY access_log.count DESC ```

19. SQL FULL OUTER JOIN 关键字
*** SELECT columns FROM table1 FULL OUTER JOIN table2 ON table1.name = table2.name *** 
``` SELECT website.name , access_log.count FROM website FULL OUTER JOIN access_log ON website.id = access_log.id ORDER BY access_log.aid ``` 

20. SQL UNION 操作符合并两个或多个 SELECT 语句的结果。
*** SELECT columns FROM table1 UNION SELECT columns FROM table2 *** 
*** SELECT columns FROM table1 UNION ALL SELECT columns FROM table2 *** 
``` SELECT country FROM websites UNION SELECT country FROM apps ```

21. SELECT INTO 语句从一个表复制数据，然后把数据插入到另一个新表中
*** SELECT * INTO new_table FROM table / CREATE TABLE new_apps( SELECT * FROM apps) *** 
*** SELECT columns INTO new_table FROM table / CREATE TABLE new_apps( SELECT columns FROM apps) *** 
> navicat premium 中 CREATE TABLE new_apps( SELECT * FROM apps) 这个更有效果

22. INSERT INTO SELECT 语句从一个表复制数据，然后把数据插入到一个已存在的表中。
*** INSERT INTO table2 SELECT * FROM table1 *** 
``` 复制 "websites" 中的数据插入到 "new_apps" 中： ```
``` INSERT INTO new_apps (id,app_name) SELECT id , name FROM websites; ```

23. CREATE DATABASE 语句用于创建数据库。
*** CREATE DATABASE my_db ***

24. CREATE TABLE 语句用于创建数据库中的表
*** CREATE TABLE table *** 
``` sql
CREATE TABLE Persons
(
PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
); 

```
25. SQL 约束（Constraints）
***
    NOT NULL - 指示某列不能存储 NULL 值。
    UNIQUE - 保证某列的每行必须有唯一的值。
    PRIMARY KEY - NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。
    FOREIGN KEY - 保证一个表中的数据匹配另一个表中的值的参照完整性。
    CHECK - 保证列中的值符合指定的条件。
    DEFAULT - 规定没有给列赋值时的默认值。
***

26. NOT NULL 约束强制列不接受 NULL 值。

``` sql 在一个已创建的表的 "Age" 字段中添加 NOT NULL 约束如下所示：
ALTER TABLE Persons
MODIFY Age int NOT NULL;

```

``` sql 在一个已创建的表的 "Age" 字段中删除 NOT NULL 约束如下所示
ALTER TABLE Persons
MODIFY Age int NULL;

```






``` sql 
ALTER TABLE `react-ts`.`persons` 
ADD COLUMN `age` varchar(255) NULL AFTER `City`;

react-ts 库名 persons 表名  age 字段名 
```