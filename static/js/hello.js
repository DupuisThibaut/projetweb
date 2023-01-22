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
var nbEti=1;
function registerNbRep(){
    document.getElementById("nb_rep").value = nbRep;
}
function registerNbEti(){
    document.getElementById("nb_eti").value = nbEti;
}

function ajouterRep(div){
    var  maDiv=document.getElementById(div);
    var reponse='reponse'+nbRep.toString();
    let rep="<p id='reponse"+nbRep.toString()+"'><input type='text' id='a"+nbRep.toString()+"' name='reponse"+nbRep.toString()+"'><input type='checkbox' name='valeur"+nbRep.toString()+"' /></input><button type='button' onclick='supprimerRep("+'"'+reponse+'"'+")'>supprimer</button></p>";
    maDiv.insertAdjacentHTML('beforeend', rep);
    nbRep++;
    registerNbRep();
}
function supprimerRep(div){
    // https://developer.mozilla.org/fr/docs/Web/API/Element/remove
    var  maDiv=document.getElementById(div);
    maDiv.remove();
    nbRep--;
    registerNbRep();
}

function ajouterEti(div){
    var  maDiv=document.getElementById(div);
    var etiquette='etiquette'+nbEti.toString();
    let eti="<p id='etiquette"+nbEti.toString()+"'><input type='text' name='etiquette"+nbEti.toString()+"'></input><button type='button' onclick='supprimerEti("+'"'+etiquette+'"'+")'>supprimer</button></p>";
    maDiv.insertAdjacentHTML('beforeend', eti);
    nbEti++;
    registerNbEti();
}
function supprimerEti(div){
    // https://developer.mozilla.org/fr/docs/Web/API/Element/remove
    var  maDiv=document.getElementById(div);
    maDiv.remove();
    nbEti--;
    registerNbEti();
}
/* <input type='checkbox' name='valid_reponse"+nbRep.toString()+"'></input> */


function personneCo(div){
    if (user_actu==''){
        return false;
    }
    else 
        return true;
}

function identification(iden){
    window.user_actu=iden;
}





function envoyerApercu(){
    document.getElementById("creation").style.display="none";
    document.getElementById("apercu").style.display="block";
    for (let i=0; i<nbRep; i++){
        var  maDiv=document.getElementById("areponse");
        let rep="<div id='areponse"+i.toString()+"'><input type='checkbox' name='avaleur"+i.toString()+"' /></div>";
        maDiv.insertAdjacentHTML('beforeend', rep);
    }
    var question=document.getElementById("enonce");
    console.log(question.value);
    a=parseMd(question.value);
    console.log(a);
    var  maDiv=document.getElementById("b");
    maDiv.insertAdjacentHTML('beforeend', a);
    for (let i=0; i<nbRep; i++){
        repb=document.getElementById("a"+i.toString());
        a=parseMd(repb.value);
        var  maDiv=document.getElementById("areponse"+i.toString());
        maDiv.insertAdjacentHTML('beforeend', a);
    }
    // window.location.href="http://localhost:5000/apercu/"+nbRep.toString();
}

function retour(){
    document.getElementById("creation").style.display="block";
    document.getElementById("apercu").style.display="none";
    document.getElementById("areponse").innerHTML="";
    document.getElementById("b").innerHTML="";
}

//https://codepen.io/kvendrik/pen/bGKeEE

function parseMd(md){
  
    //ul
    md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
    md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
    md = md.replace(/^\*(.+)/gm, '<li>$1</li>');
    
    //ol
    md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
    md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
    md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');
    
    //blockquote
    md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');
    
    //h
    md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
    md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
    md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
    md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
    md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
    md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');
    
    //alt h
    md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
    md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');
    
    //images
    md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');
    
    //links
    md = md.replace(/[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g, '<a href="$2" title="$4">$1</a>');
    
    //font styles
    md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
    md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
    md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');
    
    //pre
    md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
    md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');
    
    //code
    md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');
    
    //p
    md = md.replace(/^\s*(\n)?(.+)/gm, function(m){
      return  /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m) ? m : '<p>'+m+'</p>';
    });
    
    //strip p from pre
    md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');
    
    return md;
    
  }

function mesqcm(q){
    console.log(q[0]);
    i=0;
    for (e in q){
        console.log("a");
        var  maDiv=document.getElementById("qcm");
        let rep="<div id='q"+i.toString()+"'><input id='a"+i.toString()+"' type=text value="+e[0]+" hidden></input></div>";
        maDiv.insertAdjacentHTML('beforeend', rep);
        var repb=document.getElementById("a"+i.toString());
        a=parseMd(repb.value);
        var  maDiv=document.getElementById("q"+i.toString());
        maDiv.insertAdjacentHTML('beforeend', a);
        i++;
    }
}
