(function () {

  // Check that the browser supports the FileReader API.
  if (!window.FileReader) {
    document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
    return;
  }

  function displayError(err) {
    var errEl = document.getElementById('error');
    errEl.innerHTML = err.message;
  }

  function displayData(data) {
    var mimeType = (data && data.mime) || '';
    var extension = (data && data.extension) || '';

    var mimeEl = document.getElementById('file_mime');
    mimeEl.innerHTML = mimeType;

    var extEl = document.getElementById('file_extension');
    extEl.innerHTML = extension;
  }

  var handleFile = function (event) {
    var files, reader;

    files = event.target.files;
    reader = new FileReader();
    reader.onload = function (event) {
      try {
        inkjet.magic(event.target.result, function(err, data) {
          if(err) {
            displayError(err);
          } else {
            displayData(data);
          }
        });

      } catch (err) {
        displayError(err);
      }
    };

    reader.readAsArrayBuffer(files[0]);
  };

  window.addEventListener('load', function () {
    document.getElementById('file').addEventListener('change', handleFile, false);
  }, false);

}());