# 实体导出数组

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityToArrayTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityToArrayTest.php)
:::

我们可以将实体导出为数组来方便处理数据。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoToArrayBlackEntity;
use Tests\Database\Ddd\Entity\DemoToArrayEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationEntity;
use Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationTargetEntity;
use Tests\Database\Ddd\Entity\DemoToArrayWhiteEntity;
use Tests\Database\Ddd\Entity\Relation\Post;
use Tests\Database\Ddd\Entity\Relation\User;
```

## toArray 基本使用方法

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeEntity
protected function makeEntity(): DemoToArrayEntity
{
    $entity = new DemoToArrayEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
    ])]
    protected ?string $description = null;

    #[Struct([
    ])]
    protected ?string $address = null;

    #[Struct([
    ])]
    protected ?string $fooBar = null;

    #[Struct([
    ])]
    protected ?string $hello = null;
}
```

``` php
public function testBaseUse(): void
{
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持白名单

`toArray` 第一个参数为白名单，设置了白名单，只有白名单的字段才能够转换为数组数据。

``` php
public function testWithWhite(): void
{
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->only(['name'])
                ->toArray(),
            1
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->only(['name', 'description'])
                ->toArray(),
            2
        )
    );

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->only(['name', 'description', 'hello'])
                ->toArray(),
            3
        )
    );
}
```

## toArray 实体对象转数组支持黑名单

`toArray` 第二个参数为白名单，设置了黑名单但是没有设置白名单，只有不属于黑名单的字段才能够转换为数组数据。

``` php
public function testWithBlack(): void
{
    $entity = $this->makeEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );

    $data = <<<'eot'
        {
            "description": "goods name",
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->except(['name'])
                ->toArray(),
            1
        )
    );

    $data = <<<'eot'
        {
            "address": "四川成都",
            "foo_bar": "foo",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->except(['name', 'description'])
                ->toArray(),
            2
        )
    );

    $data = <<<'eot'
        {
            "description": "goods name",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->except(['foo_bar', 'name', 'address'])
                ->toArray(),
            3
        )
    );
}
```

## toArray 实体对象转数组支持字段设置为白名单

可以通过 `STRUCT` 中的定义 `\Leevel\Database\Ddd\Entity::SHOW_PROP_WHITE` 来设置字段白名单。

值得注意的是， `toArray` 的第一个参数白名单优先级更高。

如果设置了白名单，只有白名单的字段才能够转换为数组数据。

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeWhiteEntity
protected function makeWhiteEntity(): DemoToArrayWhiteEntity
{
    $entity = new DemoToArrayWhiteEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayWhiteEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayWhiteEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
        self::SHOW_PROP_WHITE => true,
    ])]
    protected ?string $description = null;

    #[Struct([
    ])]
    protected ?string $address = null;

    #[Struct([
        self::SHOW_PROP_WHITE => true,
    ])]
    protected ?string $fooBar = null;

    #[Struct([
    ])]
    protected ?string $hello = null;
}
```

``` php
public function testWithWhiteEntity(): void
{
    $entity = $this->makeWhiteEntity();

    $data = <<<'eot'
        {
            "description": "goods name",
            "foo_bar": "foo"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持字段设置为黑名单

可以通过 `STRUCT` 中的定义 `\Leevel\Database\Ddd\Entity::SHOW_PROP_BLACK` 来设置字段黑名单。

值得注意的是， `toArray` 的第二个参数黑名单优先级更高。

如果设置了黑名单，设置了黑名单但是没有设置白名单，只有不属于黑名单的字段才能够转换为数组数据。

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeBlackEntity
protected function makeBlackEntity(): DemoToArrayBlackEntity
{
    $entity = new DemoToArrayBlackEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';
    $entity->address = '四川成都';
    $entity->foo_bar = 'foo';
    $entity->hello = 'hello world';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayBlackEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayBlackEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
        self::SHOW_PROP_BLACK => true,
    ])]
    protected ?string $description = null;

    #[Struct([
    ])]
    protected ?string $address = null;

    #[Struct([
        self::SHOW_PROP_BLACK => true,
    ])]
    protected ?string $fooBar = null;

    #[Struct([
    ])]
    protected ?string $hello = null;
}
```

