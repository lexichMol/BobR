globalThis.c = 0;

function generateTable(weight, bullet, list_ship_prize, list_ship_id, id_table, list_shot_xy, list_shot_tf, list_prize, list_prize_id, list_prize_description)
 {
  globalThis.list_ship_id = list_ship_id
  globalThis.list_ship_prize = list_ship_prize
  globalThis.list_shot_xy = list_shot_xy
  globalThis.list_shot_tf = list_shot_tf
  globalThis.id_table = id_table
  globalThis.list_prize = list_prize
  globalThis.list_prize_id = list_prize_id
  globalThis.list_prize_description = list_prize_description

  console.log(weight)
  console.log(list_shot_tf)

  console.log(list_prize_id)
  console.log(list_prize)
  console.log(list_prize_description)


  if(c == 0){
    var weight = Number(weight);
    const tbl = document.createElement("table");
    tbl.className = "fixed";
    const tblBody = document.createElement("tbody");
    // const weight = document.getElement ById("count").value;
    var id_count = 1;
  //  var weight = 4;
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
        const cell = document.createElement("td");

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
        cell.setAttribute("onclick", `changeColor(this, ${ bullet })`);

        row.appendChild(cell);
      }

      tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "1");
  }
}

var a = 0;
var idi = 0;
//var bullet = 7;
function changeColor(cell, bullet){
  for(i=0; i < list_ship_id.length; i++){
      if(cell.id == list_ship_id[i]){
        idi = i;}
  }
  // const bullet = document.getElementById("bullet").value;
  if(cell.id != ""){
    if(a < bullet){
      if ((cell.style.backgroundColor == "white") && (list_ship_id.includes(cell.id))){
        check(cell.id, "True", id_table)
        cell.style.backgroundColor = "black";
        a++;
        prize_ship_id = list_ship_prize[idi]
        x = 0;
        for(j=0; j < list_prize_id.length; j++){
            if (list_prize_id[x] == prize_ship_id){
                break;
            }
            x++;
        }
        add_userprize(x)
        alert('ВЫСТРЕЛ! ВАШ ВЫИГРЫШ: ' + list_prize[x]);
        if(cell.getElementsByTagName('img').length == 0) {
          globalThis.img = document.createElement('img');
          img.src = "https://img.freepik.com/premium-vector/ship-cartoon_119631-441.jpg?w=826";
          img.style.width = '25px';
          img.style.height = '25px';
          img.style.margin ="auto";
          cell.appendChild(img);}
      }
      else if (cell.style.backgroundColor == "black"){
        alert('ВЫ УЖЕ ВЫБРАЛИ ЭТУ КЛЕТКУ!');
        return false;
      }
      if ((cell.style.backgroundColor == "white") && !(list_ship_id.includes(cell.id))){
        cell.style.backgroundColor = "black";
        a++;
        check(cell.id, "False", id_table)
        alert('ВЫСТРЕЛ! ВЫ ПРОМАХНУЛИСЬ..ПОПРОБУЙТЕ СНОВА!');
      }
    }
    else{
      alert('Упс...ВЫСТРЕЛЫ ЗАКОНЧИЛИСЬ!');
    }
  }
}

function func(){
  document.getElementById("pop_up").style.display = "grid";
  const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;

  addCSS(".main{ filter: blur(10px); }")
};
function back(){
  document.getElementById("pop_up").style.display = "none";
  const addCSS = css => document.head.appendChild(document.createElement("style")).innerHTML=css;

  addCSS(".main{ filter: blur(0px); }")
};

//start
async function check(shot, t_f, id_table) {

  let formData = new FormData();
  formData.append("shot", shot);
  formData.append("T_F", t_f);
  formData.append("id_table", id_table);

  let response = await
  fetch("http://192.168.0.141/shot",
  {
      method: "POST",
      body: formData
  });
  let result = await response.json();


}
//end

//start
async function add_userprize(prize_id) {

  let formData = new FormData();
  formData.append("prize_id", prize_id);


  let response = await
  fetch("http://192.168.0.141/add_user_prize",
  {
      method: "POST",
      body: formData
  });
  let result = await response.json();


}
//end