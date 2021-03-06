(function () {

    function boot () {

        // retrieve minified raw assets
        var rawAssets = _CCSettings.rawAssets;
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            for (var uuid in entries) {
                var entry = entries[uuid];
                if (typeof entry === 'object') {
                    if (Array.isArray(entry)) {
                        entries[uuid] = { url: entry[0], raw: false };
                    }
                }
                else {
                    entries[uuid] = { url: entry, raw: true };
                }
            }
        }

        // init engine
        var canvas, div;
        //var width = 640, height = 480;

        if (cc.sys.isBrowser) {
            canvas = document.getElementById('GameCanvas');
            div = document.getElementById('GameDiv');

            //width = div.clientWidth;
            //height = div.clientHeight;
        }

        function setLoadingDisplay () {
            // Loading splash scene
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progress-bar span');
            var currentResCount = 0;
            cc.loader.onProgress = function (completedCount, totalCount, item) {
                var percent = 100 * (completedCount - currentResCount) / (totalCount - currentResCount);
                if (progressBar) {
                    progressBar.style.width = percent.toFixed(2) + '%';
                }
            };

            cc.director.on(cc.Director.EVENT_BEFORE_SCENE_LOADING, function () {
                splash.style.display = 'block';
                currentResCount = cc.loader.getResCount();
            });
            cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
                splash.style.display = 'none';
            });
        }

        var onStart = function () {
            cc.view.resizeWithBrowserSize(true);
            cc.view.enableRetina(true);
            //cc.view.setDesignResolutionSize(_CCSettings.designWidth, _CCSettings.designHeight, cc.ResolutionPolicy.SHOW_ALL);
        
            if (cc.sys.isBrowser) {
                setLoadingDisplay();
            }

            // cc.game.pause();

            // init assets
            cc.AssetLibrary.init({
                libraryPath: 'res/import',
                rawAssetsBase: 'res/raw-',
                rawAssets: _CCSettings.rawAssets
            });

            var launchScene = _CCSettings.launchScene;

            // load scene
            cc.director.loadScene(launchScene, null,
                function () {
                    if (cc.sys.isBrowser) {
                        // show canvas
                        canvas.style.visibility = '';
                        var div = document.getElementById('GameDiv');
                        if (div) {
                            div.style.backgroundImage = '';
                        }
                    }

                    // play game
                    // cc.game.resume();

                    console.log('Success to load scene: ' + launchScene);
                }
            );

            // purge
            //noinspection JSUndeclaredVariable
            _CCSettings = undefined;
        };

        var option;

        if (cc.sys.isNative) {
            var txt = jsb.fileUtils.getStringFromFile("project.json");
            if (!txt) txt = jsb.fileUtils.getStringFromFile("project-runtime.json");
            if (!txt) {
                console.log('Can\'t find project.json');
                option = {};
            }
            else {
                option = JSON.parse(txt);
            }

            option.scenes = _CCSettings.scenes;
        }
        else {
            option = {
                //width: width,
                //height: height,
                id: 'GameCanvas',
                scenes: _CCSettings.scenes,
                debugMode: _CCSettings.debug ? cc.DebugMode.INFO : cc.DebugMode.ERROR,
                showFPS: _CCSettings.debug,
            };
        }

        cc.game.run(option, onStart);
    }

    if (cc.sys.isBrowser) {
        window.onload = boot;
    }
    else if (cc.sys.isNative) {
        require('src/settings.js');
        require('src/jsb_polyfill.js');

        boot();
    }

})();
