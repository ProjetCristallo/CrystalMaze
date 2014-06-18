#!/bin/sh

compteur=0

if test -z "$1"
then
    echo "Vous devez rentrer le numéro du niveau que vous voudrez insérer"
else

    if [ "$(echo $var | grep "^[ [:digit:] ]*$")" ]  ; then

# Comptage du nombre de fichiers de niveaux présents
	for fichier in ./*.txt
	do
	    compteur=$(($compteur + 1))
	done

# Vérification qu'il n'y a pas de "trous" dans la suite de niveaux
	for i in $(seq 1 1 $compteur)
	do
	    if [ ! -f ./$i.txt ]; then
		echo "./$i.txt n'est pas present"
		echo "le programme va finir"
		return 0
	    fi
	done    

# Permutation des fichiers
	for i in $(seq $compteur -1 $1)
	do
	    mv ./$i.txt ./$(($i + 1)).txt
	done

	echo "Vous pouvez maintenant le fichier $1.txt dans ce dossier"
	
    else
	echo "vous n'avez pas tapé un nombre ..."
    fi
fi