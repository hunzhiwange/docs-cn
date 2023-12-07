# Query lang.limit

::: tip Testing Is Documentation
[tests/Database/Query/LimitTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/LimitTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## limit 限制条数

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LIMIT 5,10",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->limit(5, 10)
                ->find(),
            $connect
        )
    );
}
```

## 指示仅查询第一个符合条件的记录

``` php
public function testOne(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->one()
                ->find(),
            $connect,
            1
        )
    );
}
```

## 指示查询所有符合条件的记录

``` php
public function testAll(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->all()
                ->find(),
            $connect,
            2
        )
    );
}
```

## 查询几条记录

``` php
public function testTop(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` LIMIT 0,15",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->top(15)
                ->find(),
            $connect,
            3
        )
    );
}
```