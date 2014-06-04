var areaid;
var defineid;

function openModalViewGuestQuantity() {
    $("#modalguestquantity").kendoMobileModalView("open");
}
function closeModalViewGuestQuantity() {
    $("#modalguestquantity").kendoMobileModalView("close");
}
function viewTableInformationInit() {
    _langID = 2;
    _branchID = 3;
    
    var dataRequest = {
        branchID: _branchID,
        langID: _langID,
    };
    $.ajax({
               url: _webServicePath + 'getCustomerGroup',
               type: "POST",
               dataType: "json",
               data: JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("No Customer Group Found");
               },
               success: function(data) {
                   var result = JSON.parse(data.d.Result);
                   if (result.CustomerGroup !== null)
                       $("#dropdownCustomerGroup").kendoDropDownList({
                                                                         dataTextField: "POG_NAME",
                                                                         dataValueField: "POG_AUTOID",
                                                                         dataSource: result.CustomerGroup,
                                                                     });
                   else
                       alert("No Areas Found");
               }
           })
}

function guestQuantityOnChange() {
    var male = parseInt($('#edtmale').val());
    var female = parseInt($('#edtfemale').val());
    var child = parseInt($("#edtchild").val());
    var total = male + female + child;
    $("#inputGuestQuantity").val(total);
}

function viewTableInformationShow(e) {
    defineid = e.view.params.defineid;
    $("#tableID").html(defineid);
    areaid = e.view.params.areaid;
}

function btnTableInformationSubmitClick() {
    app.navigate("views/getGroupFood.html?areaid=" + areaid + '&defineid=' + defineid);
}