
var client = contentful.createClient({
    space: 'k7eacopjlocp',
    accessToken: 'RsXpI4XKt45PI4AWn4IsMEgA9LDeOo2qqbFDJ_iszWQ'
})

function checkContentType() {
    let parameters = location.search.split('?')
    let type = parameters[1];
    let id = parameters[2];

    if (type === 'app') {
        retrieveApp(id)
    } else if (type === 'article') {
        retrieveArticle(id)
    }
}

function retrieveApp(appId) {
    client.getEntry(appId).then(entry => {
        document.getElementById('title').innerHTML = entry.fields.appname;
        document.title = entry.fields.appname + " | by Cyril"
        entry.fields.screenshots.forEach(function (image,i) {
            let imgUrl = "http:" + image.fields.file.url
            let order = (i + 1).toString() + " / " + entry.fields.screenshots.length.toString()
            let imageDiv = "<div class='mySlides fade'><div class='numbertext'>" + order + "</div><img src='" + imgUrl + "' style='width:100%'></div>"
            document.getElementById('images-container').innerHTML += imageDiv
        })

        let prev = "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>"
        let next = "<a class='next' onclick='plusSlides(1)'>&#10095;</a>"

        document.getElementById('images-container').innerHTML += prev
        document.getElementById('images-container').innerHTML += next
        
        let button = "<br><a href='" + entry.fields.link + "' class='button fit small' >" + entry.fields.linktext +  " </a><br><br>"
        document.getElementById('content').innerHTML += button

        return documentToHtmlString(entry.fields.description);
    }).then(renderedHtml => {
        document.getElementById('content').innerHTML += renderedHtml;
        plusSlides(0)
    }).catch(error => {
        console.log("error here",error.message)
        document.getElementById('title').innerHTML = error;
        document.title = "Error"
    })
}

function retrieveArticle(articleId) {
    client.getEntry(articleId).then(entry => {
        document.getElementById('title').innerHTML = entry.fields.title;
        document.title = entry.fields.title + " | by Cyril"
        document.getElementById('subtitle').innerHTML = entry.fields.subtitle;
        document.getElementById('sys').innerHTML = formatTimestamp(entry.sys.createdAt.split('T')[0])
        
        let options = {
            renderNode: {
              'embedded-entry-inline': (node) =>
                `<pre><code>${node.data.target.fields.code}</code></pre>`
            }
          }

        console.log(entry.fields,options)

        return documentToHtmlString(entry.fields.content,options);
    })
    .then(renderedHtml => {
        document.getElementById('content').innerHTML += renderedHtml;
    }).catch(error => {
        document.getElementById('title').innerHTML = error;
        document.title = "Error"
    })
}

function formatTimestamp(obj) {
    let months = {'01':'January','02':'February','03':'March','04':'April','05':'May','06':'June','07':'July','08':'August','09':'September','10':'October','11':'November','12':'December'}
    let timestamp = obj.split('-')
  
    let year = timestamp[0]
    let month = months[timestamp[1]]
    let day = timestamp[2]
    
    return month + ' ' + day + ', ' + year
}

checkContentType()