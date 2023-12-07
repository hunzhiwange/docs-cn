# 双向链表

::: tip Testing Is Documentation
[tests/Support/LinkedListTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/LinkedListTest.php)
:::

在 PHP 双向链表的基础上加上数据类型验证功能，不少业务场景中保证链表中数据一致性。

阻止链表返回空数据时抛出异常的默认行为。

底层基于 spldoublylinkedlist 开发，相关文档 <http://php.net/manual/zh/class.spldoublylinkedlist.php>。

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\LinkedList;
```

## 链表基本使用方法

``` php
public function testBaseUse(): void
{
    $linkedList = new LinkedList();

    static::assertSame(0, $linkedList->count());
    static::assertNull($linkedList->pop());
    static::assertNull($linkedList->pop());
}
```

## push 链表尾部弹出元素

``` php
public function testPush(): void
{
    $linkedList = new LinkedList();
    $linkedList->push(5);
    $linkedList->push(6);

    static::assertSame(2, $linkedList->count());
    static::assertSame(6, $linkedList->pop());
    static::assertSame(5, $linkedList->pop());
    static::assertSame(0, $linkedList->count());
}
```

## unshift 链表头插入元素

``` php
public function testUnshift(): void
{
    $linkedList = new LinkedList();
    $linkedList->unshift(5);
    $linkedList->unshift(6);

    static::assertSame(2, $linkedList->count());
    static::assertSame(5, $linkedList->pop());
    static::assertSame(6, $linkedList->pop());
    static::assertSame(0, $linkedList->count());
}
```

## add 链表指定位置插入新值

``` php
public function testAdd(): void
{
    $linkedList = new LinkedList();
    $linkedList->add(0, 'hello');
    $linkedList->add(1, 'world');
    $linkedList->add(2, 'foo');
    $linkedList->add(3, 'bar');

    static::assertSame('hello', $linkedList->offsetGet(0));
    static::assertSame('world', $linkedList->offsetGet(1));
    static::assertSame('foo', $linkedList->offsetGet(2));
    static::assertSame('bar', $linkedList->offsetGet(3));
}
```

## offsetSet 更新链表指定位置链表的值

``` php
public function testOffsetSet(): void
{
    $linkedList = new LinkedList();
    $linkedList->add(0, 'hello');
    $linkedList->add(1, 'world');
    $linkedList->add(2, 'foo');
    $linkedList->add(3, 'bar');

    $linkedList->offsetSet(0, 'hello2');
    $linkedList->offsetSet(1, 'world2');
    $linkedList->offsetSet(2, 'foo2');
    $linkedList->offsetSet(3, 'bar2');

    static::assertSame('hello2', $linkedList->offsetGet(0));
    static::assertSame('world2', $linkedList->offsetGet(1));
    static::assertSame('foo2', $linkedList->offsetGet(2));
    static::assertSame('bar2', $linkedList->offsetGet(3));
}
```

## 链表支持元素类型限定

``` php
public function testValidateType(): void
{
    $this->expectException(\UnexpectedValueException::class);
    $this->expectExceptionMessage('The element type must be one of the following `string`.');

    $linkedList = new LinkedList(['string']);
    $linkedList->push(5);
}
```