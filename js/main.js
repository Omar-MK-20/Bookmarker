// imports 
var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var tableBody = document.getElementById('tableBody');
var submitbtn = document.getElementById('submitbtn');
var editbtn = document.getElementById('editbtn');
// ================

// loading
var urls = [];

if (localStorage.key('urls')) 
{
    urls = JSON.parse(localStorage.getItem('urls'));
    displayBookamrks();
}
// ================

// Global

var editingBookmark = null;

function refreshData()
{
    localStorage.setItem('urls', JSON.stringify(urls));
    displayBookamrks()
}

function reset()
{
    siteName.value = null
    siteURL.value = null
}

function changeBtnToEdit()
{
    submitbtn.classList.add('d-none');
    editbtn.classList.remove('d-none');
}

function changeBtnToSubmit()
{
    editbtn.classList.add('d-none');
    submitbtn.classList.remove('d-none');
}

// =================



function addBookmark()
{
    var bookmark = 
    {
        siteName: siteName.value,
        siteURL: siteURL.value
    }

    urls.push(bookmark);
    refreshData();
    reset();
    console.log(urls);
}


function displayBookamrks()
{
    var tableRows = ``;

    for(var i = 0; i < urls.length; i++)
    {
        tableRows += `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${urls[i].siteName}</td>
            <td><button onclick="window.open('//${urls[i].siteURL}', '_blank')" type="submit" class="btn btn-oily"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button onclick="getData(${i})" type="submit" class="btn btn-warning"><i class="fa-solid fa-pen pe-2"></i>Edit</button></td>
            <td><button onclick="deleteBookmark(${i})" type="submit" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>` 
    }

    tableBody.innerHTML = tableRows;
}

function deleteBookmark(index)
{
    const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger",
    cancelButton: "btn btn-outline-secondary me-3"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!",
  cancelButtonText: "No, cancel!",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    urls.splice(index,1);
    refreshData();
    swalWithBootstrapButtons.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  } else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "Cancelled",
      text: "Your Bookmark is safe",
      icon: "error"
    });
  }
});
}

function getData(index)
{
    editingBookmark = index;
    siteName.value = urls[index].siteName;
    siteURL.value = urls[index].siteURL;
    changeBtnToEdit()
}

function updateBookmark()
{
    urls[editingBookmark].siteName = siteName.value;
    urls[editingBookmark].siteURL = siteURL.value;

    refreshData();
    changeBtnToSubmit();
    reset();
}


function regularEx()
{
	const regex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\.[a-zA-Z0-9()]{1,6})\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

// Alternative syntax using RegExp constructor
// const regex = new RegExp('^(https?:\\\/\\\/)?(www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}(\\.[a-zA-Z0-9()]{1,6})\\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)$', '')

const str = siteURL.value;

// Reset `lastIndex` if this regex is defined globally
// regex.lastIndex = 0;

if ((regex.test(str)))
{
	siteURL.classList.add('is-valid');
	siteURL.classList.remove('is-invalid');
}
else
{
	siteURL.classList.add('is-invalid');
	siteURL.classList.remove('is-valid');
}}