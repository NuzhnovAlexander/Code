function check(form) {
    // flag нужен для того, чтобы определять верно ли были введены все данные, если нет, то дальнейшая работа программы будет остановлена до тех пор,
    // пока пользователь не введет данные корректно
    var flag = true;
    var elems = form.elements;
    var snils = elems.snils.value;
    var db = elems.db.value;
    var da = elems.da.value;
    var i1 = elems.i1.value;
    var i2 = elems.i2.value;
    var i3 = elems.i3.value;
    //Проверка на количество букв введенных в поля "Фамилия", "Имя" и "Отчество"
    for (var i = 0; i < 3; i++){
        var x = elems[i].value;
        if (x.length < 1 || x.length > 40) {
            // Если длина была меньше 1 или больше 40, то flag принимает значение false и после завершения этой функции останавливается работа программы 
            flag = false;
        }
    }
    //Проверка правильности СНИЛС'а
    var ch = /\d{3}-\d{3}-\d{3}\s\d{2}/;
    if (snils != snils.match(ch)) {
       flag = false;
    }
    //Проверка правильности даты рождения
    var dd = /\d{2}\.\d{2}\.\d{4}/;
    if (db != db.match(dd)) {
        flag = false;
    }
    //Проверка на то, был ли выбрал какой-нибудь вариант из предложенных
    if (da.length < 1) {
        flag = false;
    }
    //Проверка на количество цифр в последних трех полях
    if (i1 != i1.match(/\d{1,3}/)) {
        flag = false;
    }
    if (i2 != i2.match(/\d{1,2}/)) {
        flag = false;
    }
    if (i3 != i3.match(/\d{1,2}/)) {
        flag = false;
    }
    //Если во всех проверках flag не изменился, то возвращается flag со значение true, а это значит, что все данные были введены верно
    return flag;
};
//Функция загружающая итоговый запрос в виде xml документа, в нее передаются тип документа, содержимое и имя
function downloadData(contentType, content, file_name) {
    var Data = new Blob([content], { type: 'contentType' });
    //Для IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(Data, file_name);
    } else { //Для остальных браузеров
        var a = document.createElement("a");
        //Для Firefox
        document.body.appendChild(a);
        a.style = "display: none";
        var Url = URL.createObjectURL(Data);
        a.href = Url;
        a.download = file_name;
        a.click();
        a.remove();
    }
};
//Функция, формирующая xml документ
function formToXml(form) {
    var xmldata = ['<?xml version="1.0" encoding="UTF-8"?>'];
    xmldata.push("<form>");
    var inputs = form.elements;
    for (var i = 0; i < inputs.length; i++) {
        var el = document.createElement("ELEMENT");
        if (inputs[i].name) {
            el.setAttribute("name", inputs[i].name);
            el.setAttribute("value", inputs[i].value);
            xmldata.push(el.outerHTML);
        }
    }
    xmldata.push("</form>");
    return xmldata.join("\n");
};

//Функция обрабатывающая запрос и сохраняющая в его в файл
function request(frm) {
    //Проверка на правильность введенных данных
    var checkerror = check(frm);
    //Если данные введены правильно
    if (checkerror) {
        var data = formToXml(frm);
        //Вывод результата в поле итогового запроса. Для полноценной работы во всех браузерах было принято решение использовать
        //textContent, если использовать innerText, то работа в старых версиях браузера Firefox будет некорректна, так же можно использовать innerHTML,
        //но для правильного вывода потребуется регулярное выражение имеющая вид (/</g, "&lt;")
        document.getElementById("out").textContent = data;
        downloadData("text/xml", data, "export.xml");
    }
}