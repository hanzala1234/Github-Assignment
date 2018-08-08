self.addEventListener("install",function(event){
    console.log("cache  started");
var static_Name="Static-Cache";
var files_to_cache=['/myJs.js','/style.css','/myHTML.html','/'];
self.skipWaiting();    
event.waitUntil(
caches.open(static_Name).then(function(cach){
    return cach.addAll(files_to_cache);
})
    );
});
self.addEventListener("fetch",function(event){
 
    if(event.request.url.startsWith("https://api.github.com/")){
        
    caches.open("dynamic-data-2").then(function(my_cach){
        my_cach.add(event.request.url);
    });
 }
    /*
    *alternative method
 fetch(event.request).then(function(response){
       caches.open("dynamic-data-2").then(function(my_cach){
my_cach.put(event.request.url,response);
console.log("Response has been added  successfully");

 })

    }).catch(function(err){
        
        
    }) ;*/
/*
        event.respondWith(
            caches.open('dynamic-data-2').then(function(my_cache) {
                console.log("This lines run");
          return         fetch(event.request).then(function(response) {
                console.log(event.request.url);
                my_cache.put(event.request, response.clone());
                return response;
                
                
              });
            })
        );

 
*/


else{
    
    var static_Name="Static-Cache";
    event.respondWith(
   caches.match(event.request).then(function(response){
       return response||fetch(event.request);
   }));
}
}

);

/*
self.addEventListener("fetch",function(event){
    if(event.request.url.startsWith("https://api.github.com/")){
        
event.respondWith( 
    fetch(event.request).then(function(response){

     return caches.open("dynamic-cache").then(function(cach){
         cach.add(response.clone());
         return response;
         
     });   
     return response;   
    })



);
    }
   
    }
);
    
  */   
