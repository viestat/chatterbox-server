
var responseObj = {results: []};
var requestHandler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";

  if (request.url === '/classes/messages') {
    if(request.method === 'POST'){
      var requestBody = '';
      request.on('data', function(chunk){
        requestBody += chunk;
      });
      request.on('end', function(){
        responseObj.results.push(JSON.parse(requestBody));
        response.writeHead(201, headers);
        response.write(JSON.stringify(responseObj));
        response.end(); 
      });
    }
    if(request.method === 'GET') {
      response.writeHead(200, headers);
      response.write(JSON.stringify(responseObj));
      response.end(); 
    }
  } else {
      response.writeHead(404, headers);
      response.write('not found! what!!!???? what are you looking for?!?!?!');
      response.end(); 
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;