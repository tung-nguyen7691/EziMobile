var getFood;
var autoid;
var path;
var level;

function viewTableGetFoodShow(e) {
    $("#txtautoid").val(e.view.params.path);
    autoid = e.view.params.autoid;
    path = e.view.params.path;
    level = e.view.params.level;
}

$(function() {
    //alert(autoid);
    areaID = 1;
    currencyID = 1;
    parentGroupID = 124;
    parentGroupPath = '1;124';
    parentLevelGroup = 1;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        areaID: areaID,
        currencyID: currencyID,
        parentGroupID: parentGroupID,
        parentGroupPath: parentGroupPath,
        parentLevelGroup: parentLevelGroup,
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