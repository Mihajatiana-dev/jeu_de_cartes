const prompt = require('prompt-sync')();

function userNickname() {
    let nickname = prompt("Enter your nickname: ");
    return nickname;
}

const menu = () => {
    console.log('-----------CARD_GAME-----------');
    console.log('           (1)  Play          ');
    console.log('           (2)  Help          ');
    console.log('           (3)  Quit          ');
    console.log('-------------------------------');
    console.log('Enter your choice');
}

const help = () => {
    console.log('--------¿ How To Play ?--------');
    console.log(`|                             |`);
    console.log(`|   the Fire beats the Plant  |`);
    console.log(`|  the Plant beats the Water  |`);
    console.log(`|   the Water beats the Fire  |`);
    console.log(`|_____________________________|`);
}

/**
 * retourne un nombre aléatoire entre 1 et 3 inclu
 * @returns number
 */
const randomNumber = () => {
    let a = Math.random();
    let b = a * 3;
    let c = Math.floor(b);
    return c + 1;

    //return  Math.floor (Math.random () * 3) + 1    => short version

}

/**
 * Affiche les actions que le joueur peut effectuer
 * @function card_display
 */
const card_display = () => {
    console.table({
        1: 'FIRE',
        2: 'PLANT',
        3: 'WATER'
    });
    console.log(`Enter the index of the card you want to play`);
}

/**
 * fonction qui va retourner la carte jouée par un joueur
 * @param {number} index index de la carte joué
 * @returns string 
 */
const played_card = (index) => {
    const deck = ['Fire', 'Plant', 'Water'];
    return deck[index - 1];
}

/**
 * Vérifie si la valeur saisie par l'utilisateur est un nombre
 * @param {*} input 
 * @returns boolean
 */
const numberCheck = (input) => {
    if ((typeof (input) != 'number') || (isNaN(input))) {
        return false;
    }
    return true;
}

/**
 * fonction qui va retourner l'index de la carte choisie par
 * le joueur
 * @returns number
 */
const index_of_the_card = () => {
    let index = + prompt('>>>');
    while ((numberCheck(index) == false) || ((index > 3) || (index < 1))) {
        console.log(`Invalid input, please enter a valid index`);
        index = + prompt('>>>');
    }
    return index;
}

const game = () => {
    let pseudonym = userNickname();
    menu();
    let choice = + prompt('>>>'); //saisie du choix de l'utilisateur

    while (choice != 3) {

        if (numberCheck(choice)) {
            switch (choice) {

                case 1:  //choix 1
                    let playerPoints = 0;
                    let iaPoints = 0;
                    let round = 1;

                    while (round <= 3) { //deroulement d'un round
                        card_display();
                        let playerCard = played_card(index_of_the_card());
                        let iaCard = played_card(randomNumber());

                        round++;

                        // on dit quelles sont les cartes choisies par les deux joueurs
                        console.log(`${pseudonym} played ${playerCard}`);
                        console.log(`the computer played ${iaCard}`);
                        //puis on compare les cartes pour savoir qui aura le point
                        if (playerCard == 'Fire' && iaCard == 'Plant') {
                            playerPoints++;
                            console.log(pseudonym + ' win this round');
                        } else if (playerCard == 'Fire' && iaCard == 'Water') {
                            iaPoints++;
                            console.log('The computer win this round');
                        } else if (playerCard == 'Water' && iaCard == 'Fire') {
                            playerPoints++;
                            console.log(pseudonym + ' win this round');
                        } else if (playerCard == 'Water' && iaCard == 'Plant') {
                            iaPoints++;
                            console.log('The computer win this round');
                        } else if (playerCard == 'Plant' && iaCard == 'Water') {
                            playerPoints++;
                            console.log(pseudonym + ' win this round');
                        } else if (playerCard == 'Plant' && iaCard == 'Fire') {
                            iaPoints++;
                            console.log('The computer win this round');
                        } else {
                            console.log("It's a draw!");
                        }
                    }

                    //après les 3 rounds, on annonce qui est le vainqueur
                    if (playerPoints > iaPoints) {
                        console.log(`${pseudonym} WIN the game !`);
                        return;
                    } else if (playerPoints < iaPoints) {
                        console.log(`${pseudonym} LOST the game`);
                        return;
                    }
                    //dans le cas d'un match null
                    else {
                        console.log(`There is no winner... \nEnter 1 if you want to play again`);
                        let retry = + prompt('>>> ');
                        if (retry == 1) {
                            choice = 1; //choix 1
                            break;
                        } else {
                            choice = 3; //choix3
                            break;
                        }

                    }

                case 2: //choix 2
                    help();
                    menu();
                    choice = + prompt('>>>'); //redemande le choix de l'utilisateur
                    break;

                case 3: //choix 3
                    break;

                default: //choix invalide
                    while (((choice > 3) || (choice < 1))) {
                        console.log('Invalid choice!!!');
                        choice = + prompt('>>>');
                    }
                    break;
            }

        } else { //au cas ou l'utitlisateur ne saisie pas un chiffre
            console.log(`Invalid input! Please enter a number`);
            choice = + prompt('>>>');
        }
    }

    console.log(`Thanks for playing`);
}

//pour jouer:
game()
