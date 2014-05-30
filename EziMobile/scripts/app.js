document.addEventListener('deviceready', function() {
    $("#modalLogin").kendoMobileModalView("open");
    $("#listLoginOption").hide();
});

function loginClick() {
    var name = $('#txtUsername').val();
    var pass = $('#txtPassword').val();
    
    var loginObj = { UserName: name, PassWord: pass};
    
    $.ajax({
        url: 'http://localhost:8989/TranferData/MobileService.asmx/Login',
        type: "POST",
        dataType: "json",
        data: JSON.stringify(loginObj),
        contentType: "application/json; charset=utf-8",
        failure: function() {
            alert("Login Failed");
        },
        success: function(data){
            var result = JSON.parse(data.d.Result);
            if(result.result)
            	$("#modalLogin").kendoMobileModalView("close");
            else
            	alert("Login Failed");
        }
    })
}

function optionClick(){
    $("#listLoginOption").toggle();
}

var app = new kendo.mobile.Application();