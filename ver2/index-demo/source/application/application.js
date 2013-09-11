RAD.application(function (core) {
    'use strict';

    var app = this;

    app.start = function () {
        var self = this,
			options = {
                container_id: '#screen',
                content: "view.main_screen",
                animation: 'none',
                callback: function () {
                    core.publish('service.json_loader.load', {
                        filename: 'cards.json',
                        callback: function (cards) {
                            RAD.models.cards.resetCards(cards);
                            self.loadProgress();
                            core.publish('service.json_loader.load', {
                                filename: 'categories.json',
                                callback: function (cats) {
                                    RAD.models.categories.resetCat(cats);
                                }
                            });
                        }
                    });
                }
            };

        core.publish('navigation.show', options);
    };

    app.flags = RAD.model('flags', Backbone.Model.extend({
        defaults: {
            "testRunning": false,
            "progressSaved": false
        }
    }));

    app.saveProgress = function () {
        core.publish('service.storage.save', {objectID: 'quizCards', object: RAD.models.cards});
        this.flags.set('progressSaved', true);
    };

    app.loadProgress = function () {
        core.publish('service.storage.load', {
            objectID: 'quizCards',
            callback: function (loadedObj) {
                if (!!loadedObj) {
                    RAD.models.cards.merge(loadedObj);
                    RAD.models.cards.groupCardsByCats();
                    console.log('progress loading done');
                } else {
                    console.log('saved progress in local storage not found, loading empty');
                }
            }
        });
    };

    app.clearProgress = function () {
        console.log('clear progress!');
        RAD.models.cards.each(function (card) {
            card.set('status', 'unanswered');
        });
        core.publish('service.storage.remove', {objectID: "quizCards"});
        setTimeout(function () {
            core.publish('view.stats.refresh');
        }, 0);
        this.flags.set('progressSaved', false);
    };

    return app;

}, true);

