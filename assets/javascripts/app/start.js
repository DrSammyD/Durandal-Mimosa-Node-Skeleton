define(['durandal/app',
        'durandal/viewLocator',
        'durandal/system',
        'knockout',
        'koplugs',
        'jqplugs',
        'viewmodels/shell',
        'plugs/durandal/routerInstall',
        'zurb/foundation'
    ],
    function(app, viewLocator, system, ko) {
        var req = require;
        //>>excludeStart("build", pragmas.build);
        system.debug(true);
        //>>excludeEnd("build");
        req({
            baseUrl: './javascripts/app'
        });
        ko.punches.enableAll();
        app.title = 'Bitcadia';


        app.configurePlugins({
            router: true,
            dialog: true,
            widget: true
        });


        app.start().then(function() {
            //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            //Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            //Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell', 'entrance');
        });
    });