# Query lang.distinct

::: tip Testing Is Documentation
[tests/Database/Query/DistinctTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/DistinctTest.php)
:::

**函数原型**

``` php
# Leevel\Database\Condition::distinct
/**
 * 创建一个 SELECT DISTINCT 查询.
 */
public function distinct(bool $flag = true): self;
```

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## 查询去重

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT DISTINCT `test_query`.* FROM `test_query`",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->distinct()
                ->findAll(),
            $connect
        )
    );
}
```

## 取消查询去重

``` php
public function testCancelDistinct(): void
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
                ->distinct()
                ->distinct(false)
                ->findAll(),
            $connect,
            1
        )
    );
}
```