
var client = contentful.createClient({
    space: 'k7eacopjlocp',
    accessToken: 'RsXpI4XKt45PI4AWn4IsMEgA9LDeOo2qqbFDJ_iszWQ'
  })
  
  let contentType = {
    'content_type': 'app'
  }
  
  client.getEntries(contentType).then(function (entries) {
    
    entries.items.forEach(function (entry) {
      
      let appname = entry.fields.appname
      let preview = entry.fields.preview 
      let appUrl = "/view?" + "app?" + entry.sys.id

      let button = "<a href='" + appUrl + "' class='button primary fit small'>View App</a>"
      let imageUrl = "https://" + entry.fields.screenshots[0].fields.file.url
      
    let object = "<header><p><span class='image left'><img src='" + imageUrl + "' alt='' /></span><h2>" + appname + "</h2>" + preview + "</p>"+ button  + "</header>"
      
      document.getElementById('content').innerHTML += object + "<hr>"
    })
  })
