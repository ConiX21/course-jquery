var cart = [];

$(document).ready(function () {

    initializeWorkspace();
    retrieveFruits();


    $("div.fruits").on("click", "button.btn-success", function () {
        var index = $(this).attr("data-position");
        var that = this;
        
        $.get("datas/fruits.json").then(function(datas){
            
            var qte =  $(that).parent().parent().find("input").val();
            var product = { 
                "image" : datas[index - 1].image,
                "price" : datas[index - 1].price,
                "qte" : qte,
                "priceRow" : qte * parseFloat(datas[index - 1].price)
            };

            cart.push(product);
        })

    });
    $("button.cart").click(showCart);
    $("button.btn-danger").click(function () {
        $("div[name=shoppingCart]").fadeOut("slow");
    });
    $("tbody").on("click", ".btn.btn-warning", function () {
        if (confirm("Voulez-vous supprimer ?")) {
            $(this).parents("tr").fadeOut('slow', function () {
                $(this).remove();
                total();
            })
        }
    })

});


function initializeWorkspace() {
    $("<div class=\"container-fluid\"></div>").appendTo("body");
    $("<nav><input type=\"text\"></nav>")
        .appendTo("div.container-fluid")
        .append("<button class=\"btn btn-success cart\">Cart</button>")
        .clone(true)
        .appendTo("body");

    $("<div class=\"fruits\"></div>").appendTo("div.container-fluid");
}

function createVegetalCard(parentSelector, data) {
    $("<div class=\"row\"></div>")
        .appendTo(parentSelector)
        .append("<div class=\"col-md-12\"></div>")
        .children("div:eq(0)")
        .append("<div class=\"thumbnail\"></div>")
        .find("div.thumbnail")
        .append("<img>")
        .find("img")
        .attr("src", "assets/" + data.image)
        .addClass("img-responsive")
        .end()
        .append("<div class=\"caption\"></div>")
        .find("div.caption")
        .append("<h3></h3>")
        .find("h3")
        .text(data.name)
        .end()
        .append("<label></label>")
        .find("label")
        .text(data.price + "€")
        .end()
        .append("<br><input type=\"number\" value=\"1\">")
        .append("<p></p>")
        .find("p")
        .append("<button data-position=\"" + data.id + "\" type=\"button\"></button>")
        .find("button")
        .text("Ajouter ")
        .append("<span class=\"glyphicon glyphicon-shopping-cart\"></span>")
        .addClass("btn btn-success")






}

function showCart() {
    for (var prod in cart) {
        $("div[name^=shopping]").css("display" , "block")
            var template = $("#rowTemplate").html();
            $("tbody").append(template);
            $("tbody tr:last td:eq(0) img").attr("src", "assets/" + cart[prod].image);
            $("tbody tr:last td:eq(1)").text( cart[prod].price + "€");
            $("tbody tr:last td:eq(2)").text(cart[prod].qte);
            $("tbody tr:last td:eq(3)").text(cart[prod].priceRow);
            total();
    }
}

function total() {
    var total = 0;
    $("tbody tr").each(function (i, element) {
        total += parseFloat($(this).find("td:eq(3)").text());
    })
    $("label.total-price").text(total);
}

function retrieveFruits() {
    $.get("datas/fruits.json")
        .then(function (data) {

            var nbRow = Math.ceil(data.length / 5);
            
            //loop rows
            for (var i = 0; i <= nbRow; i++) {
                $("div.fruits").append("<div class=\"row\"></div>");

                //loop columns
                for (var j = 0; j < 5; j++) {
                    $("div.fruits > div.row:last")
                        .append("<div class=\"col-md-2\"></div>");

                    if(data[(5 * i + j)] != undefined){
                        createVegetalCard("div.fruits > div.row:last div.col-md-2:last", data[(5 * i + j)])
                    }
                }

                $("div.fruits > div.row:last div.col-md-2:first").addClass("col-md-offset-1");
            }


        })
}