function getOrderReviewShow(e) {
    var ticketID = 3;
    _branchID = 3;
    _langID = 2;
    
    var dataRequest = {
        ticketID: ticketID,
        branchID: _branchID,
        langID: _langID
    };
    $.ajax({
               url: _webServicePath + "report_Review",
               type: "POST",
               dataType: "json",
               data : JSON.stringify(dataRequest),
               contentType: "application/json; charset=utf-8",
               failure: function() {
                   alert("Load Data Failed");
               },
               success: orderReviewSuccess
           })
}

function orderReviewSuccess(data) {
    var result = JSON.parse(data.d.Result);
    if (result.ITEMGROUP !== null) {
        var orderReviewDataBillItem = result.BILLITEM;
        var orderReviewDataResticket = result.RESTICKET;
        
        //---------------BILLITEM---------------------
        $("#gridOrderView").kendoGrid({
                                          dataSource: {
                data: orderReviewDataBillItem,
                pageSize: 20
            },
                                          height: 300,
                                          //scrollable: true,
                                          sortable: true,
                                          //filterable: true,
                                          /*pageable: {
                                          input: true,
                                          numeric: false
                                          },*/
                                          columns
                                          : [
                { field: "RTKI_QUANTITY", title: "SL" ,width: "50px"},
                { field: "PIT_NAME", title: "Hàng bán", width: "130px" },
                { field: "RTKI_TOTALCHOICEAMOUNT", title: "Tiền hàng",format: "{0:c}", width: "130px" },
                { field: "RTKI_PRICE",title: "Đơn giá", width: "130px" ,format: "{0:c}"},
                { field: "UOM_NAME", title: "DVT",width: "130px" },
                { field: "RTKI_TOTALDISCOUNT",title: "Giảm giá", width: "130px" ,format: "{0:c}"},
                { field: "RTKI_VATAMOUNT",title: "VAT", width: "130px" ,format: "{0:c}"}
            ]
                                      }
            );
        //---------------RESTICKET--------------------
        var dataSourceResticket = new kendo.data.DataSource({
                                                                data: orderReviewDataResticket
                                                            });
        dataSourceResticket.fetch();
        var RESTICKET = dataSourceResticket.data();
        $("#inputResTable").val(RESTICKET[0].RET_DEFINEID);
        $("#inputBillCode").val(RESTICKET[0].RETK_CODE);
        $("#inputQuantityGuest").val(RESTICKET[0].RETK_CUSTOMERQUANTITY);
        $("#inputCreateBy").val(RESTICKET[0].OBJ_EMPLOYEECASHNAME);
        var dateString = RESTICKET[0].RETK_TIMEIN.substring(6, RESTICKET[0].RETK_TIMEIN.length - 2);
        var currentTime = new Date(parseInt(dateString));
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var year = currentTime.getFullYear();
        var hour = currentTime.getHours();
        var minute = currentTime.getMinutes();
        var second = currentTime.getSeconds();
        var date = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second; 
        //console.log(date);
        $("#inputTimeIn").val(date);
        $("#inputPrintTime").val(RESTICKET[0].RETK_NUMBEROFPRINT);
        $("#inputCustomer").val(RESTICKET[0].OBJ_CUSTOMERNAME);
        //
    } else {
        alert("Load Data Failed");
    }
    console.log(data.d.MoneyService);
    $("#inputMoneyService").val(data.d.MoneyService);
    $("#inputServicePercent").val(data.d.ServicePercent);
    $("#inputServiceValue").val(data.d.ServiceValue);
    $("#inputDiscount").val(data.d.Discount);
    $("#inputVATAmountValue").val(data.d.VATAmountValue);
    $("#inputPaymentAmountValue").val(data.d.PaymentAmountValue);
}