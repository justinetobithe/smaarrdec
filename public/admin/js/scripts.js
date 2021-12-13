

window.addEventListener('DOMContentLoaded', event => {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// $(document).ready(function () {
//     $('#dataTable').DataTable();
// });

// tinymce.init({
//     selector: 'textarea',
//     plugins: [
//         'advlist autolink lists link image charmap print preview anchor',
//         'searchreplace visualblocks code fullscreen',
//         'insertdatetime media table paste code help wordcount'
//     ],
//     toolbar: 'undo redo | formatselect | ' +
//         'bold italic backcolor | alignLeft alignCenter ' +
//         'alignRight alignJustify | bullist numlist outdent indent | ' +
//         'removeformat | help',
// });
