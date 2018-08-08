$(document).ready(function() {

    // localStorage.clear();
    // localStorage.setItem("Antoine", 50);

    players = [];

    // Ajout d'un user dans le tableau
    $('.add-gamer button').click(function(e) {

        e.preventDefault();
        let name = $(this).prev('input').val();

        if ( name != '' ) {

            players.push(name);

            $('.list-gamer .content').html('');
            for (i = 0; i < players.length; ++i) {
                $('.list-gamer .content').append('<div class="player"><button class="delete" data-key="' + i + '"></button><span>' + players[i] + '</span></div>')
            }
            $('.error').text('');
            $(this).prev('input').val('');
            console.log(players);

            // Suppression d'un user de la liste
            deleteUserList();

        } else {

            $(this).prev('input').val('');

        }

        // localStorage.setItem(name, 0);
        // if ( localStorage.getItem(name) ) {
        //     $('.list-gamer .content').append('<div class="player" data-name="' + name + '"><button class="delete"></button><span>' + name + '</span></div>')
        // }
    });

    // Nouvelle partie
    $('.new-game').click(function(e) {
        e.preventDefault();
        $('#begin-play').hide().find('.content').html('');
        localStorage.clear();
    });


    // Enregistrer les scrores
    $('.enter-score').click(function(e) {
        e.preventDefault();

        for ( s = 0; s < localStorage.length; s++) {

            if ( $('.user[data-score="'+s+'"] input').val() !== "" ) {
                var newScore = parseFloat($('.user[data-score="'+s+'"] input').val()); // valeur du champ input
            } else {
                var newScore = 0;
            }

            var actuallyScore = parseFloat(localStorage.getItem(localStorage.key(s)));

            var score = newScore + actuallyScore;
            localStorage.setItem(localStorage.key(s), score);

            $('.user[data-score="'+s+'"] span').text(parseFloat(localStorage.getItem(localStorage.key(s))));

        }
        $('.user input').val('');
    });


    // Lancer la partie
    $('.play').click(function(e) {
        e.preventDefault();

        localStorage.clear();
        $.each(players, function(index, value) {
            localStorage.setItem(value, 0);
        });

        if ( $('.list-gamer .content').html() !== "" ) {

            $('#begin-play').show();

            // debugger;

            for ( e = 0; e < localStorage.length; e++) {
                $('#begin-play .content').append('<div class="user" data-score="'+ e +'"><div class="name">'+ localStorage.key(e) +'</div><div class="points"><input type="number" /><span>'+ localStorage.getItem(localStorage.key(e)) +'</span> pts</div></div>');
                // debugger;
            }

            $('.error').text('');

        } else {
            $('.error').text('Veuillez ajouter des joueurs avant de lancer une nouvelle partie');
        }

    });
});
function deleteUserList() {

    $('.delete').on('click', function(e) {
        e.preventDefault();

        var elementToDelete = $(this).attr('data-key');

        players.splice(elementToDelete, 1);

        $('.list-gamer .content').html('');
        for (i = 0; i < players.length; ++i) {
            $('.list-gamer .content').append('<div class="player"><button class="delete" data-key="' + i + '"></button><span>' + players[i] + '</span></div>')
        }

        // Suppression d'un user de la liste
        deleteUserList();

        console.log(players);
    });
}