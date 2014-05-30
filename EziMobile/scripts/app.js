var bLoginConfigVisible = false;

document.addEventListener('deviceready', function() {
    /*$("#modalLogin").kendoMobileModalView("open");*/
    $("#modalLogin").height(280);
    $("#listLoginOption").hide();
    branchDropDownInit();
});

function branchDropDownInit() {
    $.ajax({
               url: _webServicePath + "getOrg",
               type: "POST",
               dataType: "json",
               data: {},
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.CompanyAndBranch !== null) {
                       $("#dropdownBranch").kendoDropDownList({
                                                                  dataTextField: "OBJ_NAME",
                                                                  dataValueField: "OBJ_AUTOID",
                                                                  dataSource: result.CompanyAndBranch
                                                              });
                   } else
                       alert("Load Data Failed");
               }
           })
    
    $.ajax({
               url: _webServicePath + "getLanguage",
               type: "POST",
               dataType: "json",
               data: {},
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.LANGUAGE !== null) {
                       $("#dropdownLanguage").kendoDropDownList({
                                                                    dataTextField: "LANG_NAME",
                                                                    dataValueField: "LANG_AUTOID",
                                                                    dataSource: result.LANGUAGE
                                                                });
                   } else
                       alert("Load Data Failed");
               }
           })
}

function btnLoginClick() {
    var UserName = $('#txtUsername').val();
    var PassWord = $('#txtPassword').val();
    var BranchID = $("#dropdownBranch").val();
    var langID = $("#dropdownLanguage").val();
    
    var loginObj = { 
        UserName: UserName, 
        PassWord: PassWord,
        BranchID: BranchID,
        langID: langID
    };
    
    $.ajax({
               url: _webServicePath + 'Login',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(loginObj),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Login Failed");
               },
               success: function(data) {
                   var result = data.d.LoginResult;
                   var isError = data.d.isError;
                   if (result) {
                       _userId = data.d.UserID;
                       $("#modalLogin").kendoMobileModalView("close");
                   } else if (isError) {
                       alert(data.d.ErrorMessage);
                   }
               }
           })
}

function btnConfigClick() {
    $("#listLoginOption").toggle("slow");
    if (bLoginConfigVisible) {
        $("#modalLogin").animate({height: "-=120px"}, 1000);
    } else {
        $("#modalLogin").animate({height: "+=120px"}, 1000);
    }
    bLoginConfigVisible = !bLoginConfigVisible;
}

var app = new kendo.mobile.Application();