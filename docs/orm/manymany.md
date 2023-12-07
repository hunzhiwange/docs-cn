# manyMany 多对多关联

::: tip Testing Is Documentation
[tests/Database/Ddd/Relation/ManyManyTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/Relation/ManyManyTest.php)
:::

多对多的关联是一种常用的关联，比如用户与角色属于多对多的关系。

**多对多关联支持类型关联项**

|  关联项   | 说明  |    例子   |
|  ----  | ----  | ----  |
| \Leevel\Database\Ddd\Entity::MANY_MANY  | 多对多关联实体 |  \Tests\Database\Ddd\Entity\Relation\Role::class  |
| \Leevel\Database\Ddd\Entity::MIDDLE_ENTITY  | 关联查询中间实体 |  \Tests\Database\Ddd\Entity\Relation\UserRole::class  |
| \Leevel\Database\Ddd\Entity::SOURCE_KEY  | 关联查询源键字段 | user_id |
| \Leevel\Database\Ddd\Entity::TARGET_KEY  | 关联目标键字段 | id |
| \Leevel\Database\Ddd\Entity::MIDDLE_SOURCE_KEY  | 关联查询中间实体源键字段 | id |
| \Leevel\Database\Ddd\Entity::MIDDLE_TARGET_KEY  | 关联查询中间实体目标键字段 | id |
| \Leevel\Database\Ddd\Entity::RELATION_SCOPE  | 关联查询作用域 | middleField |

**Uses**

``` php
<?php

use Leevel\Database\Ddd\EntityCollection as Collection;
use Leevel\Database\Ddd\Relation\ManyMany;
use Leevel\Database\Ddd\Relation\Relation;
use Leevel\Database\Ddd\Select;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\Relation\Role;
use Tests\Database\Ddd\Entity\Relation\RoleSoftDeleted;
use Tests\Database\Ddd\Entity\Relation\User;
use Tests\Database\Ddd\Entity\Relation\UserRole;
use Tests\Database\Ddd\Entity\Relation\UserRoleSoftDeleted;
```

## 基本使用方法

**fixture 定义**

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

**Tests\Database\Ddd\Entity\Relation\UserRole**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class UserRole extends Entity
{
    public const TABLE = 'user_role';

    public const ID = 'id';

    public const AUTO = 'id';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?int $userId = null;

    #[Struct([
    ])]
    protected ?int $roleId = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
    ])]
    protected ?int $deleteAt = null;
}
```

**Tests\Database\Ddd\Entity\Relation\Role**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class Role extends Entity
{
    public const TABLE = 'role';

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
}
```

``` php
public function testBaseUse(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    static::assertSame(1, $role1->id);
    static::assertSame(1, $role1['id']);
    static::assertSame(1, $role1->getId());
    static::assertSame('管理员', $role1->name);
    static::assertSame('管理员', $role1['name']);
    static::assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    static::assertSame(3, $role2->id);
    static::assertSame(3, $role2['id']);
    static::assertSame(3, $role2->getId());
    static::assertSame('会员', $role2->name);
    static::assertSame('会员', $role2['name']);
    static::assertSame('会员', $role2->getName());

    static::assertCount(2, $role);
    static::assertSame(1, $role[0]['id']);
    static::assertSame('管理员', $role[0]['name']);
    static::assertSame(3, $role[1]['id']);
    static::assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```

## eager 预加载关联

``` php
public function testEager(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::eager(['role'])
        ->where('id', 1)
        ->findOne()
    ;

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    static::assertSame(1, $role1->id);
    static::assertSame(1, $role1['id']);
    static::assertSame(1, $role1->getId());
    static::assertSame('管理员', $role1->name);
    static::assertSame('管理员', $role1['name']);
    static::assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(Role::class, $role2);
    static::assertSame(3, $role2->id);
    static::assertSame(3, $role2['id']);
    static::assertSame(3, $role2->getId());
    static::assertSame('会员', $role2->name);
    static::assertSame('会员', $role2['name']);
    static::assertSame('会员', $role2->getName());

    static::assertCount(2, $role);
    static::assertSame(1, $role[0]['id']);
    static::assertSame('管理员', $role[0]['name']);
    static::assertSame(3, $role[1]['id']);
    static::assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    static::assertSame(1, $middle->userId);
    static::assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```

## eager 预加载关联支持查询条件过滤

``` php
public function testEagerWithCondition(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::eager(['role' => function (Relation $select): void {
        $select->where('id', '>', 99999);
    }])
        ->where('id', 1)
        ->findOne()
    ;

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);
    static::assertCount(0, $role);
}
```

