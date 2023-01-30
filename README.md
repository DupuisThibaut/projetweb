# projetweb part2

1. Un enseignant peut créer des comptes étudiants en fournissant un fichier csv
contenant nom, prenom, numéro étudiant. On rappelle que le numéro étudiant
identifie de manière unique un étudiant.

2. Le compte n'est créé que s'il n'existait pas.
3. 
4. Le mot de passe par défaut est le numéro étudiant, mais l'étudiant peut
ensuite le changer.

4. Bien sur, les étudiants ne peuvent ni lire des questions ni en créer, mais
pourront répondre à des questions. Voir après.

5. On veut pouvoir créer des questions où la réponse est une valeur numérique
pour laquelle il n'y a pas de propositions de réponses.

6. La réponse attendue est fournie par l'enseignant et enregistrée.

7. Le formatage des numériques saisis sera au minimum contrôlé côté client. On
se limite à des décimaux avec au plus 2 chiffres après un éventuel "."

8. L'enseignant peut diffuser une question pendant son cours en affichant la
question ainsi qu'un identifiant unique (voir plus loin)

9. Les étudiants identifiés peuvent alors répondre en saisissant sur leur espace
l'identifiant (idéalement, affichage possible sur un smartphone)

10. L'enseignant peut afficher pour chacune des réponses le nombre d'étudiants
l'ayant proposée (voir après) en se mettant à jour au fur et à mesure des
réponses des étudiants

11. Quand il le souhaite, l'enseignant stoppe la diffusion. Il n'est alors plus
possible de répondre.

12. L'enseignant peut déclencher l'affichage de la correction sur son écran et
idéalement sur l'écran des étudiants.

13. Il peut être utile de pouvoir masquer/démasquer sur la page enseignant
l'énoncé ou les réponses

14. S'il y a plus de 5 réponses possibles/proposées, on n'affichera que les 4
réponses les plus fréquentes et une 5ème categorie "autres réponses".

15. L'identifiant de la question doit être unique, généré à la création de la question
et non prévisible. Il doit être codé sur 8 caractères alphanumériques.

16. L'enseignant commence la diffusion d'une séquence. Il s'affiche alors
l'identifiant de la séquence et de quoi lancer la première question.

17. Dès qu'une séquence est diffusée et qu'ils ont connaissance de l'identifiant,
les étudiants identifiés le saisissent, puis :
        si une question est en cours et qu'ils n'y ont pas déjà répondu, la question
        s'affiche et ils peuvent y répondre, sinon, ils sont invités à patienter.

18.Comme lors d'une diffusion d'une question en direct, l'enseignant peut voir
les réponses des étudiants. Il peut stopper les réponses et afficher la
correction.

19. L'enseignant peut passer à la question suivante. Si la question n'était pas
stoppée, elle le devient. L'écran des étudiants se met à jour en conséquence.

20. Toutes les réponses données sur une question sont archivées,
nominativement, avec la date de réponse ainsi que le mode de diffusion de la
question (seule ou en séquence avec son identifiant).

21. Toutes les réponses données sur une question sont archivées,
nominativement, avec la date de réponse ainsi que le mode de diffusion de la
question (seule ou en séquence avec son identifiant).
Un enseignant a accès à une page de statistiques permettant de :
Toutes les réponses données sur une question sont archivées,
nominativement, avec la date de réponse ainsi que le mode de diffusion de la
question (seule ou en séquence avec son identifiant).
Un enseignant a accès à une page de statistiques permettant de :
suivre par un diagramme le nombre de participants aux
questions/séquences au cours du temps (ou sur une fenêtre temporelle),
affichage des résultats d'un étudiant
par question seule (réussi = correspondance parfaite des réponses),
par séquence (pourcentage de questions bien répondues)
effacer les réponses fournies par les étudiants à une question ou à une
séquence.
Stockage des informations

22. Un rapport (détail à venir sur moodle)

23. Une vidéo d'environ 180s (détail à venir sur moodle)

24. un document précisant les corrections/améliorations de la partie 1 ainsi
que les fonctionnalités réalisées/non réalisées de la partie 2,la webographie complétée.
