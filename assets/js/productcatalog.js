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

    $(".comments").on('input', '#txtComment', function(e){

        if($(this).val().length > 0){
            $("#btnComment").attr("disabled",false);
        }
        else {
            $("#btnComment").attr("disabled",true);
        }
        
    });

    $(".comments").on('click', "#btnComment", function(e){

        e.preventDefault();

        var data = {

            'comment': $("#txtComment").val()

        };
        $.ajax({

            url: '/viewproduct/' + $("#txtComment").data("pid"),
            method: 'post',
            data: data,
            dataType: 'json',
            success: function(data){

                if(data != 0){

                    $(".comments form .alert-success").show();
                    setTimeout(function(){
                        $(".comments form .alert-success").slideUp();
                    }, 2000);
                    $(".comments form")[0].reset();
                }
                else {

                    $(".comments form .alert-warning").show();
                    setTimeout(function(){
                        $(".comments form .alert-warning").slideUp();
                    }, 2000);
                }

            }
        });
    });

});