## relation 读取关联

``` php
public function testRelationAsMethod(): void
{
    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $roleRelation = User::make()->relation('role');

    $this->assertInstanceof(ManyMany::class, $roleRelation);
    static::assertSame('id', $roleRelation->getSourceKey());
    static::assertSame('id', $roleRelation->getTargetKey());
    static::assertSame('user_id', $roleRelation->getMiddleSourceKey());
    static::assertSame('role_id', $roleRelation->getMiddleTargetKey());
    $this->assertInstanceof(User::class, $roleRelation->getSourceEntity());
    $this->assertInstanceof(Role::class, $roleRelation->getTargetEntity());
    $this->assertInstanceof(UserRole::class, $roleRelation->getMiddleEntity());
    $this->assertInstanceof(Select::class, $roleRelation->getSelect());
}
```

## relation 关联模型数据不存在返回空集合

``` php
public function testRelationDataWasNotFound(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role')
            ->insert([
                'name' => '会员',
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->role;

    $this->assertInstanceof(Collection::class, $role);
    static::assertCount(0, $role);
}
```

## 关联软删除

**fixture 定义**

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

**Tests\Database\Ddd\Entity\Relation\UserRoleSoftDeleted**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class UserRoleSoftDeleted extends Entity
{
    public const TABLE = 'user_role_soft_deleted';

    public const ID = 'id';

    public const AUTO = 'id';

    public const DELETE_AT = 'delete_at';

    #[Struct([
    ])]
    protected ?int $id = null;

    #[Struct([
    ])]
    protected ?int $userId = null;

    #[Struct([
    ])]
    protected ?int $roleId = null;

    #[Struct([
    ])]
    protected ?string $createAt = null;

    #[Struct([
        self::CREATE_FILL => 0,
    ])]
    protected ?int $deleteAt = null;
}
```

**Tests\Database\Ddd\Entity\Relation\RoleSoftDeleted**

``` php
namespace Tests\Database\Ddd\Entity\Relation;

use Leevel\Database\Ddd\Entity;
use Leevel\Database\Ddd\Struct;

class RoleSoftDeleted extends Entity
{
    public const TABLE = 'role_soft_deleted';

    public const ID = 'id';

    public const AUTO = 'id';

    public const DELETE_AT = 'delete_at';

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
        self::CREATE_FILL => 0,
    ])]
    protected ?int $deleteAt = null;
}
```

``` php
public function testSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->roleSoftDeleted;

    $sql = <<<'eot'
 [500] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` = :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :sub1_role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:sub1_user_role_soft_deleted_user_id_in0) | Params:  3 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [33] :sub1_role_soft_deleted_delete_at | paramno=1 | name=[33] ":sub1_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [40] :sub1_user_role_soft_deleted_user_id_in0 | paramno=2 | name=[40] ":sub1_user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` = 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))

    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    static::assertSame(1, $role1->id);
    static::assertSame(1, $role1['id']);
    static::assertSame(1, $role1->getId());
    static::assertSame('管理员', $role1->name);
    static::assertSame('管理员', $role1['name']);
    static::assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(RoleSoftDeleted::class, $role2);
    static::assertSame(3, $role2->id);
    static::assertSame(3, $role2['id']);
    static::assertSame(3, $role2->getId());
    static::assertSame('会员', $role2->name);
    static::assertSame('会员', $role2['name']);
    static::assertSame('会员', $role2->getName());

    static::assertCount(2, $role);
    static::assertSame(1, $role[0]['id']);
    static::assertSame('管理员', $role[0]['name']);
    static::assertSame(3, $role[1]['id']);
    static::assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```

## middleWithSoftDeleted 中间实体包含软删除数据的数据库查询集合对象

通过关联作用域来设置中间实体包含软删除数据的数据库查询集合对象。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeWithSoftDeleted
protected function relationScopeWithSoftDeleted(ManyMany $relation): void
{
    $relation->middleWithSoftDeleted();
}
```

