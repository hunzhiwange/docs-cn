# 更新数据.update

::: tip Testing Is Documentation
[tests/Database/Update/UpdateTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Update/UpdateTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## update 基本用法

更新成功后，返回影响行数。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :named_param_name WHERE `test_query`.`id` = :test_query_id",
            {
                "named_param_name": [
                    "小猪"
                ],
                "test_query_id": [
                    503
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
                ->where('id', 503)
                ->update(['name' => '小猪']),
            $connect
        )
    );
}
```

## update 更新指定条数

``` php
public function testWithLimit(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :named_param_name WHERE `test_query`.`id` = :test_query_id LIMIT 5",
            {
                "named_param_name": [
                    "小猪"
                ],
                "test_query_id": [
                    503
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
                ->where('id', 503)
                ->limit(5)
                ->update(['name' => '小猪']),
            $connect
        )
    );
}
```

## update 更新排序

``` php
public function testWithOrderBy(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :named_param_name WHERE `test_query`.`id` = :test_query_id ORDER BY `test_query`.`id` DESC",
            {
                "named_param_name": [
                    "小猪"
                ],
                "test_query_id": [
                    503
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
                ->where('id', 503)
                ->orderBy('id desc')
                ->update(['name' => '小猪']),
            $connect
        )
    );
}
```

## update 更新排序和指定条数

``` php
public function testWithOrderAndLimit(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :named_param_name WHERE `test_query`.`id` = :test_query_id ORDER BY `test_query`.`id` DESC LIMIT 2",
            {
                "named_param_name": [
                    "小猪"
                ],
                "test_query_id": [
                    503
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
                ->where('id', 503)
                ->orderBy('id desc')
                ->limit(2)
                ->update(['name' => '小猪']),
            $connect
        )
    );
}
```

## update 连表更新

``` php
public function testWithJoin(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'

"UPDATE `test_query` `t` INNER JOIN `test_query_subsql` `h` ON `t`.`id` = `h`.`value` SET `t`.`name` = :sub1_named_param_name WHERE `t`.`id` = :sub1_t_id",
{
    "sub1_named_param_name": [
        "小猪"
    ],
    "sub1_t_id": [
        503
    ]
},
false



    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query as t')
                ->join('test_query_subsql as h', '', 't.id', '=', Condition::raw('[value]'))
                ->where('id', 503)
                ->update(['name' => '小猪']),
            $connect
        )
    );
}
```

## update 更新参数绑定

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = :hello,`test_query`.`value` = :positional_param_0 WHERE `test_query`.`id` = :test_query_id",
            {
                "positional_param_0": [
                    "小牛逼"
                ],
                "test_query_id": [
                    503
                ],
                "hello": "hello world!"
            },
            false
        ]
        eot;

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect
                ->table('test_query')
                ->where('id', 503)
                ->bind(['小牛逼'])
                ->update(
                    [
                        'name' => Condition::raw(':hello'),
                        'value' => Condition::raw('?'),
                    ],
                    [
                        'hello' => 'hello world!',
                    ]
                ),
            $connect
        )
    );
}
```

## update 更新支持表达式

``` php
public function testExpression(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "UPDATE `test_query` SET `test_query`.`name` = concat(`test_query`.`value`,`test_query`.`name`) WHERE `test_query`.`id` = :test_query_id",
            {
                "test_query_id": [
                    503
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
                ->where('id', 503)
                ->update([
                    'name' => Condition::raw('concat([value],[name])'),
                ]),
            $connect
        )
    );
}
```