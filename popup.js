var liste = document.getElementById("liste");
async function getAllTabs() {
    var tabs = await chrome.tabs.query({});
    var tabArray = [];
    tabs.forEach(function (tab) {
        tabArray.push(tab);
    });
    return tabArray;
  }
console.log("This is a popup!");
console.log(getAllTabs());
//promise result
var tabs = [];
var tabKeeper = [];
getAllTabs().then(function (result) 
{ 
    console.log(result);
    result.forEach(function (tab) {
        tabs.push(tab);
        var li = document.createElement("li");
        liste.appendChild(li);
        li.innerHTML = tab.title;
        let clicked = false;
        li.addEventListener("click", function () {
            if (clicked) {
                li.style.color = "black";
                clicked = false;
                tabKeeper.splice(tabKeeper.indexOf(tab), 1);
            } else {
                li.style.color = "red";
                clicked = true;
                tabKeeper.push(tab);
            }
        }
        );
    });
    //getid btn
    var btn = document.getElementById("btn");
    btn.addEventListener("click", function () {
        tabs.forEach(function (tab) {
            if (tabKeeper.indexOf(tab) == -1) {
                chrome.tabs.remove(tab.id);
            }
        });
    });
});





