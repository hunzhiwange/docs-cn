# 实体事件

::: tip Testing Is Documentation
[tests/Database/Ddd/EntityEventTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Database/Ddd/EntityEventTest.php)
:::

实体在新增和更新时，预植了事件监听器，可以定义一些事件。

**Uses**

``` php
<?php

use Leevel\Database\Ddd\Entity;
use Leevel\Di\Container;
use Leevel\Event\Dispatch;
use Leevel\Kernel\Utils\Api;
use Tests\Database\DatabaseTestCase as TestCase;
use Tests\Database\Ddd\Entity\DemoEventEntity;
```

## 事件基本使用方法

``` php
public function testBaseUse(): void
{
    $dispatch = new Dispatch(new Container());
    static::assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());

    $test = new DemoEventEntity(['name' => 'foo']);
    DemoEventEntity::event(Entity::BEFORE_CREATING_EVENT, function (): void {
        $_SERVER['ENTITY.BEFORE_CREATING_EVENT'] = 'BEFORE_CREATING_EVENT';
    });
    DemoEventEntity::event(Entity::AFTER_CREATED_EVENT, function (): void {
        $_SERVER['ENTITY.AFTER_CREATED_EVENT'] = 'AFTER_CREATED_EVENT';
    });

    static::assertFalse(isset($_SERVER['ENTITY.BEFORE_CREATING_EVENT']));
    static::assertFalse(isset($_SERVER['ENTITY.AFTER_CREATED_EVENT']));

    $test->create()->flush();

    static::assertTrue(isset($_SERVER['ENTITY.BEFORE_CREATING_EVENT']));
    static::assertTrue(isset($_SERVER['ENTITY.AFTER_CREATED_EVENT']));
    static::assertSame('BEFORE_CREATING_EVENT', $_SERVER['ENTITY.BEFORE_CREATING_EVENT']);
    static::assertSame('AFTER_CREATED_EVENT', $_SERVER['ENTITY.AFTER_CREATED_EVENT']);

    unset($_SERVER['ENTITY.BEFORE_CREATING_EVENT'], $_SERVER['ENTITY.AFTER_CREATED_EVENT']);
}
```

## 实体支持的事件

``` php
# Tests\Database\Ddd\EntityEventTest::getSupportedEvent
public static function getSupportedEvent()
{
    return [
        [Entity::BEFORE_SAVING_EVENT],
        [Entity::AFTER_SAVED_EVENT],
        [Entity::BEFORE_CREATING_EVENT],
        [Entity::AFTER_CREATED_EVENT],
        [Entity::BEFORE_UPDATING_EVENT],
        [Entity::AFTER_UPDATED_EVENT],
        [Entity::BEFORE_DELETING_EVENT],
        [Entity::AFTER_DELETED_EVENT],
        [Entity::BEFORE_SOFT_DELETING_EVENT],
        [Entity::AFTER_SOFT_DELETED_EVENT],
        [Entity::BEFORE_SOFT_RESTORING_EVENT],
        [Entity::AFTER_SOFT_RESTORED_EVENT],
    ];
}
```

``` php
public function testSupportEvent($event): void
{
    $dispatch = new Dispatch(new Container());
    static::assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());

    $supportEvent = DemoEventEntity::supportEvent();
    static::assertTrue(\in_array($event, $supportEvent, true));
}
```

## 不受支持的事件

``` php
public function testEventWasNotSupport(): void
{
    $this->expectException(\InvalidArgumentException::class);
    $this->expectExceptionMessage('Event `not_support` do not support.');

    $dispatch = new Dispatch(new Container());
    static::assertNull(Entity::eventDispatch());
    Entity::withEventDispatch($dispatch);
    $this->assertInstanceof(Dispatch::class, Entity::eventDispatch());
    DemoEventEntity::event('not_support', function (): void {
    });
}
```