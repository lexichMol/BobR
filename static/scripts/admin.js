globalThis.c = 0;
function generateTable(title_prize, description) {
  console.log(title_prize, description)
  if((document.getElementById("count").value != "") && (document.getElementById("bullet").value != "") && (document.getElementById("us_id").value != "") && (c == 0)){
    c ++;
    const tbl = document.createElement("table");
    tbl.className = "fixed";
    const tblBody = document.createElement("tbody");

    //start
    globalThis.weight = document.getElementById("count").value;
    globalThis.bullet_user = document.getElementById("bullet").value;
    globalThis.us_id = document.getElementById("us_id").value;


    document.getElementById("count").value = "";
    document.getElementById("bullet").value = "";
    document.getElementById("us_id").value = "";
    //end

    var id_count = 1;
    var num = 0;
    var stri = 0;
    var stri_count = 0;
    const alfavit = ["A", "B", "C", "D", "E", "F", "G", "H", "I","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    // id_count.style.opacity = 0.7;
    tbl.style.tableLayout = "fixed";
    for (let i = 0; i <= weight; i++) {
      const row = document.createElement("tr");
      stri = 0;

      for (let j = 0; j <= weight; j++) {
        globalThis.cell = document.createElement("td");

        cell.style.backgroundColor = "white";
        cell.style.width = '30px';
        cell.style.height = '30px';
        // cell.innerText=id_count;
        if(num == 0){
          cell.style.opacity = 0;
        }
        else if(num <= weight){
          cell.style.fontSize="20px";
          cell.style.border="none";
          cell.style.fontWeight = 'bold';
          cell.innerText= num;
        }
        else if(stri == 0){
          cell.style.fontSize="20px";
          cell.style.border="none";
          cell.style.fontWeight = 'bold';
          cell.innerText= alfavit[stri_count];
          stri_count ++;
        }
        else{
          // cell.innerText= id_count;
          cell.id = id_count;
          id_count ++;
        }
        stri = 1;
        num ++;

        cell.setAttribute("onclick", "changeColor(this)");

        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "1");
  }
}
globalThis.boat = ["b_1", "b_2", "b_3", "b_4", "b_5", "b_6", "b_7", "b_8", "b_9", "b_10", "b_11", "b_12", "b_13", "b_14", "b_15", "b_16", "b_17", "b_18", "b_19", "b_20", "b_21", "b_22", "b_23", "b_24", "b_25", "b_26", "b_27", "b_28", "b_29", "b_30", "b_31", "b_32", "b_33", "b_34", "b_35", "b_36", "b_37", "b_38", "b_39", "b_40", "b_41", "b_42", "b_43", "b_44", "b_45", "b_46", "b_47", "b_48", "b_49", "b_50" ];
sum_boat = 0;
globalThis.boats_id = [];
present_id = [];
var a = 0;
globalThis.a = 0;

function changeColor(cell){
  if ((a == 0) && !(boats_id.includes(cell.id))){
    document.getElementById("pop_up").style.display = "grid";
    const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;
    a ++;
    addCSS(".main{ filter: blur(10px); }")
    if(cell.id != ""){
      if(cell.getElementsByTagName('img').length == 0) {
        globalThis.img = document.createElement('img');
        img.src = "https://img.freepik.com/premium-vector/ship-cartoon_119631-441.jpg?w=826";
        img.id = boat[cell.id - 1];
        sum_boat ++;
        img.style.width = '25px';
        img.style.height = '25px';
        img.style.margin ="auto";
        cell.appendChild(img);
        boats_id.push(cell.id);
        console.log(boats_id);
        globalThis.boats_id;
      }
    }
  }
}

function back(){
  if(document.getElementById("money").value != ""){
    globalThis.present = document.getElementById("money").value;
    present_id.push(present);
    console.log(present_id);
    document.getElementById("money").value = "";
    document.getElementById("pop_up").style.display = "none";
    const addCSS = css =>   document.head.appendChild(document.createElement("style")).innerHTML=css;

    addCSS(".main{ filter: blur(0px); }")}
    a = 0;
};

function removed(){
  document.getElementById("pop_up").style.display = "none";
  const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;
  addCSS(".main{ filter: blur(0px); }")
  // var elem = document.getElementById(boat[cell.id] - 1);
  // elem.remove();
  // cell.removeChild(img);
  // cell.removeChild(img);
  // document.body.removeChild(document.getElementById(boat[cell.id] - 1));
  img.remove();
  boats_id.pop();
  a = 0;
};




//start
async function save() {

  let formData = new FormData();
  formData.append("weight", weight);
  formData.append("count_shot", bullet_user);
  formData.append("user_id", us_id);
  formData.append("boats_id", boats_id);
  formData.append("prize", present_id);


  let response = await
  fetch("http://192.168.0.141/check",
  {
      method: "POST",
      body: formData
  });
  let result = await response.json();


}
//end

//start
async function save_prize() {
  title = document.getElementById("prize").value;
  description = document.getElementById("prize_description").value;
    document.getElementById("prize").value = "";
    document.getElementById("prize_description").value = "";

  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);



  let response = await
  fetch("http://192.168.0.141/add_prize",
  {
      method: "POST",
      body: formData
  });
  let result = await response.json();


}
//end
