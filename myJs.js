if('serviceWorker' in navigator){
    
    navigator.serviceWorker.register("/myWorker.js");
    
}



function updateData(response){
    var r=document.querySelector("input").value;
    
    var table=document.querySelector("table");
    var trs=table.getElementsByTagName("tr").length;
    
    
    

    
    
    table.style.display="inline-block";

    
    
        
        
        
    
    response.json().then(function(data){
        table.innerHTML="";
        if(data.length>0){
            
            document.querySelector("#demo").innerHTML="Following are details of Followers of Mr/Mrs:"+r;
            var row=table.insertRow(0).insertAdjacentHTML("afterbegin","<td>User name</td> <td>Id</td>");        
          
        for(i=0;i<data.length;i++){

                var row=table.insertRow(i+1);
row.insertCell(0).textContent=data[i].login;
row.insertCell(1).textContent=data[i].id;
        }
            }
            else{
                document.querySelector("#demo").innerHTML="No data found against name: "+r;

            }
            
            
        }).catch(function(err){
            
        });
        
    
}


function getData(response){
    var r=document.querySelector("input").value;

    if(!r) {
        alert("Please enter data");
        return;    }
var link="https://api.github.com/users/"+r+"/followers";
    
        
       

        fetch(link).then(function(response){
            console.log("data has been recived from network");
          
            updateData(response);
          
        }).catch(function(err){
            console.log("Error found is "+ err);
            });
        caches.match(link).then(function(response){
            if(response){
                console.log("Data has been received from cache");
            updateData(response);
            }
        });
}
