console.log('here');

$.get("http://localhost:8080/output.json", function (data, status) {
    console.log('Amount of data: ', data.length);
    $.each(data, function(key, value){
        console.log(key, value);

        $("#shopping_list").append('<li>container '+value.containerNo+' has weight '+value.weight+'</li>');
    });
});
