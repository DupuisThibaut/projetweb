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
    var reponse='reponse'+nbRep.toString();
    let rep="<p id='reponse"+nbRep.toString()+"'><input type='checkbox' name='reponse"+nbRep.toString()+"'><input type='text' name='reponse"+nbRep.toString()+"'></input><button type='button' onclick='supprimerRep("+'"'+reponse+'"'+")' name='reponse"+nbRep.toString()+"'></button></p>";
    maDiv.insertAdjacentHTML('beforeend', rep);
    nbRep++;
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

function supprimerRep(div){
    // https://developer.mozilla.org/fr/docs/Web/API/Element/remove
    var  maDiv=document.getElementById(div);
    maDiv.remove();
}

function envoyerApercu(){
    document.getElementById("creation").style.display="none";
    document.getElementById("apercu").style.display="block";
    var question=document.getElementById("enonce").value;
    rep=[question];
    for (let i=0; i<nbRep; i++){
        rep.push(document.getElementById("reponse"+i.toString()).value);
    }
    // window.location.href="http://localhost:5000/apercu/"+nbRep.toString();
    console.log(question);
}

function retour(){
    document.getElementById("creation").style.display="block";
    document.getElementById("apercu").style.display="none";
}
