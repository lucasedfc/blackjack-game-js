/**
 * 2C = Two of Clubs
 * 2D = Two of Diamons
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

const game = (() => {
    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    let playersPoints = []

    // let playerPoints = 0,
    //     computerPoints = 0;

    // HTML References

    const btnTake = document.querySelector('#btnTake'),
        btnStop = document.querySelector('#btnStop'),
        btnNew = document.querySelector('#btnNew'),
        pointsHTML = document.querySelectorAll('small'),
        playersCardsDiv = document.querySelectorAll('.cardsDiv'),
        playerNameHTML = document.querySelector('span');


    const setPlayerName = () => {
        swal("Set your player name:", {
            content: "input",
        })
            .then((value) => {
                playerNameHTML.innerText = value || 'Player 1';
            });
    }

    // Create an unorder deck
    const createDeck = () => {
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (const type of types) {
                deck.push(`${i}${type}`)
            }
        }

        for (let type of types) {
            for (const special of specials) {
                deck.push(`${special}${type}`)
            }
        }

        return _.shuffle(deck);
    }

    const initGame = (numPlayers = 2) => {
        setPlayerName()
        deck = createDeck();
        playersPoints = [];
        for(let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }

        pointsHTML.forEach((elem => {
            elem.innerText = 0;
        }))

        playersCardsDiv.forEach((elem => {
            elem.innerText = '';
        }))

        btnTake.disabled = false;
        
    }


    // take a card

    const takeCard = () => {        
        btnStop.disabled = false;
        if (deck.length === 0) {
            throw 'No cards in the deck';
        }
        
        return deck.pop();
    }


    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (!isNaN(value))
            ? +value
            : value === 'A' ? 11 : 10;
    }

    // turn: 0 = first player, and the last is computer turn
    const accumPoints = (card, turn) => {
        playersPoints[turn] += cardValue(card);
        pointsHTML[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {

        const cardImg = document.createElement('img');
        cardImg.src = `./assets/cards/${card}.png`;
        cardImg.classList.add('cards');
        playersCardsDiv[turn].append(cardImg);        
    }

    const checkWinner = () => {
        const [ minPoints, computerPoints ] = playersPoints;

        setTimeout(() => {
            if (computerPoints === minPoints) {
                swal("Hmmm!", "Its a Deuce!", "info");
            } else if (minPoints > 21) {
                swal("Ups!", "Computer won!", "error");
            } else if (computerPoints > 21) {
                swal("Good job!", "You won!", "success");
            } else {
                swal("Ups!", "Computer won!", "error");
            }
        }, 100);
    }

    // Computer Turn
    const computerTurn = (minPoints) => {
        let computerPoints = 0;
        do {
            const card = takeCard();
            computerPoints = accumPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);

        } while ((computerPoints < minPoints) && (minPoints <= 21));

        checkWinner();

        btnNew.disabled = false;
        btnStop.disabled = true;
    }

    // Events

    btnTake.addEventListener('click', () => {

        const card = takeCard();
        const playerPoints = accumPoints(card, 0);
        createCard(card, 0);

        if (playerPoints > 21) {
            btnTake.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        } else if (playerPoints === 21) {
            btnTake.disabled = true;
        }

    });

    btnStop.addEventListener('click', () => {
        btnTake.disabled = true;
        btnStop.disabled = true;        
        computerTurn(playersPoints[0]);
    });

    return {
        newGame: initGame
    }


})();

