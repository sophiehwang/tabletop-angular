var request = require('request');
var cheerio = require('cheerio');

request('https://dl.dropboxusercontent.com/u/5162/table.html', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var parsedResults = [];
    $('li table tbody table table').each(function(i, element){

      // hours - 1st tr, 2nd td
      var hours = $(this).find(' tbody tr:nth-child(1) > td:nth-child(2)').text();
      var seating = $(this).find(' tbody tr:nth-child(2) td:nth-child(2)').text();
      var description = $(this).find('tbody tr:nth-child(4) td:nth-child(2)').text();
      var img = $(this).parent().parent().parent().find('img').attr('src');
      var name = $(this).parent().parent().prev().prev().children().text();
      //
      console.log(name);

      // var metadata = {
      //   rank: parseInt(rank),
      //   title: title,
      //   url: url,
      //   points: parseInt(points),
      //   username: username,
      //   comments: parseInt(comments)
      // };

      var metadata = {
        name: name,
        hour: hours,
        description: description,
        img: img

      };
      // Push meta-data into parsedResults array
      parsedResults.push(metadata);
    });


    // Log our finished parse results in the terminal
    // console.log(parsedResults);
    //
    var fs = require("fs");
    fs.writeFile('data/output.json', JSON.stringify( parsedResults ),  function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });



  }
});



// And then, to read it...
//myJson = require("./filename.json");
