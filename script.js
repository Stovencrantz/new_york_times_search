// test query
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey

const searchBtn = $("#searchBtn");
const clearBtn = $("#clearBtn");
const searchTermEl = $("#searchTerm");
const numRecordsEl = $("#numRecords");
const startYearEl = $("#startYear");
const endYearEl = $("#endYear");
const articleDumpEl = $("#articleDump");
const apiKeyEl = $("#api_key");

// Example starter JavaScript for disabling form submissions if there are invalid fields
window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      validateForm(form, event);
      callAPI();
    }, false);
  });
}, false);

function validateForm(form, event) {
  if (form.checkValidity() === false) {
    event.stopPropagation();
  }
  form.classList.add('was-validated');
}

function callAPI() {

  const userData = {
    api_key: apiKeyEl.val(),
    searchTerm: searchTermEl.val(),
    numRecords: numRecordsEl.val(),
    startYear: startYearEl.val(),
    endYear: endYearEl.val()
  }
  console.log(userData)

  const queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userData.searchTerm}&api-key=${userData.api_key}`;
  console.log(queryURL)
}

clearBtn.on("click", function(event) {
  event.preventDefault();
  console.log(this.id);
  articleDumpEl.empty();
})



