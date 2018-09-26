let
    sourcesFolder = 'src',
    libsFolder = 'node_modules';
let jsScripts = [
    `${sourcesFolder}/js/form-elements.js`,
    `${sourcesFolder}/js/app/*.js`,
    `${sourcesFolder}/js/date.service/*.js`,
    `${sourcesFolder}/js/toasts/*.js`,
    `${sourcesFolder}/js/modal.windows/*.js`,
    `${sourcesFolder}/js/search/*.js`,
    `${sourcesFolder}/js/root/*.js`,
    `${sourcesFolder}/js/header/*.js`,
    `${sourcesFolder}/js/sidebar/*.js`,
    `${sourcesFolder}/js/testing/*.js`,
    // `${sourcesFolder}/js/messages/*.js`,

    `${sourcesFolder}/js/users/*.js`,
    `${sourcesFolder}/js/employees/*.js`,
    `${sourcesFolder}/js/employee.new/*.js`,
    `${sourcesFolder}/js/list.people/*.js`,
    `${sourcesFolder}/js/control.menu/*.js`,
    `${sourcesFolder}/js/curr.employee/*.js`,
    `${sourcesFolder}/js/curr.employee.info/*.js`,
    `${sourcesFolder}/js/curr.employee.info.education/*.js`,
    `${sourcesFolder}/js/curr.employee.info.family/*.js`,
    `${sourcesFolder}/js/curr.employee.info.transfer/*.js`,
    `${sourcesFolder}/js/curr.employee.info.workexp/*.js`,
    `${sourcesFolder}/js/curr.employee.info.vacations/*.js`,
    `${sourcesFolder}/js/curr.employee.documents/*.js`,
    `${sourcesFolder}/js/curr.employee.documents.modal/*.js`,
    `${sourcesFolder}/js/curr.employee.info.pollsAnswers/*.js`,
    `${sourcesFolder}/js/curr.employee.comparison/*.js`,
    `${sourcesFolder}/js/employee.collisions/*.js`,
    `${sourcesFolder}/js/curr.employee.comparison.variant/*.js`,
    `${sourcesFolder}/js/candidates/*.js`,
    `${sourcesFolder}/js/administrating/*.js`,
    // `${sourcesFolder}/js/vacancies/*.js`,
    // `${sourcesFolder}/js/list.vacancies/*.js`,
    `${sourcesFolder}/js/employee.from.candidate/*.js`,


    `${sourcesFolder}/js/comparison/*.js`,
    `${sourcesFolder}/js/polls.active/*.js`,
    `${sourcesFolder}/js/polls.closed/*.js`,
    `${sourcesFolder}/js/polls.develop/*.js`,
    `${sourcesFolder}/js/polls.general/*.js`,
    `${sourcesFolder}/js/polls.new/*.js`,
    `${sourcesFolder}/js/poll.new.individ/*.js`,
    `${sourcesFolder}/js/poll/*.js`,




    `${sourcesFolder}/js/note/*.js`,
    `${sourcesFolder}/js/notes/*.js`,
    `${sourcesFolder}/js/services.js`,
    `${sourcesFolder}/js/translitService.js`,
    `${sourcesFolder}/js/filters.js`,
    `${sourcesFolder}/js/controllers.js`,
    `${sourcesFolder}/js/components.js`,
    `${sourcesFolder}/js/directives.js`,
    `${sourcesFolder}/js/scripts.js`,

];
let jsLibs = [
    `${libsFolder}/moment/min/moment-with-locales.min.js`,
    `${libsFolder}/jquery/dist/jquery.min.js`,
    `${libsFolder}/bootstrap/dist/js/bootstrap.min.js`,
    `${libsFolder}/ev-emitter/ev-emitter.js`,
    `${libsFolder}/desandro-matches-selector/matches-selector.js`,
    `${libsFolder}/fizzy-ui-utils/utils.js`,
    `${libsFolder}/get-size/get-size.js`,
    `${libsFolder}/outlayer/item.js`,
    `${libsFolder}/outlayer/outlayer.js`,
    `${libsFolder}/masonry-layout/dist/masonry.pkgd.min.js`,
    `${libsFolder}/imagesloaded/imagesloaded.js`,
    `${libsFolder}/angular/angular.min.js`,
    `${libsFolder}/ng-mask/dist/ngMask.min.js`,
    `${libsFolder}/angular-sanitize/angular-sanitize.min.js`,
    `${libsFolder}/angular-animate/angular-animate.min.js`,
    `${libsFolder}/angular-route/angular-route.min.js`,
    `${libsFolder}/angular-touch/angular-touch.js`,
    `${libsFolder}/ngstorage/ngStorage.min.js`,
    `${libsFolder}/v-accordion/dist/v-accordion.min.js`,
    `${libsFolder}/angular-moment-picker/dist/angular-moment-picker.min.js`,
    `${libsFolder}/angular-xeditable/dist/js/xeditable.min.js`,
    `${libsFolder}/angular-toastr/dist/angular-toastr.tpls.min.js`,
    `${libsFolder}/angular-lazy-img/dist/angular-lazy-img.js`,
    `${libsFolder}/ng-dialog/js/ngDialog.min.js`,
    `${libsFolder}/angular-masonry/angular-masonry.js`,
    `${libsFolder}/angular-moment/angular-moment.min.js`,
    `${libsFolder}/angular-elastic/elastic.js`,
    `${libsFolder}/@schoolreg/angular-form-builder/dist/angular-form-builder.min.js`,
    `${libsFolder}/@schoolreg/angular-validator/dist/angular-validator.min.js`,
    `${libsFolder}/@schoolreg/angular-validator/dist/angular-validator-rules.min.js`,
    `${libsFolder}/angular-base64-upload/dist/angular-base64-upload.js`,
    `${libsFolder}/angular-scroll/angular-scroll.js`,
    `${libsFolder}/file-saver/FileSaver.js`

];
let jsFinal = jsLibs.concat(jsScripts);
let cssLibs = [
    `${libsFolder}/@schoolreg/angular-form-builder/dist/angular-form-builder.css`,
    `${libsFolder}/angular-moment-picker/dist/angular-moment-picker.min.css`,
    `${libsFolder}/angular-xeditable/dist/css/xeditable.min.css`,
    `${libsFolder}/angular-toastr/dist/angular-toastr.min.css`,
    `${libsFolder}/ng-dialog/css/ngDialog.min.css`,
    `${libsFolder}/ng-dialog/css/ngDialog-theme-default.min.css`
];
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: {
                    block: true,
                    line: true,
                },
                separator: ';\n'
            },
            app: {
                // src: ['src/js/**/*.js', 'src/js/*.js'],
                src: jsScripts,
                dest: 'dist/static/js/app.js'
            },
            final: {
                src: jsFinal,
                dest: 'src/temp/js/final.js'
            }
        },
        uglify: {
            options: {
                compress: {
                    drop_console: false
                },
                mangle: false
            },
            libs: {
                files: {
                    'static/js/libs.min.js': jsLibs
                }
            },
            final: {
                files: {
                    'dist/static/js/scripts.min.js': jsFinal
                },

            }
        },
        less: {
            app: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'dist/static/css/app.css': ['src/less/main.less']
                }
            },
            final: {
                options: {
                    compress: false,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'src/temp/css/app.css': ['src/less/main.less']
                }
            }
        },
        concat_css: {
            options: {},
            libs: {
                src: cssLibs,
                dest: 'src/temp/css/libs.css'
            },
            final: {
                src: [
                    'src/temp/css/libs.css',
                    'src/temp/css/app.css'
                ],
                dest: 'src/temp/css/final.css'
            }
        },
        cssnano: {
            options: {
                sourcemap: false,
                discardComments: {
                    removeAll: true
                }
            },
            libs: {
                files: {
                    'dist/static/css/libs.min.css': 'src/temp/css/libs.css'
                }
            },
            final: {
                files: {
                    'dist/static/css/final.min.css': 'src/temp/css/final.css'
                }
            }
        },
        copy: {
            to_dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'img/**',
                            'fonts/**',
                        ],
                        dest: 'dist/static'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [],
                        dest: 'dist/'
                    }
                ],
            },
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'index.html'
                        ],
                        // dest: 'dist/templates'
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'templates/**'
                        ],
                        dest: 'dist/static'
                    },
                ],
            },
            json: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'JSON/**',
                        ],
                        dest: 'dist/static'
                    }
                ],
            },
            libs: {
                // files: [
                //     { expand: true, cwd: 'path/', src: ['**'], dest: 'dest/' },
                // ],
            },
        },
        processhtml: {
            final: {
                options: {
                    data: {
                        message: 'Final target'
                    }
                },
                files: {
                    'dist/templates/index.html': ['src/index.html']
                }
            }
        },
        watch: {
            styles: {
                files: ['src/less/*.less', 'src/less/*/*.less'],
                tasks: ['less:app', 'notify:watch']
            },
            // scripts: {
            //     files: ['src/js/*.js', 'src/js/*/*.js'],
            //     tasks: ['concat:app', 'notify:watch']
            // },
            // html: {
            //     files: ['src/index.html', 'src/templates/*.html'],
            //     tasks: ['copy:html', 'notify:watch']
            // },
            // json: {
            //     files: ['src/JSON/*.json'],
            //     tasks: ['copy:json', 'notify:watch']
            // }
        },
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'Project Name',
                success: false,
                duration: 1
            }
        },
        notify: {
            watch: {
                options: {
                    // title: 'Task Complete',
                    message: 'watch completed',
                    duration: 1,
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-cssnano');
    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.registerTask('default', ['watch', 'notify_hooks']);
    grunt.registerTask('libs',
        [
            'uglify:libs',
            'concat_css:libs',
            'cssnano:libs',
            'copy:to_dist',
            'copy:html',
            'copy:json'
        ]
    );
    grunt.registerTask('dev',
        [
            'less:app',
            'concat:app',
            'copy:html',
            'copy:json'
        ]);
    grunt.registerTask('dev-build',
        [
            'uglify:final',
            'less:final',
            'concat_css:libs',
            'concat_css:final',
            'cssnano:final',
            'copy:to_dist',
            'copy:html',
            'copy:json',
            'processhtml:final'
        ]
    );
    grunt.registerTask('all',
        [
            'uglify:final',
            'less:final',
            'concat_css:libs',
            'concat_css:final',
            'cssnano:final',
            'copy:to_dist',
            'copy:html',
            'copy:json',
            'processhtml:final'
        ]
    );

    grunt.registerTask('style',
        [
            'less:final',
            'concat_css:libs',
            'concat_css:final',
            'cssnano:final',
            'copy:to_dist',
        ]
    );
    grunt.registerTask('js',
        [
            'uglify:final',
        ]
    );
    grunt.registerTask('dev-s',
        [
            'less:final',
            'concat_css:libs',
            'concat_css:final',
            'cssnano:final',
            'copy:to_dist',
            'copy:html',
            'copy:json',
            'processhtml:final'
        ]
    );
    grunt.registerTask('db',
        [
            'uglify:final',
            'copy:to_dist',
            'copy:html',
            'processhtml:final'
        ]
    );
};