function listViewAreaInit() {
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
                       $("#dropdownArea").kendoDropDownList({
                                                                dataTextField: "REA_NAME",
                                                                dataValueField: "REA_AUTOID",
                                                                dataSource: result.RESAREA,
                                                                select: loadTableGrid
                                                            });
                   else
                       alert("No Areas Found");
               }
           })
}

function loadTableGrid(e) {
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
               url: _webServicePath + 'getOpenTable',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("No Tables Found");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.CustomerTable !== null) {
                       var template = kendo.template(
                           "<div class='tableDiv' data-autoid='#= RET_AUTOID #' data-defineid='#= RET_DEFINEID #' >" +
                           "<center><div class='tableHeaderSelected'>#= RET_DEFINEID #</div></center>" +
                           "<div class='tableContent'> </div>" +
                           "</div>");
                       var displayData = kendo.render(template, result.CustomerTable); //render the template
                       $("#tableGrid").html(displayData); //display the result
                       //bind click event to table div and children
                       $(".tableDiv").click(function(e) {
                           tableClick(e);
                       });
                       $(".tableDiv").children().click(function(e) {
                           e.stopPropagation();
                           tableClick(e);
                       });
                   } else
                       alert("No Tables Found");
               }
           })
}

function tableClick(e) {
    var parentDiv = $(e.target).closest('.tableDiv');
    var autoid = parentDiv.attr("data-autoid");
    var defineid = parentDiv.attr("data-defineid");
    var areaid = $("#dropdownArea").val();
    app.navigate('views/tableInformation.html?autoid=' + autoid + '&defineid=' + defineid + '&areaid=' + areaid);
}