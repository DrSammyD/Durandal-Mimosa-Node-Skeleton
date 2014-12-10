define(['jquery', 'knockout',
        'injectBinding',
        'maskAliases'
    ],
    function($, ko, injectBinding, masks) {
        var getFallback = function(key) {
            return this()[key];
        };
        var defaultMask = {
            read: function(input, inputValue, opts) {
                return inputValue;
            },
            write: function(input, inputValue, opts) {
                return inputValue;
            }
        };
        var runTest = function(test, bindingName) {
            if ($.isFunction(test))
                return test(bindingName) ? true : false;
            else
                return (test === bindingName) ? 1 : false;
        };
        var getBindingNames = function(allBindingsAccessor) {
            var names = [];
            for (var key in allBindingsAccessor()) {
                if (~((ko.bindingHandlers[key] || {}).after || []).indexOf('mask')) {
                    ko.utils.shimBindingHandlers(key);
                    names.push(key);
                }
            }
            return names;
        };

        var createMaskObservable = function($el, allBindingsAccessor) {
            var computed = ko.computed(function() {
                var maskOptions = ko.unwrap(allBindingsAccessor.get('mask'));
                $el.data('virtualInput').inputmask(maskOptions);
                var mask =  $el.data('virtualInput').data()._inputmask.opts;
                var alias = maskOptions.alias || maskOptions;
                delete maskOptions.alias;
                return ko.utils.extend(ko.utils.extend({}, defaultMask), masks[alias] || {});
            });
            ko.utils.extend(
                allBindingsAccessor,
                ko.utils.injectBinding(allBindingsAccessor,
                    'virtualMask',
                    computed)
            );
            ko.utils.extend(
                allBindingsAccessor,
                ko.utils.injectBinding(allBindingsAccessor,
                    'currentMask',
                    ko.observable(computed()))
            );
        };
        ko.bindingHandlers.mask = {
            init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var $virtualInput, bindingNames, $el = $(element);
                $el.data('virtualInput', (virtualInput = $('<input></input>')));
                allBindingsAccessor.get = allBindingsAccessor.get || getFallback;

                $el.closest('form').on('submit', function() {
                    $el.triggerHandler('mouseenter');
                });

                createMaskObservable($el, allBindingsAccessor);

                var exact = 0;
                var stuff;
                bindingNames = getBindingNames(allBindingsAccessor);
                $virtualInput=$el.data('virtualInput');
                ko.utils.arrayForEach(bindingNames, function(bindingName) {
                    var valToUse, morphToUse;
                    var bindingToIntercept = allBindingsAccessor.get(bindingName);
                    if (bindingToIntercept) {
                        exact = 0;
                        ko.utils.arrayForEach(ko.bindingHandlers.mask.replace, function(item) {
                            stuff = (exact !== 1) &&
                                (exact = runTest(item.test, bindingName)) &&
                                (valToUse = item.valToUse(bindingName, bindingToIntercept),
                                    morphToUse = item.morph);
                        });
                    }
                    var read = function() {
                        var mask;
                        $virtualInput.val((mask = ko.unwrap(allBindingsAccessor.get('currentMask'))).write(element, ko.unwrap(valToUse), mask)).triggerHandler('mouseenter');
                        return $virtualInput[0].value;
                    };
                    var write = function(newValue) {
                        var mask;
                        if (ko.isWriteableObservable(valToUse)) {
                            newValue = (mask = ko.unwrap(allBindingsAccessor.get('currentMask'))).read(element, newValue, mask);
                            valToUse(newValue);
                        }
                    };

                    var interceptor = (ko.pureComputed || ko.computed)({
                        read: read,
                        write: write
                    }).extend({
                        notify: 'always'
                    });
                    var binding = morphToUse(bindingName, bindingToIntercept, interceptor);
                    for (var key in binding) {
                        ko.utils.extend(
                            allBindingsAccessor,
                            ko.utils.injectBinding(allBindingsAccessor,
                                key,
                                binding[key])
                        );
                    }
                });
                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    $el.inputmask('remove');
                    $el.data('virtualInput').inputmask('remove');
                    $el.data('virtualInput', undefined);
                });
            },
            update: function(element,valueAccessor,allBindingsAccessor,viewModel,bindingContext){
                var $el = $(element);
                var mask = ko.unwrap(allBindingsAccessor.get('virtualMask'));
                $el.inputmask(mask);
                allBindingsAccessor.get('currentMask')(mask);
            },
            replace: [{
                test: function(bindingName) {
                    return true;
                },
                valToUse: function(bindingName, val) {
                    return val;
                },
                morph: function(bindingName, val, interceptor) {
                    bindings = {};
                    bindings[bindingName] = interceptor;
                    return bindings;
                }
            }]
        };

        ko.bindingHandlers.number = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                var bindings = {
                    mask: 'numeric'
                };
                if ($(element).is('input'))
                    bindings.value = valueAccessor();
                else
                    bindings.text = valueAccessor();
                ko.applyBindingsToNode(element, bindings);
            }
        };
        ko.bindingHandlers.percentage = {
            init: function(element, valueAccessor, allBindingsAccessor) {
                var bindings = {
                    mask: 'percentage'
                };
                if ($(element).is('input'))
                    bindings.value = valueAccessor();
                else
                    bindings.text = valueAccessor();
                ko.applyBindingsToNode(element, bindings);
            }
        };
        ko.bindingHandlers.mask.register = function(name) {
            ((ko.bindingHandlers[name] || {}).after = (ko.bindingHandlers[name] || {}).after || []).push('mask');
        };

        ko.utils.arrayForEach(
            ['text',
                'value',
                'textinput',
                'textInput'
            ],
            function(item) {
                ko.bindingHandlers.mask.register(item);
            });
    });