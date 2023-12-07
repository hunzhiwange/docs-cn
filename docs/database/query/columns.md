# Query lang.columns

::: tip Testing Is Documentation
[tests/Database/Query/ColumnsTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ColumnsTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## Columns 添加字段

字段条件用法和 table 中的字段用法一致，详情可以查看《查询语言.table》。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.*,`test_query`.`id`,`test_query`.`name`,`test_query`.`value` FROM `test_query`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->columns('id')
                ->columns('name,value')
                ->findAll(),
            $connect
        )
    );
}
```

## SetColumns 设置字段

清空原有字段，然后添加新的字段。

``` php
public function testSetColumns(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`remark` FROM `test_query`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->columns('id')
                ->columns('name,value')
                ->setColumns('remark')
                ->findAll(),
            $connect
        )
    );
}
```

## Columns 字段支持表达式

``` php
public function testColumnsExpressionForSelectString(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT 'foo'",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->columns(Condition::raw("'foo'"))
                ->findAll(),
            $connect
        )
    );
}
```

## Columns 字段在连表中的查询

``` php
public function testSetColumnsWithTableName(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.`name`,`test_query`.`value`,`test_query_subsql`.`name`,`test_query_subsql`.`value` FROM `test_query` INNER JOIN `test_query_subsql` ON `test_query_subsql`.`name` = `test_query`.`name`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->setColumns('test_query.name,test_query.value')
                ->join('test_query_subsql', 'name,value', 'name', '=', Condition::raw('[test_query.name]'))
                ->findAll(),
            $connect
        )
    );
}
```