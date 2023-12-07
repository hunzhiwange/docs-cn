# 插入单条数据.insert

::: tip Testing Is Documentation
[tests/Database/Create/InsertTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Create/InsertTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Database\Condition;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
```

## insert 基本用法

写入成功后，返回 `lastInsertId`。

``` php
public function testBaseUse(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "named_param_value": [
                    "吃饭饭"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => '吃饭饭'];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data),
            $connect
        )
    );
}
```

## insert 绑定参数

``` php
public function testBind(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:positional_param_0)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "positional_param_0": [
                    "吃肉"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw('?')];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, ['吃肉']),
            $connect
        )
    );

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:value)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw(':value')];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, ['value' => '呱呱呱']),
            $connect,
            1
        )
    );
}
```

::: tip
位置占位符会自动转为命名占位符，以增强灵活性。
:::

## bind.insert 绑定参数写入数据

``` php
public function testWithBindFunction(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:positional_param_0)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "positional_param_0": [
                    "吃鱼"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw('?')];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->bind(['吃鱼'])
                ->insert($data),
            $connect
        )
    );
}
```

## insert 支持 replace 用法

``` php
public function testReplace(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:value)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => Condition::raw(':value')];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, ['value' => '呱呱呱'], true),
            $connect
        )
    );
}
```

## insert 支持 ON DUPLICATE KEY UPDATE 用法

写入成功后，返回 `lastInsertId`。

``` php
public function testInsertSupportDuplicateKeyUpdate(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value) ON DUPLICATE KEY UPDATE `test_query`.`name` = VALUES(`test_query`.`name`),`test_query`.`value` = VALUES(`test_query`.`value`)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "named_param_value": [
                    "吃饭饭"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => '吃饭饭'];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, [], ['name', 'value']),
            $connect
        )
    );
}
```

## insert 支持 ON DUPLICATE KEY UPDATE 表达式用法

写入成功后，返回 `lastInsertId`。

``` php
public function testInsertSupportDuplicateKeyUpdate2(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:named_param_value) ON DUPLICATE KEY UPDATE `test_query`.`name` = (CONCAT(VALUES(`test_query`.`name`), 'lianjie', VALUES(`test_query`.`value`))),`test_query`.`value` = :value",
            {
                "value": [
                    5
                ],
                "named_param_name": [
                    "小鸭子"
                ],
                "named_param_value": [
                    "吃饭饭"
                ]
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'value' => '吃饭饭'];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, [], [
                    'name' => Condition::raw("CONCAT(VALUES([name]), 'lianjie', VALUES([value]))"),
                    'value' => 5,
                ]),
            $connect
        )
    );
}
```

## insert 支持字段指定表名

``` php
public function testInsertSupportTable(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` (`test_query`.`name`,`test_query`.`value`) VALUES (:named_param_name,:value)",
            {
                "named_param_name": [
                    "小鸭子"
                ],
                "value": "呱呱呱"
            },
            false
        ]
        eot;

    $data = ['name' => '小鸭子', 'test_query.value' => Condition::raw(':value')];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, ['value' => '呱呱呱'], true),
            $connect
        )
    );
}
```

## insert 空数据写入示例

``` php
public function testInsertWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "INSERT INTO `test_query` () VALUES ()",
            [],
            false
        ]
        eot;

    $data = [];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data),
            $connect
        )
    );
}
```

## insert.replace 空数据写入示例

``` php
public function testReplaceWithEmptyData(): void
{
    $connect = $this->createDatabaseConnectMock();

    $sql = <<<'eot'
        [
            "REPLACE INTO `test_query` () VALUES ()",
            [],
            false
        ]
        eot;

    $data = [];

    static::assertSame(
        $sql,
        $this->varJsonSql(
            $connect->table('test_query')
                ->insert($data, [], true),
            $connect,
        )
    );
}
```