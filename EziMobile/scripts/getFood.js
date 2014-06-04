var getFood;

function viewTableGetFoodShow(e) {
    autoid = e.view.params.autoid;
    path = e.view.params.path;
    level = e.view.params.level;
}

function getFoodShow(e) {
    var areaID = e.view.params.areaid;
    var parentGroupID = e.view.params.autoid;
    var parentGroupPath = e.view.params.path;
    var parentLevelGroup = e.view.params.level;
    currencyID = 1;
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
               success: getAllItemFoodSuccess
           })
}
function getAllItemFoodSuccess(data) {
    var result = JSON.parse(data.d.Result);
    if (result.ITEMGROUP !== null) {
        getFood = result.ITEMGROUP;
        
        var dataSource = new kendo.data.DataSource({
                                                       data: getFood,
                                                       pageSize: 10
                                                   });
            
        $("#pager").kendoPager({
                                   dataSource: dataSource
                               });
            
        $("#listViewFood").kendoListView({
                                             dataSource: dataSource,
                                             template: kendo.template($("#templateFood").html())
                                         });
    } else {
        alert("Load Data Failed");
    }
}