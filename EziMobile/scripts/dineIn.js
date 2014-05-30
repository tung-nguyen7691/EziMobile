function listViewAreaBind() {
    _langId = 2;
    _orgId = 3;
    _userId = 1;
    
    var dataRequest = {
        orgID: _orgId,
        RectID: 1,
        langID: _langId,
        UserID: _userId
    };
    $.ajax({
               url: _webServicePath + 'getArea',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("No Areas Found");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.RESAREA !== null)
                       $("#dropdownArea").kendoDropDownList({
                                                                dataTextField: "REA_NAME",
                                                                dataValueField: "REA_AUTOID",
                                                                dataSource: result.RESAREA
                                                            });
                   else
                       alert("No Areas Found");
               }
           })
}