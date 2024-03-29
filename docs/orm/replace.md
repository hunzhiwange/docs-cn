# 替换实体

::: tip Testing Is Documentation
[tests/Database/Ddd/Replace/ReplaceTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Replace/ReplaceTest.php)
:::

替换实体，将实体变更持久化到数据库。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\CompositeId;
use Tests\Database\Ddd\Entity\DemoEntity;
```

## replace 替换实体

**完整例子**

``` php
$entity = new DemoEntity(['id' => 1]);
$entity->name = 'foo';
$entity->replace()->flush();
```

调用 `replace` 方法并没有立刻真正持久化到数据库，这一个步骤计算好了待保存的数据。

**完整模型**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
        self::READONLY => true,
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;
}
```

``` php
public function testBaseUse(): void
{
    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    static::assertSame(1, $entity->flush());
    $sql = 'SQL: [89] INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (:named_param_id,:named_param_name) | Params:  2 | Key: Name: [15] :named_param_id | paramno=0 | name=[15] ":named_param_id" | is_param=1 | param_type=1 | Key: Name: [17] :named_param_name | paramno=1 | name=[17] ":named_param_name" | is_param=1 | param_type=2 (INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (1,\'foo\'))';
    static::assertSame($sql, $entity->select()->getLastSql());
    $entity->refresh();
    $sql = 'SQL: [64] SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id LIMIT 1 | Params:  1 | Key: Name: [8] :test_id | paramno=0 | name=[8] ":test_id" | is_param=1 | param_type=1 (SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
}
```

::: tip
通过 replace 方法替换一个实体，并通过 flush 将实体持久化到数据库。
:::

## replace 替换实体新增例子

``` php
public function testReplaceBaseUseCreate(): void
{
    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    static::assertSame(1, $entity->flush());
    $sql = 'SQL: [89] INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (:named_param_id,:named_param_name) | Params:  2 | Key: Name: [15] :named_param_id | paramno=0 | name=[15] ":named_param_id" | is_param=1 | param_type=1 | Key: Name: [17] :named_param_name | paramno=1 | name=[17] ":named_param_name" | is_param=1 | param_type=2 (INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (1,\'foo\'))';
    static::assertSame($sql, $entity->select()->getLastSql());
    $entity->refresh();
    $sql = 'SQL: [64] SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id LIMIT 1 | Params:  1 | Key: Name: [8] :test_id | paramno=0 | name=[8] ":test_id" | is_param=1 | param_type=1 (SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
}
```

## replace.condition 替换实体配合设置扩展查询条件新增例子

replace 新增例子，设置扩展查询条件没有任何作用。

``` php
public function testReplaceBaseUseCreateWithCondition(): void
{
    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());
    $entity->condition(['name' => 'hello'])->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    static::assertSame(1, $entity->flush());
    $sql = 'SQL: [89] INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (:named_param_id,:named_param_name) | Params:  2 | Key: Name: [15] :named_param_id | paramno=0 | name=[15] ":named_param_id" | is_param=1 | param_type=1 | Key: Name: [17] :named_param_name | paramno=1 | name=[17] ":named_param_name" | is_param=1 | param_type=2 (INSERT INTO `test` (`test`.`id`,`test`.`name`) VALUES (1,\'foo\'))';
    static::assertSame($sql, $entity->select()->getLastSql());
    $entity->refresh();
    $sql = 'SQL: [64] SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id LIMIT 1 | Params:  1 | Key: Name: [8] :test_id | paramno=0 | name=[8] ":test_id" | is_param=1 | param_type=1 (SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
}
```

## replace 替换实体更新例子

