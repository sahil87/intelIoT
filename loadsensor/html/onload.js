console.log('here');

function updateData() {
    console.log('Updating data: ');
    $.get("/output.json", function (data, status) {
        console.log('Amount of data: ', data.length);
        var $div = $('#tbody');
        $div.contents().remove();
        
        $.each(data, function(key, value){
            console.log(key, value);
            $div.append(
                '<tr>' +
                '<td><h4>Container '+value.containerNo+'</h4></td>' +
                '<td>'+value.weight+' units</td>' +
                '<td><b>'+ (value.weight > 400 ? 'No' : 'Yes' )+'</b></td>' +
                '</tr>'
            );
        });
    });
}

updateData();
setInterval(updateData, 3000);
