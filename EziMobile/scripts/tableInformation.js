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
    $("#inputGuestQuantity").kendoNumericTextBox();
}

function onSpin() {
    var male = parseInt($('#edtmale').val());
    var female = parseInt($('#edtfemale').val());
    var child = parseInt($("#edtchild").val());
    var total = male + female + child;
    var txtGuestQuantity = $("#inputGuestQuantity").data("kendoNumericTextBox");
    txtGuestQuantity.value(total);
}