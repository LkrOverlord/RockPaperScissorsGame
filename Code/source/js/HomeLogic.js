/*
Logic game
 */

window.onload = function (event){
    const nameGame = "Piedra Papel Tijera";
    const namePlayer1 = "Pc";
    const namePlayer2 = "User";
    let myGame = new Game(nameGame, namePlayer1, namePlayer2);

    myGame.startGame.prepareGame();
    myGame.startGame.playGame();

};

/* Create class */
function Game(nameGame, namePlayer1, namePlayer2) {
    this.name = nameGame;
    this.namePlayer1 = namePlayer1;
    this.namePlayer2 = namePlayer2;
    this.startGame = new StartGame(nameGame, namePlayer1, namePlayer2);
}


function StartGame(nameGame, namePlayer1, namePlayer2) {
    this.nameGameElement = document.getElementById("nameGame");
    this.namePlayer1Element = document.getElementById("namePlayer1");
    this.namePlayer2Element = document.getElementById("namePlayer2");
    this.optionPcElement = document.getElementById("optionPc");
    this.allOptionsUserElementArray = document.getElementById("defaultOptionsUser").children;
    this.allOptionsUserElement = document.getElementById("defaultOptionsUser");
    this.scoreGameElement = document.getElementById("scoreGame");
    this.statuGameElement = document.getElementById("defaultGameStatus");
    this.currentGameStatusElement = document.getElementById("currentGameStatus");
    this.currentOptionPcElement = document.getElementById("currentOptionPc");
    this.currentOptionUserElement = document.getElementById("currentOptionUser");

    this.prepareGame = function () {
        this.nameGameElement.innerText = nameGame;
        this.namePlayer1Element.innerText = namePlayer1;
        this.namePlayer2Element.innerText = namePlayer2;
        this.scoreGameElement.innerText = "0 : 0";
        hiddenCurrentOptions(this.currentOptionPcElement, this.currentOptionUserElement, this.currentGameStatusElement);
    };

    this.playGame = function () {
        randomOptionsForPc(this.optionPcElement);
        showOptionsSelected(this.allOptionsUserElementArray,this.optionPcElement,
                            this.allOptionsUserElement,this.statuGameElement,
                            this.currentGameStatusElement, this.currentOptionPcElement,
                            this.currentOptionUserElement, this.scoreGameElement);

    };

    function randomOption(element, valueMin, valueMax) {
        let routeImageBase = "../../resources/";
        let randomOption = 1;
        let currentImageName = element.getAttribute("src").split(routeImageBase)[1];
        let currentImagePosition = getPosition(currentImageName);

        do {
            randomOption = Math.floor(Math.random() * (valueMax - valueMin)) + valueMin;
        } while (currentImagePosition === randomOption);

        return randomOption;
    }

    function getPosition(nameImage) {
        let position;
        switch (nameImage){
            case "piedra.png":
                position = 1;
                break;
            case "papel.png":
                position = 2;
                break;
            case "tijera.png":
                position = 3;
        }
        return position;
    }

    function randomOptionsForPc(optionPcElement) {
        let routeImageBase = "../../resources/";
        let piedra = routeImageBase + "piedra.png";
        let papel = routeImageBase + "papel.png";
        let tijera = routeImageBase + "tijera.png";
        let min = 1;
        let max = 4;

         setInterval(function () {

                let randomOptionPc = randomOption(optionPcElement, min, max);

                switch (randomOptionPc) {
                    case 1:

                        optionPcElement.setAttribute("src", piedra);
                        break;
                    case 2:

                        optionPcElement.setAttribute("src", papel);
                        break;
                    case 3:

                        optionPcElement.setAttribute("src", tijera);
                        break;
                }


        }, 500);
    }

    function showOptionsSelected(arrayOptionsUser, pcOptionElement, userOptionElement, statusElement,
                                 currentStatusElement, currentOptionPc, currentOptionUser, scoreElement) {
        let optionSelectedUser = 1;
        let optionPcSelected = 1;
        let winner = "Pc";
        let min = 1;
        let max = 4;
        let scoreUser = 0;
        let scorePc = 0;
        let scores = [scoreUser, scorePc];
        for (let element of arrayOptionsUser){
           optionSelectedUser = element.addEventListener("click", function (event) {
                let id = element.getAttribute("id");
                optionPcSelected = Math.floor(Math.random() * (max - min)) + min;
                    switch (id){
                        case "optionPiedra":{
                            optionSelectedUser = 1;
                            winner = whoWin(optionSelectedUser, optionPcSelected);
                            insertOptionSelected(optionSelectedUser, currentOptionUser);
                            insertOptionSelected(optionPcSelected, currentOptionPc);
                            insertStatusGame(currentStatusElement, winner);
                            insertCurrentScore(winner, scores, scoreElement);
                            hiddenDefaultOptions(pcOptionElement, userOptionElement, statusElement);
                            showCurrentElements(currentOptionUser,userOptionElement, currentOptionPc,
                                                pcOptionElement, currentStatusElement, statusElement);
                            break;
                        }

                        case "optionPapel": {
                            optionSelectedUser = 2;
                            winner = whoWin(optionSelectedUser, optionPcSelected);
                            insertOptionSelected(optionSelectedUser, currentOptionUser);
                            insertOptionSelected(optionPcSelected, currentOptionPc);
                            insertStatusGame(currentStatusElement, winner, scoreElement);
                            insertCurrentScore(winner, scores, scoreElement);
                            hiddenDefaultOptions(pcOptionElement, userOptionElement, statusElement);
                            showCurrentElements(currentOptionUser,userOptionElement, currentOptionPc,
                                                pcOptionElement, currentStatusElement, statusElement);
                            break;
                        }

                        case "optionTijera": {
                            optionSelectedUser = 3;
                            winner = whoWin(optionSelectedUser, optionPcSelected);
                            insertOptionSelected(optionSelectedUser, currentOptionUser);
                            insertOptionSelected(optionPcSelected, currentOptionPc);
                            insertStatusGame(currentStatusElement, winner, scoreElement);
                            insertCurrentScore(winner, scores, scoreElement);
                            hiddenDefaultOptions(pcOptionElement, userOptionElement, statusElement);
                            showCurrentElements(currentOptionUser,userOptionElement, currentOptionPc,
                                                pcOptionElement, currentStatusElement, statusElement);
                        }

                    }
           });
        }

    }

    function whoWin(userOption, pcOption) {
        let winner = "NoBody";
        switch (userOption){
            case 1: {
                if(pcOption !== userOption){
                    if(pcOption === 2){
                        winner = "Pc";
                    }else{
                        winner = "User";
                    }
                }
                break;
            }
            case 2: {
                if(pcOption !== userOption){
                    if(pcOption === 3){
                        winner = "Pc";
                    }else{
                        winner = "User";
                    }
                }
                break;
            }
            case 3: {
                if(pcOption !== userOption){
                    if(pcOption === 1){
                        winner = "Pc";
                    }else{
                        winner = "User";
                    }
                }
            }
        }
        return winner;
    }

    function hiddenCurrentOptions(currentOptionPc, currentOptionUser, currentStatusGame) {
        currentOptionPc.style.display = "none";
        currentOptionUser.style.display = "none";
        currentStatusGame.style.display = "none";
    }

    function showCurrentElements(elementUserCurrent, elementUserDefault, elementPcCurrent,
                                 elementPcDefault, elementStatusCurrent, elementStatusDefault) {
        elementUserCurrent.style.display = "initial";
        elementPcCurrent.style.display = "initial";
        elementStatusCurrent.style.display = "initial";
        let timeOutToShow = setTimeout(function (event) {
            hiddenCurrentOptions(elementPcCurrent, elementUserCurrent, elementStatusCurrent);
            showDefaultOptions(elementPcDefault, elementUserDefault, elementStatusDefault);
        }, 2000)
    }

    function hiddenDefaultOptions(elementPc, elementUser, elementStatus) {
        elementPc.style.display = "none";
        elementUser.style.display = "none";
        elementStatus.style.display = "none";
    }

    function showDefaultOptions(elementPc, elementUser, elementStatus) {
        elementPc.style.display = "initial";
        elementUser.style.display = "flex";
        elementStatus.style.display = "initial";
    }

    function insertOptionSelected(value, element) {
        let routeImageBase = "../../resources/";
        let piedra = routeImageBase + "piedra.png";
        let papel = routeImageBase + "papel.png";
        let tijera = routeImageBase + "tijera.png";

        switch (value){
            case 1: {
                element.setAttribute("src", piedra);
                break;
            }
            case 2: {
                element.setAttribute("src", papel);
                break;
            }
            case 3: {
                element.setAttribute("src", tijera);
            }

        }
    }

    function insertStatusGame(currentStatusGame, winner) {

        switch (winner){
            case "Pc": {
                currentStatusGame.innerText = "Perdiste :(";
                break;
            }
            case "User": {
                currentStatusGame.innerText = "Ganaste :)";
                break;
            }
            default : {
                currentStatusGame.innerText = "Empataste :|";
            }
        }
    }

    function insertCurrentScore(winner, scores, scoreElement) {
        switch (winner){
            case "Pc": {
                scores[1]++;
                scoreElement.innerText = scores[1] + " : " + scores[0];
                break;
            }
            case "User": {
                scores[0]++;
                scoreElement.innerText = scores[1] + " : " + scores[0];
                break;
            }
        }
    }
}
