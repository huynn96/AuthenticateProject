$(document).ready(() => {
    $('#inputImage').change((e) => {
        let formData = new FormData();
        formData.append('avatar', e.target.files[0]);

        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false,
            success: (result) => {
                if (result.status == 'success') {
                    $('.avatar').attr('src', result.link);
                    $("[name='avatar']").val(result.link);
                }
            }
        })
    });
    
});