``` php
public function testWithBlackEntity(): void
{
    $entity = $this->makeBlackEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "address": "四川成都",
            "hello": "hello world"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持转换关联实体数据

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeRelationEntity
protected function makeRelationEntity(): Post
{
    $user = new User(['id' => 7]);
    $user->name = 'xiaoniuge';

    $entity = new Post(['id' => 5]);
    $this->assertInstanceof(Post::class, $entity);
    $entity->title = 'I am title';
    $entity->summary = 'I am summary';
    $entity->userId = 7;
    $entity->withRelationProp('user', $user);

    return $entity;
}
```

**Tests\Database\Ddd\Entity\Relation\User**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\ManyMany;
use Leevel\Database\Ddd\Struct;

class User extends Entity
{
    public const TABLE = 'user';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $role = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleSoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'withSoftDeleted',
    ])]
    protected ?Collection $roleMiddleWithSoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'onlySoftDeleted',
    ])]
    protected ?Collection $roleMiddleOnlySoftDeleted = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'notFound',
    ])]
    protected ?Collection $roleRelationScopeNotFound = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'foundButPrivate',
    ])]
    protected ?Collection $roleRelationScopeFoundButPrivate = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleEntity = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedSourceKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedTargetKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_TARGET_KEY => 'role_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleSourceKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
    ])]
    protected ?Collection $roleNotDefinedMiddleTargetKey = null;

    #[Struct([
        self::MANY_MANY => Role::class,
        self::MIDDLE_ENTITY => UserRole::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'middleField',
    ])]
    protected ?Collection $roleMiddleField = null;

    #[Struct([
        self::MANY_MANY => RoleSoftDeleted::class,
        self::MIDDLE_ENTITY => UserRoleSoftDeleted::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
        self::MIDDLE_SOURCE_KEY => 'user_id',
        self::MIDDLE_TARGET_KEY => 'role_id',
        self::RELATION_SCOPE => 'middleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition',
    ])]
    protected ?Collection $roleMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition = null;

    protected function relationScopeWithSoftDeleted(ManyMany $relation): void
    {
        $relation->middleWithSoftDeleted();
    }

    protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
    {
        $relation->middleOnlySoftDeleted();
    }

    protected function relationScopeMiddleField(ManyMany $relation): void
    {
        $relation->middleField(['create_at', 'middle_id' => 'id']);
    }

    protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
    {
        $relation
            ->middleOnlySoftDeleted()
            ->middleField(['create_at', 'middle_id' => 'id'])
            ->setColumns('id,name')
            ->where('id', '>', 3)
        ;
    }

    /** @phpstan-ignore-next-line */
    private function relationScopeFoundButPrivate(ManyMany $relation): void
    {
    }
}
```

**Tests\Database\Ddd\Entity\Relation\Post**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Struct;

class Post extends Entity
{
    public const TABLE = 'post';

    public const ID = 'id';

    public const AUTO = 'id';

    public const DELETE_AT = 'delete_at';

    #[Struct([
        self::READONLY => true,
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $title = null;

    #[Struct([
    ])]
    protected ?int $userId = null;

    #[Struct([
    ])]
    protected ?string $summary = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
        self::CREATE_FILL => 0,
    ])]
    protected ?int $deleteAt = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::SOURCE_KEY => 'user_id',
        self::TARGET_KEY => 'id',
    ])]
    protected ?User $user = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'post_id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?Collection $comment = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'post_id',
    ])]
    protected ?PostContent $postContent = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::TARGET_KEY => 'id',
    ])]
    protected ?int $userNotDefinedSourceKey = null;

    #[Struct([
        self::BELONGS_TO => User::class,
        self::SOURCE_KEY => 'id',
    ])]
    protected ?int $userNotDefinedTargetKey = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::TARGET_KEY => 'post_id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?int $commentNotDefinedSourceKey = null;

    #[Struct([
        self::HAS_MANY => Comment::class,
        self::SOURCE_KEY => 'id',
        self::RELATION_SCOPE => 'comment',
    ])]
    protected ?int $commentNotDefinedTargetKey = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::TARGET_KEY => 'post_id',
    ])]
    protected ?int $postContentNotDefinedSourceKey = null;

    #[Struct([
        self::HAS_ONE => PostContent::class,
        self::SOURCE_KEY => 'id',
    ])]
    protected ?int $postContentNotDefinedTargetKey = null;

    protected function relationScopeComment(Relation $relation): void
    {
        $relation->where('id', '>', 4);
    }
}
```

