$ ->

    getPlayers = () ->
        phtml = ""
        params = {}
        params.pos = $('#pos li.active').data 'pos'
        name = $('#search').val()
        if name then params.name = name
        $.getJSON "search.php?#{$.param(params)}", (data) ->
            for player in data
                phtml += "<tr #{if player.picked == true or player.picked == "true" then 'class="drafted"' else ''}>
                    <td>#{player.rank}</td>
                    <td>#{player.pos}</td>
                    <td class=\"pname\"><a target=\"#{player._id['$id']}\" href=\"#{player.link}\">#{player.name}</a></td>
                    <td>#{player.proj}</td>
                    <td>#{player.bye}</td>
                    <td class=\"actions\">
                        <button type=\"button\" class=\"draft\" data-id=\"#{player._id['$id']}\">D</button>
                        <button type=\"button\" class=\"undraft\" data-id=\"#{player._id['$id']}\">U</button>
                    </td>
                </tr>"

            $('#players').html(phtml)

    $('#pos li').click () ->
        $('#pos li').removeClass 'active'
        $(@).addClass 'active'
        getPlayers()

    $('#search').on 'keyup', () -> getPlayers()

    $('#clear').click () ->
        $('#search').val('').trigger('keyup')

    $('#players').on 'click', '.draft', () ->
        id = $(@).data 'id'
        $.post "search.php", { id: id, picked: true }, () ->
            getPlayers()

    $('#players').on 'click', '.undraft', () ->
        id = $(@).data 'id'
        $.post "search.php", { id: id, picked: false }, () ->
            getPlayers()



    getPlayers()


