var deatailFood;
                    
$(function() {
    areaID = 1; 
    itemNo = 1;
    uomID = 1;
    currencyID = 1; 
    parentGroupID = 1; 
    parentGroupPath = 1; 
    parentLevelGroup = 1;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        areaID: areaID,
        itemNo: itemNo,
        uomID: uomID,
        currencyID: currencyID,
        parentGroupID: parentGroupID,
        parentGroupPath: parentGroupPath,
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
                       getGroupFood = result.ITEMGROUP;
                   } else {
                       alert("Load Data Failed");
                   }
               }
           })
})