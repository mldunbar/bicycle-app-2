$.ajaxPrefilter(function(options, originalOptions, jqXHR){
  if(options.url.match(/api.parse.com/)){
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'CfSNdvfYJdwach6FMkR4Mjks3W5KQVUeyl7QzEJK';
    options.headers['X-Parse-REST-API-Key'] = 'gXDnw6tCnkjNJtW4rkP57Z0K8wzgN9zMV2ETl7wf';
  }
});