``` php
public function testWithRelation(): void
{
    $entity = $this->makeRelationEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "title": "I am title",
            "user_id": 7,
            "summary": "I am summary",
            "user": {
                "id": 7,
                "name": "xiaoniuge"
            }
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持转换关联实体数据（黑白名单）

`toArray` 第三个参数为关联实体的黑白名单。

``` php
public function testWithRelationWhiteAndBlack(): void
{
    $entity = $this->makeRelationEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "title": "I am title",
            "user_id": 7,
            "summary": "I am summary",
            "user": {
                "name": "xiaoniuge"
            }
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity
                ->each(function ($value, $k) {
                    if ('user' === $k) {
                        $value = $value->only(['name']);
                    }

                    return $value;
                })
                ->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持 NULL 值字段默认指定数据

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeShowPropNullEntity
protected function makeShowPropNullEntity(): DemoToArrayShowPropNullEntity
{
    $entity = new DemoToArrayShowPropNullEntity();
    $this->assertInstanceof(Entity::class, $entity);
    $entity->name = '实体名字';
    $entity->description = 'goods name';

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayShowPropNullEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
    ])]
    protected ?string $description = null;

    #[Struct([
        self::SHOW_PROP_NULL => '',
    ])]
    protected ?string $address = null;

    #[Struct([
        self::SHOW_PROP_NULL => null,
    ])]
    protected ?string $fooBar = null;

    #[Struct([
        self::SHOW_PROP_NULL => 'default_value',
    ])]
    protected ?string $hello = null;
}
```

``` php
public function testWithShowPropNull(): void
{
    $entity = $this->makeShowPropNullEntity();

    $data = <<<'eot'
        {
            "name": "实体名字",
            "description": "goods name",
            "address": "",
            "foo_bar": null,
            "hello": "default_value"
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```

## toArray 实体对象转数组支持 NULL 值字段默认指定数据（关联模型）

**fixture 定义**

``` php
# Tests\Database\Ddd\EntityToArrayTest::makeRelationShowPropNullEntity
protected function makeRelationShowPropNullEntity(): DemoToArrayShowPropNullRelationEntity
{
    $target = new DemoToArrayShowPropNullRelationTargetEntity(['id' => 5]);
    $target->name = 'xiaoniuge';

    $entity = new DemoToArrayShowPropNullRelationEntity(['id' => 5]);
    $this->assertInstanceof(DemoToArrayShowPropNullRelationEntity::class, $entity);
    $entity->name = 'I am name';
    $entity->description = 'I am description';
    $entity->withRelationProp('target', $target);

    return $entity;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationTargetEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayShowPropNullRelationTargetEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;
}
```

**Tests\Database\Ddd\Entity\DemoToArrayShowPropNullRelationEntity**

``` php
namespace Tests\Database\Ddd\Entity;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class DemoToArrayShowPropNullRelationEntity extends Entity
{
    public const TABLE = 'test';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?string $name = null;

    #[Struct([
    ])]
    protected ?string $description = null;

    #[Struct([
        self::SHOW_PROP_NULL => '',
    ])]
    protected ?string $address = null;

    #[Struct([
        self::SHOW_PROP_NULL => null,
    ])]
    protected ?string $fooBar = null;

    #[Struct([
        self::SHOW_PROP_NULL => 'default_value',
    ])]
    protected ?string $hello = null;

    #[Struct([
        self::HAS_ONE => DemoToArrayShowPropNullRelationTargetEntity::class,
        self::SOURCE_KEY => 'id',
        self::TARGET_KEY => 'id',
    ])]
    protected ?DemoToArrayShowPropNullRelationTargetEntity $target = null;
}
```

``` php
public function testWithShowPropNullForRelation(): void
{
    $entity = $this->makeRelationShowPropNullEntity();

    $data = <<<'eot'
        {
            "id": 5,
            "name": "I am name",
            "description": "I am description",
            "address": "",
            "foo_bar": null,
            "hello": "default_value",
            "target": {
                "id": 5,
                "name": "xiaoniuge"
            }
        }
        eot;

    static::assertSame(
        $data,
        $this->varJson(
            $entity->toArray()
        )
    );
}
```