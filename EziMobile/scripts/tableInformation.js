function openModalViewGuestQuantity() {
    $("#modalguestquantity").kendoMobileModalView("open");
}
function closeModalViewGuestQuantity() {
    $("#modalguestquantity").kendoMobileModalView("close");
}
function tableInformationLoad() {
    $("#edtmale").kendoNumericTextBox({
                                          spin: onSpin
                                      });
    $("#edtfemale").kendoNumericTextBox({
                                            spin: onSpin
                                        });
    $("#edtchild").kendoNumericTextBox({
                                           spin: onSpin
                                       });
    //$("#inputGuestQuantity").kendoNumericTextBox();
}

function onSpin() {
    var male = parseInt($('#edtmale').val());
    var female = parseInt($('#edtfemale').val());
    var child = parseInt($("#edtchild").val());
    var total = male + female + child;
    $("#inputGuestQuantity").val(total);
}

function viewTableInformationShow(e) {
    $("#txtVipCode").val(e.view.params.autoid);
    $("#txtCustomerGroup").val(e.view.params.autoid);
}