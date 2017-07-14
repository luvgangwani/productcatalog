var $ = jQuery.noConflict();

$(document).ready(function(){

    $('#btnNewProduct').click(function(e){

        e.preventDefault();
        var data = {

            'pname': $('#pname').val(),
            'pdesc': $('#pdesc').val(),
            'pimg': $('#pimg')[0].files[0].name
        };
        
        $.ajax({

            url: '/addnewproduct',
            method: 'post',
            data: data,
            dataType: 'json',
            success: function(){
                alert("Added new product");
            }

        });

    });

});