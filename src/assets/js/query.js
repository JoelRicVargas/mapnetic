function edit_module(){
    $(".edit_input").css('pointer-events','visible');
    $(".edit_input").addClass('edit');
    $(".banner .overlayed").css('display','block');
    $("#btn_actualizar").css('display','block');
    $(".options").css('display','block');
};

function mostrarContrasena(input){
    var tipo = $("."+input);
    if(tipo.attr('type') == "password"){
        tipo.attr('type', 'text');
        $('.icon_change_pass').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
    }else{
        tipo.attr('type', 'password');
        $('.icon_change_pass').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
    }
};

function mostrarModelConfirm(modal, question){
    var modal =  $("#"+ modal);
    modal.modal("show");
    $("#modalConfirm .modal-body .question").text(question);
}

function sendMailModal(){
    var modal =  $("#modalSendMail");
    modal.modal("show");
    setInterval(() => {
        modal.modal("hide");
    },4000)
    clearInterval();
}
function changePass(){
    $('.content_change_pass').css('visibility','visible');
    $('.content_change_pass').css('display','block');
    $('.pass_modal').css('display','none');
    $('.no_change_pass').css('display','block');
}
function noChangePass(){
    $('.pass_modal').css('display','block');
    $('.no_change_pass').css('display','none');
    $('.content_change_pass').css('visibility','hidden');
    $('.content_change_pass').css('display','none');
}

$('#terminosCondiciones').on('click', function (e) {
    alert("entro aqui");
});