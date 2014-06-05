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

function getGroupFoodShow(e) {
    $("#defineid").html(e.view.params.defineid);
    areaID = e.view.params.areaid;
    currencyID = '1';
    levelgroup = 1;
    _branchID = 3;
    _langID = 2;
    
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
                                            dataSource: dataSource
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
        alert("Load Data Failed");
    }
}