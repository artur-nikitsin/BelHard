var lpApp = angular.module('lpApp', []);

lpApp.controller('lpPriceCtrl', ['$scope', '$http', function ($scope, $http) {

    $scope.sortBy = 'name';
    $scope.sortRev = false;

    $scope.MyPrice = [];


    $http.get('price.json').then(function (response) {

        $scope.pricesGeneral = response.data;
        $scope.calc($scope.pricesGeneral);




    }, function (response) {
        $scope.requestStatus = response.status;
        $scope.requestStatusText = response.statusText;
    });

    $http.get('price2.json').then(function (response) {
        $scope.prices1 = response.data;

        $scope.calc($scope.prices1);
    }, function (response) {
        $scope.requestStatus = response.status;
        $scope.requestStatusText = response.statusText;
    });



    $scope.sortSet = function (propertyName) {
        if ($scope.sortBy == propertyName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyName;
    }


    $scope.calc = function (price) {
        price.forEach(function (price) {
            price.sum = price.price * (1 - price.discount);

        });
    }


    $scope.addToMyprice = function (event) {

        $scope.btnId = (event.srcElement.id);

        if ($scope.MyPrice.indexOf($scope.pricesGeneral[$scope.btnId]) == (-1)) {

            $scope.MyPrice.push($scope.pricesGeneral[$scope.btnId]);

            ($scope.pricesGeneral[$scope.btnId]).select = true;
            console.log(($scope.pricesGeneral[$scope.btnId]));

        } else {
            $scope.MyPrice.splice($scope.pricesGeneral[$scope.btnId], 1);

            ($scope.pricesGeneral[$scope.btnId]).select = false;

        }
    };


    $scope.delFromMyprice = function (event) {

        $scope.btnIdDel = (event.srcElement.id);

        $scope.MyPrice.forEach(function (item, ind) {

            if (item.index == $scope.btnIdDel) {


                $scope.MyPrice.splice(ind, 1);

                ($scope.pricesGeneral[item.index]).select = false;
            }

        });

    };


    $scope.userPrice = $scope.MyPrice;



}]);









(function ($) {
    $(document).ready(function () {

        // Функция, для появления  иконки для связи при скролле.
        function Scrl() {


            if (($(window).scrollTop()) > 100) {

                $('#callbutton').animate({
                    left: '96%'
                }, 400);

            } else {

                $('#callbutton').animate({
                    left: '120%'
                }, 200);

            };
        };
        Scrl();
        $(window).on('scroll', Scrl);


        // Активное состояние иконки связи
        $('#callbutton').on('mouseover', function () {

            $('#callbutton').addClass('active');
        });

        $('#callbutton').on('mouseleave', function () {

            $('#callbutton').removeClass('active');
        });

        /* Панель навигации */

        // Описываем функцию, которая
        function lpNavigation() {
            if ($(window).scrollTop() == 0) { // Если находимся в начале страницы
                $('.navigation').addClass('top'); // Добавляет класс top для панели
            } else { // Иначе
                $('.navigation.top').removeClass('top'); // Удаляет его
            }
        }
        // Вызываем эту функцию
        lpNavigation(); // Единожды при загрузке страницы
        $(window).on('scroll', lpNavigation); // И каждый раз при скролле

        /* Плавный скролл при клике на ссылку в меню */
        // Помещаем в переменную ссылку на меню
        var lpNav = $('.navigation ul');
        // При клике на ссылку в меню
        lpNav.find('li a').on('click', function (e) {
            // Определяем элемент на странице, на который ссылается ссылка по ID
            var linkTrgt = $($(this).attr('href'));
            if (linkTrgt.length > 0) { // Если такой элемент присутствует
                e.preventDefault(); // Отменяем переход по умолчанию
                var offset = linkTrgt.offset().top; // Определяем отступ целевого элемента от начала документа
                $('body, html').animate({
                    scrollTop: offset - 40
                }, 750); // Плавно скролим документ к этому месту
            }
        });

        /* Отслеживание активного экрана */

        // Описываем функцию, которая вычисляет активный экран
        function lpSetNavActive() {
            // В этой переменной в конце each будет ID активного экрана
            var curItem = '';
            // Чтобы он туда попал, перебираем все экраны
            $('section').each(function () {
                // И если положение экрана от начала страницы меньше текущего скролла
                if ($(window).scrollTop() > $(this).offset().top - 200) {
                    curItem = $(this).attr('id'); // В переменную вносим ID этого экрана
                }
            });
            // Далее, если href ссылки внутри активного пункта меню не совпадает с ID найденного нами активного экрана
            // Либо активные элементы отсутствуют в меню
            if (lpNav.find('li.active a').attr('href') != '#' + curItem || lpNav.find('li.active').length == 0) {
                // Удаляем класс у текущего активного элемента
                lpNav.find('li.active').removeClass('active');
                // И добавляем класс active пункту, внутри которого лежит ссылка, у которой href совпал с ID активного экрана 
                lpNav.find('li a[href="#' + curItem + '"]').parent().addClass('active');
            }
        }
        // Вызываем эту функцию
        lpSetNavActive(); // Единожды при загрузке страницы
        $(window).on('scroll', lpSetNavActive); // И каждый раз при скролле

        /* Слайдшоу */

        $('.lp-slider1').owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
            animateOut: 'fadeOut',
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 5000,
            center: true,
            loop: true
        });
        $('.lp-slider2').owlCarousel({
            items: 1,
            nav: true,
            navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
            responsive: {
                768: {
                    items: 3
                }
            }
        });

        /* Табулятор */

        // Для каждого табулятора на странице
        $('.lp-tabs').each(function () {
            // Помещаем корневой div в переменную tabs 
            var tabs = $(this),
                tabsTitlesNames = []; // А также объявляем массив, в котором будем хранить имена вкладок
            // Сохраняем все имена вкладок в массив
            tabs.find('div[data-tab-title]').each(function () {
                tabsTitlesNames.push($(this).attr('data-tab-title'));
            }).addClass('lp-tab');
            // Между корневым div и его содержимым добавляем div с классом "lp-tabs-content"
            tabs.wrapInner('<div class="lp-tabs-content"></div>');
            // В начало корневого div добавляем div с классом "lp-tabs-titles" и списком внутри
            tabs.prepend('<div class="lp-tabs-titles"><ul></ul></div>');
            // Помещаем в переменные:
            var tabsTitles = tabs.find('.lp-tabs-titles'), // Div c заголовками вкладок
                tabsContent = tabs.find('.lp-tabs-content'), // Div с содержимым вкладок
                tabsContentTabs = tabsContent.find('div[data-tab-title]'); // Набор вкладок
            // Добавляем заголовки вкладок
            tabsTitlesNames.forEach(function (value) {
                tabsTitles.find('ul').append('<li>' + value + '</li>');
            });
            // Помещаем в переменную набор заголовков вкладок
            var tabsTitlesItems = tabsTitles.find('ul li');
            // Добавляем класс "active" первому заголовку
            tabsTitlesItems.eq(0).addClass('active');
            // Добавляем класс "active" первой вкладке и отображаем ее
            tabsContentTabs.eq(0).addClass('active').show();
            // Устанавливаем высоту div с содержимым вкладок равной высоте первой вкладки
            tabsContent.height(tabsContent.find('.active').outerHeight());
            // По клику на заголовке вкладки
            tabsTitlesItems.on('click', function () {
                // Проверяем, не находится ли табулятор в переходном состоянии
                if (!tabs.hasClass('changing')) {
                    // Если нет, то добавляем класс "changing", обозначающий переходное состояние
                    tabs.addClass('changing');
                    // Помещаем в переменные:
                    var curTab = tabsContent.find('.active'), // Активную вкладку
                        nextTab = tabsContentTabs.eq($(this).index()); // Следующую вкладку
                    // Убираем класс "active" у активного заголовка
                    tabsTitlesItems.removeClass('active');
                    // Добавляем класс "active" заголовку, по которому кликнули
                    $(this).addClass('active');
                    // Помещаем в переменную текущую высоту контента
                    var curHeight = curTab.outerHeight();
                    // Отображаем следующую вкладку
                    nextTab.show();
                    // Помещаем в переменную высоту контента следующей вкладки
                    var nextHeight = nextTab.outerHeight();
                    // Прячем следующую вкладку, пока никто ее не увидел
                    nextTab.hide();
                    // Если высота контента следующей вкладки больше
                    if (curHeight < nextHeight) {
                        // То плавно увеличиваем высоту блока с контентом до нужной высоты
                        tabsContent.animate({
                            height: nextHeight
                        }, 500);
                    }
                    // И параллельно прячем текщую вкладку
                    curTab.fadeOut(500, function () {
                        // По окончании анимации
                        // Если высота контента следующей вкладки меньше
                        if (curHeight > nextHeight) {
                            // То плавно уменьшаем высоту блока с контентом до нужной высоты
                            tabsContent.animate({
                                height: nextHeight
                            }, 500);
                        }
                        // И параллельно отображаем следующую вкладку
                        nextTab.fadeIn(500, function () {
                            // По окончании анимации
                            // Удаляем класс "active" у текущей (уже прошлой) вкладки
                            curTab.removeClass('active');
                            // Добавляем класс "active" следующей (уже текущей) вкладке
                            nextTab.addClass('active');
                            // Выводим табулятор из переходного состояния
                            tabs.removeClass('changing');
                        });
                    });
                    var tabNum = $(this).index();
                }
            });
            // При изменении размера окна
            $(window).on('resize', function () {
                // Устанавливаем высоту div с содержимым вкладок равной высоте активной вкладки
                tabsContent.height(tabsContent.find('.active').outerHeight());
            });
        });

        /* Всплывающие окна */

        $('.lp-mfp-inline').magnificPopup({
            type: 'inline'
        });

        $('.lp-gallery').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            });
        });

        /* Формы обратной связи */

        $('#lp-fb1').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.lp-fb1-link',
            fbColor: '#337ab7'
        });

        $('#lp-fb2').wiFeedBack({
            fbScript: 'blocks/wi-feedback.php',
            fbLink: '.lp-fb2-link',
            fbColor: '#337ab7'
        });

        // Закрпляем  панель навигации при скролле
        $(window).on('scroll', function ScrlFi() {

            var a = ($('#slideshow').outerHeight() * (0.8));

            if (($(window).scrollTop()) >= a) {

                $('.navigation').addClass('stop');
            };
            if (($(window).scrollTop()) < a) {

                $('.navigation').removeClass('stop');
            };
        });



        // Яндекс карта
        $.fn.lpMapInit = function () {

            var lpMapOptions = {
                center: [53.906530, 27.510236],
                zoom: 16,
                controls: ['zoomControl']
            }

            if (window.innerWidth < 768) {
                lpMapOptions.behaviors = ['multiTouch'];
            } else {
                lpMapOptions.behaviors = ['drag'];
            }

            var lpMap = new ymaps.Map('lp-map', lpMapOptions);

            lpPlacemark = new ymaps.Placemark(lpMapOptions.center, {
                hintContent: 'ИТ Академия',
                balloonContentHeader: 'ИТ Академия',
                balloonContentBody: 'учебные курсы',
                balloonContentFooter: 'пер. 4-й Загородный, 56А'
            });

            lpMap.geoObjects.add(lpPlacemark);

        }



    });
})(jQuery);