``` php
public function testWithMiddleSoftDeletedAndMiddleEntityHasSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->roleMiddleWithSoftDeleted;

    $sql = <<<'eot'
 [423] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` WHERE `role_soft_deleted`.`delete_at` = :sub1_role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:sub1_user_role_soft_deleted_user_id_in0) | Params:  2 | Key: Name: [33] :sub1_role_soft_deleted_delete_at | paramno=0 | name=[33] ":sub1_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [40] :sub1_user_role_soft_deleted_user_id_in0 | paramno=1 | name=[40] ":sub1_user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))

    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    static::assertSame(1, $role1->id);
    static::assertSame(1, $role1['id']);
    static::assertSame(1, $role1->getId());
    static::assertSame('管理员', $role1->name);
    static::assertSame('管理员', $role1['name']);
    static::assertSame('管理员', $role1->getName());

    $role2 = $role[1];

    $this->assertInstanceof(RoleSoftDeleted::class, $role2);
    static::assertSame(3, $role2->id);
    static::assertSame(3, $role2['id']);
    static::assertSame(3, $role2->getId());
    static::assertSame('会员', $role2->name);
    static::assertSame('会员', $role2['name']);
    static::assertSame('会员', $role2->getName());

    static::assertCount(2, $role);
    static::assertSame(1, $role[0]['id']);
    static::assertSame('管理员', $role[0]['name']);
    static::assertSame(3, $role[1]['id']);
    static::assertSame('会员', $role[1]['name']);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(1, $middle->roleId);

    $middle = $role[1]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```

## middleOnlySoftDeleted 中间实体仅仅包含软删除数据的数据库查询集合对象

通过关联作用域来设置中间实体仅仅包含软删除数据的数据库查询集合对象。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeOnlySoftDeleted
protected function relationScopeOnlySoftDeleted(ManyMany $relation): void
{
    $relation->middleOnlySoftDeleted();
}
```

``` php
public function testOnlyMiddleSoftDeletedAndMiddleEntityHasSoftDeleted(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->roleMiddleOnlySoftDeleted;

    $sql = <<<'eot'
 [500] SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :sub1_role_soft_deleted_delete_at AND `user_role_soft_deleted`.`user_id` IN (:sub1_user_role_soft_deleted_user_id_in0) | Params:  3 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [33] :sub1_role_soft_deleted_delete_at | paramno=1 | name=[33] ":sub1_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [40] :sub1_user_role_soft_deleted_user_id_in0 | paramno=2 | name=[40] ":sub1_user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.*,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `user_role_soft_deleted`.`user_id` IN (1))

    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);

    $role1 = $role[0];

    $this->assertInstanceof(RoleSoftDeleted::class, $role1);
    static::assertSame(3, $role1->id);
    static::assertSame(3, $role1['id']);
    static::assertSame(3, $role1->getId());
    static::assertSame('会员', $role1->name);
    static::assertSame('会员', $role1['name']);
    static::assertSame('会员', $role1->getName());

    $role2 = $role[1];

    static::assertNull($role2);

    static::assertCount(1, $role);
    static::assertSame(3, $role[0]['id']);
    static::assertSame('会员', $role[0]['name']);
    static::assertNull($role[1]['id'] ?? null);
    static::assertNull($role[1]['name'] ?? null);

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRoleSoftDeleted::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(3, $middle->roleId);
}
```

## middleOnlySoftDeleted.middleField.where 组合条件查询例子

