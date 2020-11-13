# Стартовый шаблон обычных проектов по вёрстке

## Как это работает

<table>
  <thead>
    <tr>
      <th>Команда</th>
      <th>Результат</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td width="40%"><code>npm i</code></td>
      <td>Установить зависимости</td>
    </tr>
    <tr>
      <td><code>gulp</code></td>
      <td>Дефолтный таск запускающий сборку, сервер и слежение за файлами</td>
    </tr>
    <tr>
      <td><code>gulp build</code></td>
      <td>Сборка готового проекта в папку build</td>
    </tr>
    <tr>
      <td><code>gulp cleanimg</code></td>
      <td>Запустить задачу для очистки папки images/dest</td>
    </tr>
    <tr>
      <td><code>gulp cleanbuild</code></td>
      <td>Запустить задачу для очистки папки build</td>
    </tr>
  </tbody>
</table>

## Структура

```bash
build/               # Папка собранного проекта
app/                 # Исходники
  css/               # Скомпилированные CSS файлы
  imgages/           # Папка со всеми изображениями
      imgages/dest   # Папка со сжатыми изображениями
      imgages/src    # Папка с исходными изображениями
  scss/              # Стилевые файлы SCSS
  js/                # Файлы скриптов
  fonts/             # Папка со шрифтами
```
