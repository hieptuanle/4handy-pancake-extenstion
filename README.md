<img src="src/assets/img/icon-128.png" width="64"/>

# 4handy Pancake Extension

Extension này giúp hiển thị thông tin khách hàng ở sidebar khi truy cập https://pancake.vn/savor.vn.

![image](https://storage.4-handy.com/hieple/screenshot2.png)

## Hướng dẫn chạy

- `npm install` để cài đặt các package cần thiết
- `npm start` để chạy extension ở chế độ development
- Vào trang [Extensions của chrome](chrome://extensions/) và chọn `Load unpacked` để load extension từ thư mục `build` vừa được tạo ra
- Truy cập vào https://pancake.vn/savor.vn để xem kết quả

## Hướng dẫn cài đặt server development

Do trang pancake dùng https nên server development cũng phải dùng https. Để tạo được https, cần tạo 1 thư mục `ssl`, sau đó cài đặt [mkcert](https://github.com/FiloSottile/mkcert) và tạo certificate cho domain `localhost`:

```bash
mkcert -install
# tạo certificate cho domain localhost ở thư mục ssl
mkcert localhost -cert-file ssl/localhost.pem -key-file ssl/localhost-key.pem
```

Sau đó chạy `npm start` là ok

## Hướng dẫn build

Chạy `NODE_ENV=production npm run build` để build extension. Kết quả sẽ được lưu ở thư mục `build`.

---

Sau đây là hướng dẫn nguyên bản của boilerplate

# Chrome Extension (MV3) Boilerplate with React 18 and Webpack 5

[![npm](https://img.shields.io/npm/v/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)
[![npm-download](https://img.shields.io/npm/dw/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)
[![npm](https://img.shields.io/npm/dm/chrome-extension-boilerplate-react)](https://www.npmjs.com/package/chrome-extension-boilerplate-react)

## Announcements

- Recently updated from **[React](https://reactjs.org)** ~~17~~ to **18**!
- **_This boilerplate adopts [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)!_**
  - For V2 users, please check out the [manifest-v2](https://github.com/lxieyang/chrome-extension-boilerplate-react/tree/manifest-v2) branch, or use version [3.x](https://www.npmjs.com/package/chrome-extension-boilerplate-react/v/3.3.0).
  - Check out the [Manifest V3 Migration Guide](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/).
- Recently added [devtools](https://developer.chrome.com/docs/extensions/mv3/devtools/) Support! Thanks [GeekaholicLin](https://github.com/lxieyang/chrome-extension-boilerplate-react/issues/17)!
- Recently updated from **[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)** ~~3.x~~ to **4.x** and **[Webpack](https://webpack.js.org/)** ~~4~~ to **5**!
- Recently added [TypeScript](https://www.typescriptlang.org/) Support!

## Features

This is a basic Chrome Extensions boilerplate to help you write modular and modern Javascript code, load CSS easily and [automatic reload the browser on code changes](https://webpack.github.io/docs/webpack-dev-server.html#automatic-refresh).

This boilerplate is updated with:

- [Chrome Extension Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [React 18](https://reactjs.org)
- [Webpack 5](https://webpack.js.org/)
- [Webpack Dev Server 4](https://webpack.js.org/configuration/dev-server/)
- [React Refresh](https://www.npmjs.com/package/react-refresh)
- [react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin)
- [eslint-config-react-app](https://www.npmjs.com/package/eslint-config-react-app)
- [Prettier](https://prettier.io/)
- [TypeScript](https://www.typescriptlang.org/)

This boilerplate is heavily inspired by and adapted from [https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate), with additional support for React 18 features, Webpack 5, and Webpack Dev Server 4.

Please open up an issue to nudge me to keep the npm packages up-to-date. FYI, it takes time to make different packages with different versions work together nicely.

## Installing and Running

### Procedures:

1. Check if your [Node.js](https://nodejs.org/) version is >= **18**.
2. Clone this repository.
3. Change the package's `name`, `description`, and `repository` fields in `package.json`.
4. Change the name of your extension on `src/manifest.json`.
5. Run `npm install` to install the dependencies.
6. Run `npm start`
7. Load your extension on Chrome following:
   1. Access `chrome://extensions/`
   2. Check `Developer mode`
   3. Click on `Load unpacked extension`
   4. Select the `build` folder.
8. Happy hacking.

## Structure

All your extension's code must be placed in the `src` folder.

The boilerplate is already prepared to have a popup, an options page, a background page, and a new tab page (which replaces the new tab page of your browser). But feel free to customize these.

## TypeScript

This boilerplate now supports TypeScript! The `Options` Page is implemented using TypeScript. Please refer to `src/pages/Options/` for example usages.

## Webpack auto-reload and HRM

To make your workflow much more efficient this boilerplate uses the [webpack server](https://webpack.github.io/docs/webpack-dev-server.html) to development (started with `npm start`) with auto reload feature that reloads the browser automatically every time that you save some file in your editor.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 npm run start
```

## Content Scripts

Although this boilerplate uses the webpack dev server, it's also prepared to write all your bundles files on the disk at every code change, so you can point, on your extension manifest, to your bundles that you want to use as [content scripts](https://developer.chrome.com/extensions/content_scripts), but you need to exclude these entry points from hot reloading [(why?)](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate/issues/4#issuecomment-261788690). To do so you need to expose which entry points are content scripts on the `webpack.config.js` using the `chromeExtensionBoilerplate -> notHotReload` config. Look the example below.

Let's say that you want use the `myContentScript` entry point as content script, so on your `webpack.config.js` you will configure the entry point and exclude it from hot reloading, like this:

```js
{
  …
  entry: {
    myContentScript: "./src/js/myContentScript.js"
  },
  chromeExtensionBoilerplate: {
    notHotReload: ["myContentScript"]
  }
  …
}
```

and on your `src/manifest.json`:

```json
{
  "content_scripts": [
    {
      "matches": ["https://www.google.com/*"],
      "js": ["myContentScript.bundle.js"]
    }
  ]
}
```

## Intelligent Code Completion

Thanks to [@hudidit](https://github.com/lxieyang/chrome-extension-boilerplate-react/issues/4)'s kind suggestions, this boilerplate supports chrome-specific intelligent code completion using [@types/chrome](https://www.npmjs.com/package/@types/chrome).

## Packing

After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```

Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets

If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: '123' };
```

_./src/popup.js_

```js
import secrets from 'secrets';
ApiCall({ key: secrets.key });
```

:point_right: The files with name `secrets.*.js` already are ignored on the repository.

## Resources:

- [Webpack documentation](https://webpack.js.org/concepts/)
- [Chrome Extension documentation](https://developer.chrome.com/extensions/getstarted)

---

Michael Xieyang Liu | [Website](https://lxieyang.github.io)

## Default

Default manifest.json

```json
{
  "manifest_version": 3,
  "name": "Chrome Extension with React & Webpack",
  "description": "A chrome extension boilerplate built with React 17, Webpack 5, and Webpack Dev Server 4",
  "options_page": "options.html",
  "background": { "service_worker": "background.bundle.js" },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon-34.png"
  },
  "chrome_url_overrides": {
    "newtab": "newtab.html"
  },
  "icons": {
    "128": "icon-128.png"
  },
  "content_scripts": [
    {
      "matches": ["http://*/*", "https://*/*", "<all_urls>"],
      "js": ["contentScript.bundle.js"],
      "css": ["content.styles.css"]
    }
  ],
  "devtools_page": "devtools.html",
  "web_accessible_resources": [
    {
      "resources": ["content.styles.css", "icon-128.png", "icon-34.png"],
      "matches": []
    }
  ]
}
```
