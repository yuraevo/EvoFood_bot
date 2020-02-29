const kb = require("./keyboard_text")

module.exports = {
    main: [
        [kb.main.personal_accaunt],
        [kb.main.menu, kb.main.basket],
        // [kb.main.basket],
        //[kb.main.home_delivery],
        [kb.main.reserve_table],
        //[kb.main.call_staff],
        [kb.main.review],
        [kb.main.about],
        [kb.main.inviting_friends]
    ],

    personal_accaunt: [
        [kb.personal_accaunt.card],
        //[kb.personal_accaunt.change_phone, kb.personal_accaunt.change_adres],
        //[kb.personal_accaunt.change_date_of_birthday],
        [kb.personal_accaunt.bonus],
        [kb.back]
    ],

    card: [
        [kb.personal_accaunt.change_phone, kb.personal_accaunt.change_adres],
        [kb.personal_accaunt.change_date_of_birthday],
        [kb.back]
    ],

    bonus: [
        [kb.back]
    ],

    send_telephone: [
        [kb.send_telephone.activation],
        [kb.back]
    ],

    activation: [
        [kb.back]
    ], 

    back_in_menu: [
        [kb.back_in_menu]
    ],

    menu: [
        //[kb.menu.first_meal, kb.menu.second_meal],
        //[kb.menu.second_meal],
        [kb.menu.hot_meal],
        [kb.menu.on_the_grill],
        [kb.menu.soup, kb.menu.salads], 
        //[kb.menu.salads],
        [kb.menu.rolls, kb.menu.pizza],
       // [kb.menu.pizza],
        [kb.menu.drinks, kb.menu.sweet],
        //[kb.menu.sweet],
        [kb.back]
    ],

    home_delivery:[
        [kb.menu.first_meal],
        [kb.menu.second_meal],
        [kb.menu.hot_meal],
        [kb.menu.soup],
        [kb.menu.salads],
        [kb.menu.rolls],
        [kb.menu.pizza],
        [kb.menu.on_the_grill],
        [kb.menu.drinks],
        [kb.menu.sweet],
        [kb.back]
    ],

    reserve_table: [
        [kb.back]
    ],

    // call_staff: [
    //     [kb.call_staff.waiter],
    //     [kb.call_staff.hookah],
    //     [kb.call_staff.check],
    //     [kb.back]
    // ],

    about: [
        [kb.about.telephone_number],
        [kb.about.adress],
        [kb.about.staff],
        [kb.about.interior],
        //[kb.about.closest_places],
        [kb.back]
    ]
}