var foodDetail;

function getFoodDetailShow(e) {
    //var areaID = e.view.params.areaid;
    var areaID = 3;
    var currencyID = 3;
    //var parentGroupID = e.view.params.autoid;
    var parentGroupID = 124;
    var key = '';
    _branchID = 3;
    _langID = 2;
    var dataRequest = {
        areaID: areaID,
        currencyID: currencyID,
        parentGroupID: parentGroupID,
        key: key,
        parentLevelGroup: parentLevelGroup,
        branchID: _branchID,
        langID: _langID
    };
    
    $.ajax({
               url: _webServicePath + "getItemFromGroup",
               type: "POST",
               dataType: "json",
               data : JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: getFoodDetailSuccess
           })
}
function getFoodDetailSuccess(data) {
    var result = JSON.parse(data.d.Result);
    if (result.ITEMS !== null) {
        foodDetail = result.ITEMS;
        alert(foodDetail);
        
        var dataSource = new kendo.data.DataSource({
                                                       data: foodDetail
                                                   });
            
        $("#listViewFoodDetail").kendoListView({
                                                   dataSource: dataSource,
                                                   template: kendo.template($("#templateFoodDetail").html())
                                               });
        
        getFood = result.ITEMGROUP;
    } else {
        alert("Load Data Failed");
    }
}