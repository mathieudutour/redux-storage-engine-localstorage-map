# redux-storage-engine-localstorage-map

[![build](https://travis-ci.org/mathieudutour/redux-storage-engine-localstorage-map.svg)](https://travis-ci.org/mathieudutour/redux-storage-engine-localstorage-map)

`window.localStorage` based engine for [redux-storage][].

## Installation

    npm install --save redux-storage-engine-localstorage-map

## Usage

Stores a subset of your state tree inside `window.localStorage`.

```js
import createEngine from 'redux-storage-engine-localstorage-map';
const engine = createEngine({
  'my-save-key': ['reducer1', 'reducer2']
  'my-second-save-key': ['reducer3', 'reducer4']
});
```

You can customize the saving and loading process by providing a [`replacer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter) and/or a [`reviver`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter).

```js
import createEngine from 'redux-storage-engine-localstorage-map';

function replacer (key, value) {
  if (typeof value === 'string') {
    return 'foo';
  }
  return value;
}

function reviver (key, value) {
  if (key === 'foo') {
    return 'bar';
  }
  return value;
});

const engine = createEngine({
  'my-save-key': ['reducer1', 'reducer2']
  'my-second-save-key': ['reducer3', 'reducer4']
}, replacer, reviver);
```

**Warning**: `localStorage` does not expose a async API and every save/load
operation will block the JS thread!

## License

  MIT

  [redux-storage]: https://github.com/michaelcontento/redux-storage
