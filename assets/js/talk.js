
var client = contentful.createClient({
    space: 'k7eacopjlocp',
    accessToken: 'RsXpI4XKt45PI4AWn4IsMEgA9LDeOo2qqbFDJ_iszWQ'
  })
  
  let contentType = {
    'content_type': 'talk'
  }
  
  client.getEntries(contentType).then(function (entries) {
    
    entries.items.forEach(function (entry) {
      
      let title = entry.fields.title
      let subtitle = entry.fields.subtitle
      let preview = entry.fields.preview 
      
      if (entry.fields.link == null) {
        
        let timestamp = entry.fields.presentationDate
        let object = "<header> <h3>" + title + "</h3><p>" + subtitle + "</p><h5>Date: " + timestamp + "</h5></header><p>" + preview + "</p>" + "<h4>More Details Soon!</h4>"
        document.getElementById('content').innerHTML += object + "<hr>"

      } else {
        
        let button = "<a href='" + entry.fields.link + "' target='_blank' class='button primary fit small'>Details</a>"
        let timestamp = entry.fields.presentationDate
        let object = "<header> <h3>" + title + "</h3><p>" + subtitle + "</p><h5>Date: " + timestamp + "</h5></header><p>" + preview + "</p>" + button
      
        document.getElementById('content').innerHTML += object + "<hr>"
      }
      
    })
  })
  
  
  function mock() {
    let title = "A Modular Approach to populating Static"
      let subtitle = "Architecture"
      let preview = "Many apps have a settings page to provide users the ability to change their preferences or learn more about the app itself. Normally, these settings page contain a static table view (or collection view). If we want to populate a static table view cell with different items–such as app info, developer info, etc.–we can accomplish this by creating separate classes for each table view item that will create the actual table view cell itself and its unique actions. This is helpful when it comes to adding new methods in the future without meddling into the actual code base. All you have to do is create a new class for the new setting item and append that object into your table view class."
      let articleUrl = "/view.html?" + "entry.sys.id"
      let timestamp = formatTimestamp('2020-11-27')
      let button = "<a href='" + articleUrl + "' class='button primary fit small' target='_blank'>View Article</a>"
      let object = "<header> <h3>" + title + "</h3><p>" + subtitle + "</p><h4>Published: " + timestamp + "</h4></header><p>" + preview + "</p>" + button
      
      document.getElementById('content').innerHTML += object + "<hr>"
  }
  
  function formatTimestamp(obj) {
    let months = {'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'}
    let timestamp = obj.split('-')
  
    let year = timestamp[0]
    let month = months[timestamp[1]]
    let day = timestamp[2]
    console.log(timestamp[1])
    return month + ' ' + day + ', ' + year
  }
  // mock()