// imports 
var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var tableBody = document.getElementById('tableBody');
var submitbtn = document.getElementById('submitbtn');
var editbtn = document.getElementById('editbtn');
var validDivForUrl = document.getElementById('validDivForUrl');
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
	siteName.classList.remove('is-valid');
	siteName.classList.remove('is-invalid');
	siteURL.classList.remove('is-valid');
	siteURL.classList.remove('is-invalid');
	siteName.nextElementSibling.classList.remove('d-block');
	siteURL.nextElementSibling.classList.remove('d-block');
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
    if(regularEx(siteName) && regularEx(siteURL))
    {
		var isRepeated = false;
		if(urls == null)
		{
			return;
		}
		for(var i = 0; i < urls.length; i++)
		{
			
			if(siteName.value == urls[i].siteName)
			{
				isRepeated = true;
				break;
			}
		}
		if(isRepeated)
		{
			siteName.classList.remove('mb-4');
			siteName.nextElementSibling.classList.add('d-block');
			return
		}
		var bookmark = 
		{
			siteName: siteName.value,
			siteURL: siteURL.value
		}

		urls.push(bookmark);
		refreshData();
		reset();
		// console.log(urls);
    }
}


function displayBookamrks()
{
    var tableRows = ``;

	if(urls == null)
	{
		return
	}
    for(var i = 0; i < urls.length; i++)
    {
        tableRows += `
            <tr>
            <th scope="row">${i+1}</th>
            <td>${urls[i].siteName}</td>
            <td><button onclick="window.open('//${urls[i].siteURL}', '_blank')" type="submit" class="btn btn-oily text-center"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button onclick="getData(${i})" type="submit" class="btn btn-warning text-center"><i class="fa-solid fa-pen pe-2"></i>Edit</button></td>
            <td><button onclick="deleteBookmark(${i})" type="submit" class="btn btn-danger text-center"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
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
      text: "Your Bookmark has been deleted.",
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
    if(regularEx(siteName) && regularEx(siteURL))
	{
		urls[editingBookmark].siteName = siteName.value;
		urls[editingBookmark].siteURL = siteURL.value;

		refreshData();
		changeBtnToSubmit();
		reset();
	}
}

// console.log(siteName.id);

function regularEx(element)
{
	const regex = 
	{
		siteName: /^[a-zA-Z0-9]{2,}(?:[a-zA-Z0-9\s]*)[a-zA-Z0-9]+$/,
		siteURL: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]{1,63}(\.[a-zA-Z0-9-]{1,63})*(\.(?:com|net|org|co|biz|info|tech|app|store|shop|dev|design|media|finance|money|us|uk|ca|au|in|nyc|london|berlin|asia|africa|eu|lat|io|ai|me|xyz|site|online|space|club|life|guru|ninja|cool|fun|today|world|edu|eg))\b(:\d{1,5})?(\/[^\s]*)?$/
	}

if ((regex[element.id].test(element.value)))
{
	element.classList.add('is-valid');
	element.classList.remove('is-invalid');
	element.classList.add('mb-4');
	element.nextElementSibling.classList.remove('d-block')
  return true;
}
else
{
	element.classList.add('is-invalid');
	element.classList.remove('is-valid');
	element.classList.remove('mb-4');
	element.nextElementSibling.classList.add('d-block')
  return false;
}}