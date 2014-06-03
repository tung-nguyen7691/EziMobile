var getFood;

$(function() {
    areaID = 1;
    currencyID = 1;
    parentGroupID = 1;
    parentLevelGroup = 1;
    levelgroup = 1;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        areaID: areaID,
        currencyID: currencyID,
        parentGroupID: parentGroupID,
        parentLevelGroup: parentLevelGroup,
        levelgroup: levelgroup,
        branchID: _branchID,
        langID: _langID
    };
    $.ajax({
               url: _webServicePath + "getGroupChildFromGroup",
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
                       getFood = result.ITEMGROUP;
                   } else {
                       alert("Load Data Failed");
                   }
               }
           })
})