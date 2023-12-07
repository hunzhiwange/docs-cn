# Query lang.forceIndex

::: tip Testing Is Documentation
[tests/Database/Query/ForceIndexTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/ForceIndexTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## forceIndex,ignoreIndex 基础用法

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FORCE INDEX(idx_nameindex,idx_statusindex) IGNORE INDEX(idx_testindex) WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    5
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->forceIndex('idx_nameindex,idx_statusindex')
                ->ignoreIndex('idx_testindex')
                ->where('id', '=', 5)
                ->findAll(),
            $connect
        )
    );
}
```

## forceIndex 数组支持

``` php
public function testForceIndexWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` FORCE INDEX(idx_nameindex,idx_statusindex) WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    2
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->forceIndex(['idx_nameindex', 'idx_statusindex'])
                ->where('id', '=', 2)
                ->findAll(),
            $connect
        )
    );
}
```

## ignoreIndex 数组支持

``` php
public function testIgnoreIndexWithArray(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` IGNORE INDEX(idx_nameindex,idx_statusindex) WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    6
                ]
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->ignoreIndex(['idx_nameindex', 'idx_statusindex'])
                ->where('id', '=', 6)
                ->findAll(),
            $connect
        )
    );
}
```