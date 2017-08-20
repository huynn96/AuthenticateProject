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

    // $('#updateProfile').click((e) => {
    //     e.preventDefault();
    //     let profile = {
    //         username: $('#username').val();
    //         fullname: $('#fullname').val();
    //         email: $('#email').val();
    //         address: $('#address').val();
    //         avatar: $('#avatar').val();
    //         id: $('#id').val();
    //         credentialId: $('#credentialId').val();
    //     }

    //     $.ajax({
    //         url: `/profile`,
    //         type: "PUT",
    //         data: book,
    //     }).then(() => {
    //         alert("Edit book successfully");
    //         window.location.href = "/books";
    //     }, (err) => {
    //         console.log(err);
    //         displayError(err);
    //     });

    // })
});