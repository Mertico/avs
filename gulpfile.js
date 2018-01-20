var gulp = require('gulp'),                          // Сообственно Gulp JS
    browserSync = require('browser-sync').create(),  // Вебсервер - Browsersync
    reload = browserSync.reload,
    myth = require('gulp-myth'),                     // Плагин для Myth - http://www.myth.io/
    csso = require('gulp-csso'),                     // Минификация CSS
    imagemin = require('gulp-imagemin'),             // Минификация изображений
    uglify = require('gulp-uglify'),                 // Минификация JS
    concat = require('gulp-concat'),                 // Склейка файлов
    clean = require('gulp-clean'),                   // Очистка директорий
    uncss = require('gulp-uncss'),                   // Удаление не используемого CSS кода
    plumber = require('gulp-plumber'),               // Вывод ошибок
    sourcemaps = require('gulp-sourcemaps'),         // Генерация sourcemaps


    url = require('url'),
    proxy = require('proxy-middleware'),

    nodemon = require('gulp-nodemon');

/*
sudo npm install gulp -g
npm init
npm install gulp browser-sync gulp-myth gulp-csso gulp-imagemin gulp-uglify gulp-concat gulp-uncss gulp-clean gulp-plumber gulp-sourcemaps --save-dev
gulp watch

npm install url proxy-middleware gulp-nodemon --save-dev
*/

// Собираем CSS
gulp.task('css', function() {
    gulp.src(['./client/assets/css/**/*.css', '!./client/assets/css/vendor/**/*.css']).pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(csso())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write('map'))
    .pipe(gulp.dest('./client/public/css/')) // записываем css
    .pipe(reload({stream:true})); // даем команду на перезагрузку css
});
// Собираем CSS
gulp.task('css:vendor', function() {
    gulp.src(['./client/assets/css/vendor/**/*.css']).pipe(plumber())
        .pipe(gulp.dest('./client/public/css'))
        .pipe(reload({stream:true})); // даем команду на перезагрузку страницы
});

// Собираем html
gulp.task('html', function() {
    gulp.src(['./client/assets/html/**/*.html', '!./client/assets/html/**/_*.html']).pipe(plumber())
    .pipe(gulp.dest('./client/public/')) // Записываем собранные файлы
    .pipe(reload({stream:true})); // даем команду на перезагрузку страницы
});

// Собираем JS
gulp.task('js', function() {
    gulp.src(['./client/assets/js/**/*.js', '!./client/assets/js/vendor/**/*.js']).pipe(plumber())
        .pipe(concat('main.js')) // Собираем все JS, кроме тех которые находятся в ./client/assets/js/vendor/**
        .pipe(gulp.dest('./client/public/js'))
        .pipe(reload({stream:true})); // даем команду на перезагрузку страницы
});
// Собираем JS
gulp.task('js:vendor', function() {
    gulp.src(['./client/assets/js/vendor/**/*.js']).pipe(plumber())
        .pipe(gulp.dest('./client/public/js'))
        .pipe(reload({stream:true})); // даем команду на перезагрузку страницы
});

// Копируем и минимизируем изображения
gulp.task('images', function() {
    gulp.src('./client/assets/images/**/*').pipe(plumber())
        .pipe(gulp.dest('./client/public/images'))
        .pipe(reload({stream:true}));
});

// Очистка директорий - ТОЛЬКО ДЛЯ build
gulp.task('clean:build', function () {
    return gulp.src('./client/build/*', {read: false})
        .pipe(clean());
});
// Очистка директорий - ТОЛЬКО ДЛЯ public
gulp.task('clean:public', function () {
    return gulp.src('./client/public/*', {read: false})
        .pipe(clean());
});

// Локальный сервер для разработки
gulp.task('browser-sync', function() {
    var proxyOptions = url.parse('http://localhost:3000/');
    proxyOptions.route = '/api';

    browserSync.init({
        server: {
            baseDir: "./client/public",
            middleware: [proxy(proxyOptions)]
            // middleware: function (req, res, next) {
            //   res.setHeader('Access-Control-Allow-Origin', '*');
            //   next();
            // }
        },
        cors: true,
        tunnel: false,
        host: 'localhost',
        port: 9080,
    });
});

// run server
gulp.task('server', function() {
  nodemon({
    script: './server/server.js',
    watch: './server/'
  })
  // .on('restart', function() {
  //   reload();
  // })
})

// Запуск сервера разработки gulp & watch Очистка PUBLIC
gulp.task('watch', ['clean:public','server'], function() {
    // Запуск веб сервера & Предварительная сборка проекта
    gulp.start('css', 'css:vendor', 'html', 'images', 'js', 'js:vendor', 'browser-sync');

    gulp.watch(['./client/assets/css/**/*.css', '!./client/assets/css/vendor/**/*.css'], function() {
        gulp.start('css');
    });
    gulp.watch('./client/assets/html/**/*', function() {
        gulp.start('html');
    });
    gulp.watch('./client/assets/images/**/*', function() {
        gulp.start('images');
    });
    gulp.watch(['./client/assets/js/**/*.js', '!./client/assets/js/vendor/**/*.js'], function() {
        gulp.start('js');
    });
    gulp.watch('./client/assets/js/vendor/**/*.js', function() {
        gulp.start('js:vendor');
    });
    gulp.watch('./client/assets/css/vendor/**/*.css', function() {
        gulp.start('css:vendor');
    });
});

// Сборка проекта gulp build
gulp.task('build', ['clean:build'], function() {
    // html
    gulp.src(['./client/assets/html/**/*']).pipe(plumber())
        .pipe(gulp.dest('./client/build/'))

    // css
    gulp.src('./client/assets/css/**/*.css').pipe(plumber())
        .pipe(uncss({
                html: ['./client/build/**/*.html']
            }))
    .pipe(myth()) // добавляем префиксы - http://www.myth.io/
    .pipe(csso()) // минимизируем css
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./client/build/css/')) // записываем css

    // js
    gulp.src(['./client/assets/js/**/*.js', '!./client/assets/js/vendor/**/*.js']).pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./client/build/js'));

    // image
    gulp.src('./client/assets/images/**/*').pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('./client/build/images'))

});
