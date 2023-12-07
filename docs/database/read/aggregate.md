# 聚合查询.aggregate

::: tip Testing Is Documentation
[tests/Database/Read/AggregateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Read/AggregateTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## findCount 查询数量

``` php
public function testCount(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT COUNT(*) AS row_count FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findCount(),
            $connect
        )
    );
}
```

## count.find 查询数量

``` php
public function testCount2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT COUNT(*) AS row_count FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->count()
                ->find(),
            $connect,
            1
        )
    );
}
```

## findCount 查询数量指定字段和别名

``` php
public function testCount3(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT COUNT(*) AS row_count2 FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findCount('*', 'row_count2'),
            $connect,
            2
        )
    );
}
```

## findAvg 查询平均值

``` php
public function testAvg(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT AVG(`test_query`.`num`) AS avg_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findAvg('num'),
            $connect
        )
    );
}
```

## avg.find 查询平均值

``` php
public function testAvg2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT AVG(`test_query`.`num`) AS avg_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->avg('num')
                ->find(),
            $connect,
            1
        )
    );
}
```

## findAvg 查询平均值指定字段和别名

``` php
public function testAvg3(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT AVG(`test_query`.`num`) AS avg_value2 FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findAvg('num', 'avg_value2'),
            $connect,
            2
        )
    );
}
```

## findMax 查询最大值

``` php
public function testMax(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MAX(`test_query`.`num`) AS max_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findMax('num'),
            $connect
        )
    );
}
```

## max.find 查询最大值

``` php
public function testMax2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MAX(`test_query`.`num`) AS max_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->max('num')
                ->find(),
            $connect,
            1
        )
    );
}
```

## findMax 查询最大值指定字段和别名

``` php
public function testMax3(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MAX(`test_query`.`num`) AS max_value2 FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findMax('num', 'max_value2'),
            $connect,
            2
        )
    );
}
```

## findMin 查询最小值

``` php
public function testMin(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MIN(`test_query`.`num`) AS min_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findMin('num'),
            $connect
        )
    );
}
```

## min.find 查询最小值

``` php
public function testMin2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MIN(`test_query`.`num`) AS min_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->min('num')
                ->find(),
            $connect,
            1
        )
    );
}
```

## findMin 查询最小值指定字段和别名

``` php
public function testMin3(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT MIN(`test_query`.`num`) AS min_value2 FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findMin('num', 'min_value2'),
            $connect,
            2
        )
    );
}
```

## findSum 查询合计

``` php
public function testSum(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT SUM(`test_query`.`num`) AS sum_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findSum('num'),
            $connect
        )
    );
}
```

## sum.find 查询合计

``` php
public function testSum2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT SUM(`test_query`.`num`) AS sum_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->sum('num')
                ->find(),
            $connect,
            1
        )
    );
}
```

## findSum 查询合计指定字段和别名

``` php
public function testSum3(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT SUM(`test_query`.`num`) AS sum_value2 FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findSum('num', 'sum_value2'),
            $connect,
            2
        )
    );
}
```

## findAvg 查询字段指定表名

``` php
public function testAvgWithTable(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT AVG(`test_query`.`num`) AS avg_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->findAvg('test_query.num'),
            $connect
        )
    );
}
```

## avg.find 查询字段指定表名

``` php
public function testAvgWithTable2(): void
{
    $connect = $this->createDatabaseConnectMock();
    $sql = <<<'eot'
        [
            "SELECT AVG(`test_query`.`num`) AS avg_value FROM `test_query` LIMIT 1",
            [],
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->avg('test_query.num')
                ->find(),
            $connect,
            1
        )
    );
}
```