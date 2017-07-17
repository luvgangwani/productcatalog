var $ = jQuery.noConflict();

$(document).ready(function(){

    $('#btnNewProduct').click(function(e){

        e.preventDefault();
        var data = {

            'pname': $('#pname').val(),
            'pdesc': $('#pdesc').val(),
            //'pimg': $('#pimg')[0].files[0].name
        };

        $.ajax({

            url: '/addnewproduct',
            method: 'post',
            data: data,
            dataType: 'json',
            success: function(data){
                if(data != 0){

                    $("form#addnewproduct .alert-success").show();
                    setTimeout(function(){
                        $("form#addnewproduct .alert-success").slideUp();
                    }, 5000);

                    $("form#addnewproduct")[0].reset();
                }
                else{

                    $("form#addnewproduct .alert-warning").show();
                    setTimeout(function(){
                        $("form#addnewproduct .alert-warning").slideUp();
                    }, 2000);
                }
            }

        });

    });

});