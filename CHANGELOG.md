# Changelog

## [3.4.2](https://github.com/yandex-cloud/yfm-editor/compare/v3.4.1...v3.4.2) (2022-12-16)


### Bug Fixes

* blockquote button breaks when selection has 0 depth ([2a38575](https://github.com/yandex-cloud/yfm-editor/commit/2a38575ea142ec652aa47705768661e41012b188))

## [3.4.1](https://github.com/yandex-cloud/yfm-editor/compare/v3.4.0...v3.4.1) (2022-12-13)


### Bug Fixes

* **YfmNote:** serialize placeholder content if node content is empty ([#48](https://github.com/yandex-cloud/yfm-editor/issues/48)) ([f999943](https://github.com/yandex-cloud/yfm-editor/commit/f9999434ed3cf37ee2690acf1b54315a79fba56a))

## [3.4.0](https://github.com/yandex-cloud/yfm-editor/compare/v3.3.0...v3.4.0) (2022-12-09)


### Features

* **Math:** improve ux with inline math ([#43](https://github.com/yandex-cloud/yfm-editor/issues/43)) ([e09dca4](https://github.com/yandex-cloud/yfm-editor/commit/e09dca4603696ab0e10648347db86a42a32fe3e2))
* **YfmCut:** auto openning yfm-cut if selection is inside cut's content ([#46](https://github.com/yandex-cloud/yfm-editor/issues/46)) ([f3084f8](https://github.com/yandex-cloud/yfm-editor/commit/f3084f8fa953c2a7c79a7089f4236928d66630a6))
* **YfmCut:** don't open/close yfm-cut by clicking on the title ([#47](https://github.com/yandex-cloud/yfm-editor/issues/47)) ([1e13715](https://github.com/yandex-cloud/yfm-editor/commit/1e13715a6cc1fff5586d784df4c060a00c3fa0a8))


### Bug Fixes

* **Placeholder:** show placeholders immediately after initialization ([#45](https://github.com/yandex-cloud/yfm-editor/issues/45)) ([723a79d](https://github.com/yandex-cloud/yfm-editor/commit/723a79d55c486243fa8f47a68f30f7937d3dcaf9))

## [3.3.0](https://github.com/yandex-cloud/yfm-editor/compare/v3.2.0...v3.3.0) (2022-11-23)


### Features

* parse html from the clipboard when pasting ([#40](https://github.com/yandex-cloud/yfm-editor/issues/40)) ([b27e9b8](https://github.com/yandex-cloud/yfm-editor/commit/b27e9b8d59f4d717258c9ebd88f777be861ff1fb))
* **YfmNote:** do not fill in the note title when creating a new note ([#41](https://github.com/yandex-cloud/yfm-editor/issues/41)) ([f65b342](https://github.com/yandex-cloud/yfm-editor/commit/f65b3424232629a1c5f56c1818fd62b26f5f4da8))
* **YfmTable:** clear selected table cells and delete empty rows or a table when the backspace button is pressed ([d4e1623](https://github.com/yandex-cloud/yfm-editor/commit/d4e1623e9f074523d595eb82729dad4a687e0bda))


### Bug Fixes

* **core:** escape the pipe symbol during serialization to markdown ([#36](https://github.com/yandex-cloud/yfm-editor/issues/36)) ([f766021](https://github.com/yandex-cloud/yfm-editor/commit/f76602119fffe0d83d1c17b15c438b59a180a327))
* re-export MathNode classes ([#38](https://github.com/yandex-cloud/yfm-editor/issues/38)) ([b4ee9b4](https://github.com/yandex-cloud/yfm-editor/commit/b4ee9b4361bddcbe8b6be7031d24d108ef30df60))

## [3.2.0](https://github.com/yandex-cloud/yfm-editor/compare/v3.1.0...v3.2.0) (2022-11-10)


### Features

* add support to linkify urls with custom tlds ([#31](https://github.com/yandex-cloud/yfm-editor/issues/31)) ([1b0d44a](https://github.com/yandex-cloud/yfm-editor/commit/1b0d44a041f3a1854ce25ff54fb77acdd5e893f6))
* **Clipboard:** insert markup, html and text of the selected fragment into the clipboard ([#30](https://github.com/yandex-cloud/yfm-editor/issues/30)) ([f438588](https://github.com/yandex-cloud/yfm-editor/commit/f438588ff0394be405db07e73d170112b636f969))
* **Clipboard:** smarter copying ([#33](https://github.com/yandex-cloud/yfm-editor/issues/33)) ([a458d46](https://github.com/yandex-cloud/yfm-editor/commit/a458d469bfe7fc254e0954c5ecf244beecc363c1))
* **core:** added priority for marks in extension builder ([395f97b](https://github.com/yandex-cloud/yfm-editor/commit/395f97b2951e61524a1633ed79dbac020b958127))
* **Link:** when pasting, create a link with the pasted URL and selected text ([#28](https://github.com/yandex-cloud/yfm-editor/issues/28)) ([1230601](https://github.com/yandex-cloud/yfm-editor/commit/1230601a767ad0b0bb586003e9b6cee9ae87a3fa))


### Bug Fixes

* **Checkbox:** write placeholder content when label constains only whitespace characters ([#32](https://github.com/yandex-cloud/yfm-editor/issues/32)) ([3ded049](https://github.com/yandex-cloud/yfm-editor/commit/3ded049a01b2c042b482e40170b5d3b11a77c421))
* **Code:** set lowest priority for inline code mark ([b4f9ae0](https://github.com/yandex-cloud/yfm-editor/commit/b4f9ae0ac0e031c4cc3a53647ad255f8b3a2b43a))

## [3.1.0](https://github.com/yandex-cloud/yfm-editor/compare/v3.0.0...v3.1.0) (2022-10-27)


### Features

* **core:** when appending replace last empty paragraph with new content and add empty paragraph after ([#25](https://github.com/yandex-cloud/yfm-editor/issues/25)) ([a7333ad](https://github.com/yandex-cloud/yfm-editor/commit/a7333ad52cdfdbee9e1b399a75bdb5504a078cf8))
* **Lists:** breaking the list when deleting a list item ([#26](https://github.com/yandex-cloud/yfm-editor/issues/26)) ([a5e5362](https://github.com/yandex-cloud/yfm-editor/commit/a5e5362be18056c7297019b390a8b82857cc652a))

## [3.0.0](https://github.com/yandex-cloud/yfm-editor/compare/v2.1.0...v3.0.0) (2022-10-14)


### ??? BREAKING CHANGES

* **core:** use one builder for all plug-in extensions

### Features

* **core:** add context to extension builder ([#22](https://github.com/yandex-cloud/yfm-editor/issues/22)) ([dc66438](https://github.com/yandex-cloud/yfm-editor/commit/dc66438151542a436409253a1f3c8b7776ff693d))
* **core:** move plugins sorting to the extension builder ([fcc4d35](https://github.com/yandex-cloud/yfm-editor/commit/fcc4d35c3c9dec80abe5e6c45d21a3d2fce7006c))
* **core:** use one builder for all plug-in extensions ([66de15e](https://github.com/yandex-cloud/yfm-editor/commit/66de15edcd73b8c5a07375b31a02ddc875373cfc))
* table arrow controls ([3e00e6a](https://github.com/yandex-cloud/yfm-editor/commit/3e00e6aee7a6a1c93ee1ba42963d80605dfd57f6))

## [2.1.0](https://github.com/yandex-cloud/yfm-editor/compare/v2.0.0...v2.1.0) (2022-10-05)


### Features

* added new field for selection interface ([4ccfdaa](https://github.com/yandex-cloud/yfm-editor/commit/4ccfdaa2f5c5f6e27c89d87181f1d6c615888c9c))
* **core:** escape corner brackets during serialization ([#17](https://github.com/yandex-cloud/yfm-editor/issues/17)) ([01ad8a8](https://github.com/yandex-cloud/yfm-editor/commit/01ad8a8717e902cbe74e2461b452ef1c94ff8e10))
* **toolbar:** add tooltip to list-buttons ([af158ff](https://github.com/yandex-cloud/yfm-editor/commit/af158ffdc75e68d1d993744a790892f09944a184))
* **tooltip:** add delay before open and close tooltip ([2c17593](https://github.com/yandex-cloud/yfm-editor/commit/2c17593dd31a3f5d7f5907ab63223216a73bdb85))

## [2.0.0](https://github.com/yandex-cloud/yfm-editor/compare/v1.2.0...v2.0.0) (2022-10-04)


### ??? BREAKING CHANGES

* update to uikit@3

### Features

* **Html:** use html sanitizer from yfm-transform ([#14](https://github.com/yandex-cloud/yfm-editor/issues/14)) ([cf8ce23](https://github.com/yandex-cloud/yfm-editor/commit/cf8ce23513a2e3cddbc7321e6b890447c4f3085c))
* update to uikit@3 ([bd6c517](https://github.com/yandex-cloud/yfm-editor/commit/bd6c517cf43c12a9c1f6301901f48ad76e528232))

## [1.2.0](https://github.com/yandex-cloud/yfm-editor/compare/v1.1.1...v1.2.0) (2022-09-28)


### Features

* **YfmCut:** move cursor to end of cut's title when press backspace in the beginning of its content ([007773a](https://github.com/yandex-cloud/yfm-editor/commit/007773a6e6577bcab4e85a8493c38d7a860a9432))
* **YfmCut:** remove cut on press backspace in the beginning of his title ([b715b38](https://github.com/yandex-cloud/yfm-editor/commit/b715b38ef3b2004b735f3d0f0fff898bc578923a))
* **YfmNote:** move cursor to end of note's title when press backspace in the beginning of its content ([a485fc9](https://github.com/yandex-cloud/yfm-editor/commit/a485fc9298c3a149281b1715d63444f05fd01e33))
* **YfmNote:** remove note on press backspace in the beginning of his title ([c1865ed](https://github.com/yandex-cloud/yfm-editor/commit/c1865edd488c70f7effb3c5418c9bf4cd19c4dc7))

## [1.1.1](https://github.com/yandex-cloud/yfm-editor/compare/v1.1.0...v1.1.1) (2022-09-26)


### Bug Fixes

* **Placeholder:** fix display of fake cursor before placeholder ([#8](https://github.com/yandex-cloud/yfm-editor/issues/8)) ([5ffdd35](https://github.com/yandex-cloud/yfm-editor/commit/5ffdd35b144dae2b9bdceb85a9386409e0a8ca9d))

## [1.1.0](https://github.com/yandex-cloud/yfm-editor/compare/v1.0.0...v1.1.0) (2022-09-22)


### Features

* hints ([14360de](https://github.com/yandex-cloud/yfm-editor/commit/14360de3d7dc1b5838649eda3313759a77a36d8e))

## 1.0.0 (2022-09-21)


### Features

* **clipboard:** parse text without processing attributes ([65417b4](https://github.com/yandex-cloud/yfm-editor/commit/65417b4a5a684775ba611e1f8a1e05b4f00edff6))


### Bug Fixes

* instanceof issue ([cb079db](https://github.com/yandex-cloud/yfm-editor/commit/cb079db91bfe9863e7614df97b1ceff72bc3fe5a))
* lint ([3a53e7e](https://github.com/yandex-cloud/yfm-editor/commit/3a53e7eb4e486242112cd8dbd4e5bc5a9cb43d93))
