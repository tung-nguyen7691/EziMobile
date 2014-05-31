function listViewAreaBind() {
    _langID = 2;
    _branchID = 3;
    _userID = 1;
    
    var dataRequest = {
        branchID: _branchID,
        RectID: 1,
        langID: _langID,
        UserID: _userID
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