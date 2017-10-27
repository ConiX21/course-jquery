var fs =  require('fs');
var path = require('path');
var fruits = [];
var cpt = 0;

fs.readdir("../assets/", (err, files)=>{
    for(var f of files){
        var fruit = {"id" : ++cpt, "name":extractProductName(f) , "price" : (Math.random()* 10).toFixed(0), "image" : f};
        fruits.push(fruit)      
    }

    writeJSONFile("../datas/fruits", fruits);
});

function extractProductName(fileName){
    var lengthStringWithoutExtension = path.basename(fileName).length - path.extname(fileName).length;
    var fileWithoutExtension = path.basename(fileName).substr(0,  lengthStringWithoutExtension);
    var name = fileWithoutExtension.split(/(_|-)/,1);
    return name[0];
}

function writeJSONFile(filename, datas) {
    writeStream = fs.createWriteStream(`${filename}.json`);
    writeStream.write(JSON.stringify(datas));
    writeStream.end();

    writeStream.on('finish', () =>{onFinish("Fruits end")});
    writeStream.on('error', onError);
}


function onFinish(message){
    console.log(message)
}

function onError(){
    console.log("Error created file!")
}