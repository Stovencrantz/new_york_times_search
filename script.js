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

    
  function renderArticle(articleObj) {
    let article = $("<div>").attr("class", "card article").attr("data-id", articleObj.id).attr("data-url", articleObj.url);
    let articleRow = $("<div>").attr("class", "row");
    let articleCol = $("<div>").attr("class", "col-md-12");
    let headlineEl = $("<div>").attr("class", "card-title").text(articleObj.headline);
    let cardBody = $("<div>").attr("class", "card-body");
    let abstractEl = $("<p>").attr("class", "card-text").attr("class", "abstract").text(articleObj.abstract);
    let authorEl = $("<p>").attr("class", "card-text").text(articleObj.author);
    let publishDateEl = $("<p>").attr("class", "card-text").text(articleObj.pubDate);
    cardBody.append([abstractEl, authorEl, publishDateEl]);
    articleCol.append([headlineEl, cardBody])
    articleRow.append(articleCol);
    article.append(articleRow);
    article.on("click", function(event) {
      console.log(this.getAttribute("data-url"))
      //window.location = this.getAttribute("data-url");
      window.open(this.getAttribute("data-url"), "_blank")
    })

    articleDumpEl.append(article);

  }



async function callAPI() {

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

  const result = await $.ajax({url: queryURL, method: "GET"}); // query NYT API
  const data = result.response.docs;

  console.log("data: ", data)
  // Dynamically create card containing all our data

  for(let i=0; i < userData.numRecords;i++) {
    let articleObj = {
      abstract: data[i].abstract,
      url: data[i].web_url,
      headline: data[i].headline.main,
      pubDate: data[i].pub_date.split("T")[0],
      author: data[i].byline.original,
      id: data[i]._id
    }

   // console.log(articleObj)
    renderArticle(articleObj);

  }
}

clearBtn.on("click", function(event) {
  event.preventDefault();
  console.log(this.id);
  articleDumpEl.empty();
})





