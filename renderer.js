// Подключаем модуль электрона
const { remote } = require('electron')
// Получаем указатель на окно браузера где будет производиться отображение нашего интерфейса
let WIN = remote.getCurrentWindow()
// Подключаем фреймворк webix
const webix = require('./libs/webix.min.js')
//Подключаем фреймворк JQuery
$ = require('jquery')
// Подключаем view_chart.js
require("./view_chart.js")
// Функция в которую в качестве параметра как раз и будет передаваться наша с Вами верстка
webix.ui(
    {
        "id": 1587908357897,
        "rows": [
            {
                // view : toolbar - 1 элемент нашего интерфейса
                "css": "webix_dark",
                "view": "toolbar",
                "height": 0,
                "cols": [
                    // Название окна
                    { "view": "label", "label": "Electron + Webix + D3.js", css:"head_win" },
                    // Кнопка "свернуть окно"
                    { "label": "-", "view": "button", "height": 38, "width": 40, id:"min-bt" },
                    // Кнопка "развернуть окно"
                    { "label": "+", "view": "button", "height": 38, "width": 40, id:"max-bt" },
                    // Закрыть приложение
                    { "label": "x", "view": "button", "height": 38, "width": 40, id:"close-bt" }
                ]
            },
            // view : myview - второй элемент нашего интерфейса, в котором мы будем рисовать график.
            { "view": "myview", id: "d3_chart" },
            {
                "cols": [
                    // view : slider - 3 элемент. Будет менять величину амплитуды sin
                    {
                        "label": "Amplitude", "title": "#value#", "value": 50, "view": "slider", id: "slider_amplitude",
                        on: {
                            onChange: function () {
                                $$("d3_chart").redraw($$("slider_amplitude").getValue(), $$("slider_freq").getValue(), $$("slider_scope").getValue());
                            }
                        }
                    },
                    // view : slider - 4 элемент. Будет менять величину смещения графика sin относительно оси Y
                    {
                        "label": "Bias", "title": "#value#", "value": 0, "view": "slider", "height": 38, id: "slider_scope", min:-50, max:50, step:1,
                        on: {
                            onChange: function () {
                                $$("d3_chart").redraw($$("slider_amplitude").getValue(), $$("slider_freq").getValue(), $$("slider_scope").getValue());
                            }
                        }
                    },
                    // view : slider - 5 элемент. Будет менять величину частоты sin
                    {
                        "label": "Frequency", "title": "#value#", "value": 0.005, "view": "slider", "height": 38, id: "slider_freq", min:0, max:0.1, step:0.001,
                        on: {
                            onChange: function () {
                                $$("d3_chart").redraw($$("slider_amplitude").getValue(), $$("slider_freq").getValue(), $$("slider_scope").getValue());
                            }
                        }
                    }
                ]
            }
        ]
    }
)

// Закрытие окна
$$("close-bt").attachEvent("onItemClick", () => {
    const window = remote.getCurrentWindow();
    window.close();
})

// Свернуть окно
$$("min-bt").attachEvent("onItemClick", () => {
    const window = remote.getCurrentWindow();
    window.minimize();
})

// Распахнуть окно
$$("max-bt").attachEvent("onItemClick", () => {
    const window = remote.getCurrentWindow();
    if (!window.isMaximized()) {
        window.maximize();
    } else {
        window.unmaximize();
    }
})
