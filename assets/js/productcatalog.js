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

    $("#addnewproduct").on('input', '#pname', function(e){

        if($('#addnewproduct #pname').val().length > 0){

            $('#addnewproduct #btnNewProduct').prop('disabled', false);
        }
        else{

            $('#addnewproduct #btnNewProduct').prop('disabled', true);
        }
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

                    $(".comments .comment-block").append("<p>" + $("#txtComment").val() + "</p>");
                    $(".comments .comment-block").append("<sub> - " + get_formatted_date(Date.now()) + "</sub>")
                    $(".comments .comment-block").append("<hr>");

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

    function get_formatted_date(timestamp){

        var date = null;

        var day = null;

        var month = null;

        var months = [];

        var year = null;

        var hour = null;

        var min = null;

        var sec = null;

        var formatted_date = null;

        date = new Date(parseInt(timestamp));

        day = date.getDate();

        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        month = months[date.getMonth() - 1];

        year = date.getFullYear();

        hour = date.getHours();

        min = date.getMinutes();

        sec = date.getSeconds();

        formatted_date = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec;

        return formatted_date;
    }

});