function listViewAreaBind() {
    var dataRequest = {
        ORG_AUTOID: 3,
        RBT_AUTOID: 2,
        langID: 1
    };
    $.ajax({
        url: 'http://localhost:8989/TranferData/MobileService.asmx/LoadArea',
        type: "POST",
        dataType: "json",
        data: JSON.stringify(dataRequest),
        contentType: "application/json; charset=utf-8",
        failure: function() {
            alert("Load Data Failed");
        },
        success: function(data){
            var result = JSON.parse(data.d.Result);
            if(result.RESAREA !== null)
            	$("#listArea").kendoMobileListView({ 
                    dataSource: result.RESAREA,
                    template: templateArea
                });
            else
            	alert("Load Data Failed");
        }
    })
}

var templateArea = kendo.template(
	'<a class="itemAreaDetail">'+
        '<strong>#: REA_NAME #</strong>'+
    '</a>');