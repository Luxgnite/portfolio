var prodFocus;
window.addEventListener('load', loaded);

function loaded(e) {
    request(listProd);
}

function prodShowMore(e) {
    prodFocus = this.dataset.prod;
    request(moreInfo);
}

function request(callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            callback(xhr.responseText);
        }
    };

    xhr.open("GET", "prod.json", true);
    xhr.send(null);
}

function listProd(oData) {
    var prod = JSON.parse(oData);
    console.log(prod);
    var i = 3;

    for (var k in prod) {
        console.log(prod[k]);
        if (i == 3) {
            var rowDiv = document.createElement("div");
            rowDiv.classList.add("flex-line");
            console.log(document.querySelector("#production .wrapper"));
            document.querySelector("#production .wrapper").append(rowDiv);
            i = 0;
        }

        var newDiv = document.createElement("div");
        newDiv.classList.add("prod");
        rowDiv.append(newDiv);

        //Miniature sur la galerie
        newDiv.insertAdjacentHTML('beforeend', "<img src='" + prod[k].image + "'/>");
        var moreDiv = document.createElement("div");
        moreDiv.classList.add("more");
        newDiv.append(moreDiv);

        //Texte sur hover de la miniature
        moreDiv.insertAdjacentHTML('beforeend', "<span class='tag'>" + prod[k].tag + "</span>");
        moreDiv.insertAdjacentHTML('beforeend', "<h4>" + prod[k].title + "</h4>");
        moreDiv.insertAdjacentHTML('beforeend', "<p>" + prod[k].small_descr + "</p>");

        //Bouton "More"
        var moreBtn = document.createElement("div");
        moreBtn.classList.add("more_btn");
        moreBtn.dataset.prod = k;
        moreDiv.append(moreBtn);

        var svgButton = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgButton.setAttribute("viewBox", "134.922 76.315 306.95 162.37");
        moreBtn.append(svgButton);

        var aElement = document.createElementNS("http://www.w3.org/2000/svg", "a");
        aElement.setAttribute("href", "#production");
        svgButton.append(aElement);

        aElement.insertAdjacentHTML('beforeend', "<path d=\" M 353.461 76.315 L 395 76.315 L 418.436 116.908 L 441.872 157.5 L 418.436 198.092 L 395 238.685 L 352.795 238.685 L 223.667 238.685 L 181.795 238.685 L 158.358 198.092 L 134.922 157.5 L 158.358 116.908 L 181.795 76.315 L 223.667 76.315 L 353.461 76.315 Z \"\n" +
            "                                              fill=\"rgb(231,47,110)\"/>");
        aElement.insertAdjacentHTML('beforeend', "<text x=\"288.397\"\n" +
            "                                              y=\"162.5\"\n" +
            "                                              fill=\"white\"\n" +
            "                                              font-size=\"2em\"\n" +
            "                                              text-anchor=\"middle\"\n" +
            "                                              alignment-baseline=\"middle\"\n" +
            "                                              font-family=\"Changa\">\n" +
            "                                            More\n" +
            "                                        </text>");

        i++;
    }

    var btns = document.querySelectorAll(".more_btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', prodShowMore);
    }
}

function moreInfo(oData) {
    var data = JSON.parse(oData);
    data = data[prodFocus];
    document.querySelector("#list_prod").classList.remove("show");
    document.querySelector("#list_prod").classList.add("hide");
    var focusProd = document.querySelector("#focus_prod");
    focusProd.classList.add("show");
    focusProd.classList.remove("hide");

    focusProd.insertAdjacentHTML('beforeend', "<h4>" + data.title + "</h4>");
    var cross = document.createElement("div");
    cross.classList.add("close_cross");
    focusProd.append(cross);
    cross.addEventListener("click", shutFocus);
    var newDiv = document.createElement("div");
    newDiv.classList.add("flex-line");
    focusProd.append(newDiv);
    //Le sample à montrer lors du détail
    newDiv.insertAdjacentHTML('beforeend', "<div class='sample_wrapper'>" + data.sample + "</div>");
    //La description détaillée du projet
    newDiv.insertAdjacentHTML('beforeend', "<div class='description'>" + data.description + "</div>");
}

function shutFocus(e) {
    var focus = document.getElementById("focus_prod");
    while (focus.firstChild) {
        focus.removeChild(focus.firstChild);
    }

    focus.classList.add('hide');
    focus.classList.remove('show');

    var list = document.getElementById("list_prod");
    list.classList.remove('hide');
    list.classList.add('show');
}