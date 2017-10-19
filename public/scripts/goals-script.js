//goals scripts
var myGoalList = document.getElementsByClassName('li');
for(var i=0; i<myGoalList.length; i++){
  var span = document.createElement("span");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myGoalList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
for(var i=0; i < close.length; i++){
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var list = document.querySelector('#myUL');
list.addEventListener('click', function(ev){
  if(ev.target.tagName === 'li'){
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement(){
  var li = document.createElement('li');
  var inputValue = document.getElementById('myInput').value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if(inputValue === ''){
    alert("Please write a goal!");
  }else{
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById('myInput').value = "";

  var span = document.createElement('SPAN');
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for(i=0; i<close.length; i++){
    close[i].onclick = function(){
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

document.getElementById('ayy').addEventListener('click', newElement);
