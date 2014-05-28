document.addEventListener('deviceready', function() {
    $("#login").kendoMobileModalView("open");
    /*var name = $('#name').val();*/
});

function closeModalViewLogin() {
    /*jQuery.ajax({
        url: 'http://localhost:46241/WebService1.asmx/HelloWorld',
        type: "POST",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            alert(JSON.stringify(data));
        }
    });*/
    $("#login").kendoMobileModalView("close");
    
}

var app = new kendo.mobile.Application();