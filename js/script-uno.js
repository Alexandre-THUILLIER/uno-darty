$(document).ready(function() {

    players = [];
    idUserAuto = 0;

    updateOrder();

    // Ajout d'un user dans le tableau
    $('.add-gamer button').click(function(e) {

        e.preventDefault();
        const name = $(this).prev('input').val();

        if ( name != '' ) {

            idUserAuto = idUserAuto + 1;

            players.push(
                {
                    id: idUserAuto,
                    name: name,
                    totalScore: 0,
                    gameWin: 0,
                    lastScore: 0,
                    history: ''
                }
            );

            $('.list-gamer .content').html('');
            for (i = 0; i < players.length; ++i) {
                $('.list-gamer .content').append('<div class="player"><button class="delete" data-key="' + players[i].id + '"><i class="icon-cancel-circled"></i></button><span>' + players[i].name + '</span></div>')
            }
            $('.error').text('');
            $(this).prev('input').val('');

            console.log(players);

            // Suppression d'un user de la liste
            deleteUserList();

        } else {

            $(this).prev('input').val('');

        }
    });

    // Enregistrer les scores
    $(document).on('click', '.enter-score', function(e) {
        e.preventDefault();

        if ( $('#begin-play .content').hasClass('selected') ) {

            for ( s = 0; s < players.length; s++) {

                const dataUser = $('.user[data-user="' + players[s].id + '"]');

                var newScore = 0;
                if ( dataUser.find('input[type="tel"]').val() !== "" ) {
                    newScore = parseFloat(dataUser.find('input[type="tel"]').val()); // valeur du champ input
                } else if ( $('.user[data-user="' + players[s].id + '"]').hasClass('the-winner') ) {
                    newScore = -20;
                }

                players[s].lastScore = newScore;

                var actuallyScore = players[s].totalScore;

                // SCORE FINAL
                var finalScore = newScore + actuallyScore;
                players[s].totalScore = finalScore;

                if (players[s].history === '') {
                    players[s].history = newScore.toString();
                } else {
                    players[s].history = players[s].history + ' / ' + newScore;
                }

                dataUser.find('.points span').text(parseFloat(finalScore));
                dataUser.attr('data-score', finalScore);

                // Ajout de marque au vainqueur
                if ( dataUser.hasClass('the-winner') ) {
                    players[s].gameWin = players[s].gameWin + 1;
                    dataUser.find('.winner').append('<span></span>');
                }

                // Ajout de l'historique des points
                dataUser.find('.historique').html(players[s].history);

            }

            // reset
            $('.user input').val('');
            $('.user .win input').prop('checked', false);
            $('.user').removeClass('the-winner').parent('.content').removeClass('selected');
            $('.error-winner').text('');

        } else {
            $('.error-winner').text('Veuillez sélectionner un vainqueur !');
        }
    });

    // Mettre à jour la liste
    $('.maj').click(function(e) {
        e.preventDefault();

        for ( i = 0; i < players.length; i++) {

            const dataUser = $('.user[data-user="' + players[i].id + '"]');
            const actuallyScore = parseFloat(players[i].totalScore);
            const lastScore = parseFloat(players[i].lastScore);

            let updateScore = lastScore;
            if ( dataUser.find('input[type="tel"]').val() !== "" ) {
                updateScore = parseFloat(dataUser.find('input[type="tel"]').val()); // valeur du champ input
                dataUser.attr('data-score', updateScore);
            }
            players[i].lastScore = updateScore;

            const score = updateScore + (actuallyScore - lastScore);

            players[i].totalScore = score;

            dataUser.find('.points span').text(score);

            // Correction du dernier score en historique
            const indexOfSlash = players[i].history.lastIndexOf('/');
            players[i].history = players[i].history.substring(0, indexOfSlash) + '/ ' + updateScore;
            dataUser.find('.historique').text(players[i].history);

        }

        // reset
        $('.user input').val('');
        $('.user .win input').prop('checked', false);
        $('.user').removeClass('the-winner').parent('.content').removeClass('selected');

    });

    // Nouvelle partie
    $('.new-game').click(function(e) {
        e.preventDefault();
        $('#begin-play').hide().find('.content').html('');
    });

    $('.sortBy .cross-close').click(function() {
        $('.sortBy').hide();
        $('.sortBy .content .sort-user').remove();
    });

    // Lancer la partie
    $('.play').click(function(e) {
        e.preventDefault();

        sessionStorage.clear();

        console.log(players);

        $('#begin-play h4 span').text(players.length);

        if ( players.length > 0 ) {

            $('#begin-play').show();

            for ( e = 0; e < players.length; e++) {

                $('#begin-play > .content').append('<div class="user" data-user="'+ players[e].id +'" data-score="0" data-name="'+ players[e].name +'"><div class="win"><input type="radio" name="winner"><i class="icon-crown"></i></div><div class="name">'+ players[e].name +'<span class="winner"></span></div><div class="points"><input type="tel" /><span>'+ players[e].totalScore +'</span> pts</div><div class="historique"></div></div>');
            }

            $('.error').text('');

        } else {
            $('.error').text('Veuillez ajouter des joueurs avant de lancer une nouvelle partie');
        }

    });

    // Ajout variable pour le vainqueur
    $(document).on('click', '.win', function() {
        $('.win:not(this)').parents('.user').removeClass('the-winner');
        $(this).parents('.user').addClass('the-winner').parents('.content').addClass('selected');
    });

    // Afficher toutes les options
    $('.see_all_options').click(function() {
        $(this).next('.all_options').slideToggle();
        $('.new_playeurs_to_added').slideUp();
    });

    $('.add_playeur').on('click', function () {
        $('.new_playeurs_to_added').slideToggle();
    });

    addNewPlayeurInGame()

});

