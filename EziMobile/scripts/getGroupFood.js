var getGroupFood;
var areaID;
var defineid;
                    
function getGroupFoodInit() {
}

function itemGroupClick(e) {
    var itemPrice = $(e.target).closest('.itemPrice');
    //var areaid = e.view.params.areaid;
    var autoid = itemPrice.attr("data-autoid");
    var path = itemPrice.attr("data-path");
    var level = itemPrice.attr("data-level");
    
    app.navigate('views/getFood.html?areaid=' + areaID + '&autoid=' + autoid + '&path=' + path + '&level=' + level);
}

function btnOpenItemAcceptClick() {
    $("#modalOpenItem").kendoMobileModalView("close");
}

function btnOpenItemCancelClick() {
    $("#modalOpenItem").kendoMobileModalView("close");
}

function getGroupFoodShow(e) {
    $("#defineid").html(e.view.params.defineid);
    areaID = e.view.params.areaid;
    currencyID = '1';
    levelgroup = 1;
    _branchID = 3;
    _langID = 2;
    
    //Get All Item Group
    var dataRequest = {
        areaID: areaID,
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
               success: getAllItemGroupSuccess
           })
    
    //Get Open Item
    var requestOpenItem = {
        branchID: _branchID,
        langID: _langID
    };
    $.ajax({
               url: _webServicePath + "getOpenItem",
               type: "POST",
               dataType: "json",
               data : JSON.stringify(requestOpenItem),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.ITEMS !== null)
                       $("#dropdownOpenItemCode").kendoDropDownList({
                                                                        dataTextField: "PIT_NAME",
                                                                        dataValueField: "PIT_AUTOID",
                                                                        dataSource: result.ITEMS,
                                                                    });
                   else
                       alert("No Open Item Found");
               }
           })
    
    //Get UOM
    var requestUom = {
        branchID: _branchID,
        langID: _langID
    };
    $.ajax({
               url: _webServicePath + "getUOM",
               type: "POST",
               dataType: "json",
               data : JSON.stringify(requestUom),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.UOM !== null)
                       $("#dropdownOpenItemUom").kendoDropDownList({
                                                                       dataTextField: "UOM_NAME",
                                                                       dataValueField: "UOM_AUTOID",
                                                                       dataSource: result.UOM,
                                                                   });
                   else
                       alert("No UOM Found");
               }
           })
}

function getAllItemGroupSuccess(data) {
    var result = JSON.parse(data.d.Result);
    if (result.ITEMGROUP !== null) {
        getGroupFood = result.ITEMGROUP;
        
        var dataSource = new kendo.data.DataSource({
                                                       data: getGroupFood,
                                                       pageSize: 10
                                                   });
                    
        $("#pagerItemGroup").kendoPager({
                                            dataSource: dataSource,
                                            change: function() {
                                                $(".itemPrice").click(function(e) {
                                                    itemGroupClick(e);
                                                });
                                                $(".itemPrice").children().click(function(e) {
                                                    e.stopPropagation();
                                                    itemGroupClick(e);
                                                });
                                            }
                                        });
                    
        $("#listviewItemGroup").kendoListView({
                                                  dataSource: dataSource,
                                                  template: kendo.template($("#templateItemGroup").html())
                                              });
        $(".itemPrice").click(function(e) {
            itemGroupClick(e);
        });
        $(".itemPrice").children().click(function(e) {
            e.stopPropagation();
            itemGroupClick(e);
        });
    } else {
        alert("Load Item Group Failed");
    }
}