requirejs.config({
    paths: {
        'datetimepicker': '../vendor/smalot-bootstrap-datetimepicker/bootstrap-datetimepicker',
        'durandal':'../vendor/durandal',
        'zurb' : '../vendor/foundation',
        'i18next':'../vendor/i18next/i18next.amd.withJQuery',
        'jquery': '../vendor/jquery/jquery',
        'knockout': '../vendor/knockout/knockout.debug',
        'ko-deferred': '../vendor/knockout-deferred-updates/knockout-deferred-updates',
        'ko-hotkeys':'../vendor/Knockout.Hotkeys/knockout.hotkeys',
        'ko-punches': '../vendor/knockout.punches/knockout.punches',
        'knockout-es5':'../vendor/knockout-es5/knockout-es5',
        'kodash':'../vendor/kodash/kodash',
        'lodash':'../vendor/lodash/lodash',
        'moment':'../vendor/moment/moment',
        'moment-timezone':'../vendor/moment-timezone/moment-timezone-with-data-2010-2020',
        'numeral':'../vendor/numeral/numeral',
        'plugins' : '../vendor/durandal/plugins',
        'q': '../vendor/q/q',
        'selectize': '../vendor/selectize/selectize',
        'microplugin': '../vendor/microplugin/microplugin',
        'sifter': '../vendor/sifter/sifter',
        'text': '../vendor/requirejs-text/text',
        'toastr': '../vendor/toastr/toastr',
        'transitions':'../vendor/durandal/transitions',
        'fastclick': '../vendor/fastclick/fastclick'
    },
    shim: {
        'jquery':{exports:['jQuery','$']},
        'koplugs': 'knockout',
        'jqplugs': 'jquery',
        'datetimepicker':'jquery',
        'fastclick':{exports:['FastClick']},
        'zurb/foundation':{exports:'Foundation',deps:['jquery','fastclick']},
        'zurb/foundation.abide':'zurb/foundation',
        'zurb/foundation.accordion':'zurb/foundation',
        'zurb/foundation.alert':'zurb/foundation',
        'zurb/foundation.clearing':'zurb/foundation',
        'zurb/foundation.dropdown':'zurb/foundation',
        'zurb/foundation.equalizer':'zurb/foundation',
        'zurb/foundation.interchange':'zurb/foundation',
        'zurb/foundation.joyride':'zurb/foundation',
        'zurb/foundation.magellan':'zurb/foundation',
        'zurb/foundation.offcanvas':'zurb/foundation',
        'zurb/foundation.orbit':'zurb/foundation',
        'zurb/foundation.reveal':'zurb/foundation',
        'zurb/foundation.tab':'zurb/foundation',
        'zurb/foundation.tooltip':'zurb/foundation',
        'zurb/foundation.topbar':'zurb/foundation'
    },
    map:{
        '*':{
            'knockout-es5':'koES5Mod',
            'underscore':'lodash'
        },
        'koES5Mod':{'knockout-es5':'knockout-es5'}
    }
})(['main'],function(){});