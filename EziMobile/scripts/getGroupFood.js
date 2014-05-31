function getItemGroup() {
    REAID = 1;
    CurrencyID = 1;
    levelgroup= 1;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        branchID: _branchID,
        levelgroup: levelgroup,
        langID: _langID,
        REAID: REAID,
        CurrencyID: CurrencyID
    };
	$.ajax({
               url: _webServicePath + "getAllItemGroup",
               type: "POST",
               dataType: "json",
               data: dataRequest,
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
                   return null;
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.ITEMGROUP !== null) {
                       return result.ITEMGROUP;
                   } else{
                       alert("Load Data Failed");
                       return null;
                       }
                   
               }
           })
}