module.exports = function() {

    var helper = require('../modules/module-helpers');

    return {

        init: function() {

            $(document).ready(function() {
                if ($("#pinboard-form").length) {

                    basehref = $("base").attr("href");

                    $('textarea.tinymce_minimal').tinymce({

                        script_url : $("base").attr("href") + 'tiny_mce/tiny_mce.js',

                        // General options
                        theme : "advanced",
                        skin : "o2k7",
                        skin_variant : "silver",
                        relative_urls : false,
                        convert_urls : false,

                        plugins : "safari,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,imagemanager,filemanager,smarttags",

                        // Cleanup on paste
                        paste_auto_cleanup_on_paste : true,

                        // Theme options
                        theme_advanced_buttons1 : "link,unlink,",
                        theme_advanced_toolbar_location : "top",
                        theme_advanced_toolbar_align : "left",
                        theme_advanced_statusbar_location : "bottom",
                        theme_advanced_resizing : true,

                        theme_advanced_blockformats: "p,h2,h3,h4",


                        // Example content CSS (should be your site CSS)
                        //content_css : "assets/default.css",

                        // Drop lists for link/image/media/template dialogs
                        template_external_list_url : "lists/template_list.js",
                        external_link_list_url : "lists/link_list.js",
                        external_image_list_url : "lists/image_list.js",
                        media_external_list_url : "lists/media_list.js"

                    });

                }
            });
        },
    };

}; // End module
