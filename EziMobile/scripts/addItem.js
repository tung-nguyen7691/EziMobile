function listViewAreaInitAddItem() {
    _langID = 2;
    _branchID = 3;
    _userID = 1;
    
    var dataRequest = {
        branchID: _branchID,
        counterID: 1,
        langID: _langID,
        userID: _userID
    };
    $.ajax({
               url: _webServicePath + 'getArea',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("No Areas Found");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.RESAREA !== null)
                       $("#dropdownAreaAddItem").kendoDropDownList({
                                                                dataTextField: "REA_NAME",
                                                                dataValueField: "REA_AUTOID",
                                                                dataSource: result.RESAREA,
                                                                select: loadTableGridAddItem
                                                            });
                   else
                       alert("No Areas Found");
               }
           })
}

function loadTableGridAddItem(e) {
    //selected item
    var selectedItem = this.dataItem(e.item.index());
    var areaID = selectedItem.REA_AUTOID;
    _langID = 2;
    _branchID = 3;
    _userID = 1;

    var dataRequest = {
        areaID: areaID,
        branchID: _branchID,
        langID: _langID,
        userID: _userID
    };
    $.ajax({
               url: _webServicePath + 'getOpenTableHaveCustomer',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("No Tables Found");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.Table !== null) {
                       var template = kendo.template(
                           "<div class='tableDiv' data-autoid='#= RET_AUTOID #' data-defineid='#= RET_DEFINEID #' >" +
                           "<center><div class='tableHeaderSelected'>#= RET_DEFINEID #</div></center>" +
                           "<center><div class='tableInfo'>Thông tin</div></center>" +
                           "<div class='tableFunctionIcon'>" +
                           "<img src='styles/images/icons/pen.png' height='37' width='37' class='tableOrderIcon'>" +
                           "<img src='styles/images/icons/info3.png' style='float: right'  height='37' width='37' class='tableInfoIcon'>" +
                           "</div>" +
                           "</div>");
                       var displayData = kendo.render(template, result.Table); //render the template
                       $("#tableGridAddItem").html(displayData); //display the result
                       //bind click event to table div and children
                       $(".tableHeaderSelected").click(function(e) {
                           tableClickAddItem(e);
                       });
                       $(".tableHeaderSelected").children().click(function(e) {
                           e.stopPropagation();
                           tableClickAddItem(e);
                       });
                       $(".imgOrderReview").click(function(e) {
                           imgOrderReviewClick(e);
                       });
                       $(".imgOrderReview").children().click(function(e) {
                           e.stopPropagation();
                           imgOrderReviewClick(e);
                       });
                   } else
                       alert("No Tables Found");
               }
           })
}

function tableClickAddItem(e) {
    var parentDiv = $(e.target).closest('.tableDiv');
    var autoid = parentDiv.attr("data-autoid");
    var defineid = parentDiv.attr("data-defineid");
    var areaid = $("#dropdownAreaAddItem").val();
    app.navigate('views/tableInformation.html?autoid=' + autoid + '&defineid=' + defineid + '&areaid=' + areaid);
}
function imgOrderReviewClick(e) {
}