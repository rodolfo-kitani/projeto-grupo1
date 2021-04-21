const photoUpdate = document.getElementById('photoUpdate');
const newPhotoUpload = document.getElementById('photo-upload-div')

photoUpdate.addEventListener('click', function () {
    newPhotoUpload.classList.toggle('d-none');
})