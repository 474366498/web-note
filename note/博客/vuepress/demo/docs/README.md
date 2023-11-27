# Hello VuePress 

## Badge 
- VuePress - <Badge type="tip" text="v2" vertical="top" />
- VuePress - <Badge type="warning" text="v2" vertical="middle" />
- VuePress - <Badge type="danger" text="v2" vertical="bottom" />


## CodeGroup ~ CodeGroupItem 

<CodeGroup>
  <CodeGroupItem title="PNPM">

```bash:no-line-numbers
pnpm install
```

  </CodeGroupItem>

  <CodeGroupItem title="YARN">

```bash:no-line-numbers
yarn install
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM" active>

```bash:no-line-numbers
npm install
```

  </CodeGroupItem>
</CodeGroup>

## Markdown 

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个 details 标签
:::

::: danger STOP
危险区域，禁止通行
:::

::: details 点击查看代码
```ts
console.log('你好，VuePress！')
```
:::


:::: code-group
::: code-group-item FOO
```ts
const foo = 'foo'
```
:::
::: code-group-item BAR
```ts
const bar = 'bar'
```
:::
::::

[guide](/guide)