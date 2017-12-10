# avs
Course work MiSPISiT

## Docs
[Обследование][1]
[ТЗ][2]

[1]: https://docs.google.com/document/d/1z0MMXFQaxj-FfzznTCDnwEEz_7IbuKAS_VfkdbtXfAI/edit?usp=sharing

[2]: https://docs.google.com/document/d/1FvftsE4LAH36Z4DAUfs8_Zvv0kiX81q183zGQeS2Ppk/edit?usp=sharing


## Directory
```
.
├── client
│   └── assets
│   │   ├── css
│   │   ├── html
│   │   ├── images
│   │   └── js
│   ├── public  (Are generated locally when the project is started)
│   └── build   (Are generated locally when the project is build)
├── server
└── README.md
```

## Install
Installing dependencies
```
sudo npm install gulp -g
npm init
npm install gulp browser-sync gulp-myth gulp-csso gulp-imagemin gulp-uglify gulp-concat gulp-uncss gulp-clean gulp-plumber gulp-sourcemaps gulp-nodemon --save-dev
```
## Launch
```
gulp watch
```