function deleteUserList() {

    $(document).on('click', '.delete', function(e) {
        e.preventDefault();

        var elementToDelete = $(this).attr('data-key');
        players = players.filter((player) => player.id != parseFloat(elementToDelete));

        $(this).parent().remove();

    });
}

function updateOrder() {

    $('.sort').click(function() {

        $('.sortBy').show();
        divList = $(".user");
        divList.sort(function (a, b) {
            return  $(a).attr('data-score') - $(b).attr('data-score');
        });
        for (i = 0; i < players.length; i++) {
            $('<div class="sort-user"><div class="sort-classement">' + (i+1) + '<span>e</span></div><div class="sort-pseudo">' + divList.eq(i).attr('data-name') + '</div><div class="sort-score">' + divList.eq(i).attr('data-score') + ' points</div></div>').appendTo(".sortBy .content");
        }

    });

}

function addNewPlayeurInGame() {
    $(document).on('click', '#btn_add_new_playeur', function() {

        const sortedUsers = players.sort(function (a, b) {
            return a.totalScore - b.totalScore;
        });

        const indexLastUser = sortedUsers.length - 1;
        const highestScore = sortedUsers[indexLastUser].totalScore + 1;
        const name = $('.new_playeurs_to_added #firstname').val();

        idUserAuto = idUserAuto + 1;

        players.push(
            {
                id: idUserAuto,
                name: name,
                totalScore: highestScore,
                gameWin: 0,
                lastScore: highestScore,
                history: highestScore.toString()
            }
        );

        $('#begin-play h4 span').text(players.length);

        $('#begin-play > .content').append('<div class="user" data-user="'+ idUserAuto +'" data-score="0" data-name="'+ name +'"><div class="win"><input type="radio" name="winner"><i class="icon-crown"></i></div><div class="name">'+ name +'<span class="winner"></span></div><div class="points"><input type="tel" /><span>'+ highestScore +'</span> pts</div><div class="historique">' + highestScore.toString() + '</div></div>');

        $('.new_playeurs_to_added #firstname').val('');

    });
}

