// Подключаем ранее скачанную библиотеку D3.js
const d3 = require("./libs/d3")
// Подключаем библиотеку JQuery
$ = require('jquery')
// Массив в котором будем хранить расчетные значения по оси X и по оси Y
var dataset = [];
// Переменные которые будут хранить размеры нашего графика и отступы
var margin = { top: 50, right: 50, bottom: 50, left: 50 }
    , width = $("#mycontent").width() - margin.left - margin.right 
    , height = $("#mycontent").height() - margin.top - margin.bottom;

webix.protoUI({
    name: "myview",
    $init: function () { // Инициализация View
        // Добавляем блок div с id=mycontent. В этом блоке будем рисовать график
        this.$view.innerHTML = "<div id='mycontent'></div>"
        // Вызываем функцию calcsin с начальными параметрами и заполняем массив data расчетными значениями
        calcsin(60, 0.05, 0)
        // Вызываем функцию drawSin и чертим график по данным из массива data
        drawSin()
    },
    redraw: function (a, b, c) { // Функция для перерисовки графика
        // Удаляем старый график
        $("#mycontent").html("")
        // Выполняем очередной расчет и заполняем массив data
        calcsin(a, b, c)
        // Чертим график
        drawSin()
    },
}, webix.ui.view);




function drawSin() {
    $(document).ready(function () {
        width = $("#mycontent").width() - margin.left - margin.right
        height = $("#mycontent").height() - margin.top - margin.bottom;
        var xScale = d3.scaleLinear()
            .domain([0, 360]) 
            .range([0, width]); 

        var yScale = d3.scaleLinear()
            .domain([-100, 100]) 
            .range([height, 0]);  

        var line = d3.line()
            .x(function (d, i) { return xScale(d.x); }) 
            .y(function (d) { return yScale(d.y); })
            .curve(d3.curveMonotoneX)

        var svg = d3.select("#mycontent").append("svg")
            .attr("float", "center")
            .attr("class", "webix_chart")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height/2 + ")")
            .call(d3.axisBottom(xScale)); 

        svg.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(yScale))

        svg.append("path")

            .datum(dataset) 
            .attr("class", "line") 
            .attr("d", line); 
    })

}

function calcsin(a, b, c) {
    dataset = [];
    for (var i = 1; i < 360; i++) {
        dataset.push({ "x": i, "y": a * Math.sin(b * i) + c });
    };
};

window.onresize = function ( e ) {
  
    $("#mycontent").html("")
    drawSin()
}
