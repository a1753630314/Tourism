$(document).ready(function () {

            var $image = $(".image-crop > img")
            $($image).cropper({
                aspectRatio: 1,
                preview: ".img-preview",
                done: function (data) {
                    // 输出结果
                    console.log(data)
                }
            });

            var $inputImage = $("#inputImage");
            if (window.FileReader) {
                $inputImage.change(function () {
                    var fileReader = new FileReader(),
                        files = this.files,
                        file;

                    if (!files.length) {
                        return;
                    }

                    file = files[0];

                    if (/^image\/\w+$/.test(file.type)) {
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function () {
                            $inputImage.val("");
                            $image.cropper("reset", true).cropper("replace", this.result);
                        };
                    } else {
                        showMessage("请选择图片文件");
                    }
                });
            } else {
                $inputImage.addClass("hide");
            }

//          $("#download").click(function () {
//              window.open($image.cropper("getDataURL"));
//          });

            $("#zoomIn").click(function () {
                $image.cropper("zoom", 0.1);
            });

            $("#zoomOut").click(function () {
                $image.cropper("zoom", -0.1);
            });

            $("#rotateLeft").click(function () {
                $image.cropper("rotate", 45);
            });

            $("#rotateRight").click(function () {
                $image.cropper("rotate", -45);
            });

            $("#setDrag").click(function () {
                $image.cropper("setDragMode", "crop");
                console.log($image.cropper("getDataURL"))
            });

            $('#data_5 .input-daterange').datepicker({
                keyboardNavigation: false,
                forceParse: false,
                autoclose: true
            });
            $("#cut").click(function () {
                var base64 = $image.cropper("getDataURL");
                var target = $(this).data("target");
                $(target).val(base64);
                layer.msg("裁剪成功", {icon: 1});
            });
//          $('#data_1 .input-group.date').datepicker({
//              todayBtn: "linked",
//              keyboardNavigation: false,
//              forceParse: false,
//              calendarWeeks: true,
//              autoclose: true
//          });
//
//          $('#data_2 .input-group.date').datepicker({
//              startView: 1,
//              todayBtn: "linked",
//              keyboardNavigation: false,
//              forceParse: false,
//              autoclose: true,
//              format: "yyyy-mm-dd"
//          });
//
//          $('#data_3 .input-group.date').datepicker({
//              startView: 2,
//              todayBtn: "linked",
//              keyboardNavigation: false,
//              forceParse: false,
//              autoclose: true
//          });
//
//          $('#data_4 .input-group.date').datepicker({
//              minViewMode: 1,
//              keyboardNavigation: false,
//              forceParse: false,
//              autoclose: true,
//              todayHighlight: true
//          });
//
//          $('#data_5 .input-daterange').datepicker({
//              keyboardNavigation: false,
//              forceParse: false,
//              autoclose: true
//          });
//
//          var elem = document.querySelector('.js-switch');
//          var switchery = new Switchery(elem, {
//              color: '#1AB394'
//          });
//
//          var elem_2 = document.querySelector('.js-switch_2');
//          var switchery_2 = new Switchery(elem_2, {
//              color: '#ED5565'
//          });
//
//          var elem_3 = document.querySelector('.js-switch_3');
//          var switchery_3 = new Switchery(elem_3, {
//              color: '#1AB394'
//          });

            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green'
            });
            
            var config = {
	            '.chosen-select': {},
	            '.chosen-select-deselect': {
	                allow_single_deselect: true
	            },
	            '.chosen-select-no-single': {
	                disable_search_threshold: 10
	            },
	            '.chosen-select-no-results': {
	                no_results_text: 'Oops, nothing found!'
	            },
	            '.chosen-select-width': {
	                width: "95%"
	            }
	        }
	        for (var selector in config) {
	            $(selector).chosen(config[selector]);
	        }

//          $('.colorpicker-demo1').colorpicker();
//
//          $('.colorpicker-demo2').colorpicker();
//
//          $('.colorpicker-demo3').colorpicker();
//
//          // Code for demos
//          function createColorpickers() {
//              // Api demo
//              var bodyStyle = $('body')[0].style;
//              $('#demo_apidemo').colorpicker({
//                  color: bodyStyle.backgroundColor
//              }).on('changeColor', function (ev) {
//                  bodyStyle.backgroundColor = ev.color.toHex();
//              });
//
//              // Horizontal mode
//              $('#demo_forceformat').colorpicker({
//                  format: 'rgba', // force this format
//                  horizontal: true
//              });
//
//              $('.demo-auto').colorpicker();
//
//              // Disabled / enabled triggers
//              $(".disable-button").click(function (e) {
//                  e.preventDefault();
//                  $("#demo_endis").colorpicker('disable');
//              });
//
//              $(".enable-button").click(function (e) {
//                  e.preventDefault();
//                  $("#demo_endis").colorpicker('enable');
//              });
//          }
//
//          createColorpickers();
//
//          // Create / destroy instances
//          $('.demo-destroy').click(function (e) {
//              e.preventDefault();
//              $('.demo').colorpicker('destroy');
//              $(".disable-button, .enable-button").off('click');
//          });
//
//          $('.demo-create').click(function (e) {
//              e.preventDefault();
//              createColorpickers();
//          });
//
//          var divStyle = $('.back-change')[0].style;
//          $('#demo_apidemo').colorpicker({
//              color: divStyle.backgroundColor
//          }).on('changeColor', function (ev) {
//              divStyle.backgroundColor = ev.color.toHex();
//          });
//
//          $('.clockpicker').clockpicker();
//
//          $( '#file-pretty input[type="file"]' ).prettyFile();
//
        });
