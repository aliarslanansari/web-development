var express = require('express');
var app = express();

app.get('/:pet', (req, res) => {
    var sounds = {
        cat:'Oink',
        cow:'Moo',
        dog:'Woof Woof!',
        cat:'I hate you human',
        goldfish:'...'
    }
    animal = req.params.pet;
    if(sounds[animal]==undefined){
        res.send(req.params.pet+ " is not present in my memory");
    }else{
        res.send("The "+animal+" says "+sounds[animal]);
    }
});

app.get('/:str/:no', (req, res) => {
    str = req.params.str;
    no = Number(req.params.no);
    str1='';
    for(var i = 0; i < no; i++){
        str1 += str+" ";
    }
    res.send(str1);
});

app.get('*', (req, res) => {
    res.send("Hey!, Noob.");
    console.log("Someone made request on * ");
});
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});