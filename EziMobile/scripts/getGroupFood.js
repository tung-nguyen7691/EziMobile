var getGroupFood;
                    
$(function() {
    reaID = '1';
    currencyID = '1';
    levelgroup = 1;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        reaID: reaID,
        currencyID: currencyID,
        levelgroup: levelgroup,
        branchID: _branchID,
        langID: _langID
    };
    $.ajax({
               url: _webServicePath + "getAllItemGroup",
               type: "POST",
               dataType: "json",
               data : JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.ITEMGROUP !== null) {
                       products = result.ITEMGROUP;
                   } else {
                       alert("Load Data Failed");
                   }
               }
           })
})