function connection(){
    console.log("aaaa");
    var id=document.getElementById("identifiant").value;
    var mdp=document.getElementById("mdp").value;
    document.location.href='http://localhost:5000/login/'+id+'/'+mdp;
}

function creerCompte(){
    var id=document.getElementById("identifiant").value;
    var mdp=document.getElementById("mdp").value;
    document.location.href='http://localhost:5000/creerCompte/'+id+'/'+mdp;
}