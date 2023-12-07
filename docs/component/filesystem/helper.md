# 文件系统助手函数

::: tip Testing Is Documentation
[tests/Filesystem/HelperTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Filesystem/HelperTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Filesystem\Helper;
use Leevel\Kernel\Utils\Api;
```

## create_directory 创建目录

``` php
public function testCreateDirectory(): void
{
    $dir = __DIR__.'/createDirectory';

    static::assertDirectoryDoesNotExist($dir);

    Helper::createDirectory($dir);

    static::assertDirectoryExists($dir);

    Helper::createDirectory($dir);
    Helper::createDirectory($dir);

    Helper::deleteDirectory($dir);
}
```

## delete_directory 删除目录

``` php
public function testDeleteDirectory(): void
{
    $dir = __DIR__.'/deleteDirectory/dir';

    static::assertDirectoryDoesNotExist($dir);

    Helper::deleteDirectory($dir);

    Helper::createDirectory($dir);

    static::assertDirectoryExists($dir);

    Helper::deleteDirectory($dir);

    $topDir = \dirname($dir);

    static::assertDirectoryExists($topDir);

    Helper::deleteDirectory($topDir);

    static::assertDirectoryDoesNotExist($topDir);
}
```

## traverse_directory 遍历目录

``` php
public function testTraverseDirectory(): void
{
    $sourcePath = __DIR__.'/traverseDirectory';
    $sourceSubPath = __DIR__.'/traverseDirectory/dir';

    static::assertDirectoryDoesNotExist($sourceSubPath);

    Helper::createDirectory($sourceSubPath);

    file_put_contents($testFile = $sourceSubPath.'/hello.txt', 'foo');

    static::assertTrue(is_file($testFile));

    static::assertSame('foo', file_get_contents($testFile));

    $filesAndDirs = [];
    $filesAndDirs2 = [];

    Helper::traverseDirectory($sourcePath, true, function ($item) use (&$filesAndDirs): void {
        $filesAndDirs[] = $item->getFileName();
    });

    Helper::traverseDirectory($sourcePath, true, function ($item) use (&$filesAndDirs2): void {
        $filesAndDirs2[] = $item->getFileName();
    }, ['hello.txt']);

    static::assertSame(['dir', 'hello.txt'], $filesAndDirs);
    static::assertSame(['dir'], $filesAndDirs2);

    Helper::deleteDirectory($sourcePath);
}
```

## tidy_path 整理目录斜线风格

``` php
public function testTidyPath(): void
{
    $sourcePath = '/home\goods/name/';

    static::assertSame('/home/goods/name', Helper::tidyPath($sourcePath));
    static::assertSame('\home\goods\name', Helper::tidyPath($sourcePath, false));
}
```

## is_absolute_path 判断是否为绝对路径

``` php
public function testIsAbsolutePath(): void
{
    static::assertTrue(Helper::isAbsolutePath('c://'));
    static::assertTrue(Helper::isAbsolutePath('/path/hello'));
    static::assertFalse(Helper::isAbsolutePath('hello'));
}
```

## distributed 根据 ID 获取打散目录

``` php
public function testDistributed(): void
{
    static::assertSame(['000/00/00/', '01'], Helper::distributed(1));

    static::assertSame(['090/00/00/', '00'], Helper::distributed(90000000));
}
```

## create_file 创建文件

``` php
public function testCreateFile(): void
{
    $sourcePath = __DIR__.'/createFile';
    $file = $sourcePath.'/hello.txt';

    static::assertDirectoryDoesNotExist($sourcePath);

    Helper::createDirectory($sourcePath);

    static::assertFalse(is_file($file));

    Helper::createFile($file);

    static::assertTrue(is_file($file));

    Helper::deleteDirectory($sourcePath);
}
```

## get_extension 获取上传文件扩展名

``` php
public function testGetExtension(): void
{
    $file = __DIR__.'/HelperTest.pHp';

    static::assertSame('pHp', Helper::getExtension($file));
    static::assertSame('PHP', Helper::getExtension($file, 1));
    static::assertSame('php', Helper::getExtension($file, 2));
}
```