<?php

    include 'dbConnection.php';

//    $stmt = $pdo->prepare('SELECT * FROM annuaire WHERE etat = "published" ORDER BY date_added DESC');
//    $stmt -> execute();
//    $annuaires = $stmt->fetchAll();


?><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team UNO</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/style-uno.css">

    <!-- Scripts -->
    <script src="js/jquery-3.2.1.min"></script>
    <script src="js/script-uno.js"></script>
</head>
<body>

    <header id="header">
        <img src="image/UNO_Logo.svg" alt="Playing Uno">
    </header>

    <main id="main">

        <div class="add-gamer">
            <form>
                <div class="form">
                    <label for="add-gamer">Ajouter un joueur</label>
                    <input type="text" name="add-gamer" id="add-gamer" />
                    <button type="submit">+</button>
                </div>
            </form>
        </div>

        <div class="list-gamer">
            <div class="title">Liste des joueurs</div>
            <div class="content"></div>
        </div>
        <div class="error"></div>
        <button class="play">Lancer la partie</button>

        <div id="begin-play" style="display: none;">
<!--            <div class="user">-->
<!--                <div class="name">Adeline</div>-->
<!--                <div class="points">-->
<!--                    <input type="number" />-->
<!--                    <span>158</span> pts-->
<!--                </div>-->
<!--            </div>-->
            <div class="content"></div>

            <button class="enter-score">Enregistrer les scores</button>
            <button class="new-game">Nouvelle partie</button>
        </div>

    </main>

</body>
</html>