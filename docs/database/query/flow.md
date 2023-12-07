# Query lang.flow

::: tip Testing Is Documentation
[tests/Database/Query/FlowTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Query/FlowTest.php)
:::

QueryPHP 数据构造器支持条件运算符，可以根据不同条件做不同的事情，支持所有的构造器函数，即返回 `$this`。

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
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id ORDER BY `test_query`.`name` DESC LIMIT 1",
            {
                "test_query_id": [
                    2
                ]
            },
            false
        ]
        eot;

    $id = 2;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id LIMIT 1",
            {
                "test_query_id": [
                    1
                ]
            },
            false
        ]
        eot;

    $id = 1;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect,
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id AND `test_query`.`id` = :test_query_id_1 LIMIT 1",
            {
                "test_query_id": [
                    3
                ],
                "test_query_id_1": [
                    1111
                ]
            },
            false
        ]
        eot;

    $id = 3;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect,
            2
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id LIMIT 1",
            {
                "test_query_id": [
                    4
                ]
            },
            false
        ]
        eot;

    $id = 4;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->elif(4 === $id)
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect,
            3
        )
    );
}
```

## else

``` php
public function testElse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'

"SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id ORDER BY `test_query`.`name` DESC LIMIT 1",
{
    "test_query_id": [
        2
    ]
},
false



    $id = 2;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else()
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id AND `test_query`.`id` = :test_query_id_1 LIMIT 1",
            {
                "test_query_id": [
                    3
                ],
                "test_query_id_1": [
                    1111
                ]
            },
            false
        ]
        eot;

    $id = 3;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else()
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect,
            1
        )
    );

    $sql = <<<'eot'
        [
            "SELECT `test_query`.* FROM `test_query` WHERE `test_query`.`id` = :test_query_id LIMIT 1",
            {
                "test_query_id": [
                    4
                ]
            },
            false
        ]
        eot;

    $id = 5;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->if(1 === $id)
                ->where('id', 1)
                ->elif(2 === $id)
                ->where('id', 2)
                ->orderBy('name DESC')
                ->elif(3 === $id)
                ->where('id', 3)
                ->where('id', 1111)
                ->else()
                ->where('id', 4)
                ->fi()
                ->findOne(),
            $connect,
            2
        )
    );
}
```

::: tip
命令遵循 shell 命令风格，即 if,elif,else,fi。
:::