通过关联作用域来设置组合查询条件。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition
protected function relationScopeMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(ManyMany $relation): void
{
    $relation
        ->middleOnlySoftDeleted()
        ->middleField(['create_at', 'middle_id' => 'id'])
        ->setColumns('id,name')
        ->where('id', '>', 3)
    ;
}
```

``` php
public function testMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        3,
        $connect
            ->table('role_soft_deleted')
            ->insert([
                'name' => '会员',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 1,
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('user_role_soft_deleted')
            ->insert([
                'user_id' => 1,
                'role_id' => 3,
                'delete_at' => time(),
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->roleMiddleOnlySoftDeletedAndMiddleFieldAndOtherTableCondition;

    $sql = <<<'eot'
 [670] SELECT `role_soft_deleted`.`id`,`role_soft_deleted`.`name`,`user_role_soft_deleted`.`create_at`,`user_role_soft_deleted`.`id` AS `middle_id`,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > :user_role_soft_deleted_delete_at WHERE `role_soft_deleted`.`delete_at` = :sub1_role_soft_deleted_delete_at AND `role_soft_deleted`.`id` > :sub1_role_soft_deleted_id AND `user_role_soft_deleted`.`user_id` IN (:sub1_user_role_soft_deleted_user_id_in0) | Params:  4 | Key: Name: [33] :user_role_soft_deleted_delete_at | paramno=0 | name=[33] ":user_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [33] :sub1_role_soft_deleted_delete_at | paramno=1 | name=[33] ":sub1_role_soft_deleted_delete_at" | is_param=1 | param_type=1 | Key: Name: [26] :sub1_role_soft_deleted_id | paramno=2 | name=[26] ":sub1_role_soft_deleted_id" | is_param=1 | param_type=1 | Key: Name: [40] :sub1_user_role_soft_deleted_user_id_in0 | paramno=3 | name=[40] ":sub1_user_role_soft_deleted_user_id_in0" | is_param=1 | param_type=1 (SELECT `role_soft_deleted`.`id`,`role_soft_deleted`.`name`,`user_role_soft_deleted`.`create_at`,`user_role_soft_deleted`.`id` AS `middle_id`,`user_role_soft_deleted`.`role_id` AS `middle_role_id`,`user_role_soft_deleted`.`user_id` AS `middle_user_id` FROM `role_soft_deleted` INNER JOIN `user_role_soft_deleted` ON `user_role_soft_deleted`.`role_id` = `role_soft_deleted`.`id` AND `user_role_soft_deleted`.`delete_at` > 0 WHERE `role_soft_deleted`.`delete_at` = 0 AND `role_soft_deleted`.`id` > 3 AND `user_role_soft_deleted`.`user_id` IN (1))

    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);
    static::assertFalse(isset($role[0]));
}
```

## middleField 中间实体查询字段

通过关联作用域来设置中间实体查询字段。

**fixture 定义**

``` php
# Tests\Database\Ddd\Entity\Relation\User::relationScopeMiddleField
protected function relationScopeMiddleField(ManyMany $relation): void
{
    $relation->middleField(['create_at', 'middle_id' => 'id']);
}
```

``` php
public function testMiddleField(): void
{
    $user = User::select()->where('id', 1)->findOne();

    $this->assertInstanceof(User::class, $user);
    static::assertNull($user->id);

    $connect = $this->createDatabaseConnect();

    static::assertSame(
        1,
        $connect
            ->table('user')
            ->insert([
                'name' => 'niu',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('role')
            ->insert([
                'name' => '管理员',
            ])
    );

    static::assertSame(
        2,
        $connect
            ->table('role')
            ->insert([
                'name' => '版主',
            ])
    );

    static::assertSame(
        1,
        $connect
            ->table('user_role')
            ->insert([
                'user_id' => 1,
                'role_id' => 2,
            ])
    );

    $user = User::select()->where('id', 1)->findOne();

    $sql = <<<'eot'
        SQL: [64] SELECT `user`.* FROM `user` WHERE `user`.`id` = :user_id LIMIT 1 | Params:  1 | Key: Name: [8] :user_id | paramno=0 | name=[8] ":user_id" | is_param=1 | param_type=1 (SELECT `user`.* FROM `user` WHERE `user`.`id` = 1 LIMIT 1)
        eot;
    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    static::assertSame(1, $user->id);
    static::assertSame(1, $user['id']);
    static::assertSame(1, $user->getId());
    static::assertSame('niu', $user->name);
    static::assertSame('niu', $user['name']);
    static::assertSame('niu', $user->getName());

    $role = $user->roleMiddleField;

    $sql = <<<'eot'
 [290] SELECT `role`.*,`user_role`.`create_at`,`user_role`.`id` AS `middle_id`,`user_role`.`role_id` AS `middle_role_id`,`user_role`.`user_id` AS `middle_user_id` FROM `role` INNER JOIN `user_role` ON `user_role`.`role_id` = `role`.`id` WHERE `user_role`.`user_id` IN (:sub1_user_role_user_id_in0) | Params:  1 | Key: Name: [27] :sub1_user_role_user_id_in0 | paramno=0 | name=[27] ":sub1_user_role_user_id_in0" | is_param=1 | param_type=1 (SELECT `role`.*,`user_role`.`create_at`,`user_role`.`id` AS `middle_id`,`user_role`.`role_id` AS `middle_role_id`,`user_role`.`user_id` AS `middle_user_id` FROM `role` INNER JOIN `user_role` ON `user_role`.`role_id` = `role`.`id` WHERE `user_role`.`user_id` IN (1))

    static::assertSame(
        $sql,
        User::select()->getLastSql(),
    );

    $this->assertInstanceof(Collection::class, $role);
    static::assertCount(1, $role);

    $role1 = $role[0];

    $this->assertInstanceof(Role::class, $role1);
    static::assertSame(2, $role1->id);
    static::assertSame(2, $role1['id']);
    static::assertSame(2, $role1->getId());
    static::assertSame('版主', $role1->name);
    static::assertSame('版主', $role1['name']);
    static::assertSame('版主', $role1->getName());

    $middle = $role[0]->middle();
    $this->assertInstanceof(UserRole::class, $middle);
    static::assertSame(1, $middle->userId);
    static::assertSame(2, $middle->roleId);
}
```