``` php
public function testReplaceBaseUseUpdate(): void
{
    $connect = $this->createDatabaseConnect();
    static::assertSame(
        1,
        $connect
            ->table('test')
            ->insert([
                'id' => 1,
                'name' => 'old',
            ])
    );

    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());
    $entity->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    static::assertSame(1, $entity->flush());
    $sql = 'SQL: [88] UPDATE `test` SET `test`.`name` = :named_param_name WHERE `test`.`id` = :test_id LIMIT 1 | Params:  2 | Key: Name: [17] :named_param_name | paramno=0 | name=[17] ":named_param_name" | is_param=1 | param_type=2 | Key: Name: [8] :test_id | paramno=1 | name=[8] ":test_id" | is_param=1 | param_type=1 (UPDATE `test` SET `test`.`name` = \'foo\' WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    $entity->refresh();
    $sql = 'SQL: [64] SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id LIMIT 1 | Params:  1 | Key: Name: [8] :test_id | paramno=0 | name=[8] ":test_id" | is_param=1 | param_type=1 (SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
}
```

## replace.condition 替换实体配合设置扩展查询条件更新例子

replace 更新例子，设置扩展查询条件影响更新查询条件。

``` php
public function testReplaceBaseUseUpdateWithCondition(): void
{
    $connect = $this->createDatabaseConnect();
    static::assertSame(
        1,
        $connect
            ->table('test')
            ->insert([
                'id' => 1,
                'name' => 'old',
            ])
    );

    $entity = new DemoEntity(['id' => 1]);
    $entity->name = 'foo';

    $this->assertInstanceof(Entity::class, $entity);
    static::assertSame(1, $entity->id);
    static::assertSame('foo', $entity->name);
    static::assertSame(['id', 'name'], $entity->changed());
    static::assertNull($entity->flushData());
    $entity->condition(['name' => 'hello'])->replace();

    $data = <<<'eot'
        [
            {
                "id": 1,
                "name": "foo"
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    static::assertSame(0, $entity->flush());
    $sql = 'SQL: [119] UPDATE `test` SET `test`.`name` = :named_param_name WHERE `test`.`name` = :test_name AND `test`.`id` = :test_id LIMIT 1 | Params:  3 | Key: Name: [17] :named_param_name | paramno=0 | name=[17] ":named_param_name" | is_param=1 | param_type=2 | Key: Name: [10] :test_name | paramno=1 | name=[10] ":test_name" | is_param=1 | param_type=2 | Key: Name: [8] :test_id | paramno=2 | name=[8] ":test_id" | is_param=1 | param_type=1 (UPDATE `test` SET `test`.`name` = \'foo\' WHERE `test`.`name` = \'hello\' AND `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    $entity->refresh();
    $sql = 'SQL: [64] SELECT `test`.* FROM `test` WHERE `test`.`id` = :test_id LIMIT 1 | Params:  1 | Key: Name: [8] :test_id | paramno=0 | name=[8] ":test_id" | is_param=1 | param_type=1 (SELECT `test`.* FROM `test` WHERE `test`.`id` = 1 LIMIT 1)';
    static::assertSame($sql, $entity->select()->getLastSql());
    static::assertSame(1, $entity->id);
    static::assertSame('old', $entity->name);
}
```

## replace 替换快捷方式，记录存在但是不存在更新数据不作任何处理

这里和单纯的更新不一样，单纯的更新不存在更新数据，则会抛出异常。

``` php
public function testReplaceWithCompositeIdButNoDataToBeUpdate(): void
{
    $connect = $this->createDatabaseConnect();
    static::assertSame(
        1,
        $connect
            ->table('composite_id')
            ->insert([
                'id1' => 2,
                'id2' => 3,
            ])
    );

    $entity = new CompositeId();
    $entity->replace(['id1' => 2, 'id2' => 3]);

    $data = <<<'eot'
        [
            {
                "id1": 2,
                "id2": 3
            }
        ]
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->flushData()
        )
    );

    $entity->flush();

    $sql = '[FAILED] SQL: [113] INSERT INTO `composite_id` (`composite_id`.`id1`,`composite_id`.`id2`) VALUES (:named_param_id1,:named_param_id2) | Params:  2 | Key: Name: [16] :named_param_id1 | paramno=0 | name=[16] ":named_param_id1" | is_param=1 | param_type=1 | Key: Name: [16] :named_param_id2 | paramno=1 | name=[16] ":named_param_id2" | is_param=1 | param_type=1 (INSERT INTO `composite_id` (`composite_id`.`id1`,`composite_id`.`id2`) VALUES (2,3))';
    static::assertSame($sql, $entity->select()->getLastSql());
}
```