var user_actu='';

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

var nbRep=1;

function ajouterRep(div){
    var  maDiv=document.getElementById(div);
    let rep="<input type='text' name='reponse"+nbRep.toString()+"'></input><br><br>";
    maDiv.insertAdjacentHTML('beforeend', rep);
}

function personneCo(div){
    if (user_actu==''){
        return false;
    }
    else 
        return true;
}

function identification(iden){
    user_actu=iden;
}
