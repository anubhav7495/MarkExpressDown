window.onload = function() {
  var converter = new showdown.Converter();
  converter.setOption('simplifiedAutoLink', 'true');
  var pad = document.getElementById('pad');
  var markdownarea = document.getElementById('markdown');
  var download = document.getElementById('Download');

  pad.addEventListener('keydown', function(e) {
    if(e.keyCode === 9) {

      var start = this.selectionStart;
      var end = this.selectionEnd;

      var target = e.target;
      var value = target.value;

      target.value = value.substring(0, start) + "\t" + value.substring(end);

      this.selectionStart = this.selectionEnd = start+1;

      e.preventDefault();
    }
    if(e.keyCode === 13) {

      e.preventDefault();

      var target = e.target;
      var start = target.value.lastIndexOf('\n') + 1;
      var end = this.selectionEnd;

      var reg = /^\s*/gi;
      var x = target.value.substring(start, end);
      var i = x.match(reg)[0];

      target.value = target.value + '\n' + i;
    }
  });

  var previousMarkdownValue;

  var convertTextToMarkdown = function() {
    var markdownText = pad.value;
    previousMarkdownValue = markdownText;
    html = converter.makeHtml(markdownText);
    markdownarea.innerHTML = html;
  };

  var change = function() {
    if(previousMarkdownValue != pad.value) {
      return true;
    }
    return false;
  };

  setInterval(function() {
    if(change()) {
      convertTextToMarkdown();
    }
  }, 1000);

  pad.addEventListener('input', convertTextToMarkdown);

  if(document.location.pathname.length === 1) {
    download.setAttribute("class", "btn btn-primary disabled");
  }

  if(document.location.pathname.length > 1) {
    var documentName = document.location.pathname.substring(1);
    sharejs.open(documentName, 'text', function(err, doc) {
      doc.attach_textarea(pad);
      convertTextToMarkdown();
    });
  }

  convertTextToMarkdown();

};

function mydown() {
  var form = document.getElementById('body');
  form.action = window.location.pathname + "/download";
};
