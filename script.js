var http = new XMLHttpRequest;
http.open("GET","http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",true);
http.onreadystatechange = function () {
    if(this.readyState == 4 && this.status == 200){
        var res=JSON.parse(this.response);
        console.log(res);
        for(var i=0;i<res.length;i++){
            var id=document.createElement("td");
            id.innerHTML=res[i].id;
            id.className="column1";
            var firstName=document.createElement("td");
            firstName.innerHTML=res[i].firstName;
            firstName.className="column2";
            var lastName=document.createElement("td");
            lastName.innerHTML=res[i].lastName;
            lastName.className="column3";
            var email=document.createElement("td");
            email.innerHTML=res[i].email;
            email.className="column4";
            var phone=document.createElement("td");
            phone.innerHTML=res[i].phone;
            phone.className="column5";
            var tableRow=document.createElement("tr");
            tableRow.className="data-row";
            tableRow.appendChild(id);
            tableRow.appendChild(firstName);
            tableRow.appendChild(lastName);
            tableRow.appendChild(email);
            tableRow.appendChild(phone);
            var tableBody=document.getElementsByTagName("tbody")[0];
            tableBody.appendChild(tableRow);
        }
        var selectedRows = document.querySelectorAll(".data-row");
        console.log(selectedRows);
        selectedRows.forEach(element => {
            element.addEventListener("click",function(){
                selectedRows.forEach(item => {
                    item.classList.remove("active");
                });
                element.classList.add("active");
                document.querySelector(".full-name").innerHTML=element.querySelector(".column2").innerHTML+" "+element.querySelector(".column3").innerHTML;
                var selectedTabId=element.querySelector(".column1").innerHTML;
                for(var i=0;i<res.length;i++){
                    if(res[i].id==selectedTabId){
                        document.querySelector(".desc").innerHTML=res[i].description;
                        document.querySelector(".street-address").innerHTML=res[i].address.streetAddress;
                        document.querySelector(".city").innerHTML=res[i].address.city;
                        document.querySelector(".state").innerHTML=res[i].address.state;
                        document.querySelector(".zip").innerHTML=res[i].address.zip;
                    }
                       
                }
                document.getElementById("info-content").style.display="inline";
            });

        });
        
        myFunction=(val)=>{
            selectedRows.forEach(e=>{
                var cells=e.querySelectorAll("td");
                var cellArr=[...cells];
                var found="false";
                cellArr.forEach(c =>{
    
                    if(c.innerHTML.toLowerCase().indexOf(val.toLowerCase())>-1){
                        found="true";
                    }
                });
                if(found==="true"){
                    e.style.display="";
                }
                else{
                    e.style.display="none";
                }
            });
            
        }
    }
}
http.send();
