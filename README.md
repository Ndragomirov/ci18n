ci18n - chrome extension i18n helper
=====

ci8n watch your html markup and auto-replace "i18n" placeholders with values.


before
======
messages.json
```json
{
  "foo": {"message": "foo"},
  "bar": {"message": "bar"},
  "baz": {"message": "baz"}
}

```

markup
```html
<div> Example </div>
<h1 some-attr="__MSG_bar__" other-attr="__MSG_baz__"> Hello, __MSG_foo__! </h1>
```


after
=====
```html
<div> Example </div>
<h1 some-attr="bar" other-attr="baz"> Hello, foo! </h1>
```
