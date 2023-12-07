# VectorDto 动态数组

::: tip Testing Is Documentation
[tests/Support/VectorDtoTest.php](https://github.com/hunzhiwange/framework/blob/master/tests/Support/VectorDtoTest.php)
:::

**Uses**

``` php
<?php

use Leevel\Kernel\Utils\Api;
use Leevel\Support\VectorDto;
use Tests\Support\DemoProject\Template;
use Tests\Support\DemoProject\TemplateData;
```

## 基本使用

**fixture 定义**

``` php
namespace Tests\Support\DemoProject;

use Leevel\Support\Dto;

class TemplateData extends Dto
{
    public string $title;

    public string $tag;

    public string $description;
}
```

``` php
namespace Tests\Support\DemoProject;

use Leevel\Support\Dto;
use Leevel\Support\VectorDto;

class Template extends Dto
{
    public string $key;

    public string $title;

    public VectorDto $data;
}
```

``` php
public function testBaseUse(): void
{
    $templateData = VectorDto::fromRequest($sourceTemplateData = [
        [
            'title' => 'hello',
            'tag' => 'world',
            'description' => 'foo',
        ],
        [
            'title' => 'hello1',
            'tag' => 'world1',
            'description' => 'foo1',
        ],
    ], TemplateData::class);
    $data = [
        'key' => 'hello',
        'title' => 'world',
        'data' => $templateData,
    ];

    $collection = new Template($data);
    static::assertSame($collection['key'], 'hello');
    static::assertSame($collection['title'], 'world');
    static::assertInstanceOf(VectorDto::class, $collection['data']);
    static::assertSame($collection['data'], $templateData);
    static::assertSame($collection['data']->toArray(), $sourceTemplateData);
}
```