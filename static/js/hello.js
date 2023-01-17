function connection(){
    console.log("aaaa");
    var id=document.getElementById("identifiant").value;
    var mdp=document.getElementById("mdp").value;
    document.location.href='http://localhost:8888/login/'+id+'/'+mdp;
}

function creerCompte(){
    var id=document.getElementById("identifiant").value;
    var mdp=document.getElementById("mdp").value;
    document.location.href='http://localhost:8888/creerCompte/'+id+'/'+mdp;
}

function creerQCM(div){
    var  maDiv = document.getElementById(div);
	if(maDiv.style.display == "none"){
		maDiv.style.display = "block";
        document.getElementById("EnleverQ").style.display="block";
        document.getElementById("AjoutQ").style.display="none";
	}
	else{
		maDiv.style.display = "none";
        document.getElementById("EnleverQ").style.display="none";
        document.getElementById("AjoutQ").style.display="block";
	}
}

function enleverQCM(div){
    var  maDiv = document.getElementById(div);
	if(maDiv.style.display == "block"){
		maDiv.style.display = "none";
        document.getElementById("EnleverQ").style.display="none";
        document.getElementById("AjoutQ").style.display="block";
	}
	else{
		maDiv.style.display = "block";
        document.getElementById("EnleverQ").style.display="block";
        document.getElementById("AjoutQ").style.display="none";
	}
}

function ajouterUneRep(div){
    var  maDiv = document.getElementById(div);
	if(maDiv.style.display == "none"){
		maDiv.style.display = "block";
	}
	else{
		maDiv.style.display = "none";
	}
}
