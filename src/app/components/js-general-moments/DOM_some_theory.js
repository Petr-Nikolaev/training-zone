// Полные последствия element.innerHTML=x огромны. Краткий обзор:

// parse x как HTML
// запрашивать расширения браузера для разрешения
// уничтожить существующие дочерние узлы element
// создать дочерние узлы
// recompute styles, которые определяются в терминах отношений родитель-потомок
// пересчитать физические размеры элементов страницы
// уведомить расширения браузера об изменении
// обновить переменные Javascript, которые обрабатывают реальные узлы DOM

// Все эти обновления должны проходить через API, который соединяет Javascript и движок HTML.
// Одной из причин того, что Javascript так быстро в наши дни является то, что мы скомпилируем его на более быстрый язык или даже машинный код,
// возникают массы оптимизаций, потому что поведение значений хорошо определено. При работе с API DOM возможно none. Ускорение в другом месте оставило DOM позади.


// КРАТКИЙ ЭКСКУРС: все объекты DOM  это JS объекты, поэтому взаимодейсттвие вообще существует. Но почему DOM медленный при иззменениях, если менять всегда DOM:
// 1. При обращение к ДОМ мы меняем очень много аспектов - состояние объетков, дерево объектов, реализацию стилей, парссим дерево JS  обектов в HTML,  и все это 
// очень трудоемкий процесс, здесь жже еще реальные размеры окна браузера и т д 
// Поэтому концеция виртуального дома(ReactJS) и шаблонизаторы(Angular) максимально ускоряют работу с DOM
