var getFood;
var areaID;
var parentGroupID;

function viewTableGetFoodShow(e) {
    autoid = e.view.params.autoid;
    path = e.view.params.path;
    level = e.view.params.level;
}

function getFoodShow(e) {
    areaID = e.view.params.areaid;
    parentGroupID = e.view.params.autoid;
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
            
        $("#pagerFood").kendoPager({
                                   dataSource: dataSource
                               });
            
        $("#listViewFood").kendoListView({
                                             dataSource: dataSource,
                                             template: kendo.template($("#templateFood").html())
                                         });
        $(".itemNameFood").click(function(e) {
            itemNameFoodClick(e);
        });
        $(".itemNameFood").children().click(function(e) {
            e.stopPropagation();
            itemNameFoodClick(e);
        });
    } else {
        alert("Load Data Failed");
    }
    function itemNameFoodClick(e) {
        var itemNameFood = $(e.target).closest('.itemNameFood');
        var key = itemNameFood.attr("data-key");
        app.navigate('views/detailFood.html?areaid=' + areaID + '&parentGroupID=' + parentGroupID + '&key=' + key);
    }
}