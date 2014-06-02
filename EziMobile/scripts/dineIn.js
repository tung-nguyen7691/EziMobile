function listViewAreaBind() {
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
                       var template = kendo.template("<svg style='padding: 5px' width='110' height='110'>" +
                                                     "<rect width='110' height='110' rx='20' ry='20' stroke='cyan' stroke-width='3' fill='white' >" +
                                                     "</rect>" +
                                                     "<text x='20' y='15' fill='cyan'>#= RET_DEFINEID #</text>" +
                                                     "</svg>");
                       var displayData = kendo.render(template, result.CustomerTable); //render the template
                       $("#tableGrid").html(displayData); //display the result
                   } else
                       alert("No Tables Found");
               }
           })
}