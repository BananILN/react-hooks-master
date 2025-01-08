# Примеры использования хука useMemo

Эта коллекция демонстрирует примеры использования хука `useMemo` в React. Главный компонент `App` включает два основных блока: `ExpensiveOperation` и `Comparing`.

1. [`ExpensiveOperation`](./src/expancive-operation/README.md) - главная задача данного компонента - реализация дорогостоящей операции с использованием `useMemo` для оптимизации работы.

    - [Описание кода выполнения](./src/expancive-operation/ExpensiveOperation.js)
    - [Полное описание и анализ компонента](./src/expancive-operation/README.md)

2. [`Comparing`](./src/comparing/README.md) - Компонент позволяет сять результаты работы `useMemo` и ситуаций без его использования.

    - [Описание кода выполнения](./src/comparing/Comparing.js)
    - [Полное описание и анализ компонента](./src/comparing/README.md)

Этот проект создан с целью продемонстрировать использование `useMemo` и его влияние на производительность приложения. Каждый из разделов сопровождается детальными объяснениями и анализом кода, что позволит лучше понять принцип работы данного хука и его применимость в различных сценариях.
```bash
# Установите зависимости
$ npm install

# Запустите проект
$ npm start
```

Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере для отображения проекта.