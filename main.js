function check(form) {
    // flag ����� ��� ����, ����� ���������� ����� �� ���� ������� ��� ������, ���� ���, �� ���������� ������ ��������� ����� ����������� �� ��� ���,
    // ���� ������������ �� ������ ������ ���������
    var flag = true;
    var elems = form.elements;
    var snils = elems.snils.value;
    var db = elems.db.value;
    var da = elems.da.value;
    var i1 = elems.i1.value;
    var i2 = elems.i2.value;
    var i3 = elems.i3.value;
    //�������� �� ���������� ���� ��������� � ���� "�������", "���" � "��������"
    for (var i = 0; i < 3; i++){
        var x = elems[i].value;
        if (x.length < 1 || x.length > 40) {
            // ���� ����� ���� ������ 1 ��� ������ 40, �� flag ��������� �������� false � ����� ���������� ���� ������� ��������������� ������ ��������� 
            flag = false;
        }
    }
    //�������� ������������ �����'�
    var ch = /\d{3}-\d{3}-\d{3}\s\d{2}/;
    if (snils != snils.match(ch)) {
       flag = false;
    }
    //�������� ������������ ���� ��������
    var dd = /\d{2}\.\d{2}\.\d{4}/;
    if (db != db.match(dd)) {
        flag = false;
    }
    //�������� �� ��, ��� �� ������ �����-������ ������� �� ������������
    if (da.length < 1) {
        flag = false;
    }
    //�������� �� ���������� ���� � ��������� ���� �����
    if (i1 != i1.match(/\d{1,3}/)) {
        flag = false;
    }
    if (i2 != i2.match(/\d{1,2}/)) {
        flag = false;
    }
    if (i3 != i3.match(/\d{1,2}/)) {
        flag = false;
    }
    //���� �� ���� ��������� flag �� ���������, �� ������������ flag �� �������� true, � ��� ������, ��� ��� ������ ���� ������� �����
    return flag;
};
//������� ����������� �������� ������ � ���� xml ���������, � ��� ���������� ��� ���������, ���������� � ���
function downloadData(contentType, content, file_name) {
    var Data = new Blob([content], { type: 'contentType' });
    //��� IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(Data, file_name);
    } else { //��� ��������� ���������
        var a = document.createElement("a");
        //��� Firefox
        document.body.appendChild(a);
        a.style = "display: none";
        var Url = URL.createObjectURL(Data);
        a.href = Url;
        a.download = file_name;
        a.click();
        a.remove();
    }
};
//�������, ����������� xml ��������
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

//������� �������������� ������ � ����������� � ��� � ����
function request(frm) {
    //�������� �� ������������ ��������� ������
    var checkerror = check(frm);
    //���� ������ ������� ���������
    if (checkerror) {
        var data = formToXml(frm);
        //����� ���������� � ���� ��������� �������. ��� ����������� ������ �� ���� ��������� ���� ������� ������� ������������
        //textContent, ���� ������������ innerText, �� ������ � ������ ������� �������� Firefox ����� �����������, ��� �� ����� ������������ innerHTML,
        //�� ��� ����������� ������ ����������� ���������� ��������� ������� ��� (/</g, "&lt;")
        document.getElementById("out").textContent = data;
        downloadData("text/xml", data, "export.xml");
    }
}